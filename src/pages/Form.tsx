import { useContext, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../Context/authcontext";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const Form = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [image, setimage] = useState<File | null>(null);
  const { currentUser: user } = useContext(AuthContext);
  return (
    <div className="form-container">
      <form
        className="auth-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!user?.uid) return console.log("user not found");
          const data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            picture: image,
          };
          try {
            if (!image) return console.log("image not found");
            const storageRef = ref(storage, `users/${user?.uid}/picture`);
            const uploadTask = await uploadBytes(storageRef, image);
            const docRef = await setDoc(doc(db, "users", user.uid), {
              ...data,
              picture: uploadTask.metadata.fullPath,
            });
            console.log("docRef", docRef);
            console.log("data", user.uid);
          } catch (error) {
            console.log(error);
          }
          //   if (!user?.uid) return console.log("user not found");
          //   const formsColRef = collection(db, "users", user?.uid, "forms");
          //   await addDoc(formsColRef, data);
          // Handle form submission
        }}
      >
        <h2>Profile Form</h2>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            onChange={(e) => setAge(Number(e.target.value))}
            name="age"
            placeholder="Age"
            required
          />
        </div>
        <div className="form-group">
          {image ? (
            <div className="flex items-center justify-center w-10 h-10 object-contain">
              <img src={image} alt="" className="w-5 h-5" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 object-contain">
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setimage(URL.createObjectURL(file));
                }}
                required
              />
            </div>
          )}
          <button onClick={() => setimage("")}>remove</button>
        </div>
        <button type="submit" className="auth-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
