import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider , FacebookAuthProvider} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc,setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCK8aUUxBf4eboq9WHsfWvtc3ThFaY-6Fs",
  authDomain: "q-a-data.firebaseapp.com",
  projectId: "q-a-data",
  storageBucket: "q-a-data.appspot.com",
  messagingSenderId: "785659477281",
  appId: "1:785659477281:web:4630eb1b1c23ba0ca25260"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dp = getFirestore(app);
const provider = new GoogleAuthProvider();
const provider2 = new FacebookAuthProvider();

const google_button = document.getElementById('google_button');
google_button.addEventListener("click", function () {

  signInWithPopup(auth, provider)
    .then(async (result) => {
  
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
    
      console.log(user.email)

      var ref = doc(dp, "user_information", user.uid);
      await setDoc(ref, {
        Name: user.displayName,  
        email: user.email,
      })

    }).catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
   console.log(errorCode)
   console.log(errorMessage)

    });
})
// facbook login
const facbook_button = document.getElementById('facbook_button');
facbook_button.addEventListener("click", function () {
  provider2.addScope('user_birthday');
  
  signInWithPopup(auth, provider2)
    .then(async (result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const user = result.user;

      var ref = doc(dp, "user_information", user.uid);
      await setDoc(ref, {
        Name: user.displayName,
        email: user.email,
      });

      console.log(user.email);
    })
    .catch((error) => {
      if (error.code === 'auth/popup-closed-by-user') {
        // Handle the case where the user closed the popup without completing the login
        console.log('User closed the Facebook login popup.');
      } else {
        // Handle other errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        const email = error.customData?.email;
        // AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
      }
    });
});
