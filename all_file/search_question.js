import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
// const db = getDatabase(app);


let anchorElement; // Declare anchorElement outside the onAuthStateChanged function

onAuthStateChanged(auth, (user) => {
    const closeButton = document.getElementById("closeButton");
    anchorElement = closeButton.querySelector("a");

    if (user) {
        console.log("User is logged in:", user.uid);
        closeButton.addEventListener("click", () => closeButton1(anchorElement));
    } else {
        if (confirm("First login and then write a question")) {
            window.location.href = "./logi.html";
        } else {
            anchorElement.href = "../index.html";
        }
    }
});

function closeButton1(anchorElement) {
    // You can use anchorElement here
    if (true) {
        anchorElement.href = "./main_program/home.html";
    }
}


// onAuthStateChanged(auth, (user) => {
//     const closeButton = document.getElementById("closeButton");
//     const anchorElement = closeButton.querySelector("a");
//     if (true) {
//         // User is logged in
//         console.log("User is logged in:", user.uid);
//         anchorElement.href = "./main_program/home.html";
//     } else {
//         if (confirm("first login than search a question")) {

//             // User is not logged in
//             console.log("User is not logged in");
//             anchorElement.href = "../index.html";
//         }
//     }
// });
