import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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
const dp = getFirestore(app);


onAuthStateChanged(auth, (user) => {
  const userProfileImg = document.getElementById("user-profile-img");
  const userDocRef = doc(dp, "user_information", user.uid);
  getDoc(userDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        user.displayName = userData.Name;
      } else {
        console.log("Document does not exist");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
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
  "Engineering & Technology",
  "Others"
]; const shuffledSubjects = shuffleArray(optionValues);


const selectedSubjects = shuffledSubjects.slice(0, 10);



const container = document.querySelector('.tranding_question_container');
container.innerHTML = '';


const heading = document.createElement('h2');
heading.className = 'tranding_question_heading';
heading.textContent = 'Tranding Questions';
container.appendChild(heading);

let displayedQuestions = 0;


for (const subject of selectedSubjects) {

  if (displayedQuestions >= 10) {
    break;
  }


  const yourDataRef = ref(database, 'question/' + subject);


  get(yourDataRef)
    .then(snapshot => {

      const data = snapshot.val();


      if (data) {

        const questionKeys = Object.keys(data);


        const shuffledKeys = shuffleArray(questionKeys);


        const selectedQuestions = Array.from(new Set(shuffledKeys.slice(0, 10)));


        selectedQuestions.forEach((questionKey, index) => {

          if (displayedQuestions >= 10) {
            return;
          }

          const { question, subject } = data[questionKey];


          const questionDiv = document.createElement('div');
          questionDiv.className = 'div_qu';


          const h3 = document.createElement('h3');
          h3.className = `tranding_question_${index + 1}`;
          h3.textContent = question;


          const link = document.createElement('a');
          link.href = `./post.html?subject=${encodeURIComponent(subject)}`;
          link.className = 'subject_selection';
          link.innerHTML = `<i class="ri-arrow-up-line Arrow_top_related"></i>`;

          if (index < 9) {
            container.appendChild(document.createElement('hr'));
          }
          questionDiv.appendChild(h3);
          questionDiv.appendChild(link);


          container.appendChild(questionDiv);




          displayedQuestions++;
        });
      }
    })
    .catch(error => {
      console.error(`Error retrieving data for subject ${subject}:`, error);
    });
}


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
    event.stopPropagation();


    userProfile.classList.toggle('show-dropdown');
  });

  document.addEventListener('click', function (event) {
    if (!userProfile.contains(event.target) && !profileDropdown.contains(event.target)) {
      userProfile.classList.remove('show-dropdown');
    }
  });
});




const logoutButton = document.getElementById('logoutButton');


logoutButton.addEventListener('click', async function () {
  const userConfirmation = confirm("Are you sure you want to log out?");


  if (userConfirmation) {
    try {
      await signOut(auth);
      console.log('User logged out');
      window.location.href = '../../index.html';
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


window.onresize = function () {
  var searchButton = document.querySelector(".serach_nav");


  if (window.innerWidth > 8000) {
    searchButton.style.display = "inline-block";
  } else {
    searchButton.style.display = "none";
  }
};
const question_input = document.getElementById("question_input");
const suggestionsDropdown = document.getElementById("suggestionsDropdown");

const loader = document.querySelector(".loader");

question_input.addEventListener("input", function () {
  const yourDataRef = ref(database, 'question_searching/');

  // Show loader before fetching data
  loader.classList.remove("loader--hidden");

  get(yourDataRef)
    .then(snapshot => {
      const data = snapshot.val();

      suggestionsDropdown.innerHTML = '';

      if (question_input.value.trim() !== '' && data) {
        let foundSuggestions = false;

        Object.keys(data).forEach(key => {
          if (key.toLowerCase().includes(question_input.value.toLowerCase())) {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = key;

            suggestionItem.addEventListener('click', function () {
              displayData(data[key]);
            });

            suggestionsDropdown.appendChild(suggestionItem);
            foundSuggestions = true;
          }
        });

        if (!foundSuggestions) {
          const notFoundMessage = document.createElement('div');
          notFoundMessage.textContent = 'Not Found';
          notFoundMessage.id = 'notFoundMessage';
          suggestionsDropdown.appendChild(notFoundMessage);
        }

        suggestionsDropdown.style.display = 'block';
      } else {
        suggestionsDropdown.style.display = 'none';
      }

      // Hide loader after data is fetched
      loader.classList.add("loader--hidden");
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      // Hide loader on error
      loader.classList.add("loader--hidden");
    });
});

  function displayData(data) {
    localStorage.setItem('subject', data.subject);
    localStorage.setItem('key', data.id);
    localStorage.setItem('userid', data.uid);
    const queryString1 = "searching.html";
    window.location.href = queryString1;
  }






