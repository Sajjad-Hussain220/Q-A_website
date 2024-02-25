import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDatabase, ref, get, update, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGj208UqUvBJXUvDEsDeVgPTEcZxrIST4",
  authDomain: "q-a-database-bb349.firebaseapp.com",
  projectId: "q-a-database-bb349",
  storageBucket: "q-a-database-bb349.appspot.com",
  messagingSenderId: "1786902174",
  appId: "1:1786902174:web:c9287eaca141366d816d8f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
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

    window.location.href = "../../index.html";
  }
});


const optionValues = [
  "Programming",
  "Math",
  "Science",
  "History",
  "Business",
  "Social Studies",
  "Sports",
  "Hobbies",
  "Electronics",
  "Audio",
  "Travel & Places",
  "Books & Literature",
  "Food & Drink",
  "Jobs & Education",
  "Law & Government",
  "Arts & Entertainment",
  "Animals & Plants",
  "Engineering & Technology"
];const shuffledSubjects = shuffleArray(optionValues);

// Take the first 10 subjects from the shuffled array
const selectedSubjects = shuffledSubjects.slice(0, 10);
// console.log(selectedSubjects);

// Get a reference to the container
const container = document.querySelector('.tranding_question_container');
container.innerHTML = ''; // Clear existing content

// Create a heading for the list of trending questions
const heading = document.createElement('h2');
heading.className = 'tranding_question_heading';
heading.textContent = 'Tranding Questions';
container.appendChild(heading);

let displayedQuestions = 0;

// Loop through each subject in shuffledSubjects
for (const subject of selectedSubjects) {
  // Check if the total number of displayed questions has reached 10
  if (displayedQuestions >= 10) {
    break; // Exit the loop if 10 questions have been displayed
  }

  // Create a reference for each subject
  const yourDataRef = ref(database, 'question/' + subject);

  // Query data for the current subject
  get(yourDataRef)
    .then(snapshot => {
      // Process the retrieved data for the current subject
      const data = snapshot.val();

      // Check if there is data
      if (data) {
        // Get an array of all question keys under the current subject
        const questionKeys = Object.keys(data);

        // Shuffle the array randomly
        const shuffledKeys = shuffleArray(questionKeys);

        // Get the first 10 questions for the current subject, ensuring uniqueness
        const selectedQuestions = Array.from(new Set(shuffledKeys.slice(0, 10)));

        // Display the selected questions with links and structure
        selectedQuestions.forEach((questionKey, index) => {
          // Check if the total number of displayed questions has reached 10
          if (displayedQuestions >= 10) {
            return; // Exit the loop if 10 questions have been displayed
          }

          const { question, subject } = data[questionKey];

          // Create a div for each question with the specified structure
          const questionDiv = document.createElement('div');
          questionDiv.className = 'div_qu';

          // Create an h3 element for the question
          const h3 = document.createElement('h3');
          h3.className = `tranding_question_${index + 1}`;
          h3.textContent = question;

          // Create a link element for the arrow
          const link = document.createElement('a');
          link.href = `./post.html?subject=${encodeURIComponent(subject)}`; 
          link.className = 'subject_selection';
          link.innerHTML = `<i class="ri-arrow-up-line Arrow_top_related"></i>`;

          if (index < 9) {
            container.appendChild(document.createElement('hr'));
          }// Append the h3 and link elements to the questionDiv
          questionDiv.appendChild(h3);
          questionDiv.appendChild(link);

          // Append the questionDiv to the container
          container.appendChild(questionDiv);

      

          // Increment the counter for displayed questions
          displayedQuestions++;
        });
      }
    })
    .catch(error => {
      console.error(`Error retrieving data for subject ${subject}:`, error);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}










document.addEventListener("DOMContentLoaded", function () {
  var userProfile = document.querySelector('.user-profile');
  var profileDropdown = document.querySelector('.profile-dropdown');

  userProfile.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click event from reaching the document

    // Toggle the 'show-dropdown' class
    userProfile.classList.toggle('show-dropdown');
  });

  // Close the dropdown when clicking anywhere outside the profile area
  document.addEventListener('click', function (event) {
    if (!userProfile.contains(event.target) && !profileDropdown.contains(event.target)) {
      userProfile.classList.remove('show-dropdown');
    }
  });
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



window.onscroll = function () {
  var navbar = document.getElementById("nave_button");

  var searchButton = document.querySelector(".serach_nav");

  if (window.pageYOffset >= navbar.offsetTop) {
    searchButton.style.display = "inline-block";
  } else {
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


