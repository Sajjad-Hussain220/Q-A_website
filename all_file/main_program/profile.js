import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
const storage = getStorage(app)

const user_ProfileImg = document.getElementById("user-image");
const user_name = document.getElementById("user_name");
const user_email = document.getElementById("user_email");
const update_data = document.getElementById("login_button");

let profilepic = document.getElementById("user-image");
let inputfile = document.getElementById("input_file");
var  download_img_url = ""
inputfile.onchange = function () {
    const file = inputfile.files[0];

    // Check if the selected file has a valid extension
    if (file && /\.(jpe?g|png)$/i.test(file.name)) {
        // Change the source of the image element
        profilepic.src = URL.createObjectURL(file);

        // Upload the file to Firebase Storage
        const user_img_ref = ref(storage, `users/${user_email.value}/profile`);
        const metadata = {
            contentType: file.type,
        };

        uploadBytes(user_img_ref, file, metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        // Display the download URL
                        const user = getAuth().currentUser;
                        download_img_url = downloadURL
                        updateProfile(user, {
                            photoURL: downloadURL
                        })
                        console.log("File uploaded successfully. Download URL: " + user.photoURL);

                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    } else {
        // Handle invalid file type
        alert("Please select a valid JPEG, JPG, or PNG file.");
        // Optionally, you can clear the file input to allow the user to choose another file
        inputfile.value = null;
    }
};

onAuthStateChanged(auth, (user) => {

    if (user) {
        const userDocRef = doc(dp, "user_information", user.uid);

        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();

                    user.displayName = userData.Name;

                    user_name.value = user.displayName;
                    user_email.value = user.email;
                    user_ProfileImg.src =  user.photoURL;
                } else {
                    console.log("Document does not exist");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });

    } else {
        console.log("User is not logged in");
        user_ProfileImg.src = "../../green_picture.png";

    }
});


update_data.addEventListener('click', updateUserProfile);

function updateUserProfile() {
    if (user_name && user_ProfileImg) {
        const newUserName1 = user_name.value;
        const newPhotoURL1 = download_img_url;

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

            const profilePictureURL = profileUpdates.photoURL;
            const email = user.email;
            const Name = profileUpdates.displayName;

            // Using Promise.all to wait for both operations to complete
            Promise.all([
                updateDoc(userDocRef, {
                    Name: Name,
                    email: email,
                    profilePictureURL: profilePictureURL
                }),
                updateProfile(user, profileUpdates)
            ])
            .then(() => {
                console.log("Firestore document and user profile updated successfully");
                alert("User profile and Firestore document updated successfully");

                // Add a delay before redirecting (e.g., 1000 milliseconds)
                setTimeout(() => {
                    // Redirect to home.html after both operations are successfully completed
                    window.location.href = "home.html";
                }, 1000);
            })
            .catch((error) => {
                console.error("Error updating document or user profile:", error);
                alert("Error updating document or user profile. Please try again.");
            });
        } else {
            alert("Please enter a valid username or photo URL");
        }
    } else {
        console.error("user_name or user_ProfileImg is undefined");
    }
}

