// auth.js

const db = firebase.firestore();

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");


// ====================
// SIGNUP
// ====================

async function signup() {

  const phone =
    document.getElementById("signupPhone").value.trim();

  const name =
    document.getElementById("signupName").value.trim();

  const address =
    document.getElementById("signupAddress").value.trim();

  if (!phone || !name || !address) {

    alert("Please fill all fields");
    return;

  }

  try {

    const existing =
      await db
      .collection("users")
      .doc(phone)
      .get();

    if (existing.exists) {

      alert("Phone number already registered.");
      return;

    }

    await db
      .collection("users")
      .doc(phone)
      .set({

        phone,
        name,
        address,

        createdAt:
          firebase.firestore.FieldValue.serverTimestamp()

      });

    localStorage.setItem(
      "kzUser",
      JSON.stringify({
        phone,
        name,
        address
      })
    );

    alert("Account Created");

    window.location.href =
      "index.html";

  }

  catch (err) {

    console.error(err);

    alert("Signup failed");

  }

}


// ====================
// LOGIN
// ====================

async function login() {

  const phone =
    document.getElementById("loginPhone").value.trim();

  if (!phone) {

    alert("Enter Phone Number");
    return;

  }

  try {

    const doc =
      await db
      .collection("users")
      .doc(phone)
      .get();

    if (!doc.exists) {

      alert("Account not found");
      return;

    }

    const user = doc.data();

    localStorage.setItem(
      "kzUser",
      JSON.stringify(user)
    );

    alert(
      "Welcome back " +
      user.name
    );

    window.location.href =
      "index.html";

  }

  catch (err) {

    console.error(err);

    alert("Login failed");

  }

}


// ====================
// AUTO LOGIN
// ====================

const existingUser =
  localStorage.getItem("kzUser");

if (existingUser) {

  window.location.href =
    "index.html";

}


// ====================
// EVENTS
// ====================

document
  .getElementById("signupBtn")
  ?.addEventListener(
    "click",
    signup
  );

document
  .getElementById("loginBtn")
  ?.addEventListener(
    "click",
    login
  );
