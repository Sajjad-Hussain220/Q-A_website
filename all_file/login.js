import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const dp = getFirestore(app);


let email = document.getElementById("email");
let password = document.getElementById("password");
let toggle_password = document.getElementById("toggle-password1");
let login_form = document.getElementById("login_form");

let login_here = async evt => {
    evt.preventDefault();

    var object = {
        useremail: email.value,
        user_password: password.value,
    };

    try {
        if (object.user_password.length > 6) {
            signInWithEmailAndPassword(auth, object.useremail, object.user_password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("User logged in:", user);


                    var ref = doc(dp, "user_information", user.uid);
                    const docsnap = await getDoc(ref);

                    if (docsnap.exists()) {
                        const userName = docsnap.data().Name;
                        alert("Welcome, " + userName);
                        sessionStorage.setItem("user-info", JSON.stringify({
                            Name: userName
                        }));
                    }
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            window.location.href = "./main_program/home.html";
                            console.log("welcom")
                        }
                    })
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            alert(errorCode);
                            alert(errorMessage);
                        });
                } else {
                    alert("Password should be at least 6 characters long.");
                }
    } catch (error) {
            alert("An unexpected error occurred.");
            console.error(error);
        }
    }


login_form.addEventListener("submit", login_here);




function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.nextElementSibling.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
    eyeIcon.classList.toggle('ri-eye-off-fill');
    eyeIcon.classList.toggle('ri-eye-fill');
}

toggle_password.addEventListener('click', function () {
    togglePassword('password');
})
