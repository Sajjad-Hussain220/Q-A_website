import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);


const onLoad = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
            alert("Please Login first ");

            window.location.href = "../../index.html";
        }
    });
};
onLoad();

document && document.addEventListener('DOMContentLoaded', function () {
    // Use the location.search directly
    var queryString = window.location.search;

    // Check if the queryString contains the 'subject' parameter
    if (queryString.includes('subject')) {
        // Create a URLSearchParams object
        var urlParams = new URLSearchParams(queryString);

        // Get the value of the 'subject' parameter
        var subjectValue = urlParams.get('subject');

        // Log or use the subject value as needed
        // console.log(subjectValue);
        // Display the subject value in the h2 tag
        var subjectTextElement = document.getElementById('subjectText');
        if (subjectTextElement) {
            subjectTextElement.textContent = subjectValue;

            // Define yourDataRef based on the path in your database
            var yourDataRef = ref(database, 'question/' + subjectValue);

            // Query the data for the specified subject 
            get(yourDataRef)
                .then(snapshot => {
                    // Process the retrieved data
                    const data = snapshot.val();
                    // console.log(data);
                    let html = "";
                    const container = document.querySelector('.main_post')
                    alert("please wait")

                    for (const key in data) {
                        var { email, question, subject } = data[key]



                        html += `
           <div class="post"> 
               <h2 class="h2_post">${email}</h2>
               <hr id="hr_pre">
               <p class="p_post">
               
                 ${question}
               </p>
               <div class="answerSection" data-key="${key}" id="answerSection" style="display: none; " >
               <input type="text" class="answerInput" id="answerInput" data-key="${key}" placeholder="Your answer" required>
               <button type="button" class="submitButton" id="button_post" data-key="${key}" >Submit</button></div>
               <hr class="hr_post">
               <div id="buttonSection">
                <button type="button" class="anserw_post" id="button_post" data-key="${key}">Comment</button>
                <button type="button" class="anserw_post1" id="button_post" data-key="${key}">Answer</button>
               </div>
            </div>
                `

                    }

                    container.innerHTML = html;

                    container.addEventListener('click', function (event) {
                        const target = event.target;

                        if (target.classList.contains('anserw_post1')) {
                            const key = target.getAttribute('data-key');


                            var yourDataRef1 = ref(database, 'question/' + `${subject}/` + `${key}/` + 'answer/');
                            get(yourDataRef1)
                                .then(snapshot => {
                                    const data2 = snapshot.val();

                                    if (data2) {
                                        alert("Please check answers in console");

                                        for (const key1 in data2) {
                                            var { email, answer } = data2[key1];
                                            console.log(`User: ${email}\nAnswer: ${answer}\n`);
                                        }
                                    } else {
                                        console.log("No Answer available.");
                                    }
                                })
                                .catch(error => {
                                    console.error('Error retrieving data:', error);
                                });

                        }
                    });







                    container.addEventListener('click', function (event) {
                        const target = event.target;

                        if (target.classList.contains('anserw_post')) {
                            const key = target.getAttribute('data-key');
                            const answerSection = document.querySelector(`.answerSection[data-key="${key}"]`);
                            answerSection.style.display = (answerSection.style.display === 'none') ? 'block' : 'none';
                        } else if (target.classList.contains('submitButton')) {
                            const key = target.closest('.post').querySelector('.anserw_post').getAttribute('data-key');

                        }
                    });



                    const buttons_answer = document.querySelectorAll(".submitButton");
                    buttons_answer.forEach((button) => {
                        button.addEventListener("click", update1);
                    });

                    function update1(event) {
                        const key = event.currentTarget.getAttribute("data-key");
                        const answerInputs = document.querySelectorAll(`.answerInput[data-key="${key}"]`);

                        // Create an array to store input values
                        const inputValues = [];

                        // Iterate over the NodeList and get the value of each input element
                        answerInputs.forEach((input) => {
                            inputValues.push(input.value);
                        });

                        const hasNonEmptyValue = inputValues.some(value => value.trim() !== '');

                        if (hasNonEmptyValue) {
                            // Display the values in the console
                            // console.log('Textbox Values:', inputValues);
                            const id = Math.floor(Math.random() * 100);

                            onAuthStateChanged(auth, (user) => {
                                if (user) {
                                    update(ref(database, 'question/' + `${subject}/` + `${key}/` + `answer/${id}`), {
                                        answer: inputValues[0],
                                        email: user.email,
                                    });

                                    alert("Answer submitted");

                                    // Loop through each input element and set its value to an empty string
                                    answerInputs.forEach((input) => {
                                        input.value = "";
                                    });

                                    const answerSection = document.querySelector(`.answerSection[data-key="${key}"]`);
                                    answerSection.style.display = (answerSection.style.display === 'block') ? 'none' : 'block';
                                } else {
                                    console.log("This answer is already");
                                }
                            });
                        } else {
                            alert("Please enter at least one value before submitting.");
                        }
                    }



                })

                .catch(error => {
                    console.error('Error retrieving data:', error);
                });
        } else {
            console.log('Element with id "subjectText" not found.');
        }
    } else {

    }

});
