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




var subjectSelects = document.querySelectorAll('.subject_select');
var serch = document.getElementById('serch'); 
const subjectSelectionElements = document.querySelectorAll('.subject_selection');

const onLoad = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.uid);
      window.location.href = "./all_file/main_program/home.html";
    } else {
      alert("Please Login first ");
      console.log("Please Login first ");
    }
  });
};



subjectSelects.forEach((element) => {
  element.addEventListener('click', onLoad);
});

serch.addEventListener('click', onLoad)
onLoad()

window.onscroll = function () {
  // Get the navbar element
  var navbar = document.getElementById("nave_button");

  // Get the button element
  var searchButton = document.querySelector(".serach_nav");

  // Check if the user has scrolled down enough to make the navbar sticky
  if (window.pageYOffset >= navbar.offsetTop) {

    searchButton.style.display = "inline-block";
  } else {

    searchButton.style.display = "none";
  }
};


window.onresize = function () {
  var searchButton = document.querySelector(".serach_nav");

  if (window.innerWidth > 600) {
    searchButton.style.display = "inline-block";
  } else {
    searchButton.style.display = "none";
  }
};




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
];
const shuffledSubjects = shuffleArray(optionValues);


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
          link.className = 'subject_selection';
          link.innerHTML = `<i class="ri-arrow-up-line Arrow_top_related"></i>`;
          link.addEventListener('click', onLoad);

   
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

  userProfile && userProfile.addEventListener('click', function (event) {
    event.stopPropagation();


    userProfile.classList.toggle('show-dropdown');
  });

  document.addEventListener('click', function (event) {
    if (userProfile && !userProfile.contains(event.target) && !profileDropdown.contains(event.target)) {
      userProfile.classList.remove('show-dropdown');
    }
  });
});