import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDatabase, ref, get, update, set, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


// const displayQuery = document.getElementById("display_query");
var inputValue = getQueryParameter("query");
console.log(inputValue)


const onLoad = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            alert("ab tak es per kaam nhi kia");

        } else {
            alert("Please Login first ");

            window.location.href = "../../index.html";
        }
    });
};
onLoad();
// const yourDataRef = ref(database, 'question//' +  inputValue);
// const searchTerm = inputValue;




// const onLoad1 = async () => {
//     try {
//         // Create a reference to the 'question' node in the Realtime Database
//         const yourDataRef = ref(database, 'question/');

//         // Perform a query to find documents where the 'question' field matches the input
//         const queryRef = orderByChild(yourDataRef, 'question');
//         const querySnapshot = await get(queryRef, equalTo(searchTerm));

//         // Process the retrieved data
//         if (querySnapshot.exists()) {
//             const data = querySnapshot.val();
//             console.log(data);
//             // Display or process the data as needed
//         } else {
//             console.log('No data found for the given query.');
//             // Handle the case when no data is found
//         }
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//     }
// };

// onLoad1();