import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAGj208UqUvBJXUvDEsDeVgPTEcZxrIST4",
  authDomain: "q-a-database-bb349.firebaseapp.com",
  projectId: "q-a-database-bb349",
  storageBucket: "q-a-database-bb349.appspot.com",
  messagingSenderId: "1786902174",
  appId: "1:1786902174:web:c9287eaca141366d816d8f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();



const google_button = document.getElementById('google_button');
google_button.addEventListener("click", async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log(user.email);

    const profilePictureURL = user.photoURL;

    const userDocRef = doc(db, "user_information", user.uid);
    await setDoc(userDocRef, {
      Name: user.displayName,
      email: user.email,
      profilePictureURL: profilePictureURL
    });

    window.location.href = "./main_program/home.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
});