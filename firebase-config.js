// ========================================
// KUROZENAKU FIREBASE CONFIG
// ========================================

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyByLURDPjEbLepc3Wz3O1MAYYLXSeu04Zg",
  authDomain: "kurozenaku-gundam-store.firebaseapp.com",
  projectId: "kurozenaku-gundam-store"
};

// Prevent duplicate initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase Services
const db = firebase.firestore();
const auth = firebase.auth();

// Google Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Global Helper
window.kzFirebase = {
  db,
  auth,
  googleProvider
};

console.log("KUROZENAKU Firebase Loaded");
