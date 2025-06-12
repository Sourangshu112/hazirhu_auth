// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
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



const signUp = document.getElementById("spin1");
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const fullName = document.getElementById("fullname").value;
  const phoneNo = document.getElementById("phoneno").value;
  const password = document.getElementById("mpassword").value;
  const cpassword = document.getElementById("cpassword").value;
  if (password == cpassword) {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          name: fullName,
          phone: phoneNo
        };
        alert("Account created successfully");
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = "./index.html";
          })
          .catch((error) => {
            console.error("error writing document", error);
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if ((errorCode == "auth/email-already-in-use")) {
          alert("email address already exists");
        } else {
          alert("unable to create user");
        }
        alert(errorCode);
      });
  } else {
    alert("Password and confirm password does not match!!");
  }
});
