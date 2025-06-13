// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL5hvLC9E-txqASe28IOzVcIvq4ZqVYgo",
  authDomain: "hazirhu-auth.firebaseapp.com",
  projectId: "hazirhu-auth",
  storageBucket: "hazirhu-auth.firebasestorage.app",
  messagingSenderId: "818855360499",
  appId: "1:818855360499:web:2b0495e651a8d5acb3c486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signIn = document.getElementById("spin");
signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("rpassword").value;
  const auth = getAuth();
  //console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login is successfull");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "https://haazirhu-seva-hub.vercel.app/";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        alert("User does not exist.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Incorrect password.");
      } else if (errorCode === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert("Login failed: " + errorCode);
      }
    });
});
