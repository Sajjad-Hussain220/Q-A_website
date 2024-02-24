import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

const user_ProfileImg = document.getElementById("user-image");
const user_name = document.getElementById("user_name");
const user_email = document.getElementById("user_email");

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        if (user.photoURL) {
            user_ProfileImg.src = user.photoURL;
            user_name.value = user.displayName;
            user_email.value = user.email;
        }else
        {
            user_email.value = user.email;
        }
    } else {
        console.log("User is not logged in");
        user_ProfileImg.src = "../../green_picture.png";

    }
});

const update_data = document.getElementById("login_button");
update_data.addEventListener('click', updateUserProfile);

function updateUserProfile() {
    if (user_name && user_ProfileImg) {
        const newUserName1 = user_name.value;
        const newPhotoURL1 = user_ProfileImg.src

        if (newUserName1 || newPhotoURL1) {
            const user = auth.currentUser;
            const profileUpdates = {};
            const userDocRef = doc(dp, "user_information", user.uid);

            if (newUserName1) {
                profileUpdates.displayName = newUserName1;

            }

            if (newPhotoURL1) {
                profileUpdates.photoURL = newPhotoURL1;
            }
            const profilePictureURL = profileUpdates.photoURL
            const email = user.email
            const Name = profileUpdates.displayName
            updateDoc(userDocRef, {
                Name: Name,
                email: email,
                profilePictureURL: profilePictureURL
            })
                .then(() => {
                    console.log("Firestore document updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating Firestore document:", error);
                    alert("Error updating Firestore document. Please try again.");
                });

            updateProfile(user, profileUpdates)
                .then(() => {
                    console.log("User profile updated successfully");
                    alert("User profile updated successfully");
                    window.location.href  = "home.html"
                })
                .catch((error) => {
                    console.error("Error updating user profile:", error);
                    alert("Error updating user profile. Please try again.");
                });
        } else {
            alert("Please enter a valid username or photo URL");
        }
    } else {
        console.error("user_name or user_ProfileImg is undefined");
    }
}

let profilepic = document.getElementById("user-image");
let inputfile = document.getElementById("input_file")

inputfile.onchange = function () {
    profilepic.src = URL.createObjectURL(inputfile.files[0])
}