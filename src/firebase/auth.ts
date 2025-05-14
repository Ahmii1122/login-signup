import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// import { doc } from "firebase/firestore";
// import { setDoc } from "firebase/firestore";
interface userparamstype {
  email: string;
  password: string;
}

export const docreateUserWithEmailAndPassword = async ({
  email,
  password,
}: userparamstype) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // const userRef = doc(db, "users", result.user.uid);
    // await setDoc(userRef, {
    //     email,
    //     nam
    // });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const dosigninwithgoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const dosigninwithemailandpassword = async ({
  email,
  password,
}: userparamstype) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const dologout = async () => {
  return await signOut(auth);
};
