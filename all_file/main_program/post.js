import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
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


                    const userCollectionRef = collection(db, "user_information");
                    let user_name = "Unknown";
                    let user_img = ""
                    getDocs(userCollectionRef)
                        .then((querySnapshot) => {
                            for (const key in data) {
                                var { email, question, subject, date } = data[key];

                                let isMatched = false;

                                querySnapshot.forEach((doc) => {
                                    const userData = doc.data();
                                    if (userData.email === email) {
                                        user_name = userData.Name;
                                        user_img = userData.profilePictureURL
                                        // console.log("Document ID:", doc.id, " => ", userData.profilePictureURL, user_name , user_img);
                                        isMatched = true;
                                    }
                                });

                                if (!isMatched) {
                                    console.log("No matching document found for email:", email);
                                }

                                // Now you can use user_name here

                                // console.log(email, user_name, user_img)

                                html += `
                                <div class="post">
                                <div class="post_head_main">
                                <div class="post_head">
                                <div class="post_img"><img src="${user_img}" class="post_img1" ></div>
                                <div class="post_info">
                                <h1 class="h1_post">${user_name}</h1>
                                <h2 class="h2_post">${email}</h2></div>
                                </div>
                                <h3 class="h3_post">${date}</h3>
                                </div>
                                
                                <hr id="hr_pre">
                                <p class="p_post">
               
                                     ${question}
                                 </p>
                                <div class="answerSection" data-key="${key}" id="answerSection" style="display: none; " >
                                <input type="text" class="answerInput" id="answerInput" data-key="${key}" placeholder="Your answer" required>
                                <button type="button" class="submitButton" id="button_post" data-key="${key}" >Submit</button></div>
                                 <div class="check_answer" data-key="${key}" id="check_answer" style="display: none; " >
                                </div>
                                <hr class="hr_post">
                                <div id="buttonSection">
                                 <button type="button" class="anserw_post" id="button_post" data-key="${key}">Comment</button>
                                 <button type="button" class="anserw_post1" id="button_post" data-key="${key}">Answer</button>
                                 </div>
                                </div>`

                            }

                            container.innerHTML = html;

                            container.addEventListener('click', function (event) {
                                const target = event.target;

                                if (target.classList.contains('anserw_post1')) {
                                    const key = target.getAttribute('data-key');
                                    fetchAndDisplayAnswers(subjectValue, key);
                                }
                            });


                            container.addEventListener('click', function (event) {
                                const target = event.target;

                                if (target.classList.contains('anserw_post')) {
                                    const key = target.getAttribute('data-key');
                                    const answerSection = document.querySelector(`.answerSection[data-key="${key}"]`);
                                    const checkAnswerDiv = document.querySelector(`.check_answer[data-key="${key}"]`);
                                    answerSection.style.display = (answerSection.style.display === 'none') ? 'block' : 'none';
                                    checkAnswerDiv.style.display = 'none';

                                } else if (target.classList.contains('submitButton')) {
                                    const key = target.closest('.post').querySelector('.anserw_post').getAttribute('data-key');

                                }
                            });


                            const buttons_answer = document.querySelectorAll(".submitButton");
                            buttons_answer.forEach((button) => {
                                button.addEventListener("click", function (event) {
                                    update1(event, subjectValue);
                                });
                            });

                        })

                        .catch(error => {
                            console.error('Error retrieving data:', error);
                        });
                });
        }
    } else {

    }

})

