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

const currentPageName = window.location.pathname.split("/").pop();

const onLoad = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.uid);
        window.location.href = "./all_file/main_program/home.html"
      } else {
        alert("Please Login first ");
        console.log("Please Login first ");
        
      }
  });
};
onLoad(); 



window.onscroll = function () {
    // Get the navbar element
    var navbar = document.getElementById("nave_button");

    // Get the button element
    var searchButton = document.querySelector(".serach_nav");

    // Check if the user has scrolled down enough to make the navbar sticky
    if (window.pageYOffset >= navbar.offsetTop) {
        // If scrolled down, display the search button
        searchButton.style.display = "inline-block";
    } else {
        // If at the top, hide the search button
        searchButton.style.display = "none";
    }
};

// Handle window resize for responsiveness
window.onresize = function () {
    var searchButton = document.querySelector(".serach_nav");

    // Display the search button if the window width is greater than a certain threshold (e.g., 600px)
    if (window.innerWidth > 600) {
        searchButton.style.display = "inline-block";
    } else {
        searchButton.style.display = "none";
    }
};
