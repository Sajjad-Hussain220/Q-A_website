import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
    const submitButton = document.getElementById("Submit_button");
    submitButton.addEventListener("click", () => addpost(user));
  } else {
    if(confirm("first login than write a question"))
    {
      window.location.href = "./logi.html" 
    }
  }
});

function addpost(user) {
  const subjectSelect = document.querySelector(".subjectSelect");
  const textarea = document.querySelector(".textarea");

  const subject = subjectSelect.value;
  const question = textarea.value;
  const email = user.email;
  const id = Math.floor(Math.random()*100)


  if (subject && question) {

   
     set(ref(db, 'question/'+ `${subject}/`+ id ), {
      subject: subject,
      question: question,
      email: email,
    });
    alert("Question submitted successfully!");
    // window.location.href = "./main_program/home.html";
    subjectSelect.value = "";
    textarea.value = "";
  } else {
    alert("Please select a subject and provide a question");
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.getElementById("closeButton");
  const anchorElement = closeButton.querySelector("a");

  onAuthStateChanged(auth, (user) => {
    if (user) {
  
   
      anchorElement.href = "./main_program/home.html";
    } else {
      // User is not logged in
// alert("User is not logged in");
      anchorElement.href = "../index.html";
    }
  });
});

