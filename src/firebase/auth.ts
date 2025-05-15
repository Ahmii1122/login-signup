import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
interface userparamstype {
  name: string;
  email: string;
  password: string;
}

export const docreateUserWithEmailAndPassword = async ({
  name,
  email,
  password,
}: userparamstype) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    const docRef = await addDoc(collection(db, "users"), {
      uid: result.user.uid,
      email: email,
      name: name,
      createdAt: new Date(),
    });
    return result.user.uid;
    console.log("docRef", docRef);
    return result;
  } catch (error) {
    console.log(error);
    console.log("error in creating user");
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
