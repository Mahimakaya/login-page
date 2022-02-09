import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';

const config = {
  apiKey: "AIzaSyCr2oZD6VnrC8Q6TN3qPyCgPkGrF9GZ6Tg",
  authDomain: "login-29d7d.firebaseapp.com",
  databaseURL: "https://login-29d7d-default-rtdb.firebaseio.com",
  projectId: "login-29d7d",
  storageBucket: "login-29d7d.appspot.com",
  messagingSenderId: "513724000986",
  appId: "1:513724000986:web:1b9cbd17c051ba270613e3",
  measurementId: "G-KMGZ57JBFE"
};

const app = initializeApp(config);
const auth = getAuth(app);
const database = getDatabase();

//login user
var loger = document.getElementById("login");

loger.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.getElementById("log_email").value;
  var password = document.getElementById("log_password").value;
  signInWithEmailAndPassword(auth, email, password).then(userCrendential => {
    var user = userCrendential.user;
    //alert("You are logged in!");
    //window.location.href = "welcome.html";
    document.getElementById("logged").style.display = "flex";
    document.getElementById("section").style.display = "none";
    document.getElementById("result").innerHTML = "Welcome " + " " + email;

  })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
      console.log(error_code);
    })
  // alert("You have registered!....Welcome"+ email);
});

//register user

var signer = document.getElementById("signup");
signer.addEventListener("click", (e) => {
  e.preventDefault();
  var name = document.getElementById("reg_name").value;
  var email = document.getElementById("reg_email").value;
  var password = document.getElementById("reg_password").value;
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    set(ref(database, 'users/' + user.uid), {
      username: name,
      email: email
    });
    /*var res = document.getElementById("result");
    res.innerHTML = name + " " + email;*/
    //document.getElementById("result").innerHTML = "Welcome " + name + " " + email;
    //window.location.href = "welcome.html";
    document.getElementById("logged").style.display = "flex";
    document.getElementById("section").style.display = "none";
    document.getElementById("result").innerHTML = "Welcome " + name + " " + email;
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

function check_email(email) {
  var exps = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //compare with email format
  if (exps.test(email) == true) {
    return true;
  }
  else {
    return false;
  }
}
function check_password(password) {
  if (password.length < 8) {
    return false;
  }
  else {
    return true;
  }
}
function check_inputs(input) {
  if (input == null) {
    return false;
  }
  if ((input.length) <= 0) {
    return false;
  }
  else {
    return true;
  }
}

//login and register divs
var logdiv = document.getElementById("a_1");
var regdiv = document.getElementById("a_2");

logdiv.addEventListener("click", (e) => {
  document.getElementById("log").style.display = "none";
  document.getElementById("register").style.display = "flex";
});
regdiv.addEventListener("click", (e) => {
  document.getElementById("log").style.display = "flex";
  document.getElementById("register").style.display = "none";
});