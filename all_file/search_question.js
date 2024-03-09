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



let anchorElement; // Declare anchorElement outside the onAuthStateChanged function

onAuthStateChanged(auth, (user) => {
    const closeButton = document.getElementById("closeButton");
    anchorElement = closeButton.querySelector("a");

    if (user) {
        console.log(user);
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

    if (true) {
        anchorElement.href = "./main_program/home.html";
    }
}

  const question_input = document.getElementById("question_input");
  const suggestionsDropdown = document.getElementById("suggestionsDropdown");

  question_input.addEventListener("input", function () {
    const yourDataRef = ref(database, 'question_searching/');

    get(yourDataRef).then(snapshot => {
      const data = snapshot.val();

      suggestionsDropdown.innerHTML = '';

      if (question_input.value.trim() !== '' && data) {
        let foundSuggestions = false;

        Object.keys(data).forEach(key => {
          if (key.includes(question_input.value)) {
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
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  });

  function displayData(data) {
    localStorage.setItem('subject', data.subject);
    localStorage.setItem('key', data.id);
    localStorage.setItem('userid', data.uid);
    const queryString1 = "./main_program/searching.html";
    window.location.href = queryString1;
  }
