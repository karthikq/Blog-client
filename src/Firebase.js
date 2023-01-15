/** @format */

import { initializeApp } from "firebase/app";

// Get a reference to the storage service, which is used to create references in your storage bucket
const firebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBmN-ZcaVanZHz7M9lkB43YephmUtIWJMg",
    authDomain: "reacttest-c067b.firebaseapp.com",
    projectId: "reacttest-c067b",
    storageBucket: "reacttest-c067b.appspot.com",
    messagingSenderId: "463517770405",
    appId: "1:463517770405:web:384ef6983458f07735e34c",
  };

  const app = initializeApp(firebaseConfig);
  return app;
};
export default firebaseApp;
