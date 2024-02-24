import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const email = document.getElementById('email');
const send_button = document.getElementById('send_button');

send_button.addEventListener('click', function () {
    // Validate the email address
    const emailValue = email.value.trim();

    if (!emailValue) {
        alert("Please input your email address.");
        return;
    }

    // Send password reset email
    sendPasswordResetEmail(auth, emailValue)
        .then(() => {
            alert("A Password Reset Link has been sent to your email.");
            window.location.href = "http://127.0.0.1:5500/all_file/logi.html";
        })
        .catch((error) => {
            console.error(error.code);
            console.error(error.message);
        });
});





