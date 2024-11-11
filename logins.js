import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCA2iX7UFmms-SA84wdXMVuU6InEiQ-jb0",
    authDomain: "authentication-96d41.firebaseapp.com",
    projectId: "authentication-96d41",
    storageBucket: "authentication-96d41.appspot.com",
    messagingSenderId: "1071415909905",
    appId: "1:1071415909905:web:1072cd27c68dfb98f55bb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get user input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //const userType = document.getElementById('userType').value;



    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');

        let userType = '';

        if (username === 'consumer' && password === 'consumer') {
            userType = 'consumer';
        } 
        else if (username === 'retailer' && password === 'retailer') {
            userType = 'retailer';
        }
        else if (username === 'farmer' && password === 'farmer') {
            userType = 'farmer';
        }
        else {
            alert('Invalid credentials');
            return;
        }
        
        // Redirect based on user type
        switch (userType) {
            case 'consumer':
                window.location.href = 'index.html';
                break;
            case 'farmer':
                window.location.href = 'farmer';
                break;
            case 'retailer':
                window.location.href = 'retailer.html'; // or another page specific to retailer
                break;
            default:
                alert('Unknown user type!');
                break;
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Function to set the user type
function setUserType(type) {
    document.getElementById('userType').value = type;
}
