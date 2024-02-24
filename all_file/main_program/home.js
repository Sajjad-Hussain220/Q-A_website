import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signOut ,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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



onAuthStateChanged(auth, (user) => {
  const userProfileImg = document.getElementById("user-profile-img");
        if (user) {
            console.log("User is logged in:", user);
            if (user.photoURL) {
                userProfileImg.src = user.photoURL;
            }
        } else {
            console.log("User is not logged in");
            // Set the default image source when the user is not logged in
            userProfileImg.src = "../../green_picture.png";
        }
});





const logoutButton = document.getElementById('logoutButton');

// Add event listener to the button
logoutButton.addEventListener('click', async function () {
  const userConfirmation = confirm("Are you sure you want to log out?");

  // Check user's confirmation
  if (userConfirmation) {
    try {
      await signOut(auth);
      console.log('User logged out');
      window.location.href = '../../index.html'; // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  } else {

    console.log('Logout canceled');
  }
});



window.onscroll = function() {
  var navbar = document.getElementById("nave_button");

  var searchButton = document.querySelector(".serach_nav");

  if (window.pageYOffset >= navbar.offsetTop) {
      searchButton.style.display = "inline-block";
  } else {
      searchButton.style.display = "none";
  }
};

// Handle window resize for responsiveness
window.onresize = function() {
  var searchButton = document.querySelector(".serach_nav");

  // Display the search button if the window width is greater than a certain threshold (e.g., 600px)
  if (window.innerWidth > 600) {
      searchButton.style.display = "inline-block";
  } else {
      searchButton.style.display = "none";
  }
};


