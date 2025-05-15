import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  userloggedin: boolean;
  loading: boolean;
  logout: () => void;
  getdata: () => void;
  userdata: any;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userloggedin: false,
  loading: true,
  logout: async () => {},
  getdata: async () => {},
  userdata: {},
});

export { AuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userloggedin = currentUser !== null;
  const [loading, setloading] = useState(true);
  const [userdata, setuserdata] = useState<any>(null);

  const dbref = collection(db, "users");

  const getdata = async () => {
    const docsnap = await getDocs(dbref);
    docsnap.forEach((doc) => {
      setuserdata(doc.data());
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  }, []);

  const handleAuthStateChange = (user: User | null) => {
    if (user) {
      setCurrentUser({ ...user });
    } else {
      setCurrentUser(null);
    }
    setloading(false);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userloggedin,
    loading,
    logout,
    getdata,
    userdata,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
