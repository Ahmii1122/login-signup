import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

interface AuthContextType {
  currentUser: User | null;
  userloggedin: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userloggedin: false,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userloggedin = currentUser !== null;
  const [loading, setloading] = useState(true);

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