function update1(event, subject) {
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
        const id = Math.floor(Math.random() * 1000);

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

        onAuthStateChanged(auth, (user) => {
            if (user) {
                update(ref(database, 'question/' + `${subject}/` + `${key}/` + `answer/${id}`), {
                    answer: inputValues[0],
                    email: user.email,
                    date: formattedDate,
                    likes: 0,
                    unlikes: 0
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

function fetchAndDisplayAnswers(subject, key) {
    const yourDataRef1 = ref(database, `question/${subject}/${key}/answer/`);
    get(yourDataRef1)
        .then((snapshot) => {
            const data2 = snapshot.val();

            if (data2) {
                let html1 = "";
                const checkAnswerDiv = document.querySelector(`.check_answer[data-key="${key}"]`);
                const answerSection = document.querySelector(`.answerSection[data-key="${key}"]`);
                const userCollectionRef = collection(db, "user_information");

                getDocs(userCollectionRef)
                    .then((querySnapshot) => {
                        let likes = 0, dislikes = 0;

                        for (var key1 in data2) {
                            (function (key1) {
                                const { email, answer, date } = data2[key1];
                                console.log(key1)

                                const yourDataRef2 = ref(database, `question/${subject}/${key}/answer/${key1}/`);

                                get(yourDataRef2)
                                    .then((snapshot) => {
                                        const data3 = snapshot.val();
                                        console.log(data3);

                                        const answerPost = document.querySelector(`.answer_post[data-key="${key1}"]`);
                                        const dislikeCount = answerPost.querySelector(".dislike_count");
                                        const likesCount = answerPost.querySelector(".likes_count");
                                        console.log(key1)

                                        likes = data3.likes;
                                        dislikes = data3.unlikes;
                                        likesCount.textContent = likes;
                                        dislikeCount.textContent = dislikes;
                                    })
                                    .catch((error) => {
                                        console.error('Error retrieving data for answer:', error);
                                    });

                                let isMatched = false;
                                let user_name = "Unknown";
                                let user_img = "";

                                querySnapshot.forEach((doc) => {
                                    const userData = doc.data();
                                    if (userData.email === email) {
                                        user_name = userData.Name;
                                        user_img = userData.profilePictureURL;
                                        isMatched = true;
                                    }
                                });

                                if (!isMatched) {
                                    console.log("No matching document found for email:", email);
                                }

                                html1 += `<div class="answer_post" data-key="${key1}" id="answer_post">
                                <div class="post_head_main">
                                    <div class="post_head">
                                        <div class="post_img"><img src="${user_img}" class="post_img1" ></div>
                                        <div class="post_info">
                                            <h1 class="h1_post_check">${user_name}</h1>
                                            <h2 class="h2_post_check">${email}</h2>
                                        </div>
                                    </div>
                                    <h3 class="h3_post_check">${date}</h3>
                                </div>
                                <hr id="hr_pre">
                                <p class="p_post">${answer}</p>
                                <hr>
                                <div class="like_dis_div">
                                    <div class="like_div">
                                        <i class="ri-thumb-up-fill likeIcon" id="likeIcon" data-key="${key1}"></i>
                                        <h4 class="likes_count">0</h4>
                                    </div>
                                    <hr style="border-left: 1px solid rgb(48, 48, 48); height: 10px; margin: 0; padding: 0;">
                                    <div class="dislike_div">
                                        <i class="ri-thumb-down-fill dislikeIcon" id="dislikeIcon" data-key="${key1}"></i>
                                        <h4 class="dislike_count">0</h4>
                                    </div>
                                </div>
                            </div>`;

                                var like_ref = ref(database, `question/${subject}/${key}/answer/${key1}/like`);
                                var dislike_ref = ref(database, `question/${subject}/${key}/answer/${key1}/dislike`);
                                const user = getAuth().currentUser;

                                get(like_ref)
                                    .then((snapshot) => {
                                        const data2 = snapshot.val();
                                        if (user && data2 && data2.like_email === user.email) {
                                            const likeIcon = document.querySelector(".likeIcon");
                                            likeIcon.classList.toggle('liked');
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error retrieving dislike data:', error);
                                    });
                                get(dislike_ref)
                                    .then((snapshot) => {
                                        const data2 = snapshot.val();
                                        if (user && data2 && data2.dislike_email === user.email) {
                                            const likeIcon = document.querySelector(".dislikeIcon");
                                            likeIcon.classList.toggle('disliked');
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error retrieving dislike data:', error);
                                    });
                            })(key1);
                        }

                        // Append the generated HTML inside the check_answer div
                        checkAnswerDiv.innerHTML = html1;
                        // Show the check_answer div
                        if (checkAnswerDiv.style.display === 'none') {
                            checkAnswerDiv.style.display = 'flex';
                            checkAnswerDiv.style.justifyContent = 'center';
                            checkAnswerDiv.style.alignItems = 'center';
                            checkAnswerDiv.style.flexDirection = 'column';
                        } else {
                            checkAnswerDiv.style.display = 'none';
                        }

                        const answerPosts = document.querySelectorAll(`.answer_post`);
                        const user = getAuth().currentUser;
                        // Optionally, hide the answerSection
                        answerSection.style.display = 'none';

                        answerPosts.forEach((answerPost) => {
                            const likeIcon = answerPost.querySelector(".likeIcon");
                            const dislikeIcon = answerPost.querySelector(".dislikeIcon");
                            const likesCount = answerPost.querySelector(".likes_count");
                            const dislikeCount = answerPost.querySelector(".dislike_count");
                            let key12 = answerPost.getAttribute("data-key");

                            var like_ref = ref(database, `question/${subject}/${key}/answer/${key12}/like`);
                            var dislike_ref = ref(database, `question/${subject}/${key}/answer/${key12}/dislike`);
                            likeIcon.addEventListener("click", function () {
                                if (likeIcon.classList.contains('liked')) {
                                    likes--;
                                    console.log("likes--")

                                    get(like_ref)
                                        .then((snapshot) => {
                                            const data2 = snapshot.val();
                                            if (user && data2 && data2.like_email === user.email) {
                                                update(like_ref, { like_email: null });
                                            }
                                        })
                                        .catch((error) => {
                                            console.error('Error retrieving dislike data:', error);
                                        });

                                } else {
                                    likes++;
                                    console.log("likes++")
                                    set(like_ref, {
                                        like_email: `${user.email}`
                                    });

                                    if (dislikeIcon.classList.contains('disliked')) {
                                        dislikes--;
                                        console.log("dislikes-z1-")

                                        get(dislike_ref)
                                            .then((snapshot) => {
                                                const data2 = snapshot.val();
                                                if (user && data2 && data2.dislike_email === user.email) {
                                                    update(dislike_ref, { dislike_email: null });
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('Error retrieving dislike data:', error);
                                            });
                                    }
                                }

                                likeIcon.classList.toggle('liked');
                                dislikeIcon.classList.remove('disliked');

                                likesCount.textContent = likes;
                                dislikeCount.textContent = dislikes;

                                update(ref(database, `question/${subject}/${key}/answer/${key12}`), {
                                    likes: likes,
                                    unlikes: dislikes
                                });


                            });

                            dislikeIcon.addEventListener("click", function () {
                                if (dislikeIcon.classList.contains('disliked')) {
                                    dislikes--;
                                    console.log("dislikes--")
                                    get(dislike_ref)
                                        .then((snapshot) => {
                                            const data2 = snapshot.val();
                                            if (user && data2 && data2.dislike_email === user.email) {
                                                update(dislike_ref, { dislike_email: null });
                                            }
                                        })
                                        .catch((error) => {
                                            console.error('Error retrieving dislike data:', error);
                                        });
                                } else {
                                    dislikes++;
                                    console.log("dislikes++")
                                    set(dislike_ref, {
                                        dislike_email: `${user.email}`
                                    });


                                    if (likeIcon.classList.contains('liked')) {
                                        likes--;
                                        console.log("likes-z1-")
                                        get(like_ref)
                                            .then((snapshot) => {
                                                const data2 = snapshot.val();
                                                if (user && data2 && data2.like_email === user.email) {
                                                    update(like_ref, { like_email: null });
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('Error retrieving dislike data:', error);
                                            });
                                    }
                                }

                                dislikeIcon.classList.toggle('disliked');
                                likeIcon.classList.remove('liked');

                                likesCount.textContent = likes;
                                dislikeCount.textContent = dislikes;

                                update(ref(database, `question/${subject}/${key}/answer/${key12}`), {
                                    likes: likes,
                                    unlikes: dislikes
                                });




                            });
                        });
                    })
                    .catch((error) => {
                        console.error('Error retrieving user data:', error);
                    });
            } else {
                alert("No Answer available.");
            }
        })
        .catch((error) => {
            console.error('Error retrieving data:', error);
        });
}

// const dislikeRef = ref(database, `question/${subject}/${key}/answer/${key1}/dislike`);
//                                     get(dislikeRef)
//                                         .then((snapshot) => {
//                                             const data2 = snapshot.val();
//                                             if (user && data2 && data2.like_email === user.email) {
//                                                 // If the user has liked, remove the like_email
//                                                 update(dislikeRef, { like_email: null });
//                                             }
//                                         })
//                                         .catch((error) => {
//                                             console.error('Error retrieving dislike data:', error);
//                                         });
