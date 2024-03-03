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
    user.photoURL = user.photoURL
    const submitButton = document.getElementById("Submit_button");
    submitButton.addEventListener("click", () => addpost(user));
  } else {
    if (confirm("first login than write a question")) {
      window.location.href = "./logi.html"
    }
  }
});

const subjectSelect = document.querySelector(".subjectSelect");
const textarea = document.querySelector(".textarea");

function addpost(user) {

  const subject = subjectSelect.value;
  const question = textarea.value;
  const email = user.email;
  const id = Math.floor(Math.random() * 10000);

  const currentDate = new Date();

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  if (subject && question) {
    var selectedFile = input_file.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageSrc = e.target.result;

        // Save imageSrc value in the database
        saveToDatabase(subject, id, subject, question, email, formattedDate, imageSrc);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      // If no image selected, save without an image
      saveToDatabase(subject, id, subject, question, email, formattedDate, "");
    }
  } else {
    alert("Please select a subject and provide a question");
  }
}

function saveToDatabase(subject, id, subject1, question, email, formattedDate, imageSrc) {
  // Assuming your database structure supports this path
  const user = getAuth().currentUser;
  set(ref(db, 'question_searching/' + question), {
    subject: subject,
    question: question,
    email: email,
    date: formattedDate,
    question_image: imageSrc,
    id: id,
    uid: user.uid
  })
  set(ref(db, 'question/' + `${subject1}/` + id), {
    subject: subject,
    question: question,
    email: email,
    date: formattedDate,
    question_image: imageSrc,
  })
    .then(() => {
      alert("Question submitted successfully!");
      subjectSelect.value = "";
      textarea.value = "";
      selectedFile = "";
      closeButton_image.style.display = "none";
      question_picture1.style.display = "none";
      selectedFile = null;
      input_file.value = null;
      setTimeout(() => {
        window.location.href = "./main_program/home.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Error saving question to database:", error);
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.getElementById("closeButton");
  const anchorElement = closeButton.querySelector("a");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      anchorElement.href = "./main_program/home.html";
    } else {
      anchorElement.href = "../index.html";
    }
  });
});


var input_file = document.getElementById("input_file");
const closeButton_image = document.getElementById("closeButton_image");
let selectedFile = null;

closeButton_image.addEventListener("click", function () {

  closeButton_image.style.display = "none"
  question_picture1.style.display = "none"
  selectedFile = null;

  input_file.value = null;
})

var question_picture1 = document.getElementById("question_picture1");
question_picture1.src = "";

input_file.addEventListener("change", function () {
  selectedFile = input_file.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      question_picture1.src = e.target.result;
      console.log(question_picture1.src);
    };

    closeButton_image.style.display = "block";
    question_picture1.style.display = "block";

    reader.readAsDataURL(selectedFile);
    console.log(selectedFile);
  }
});

