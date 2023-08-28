// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA96HgdVjsxwCJrQ-MGUpzh6tvkB8d7Np0",
  authDomain: "carshare-91c1a.firebaseapp.com",
  projectId: "carshare-91c1a",
  storageBucket: "carshare-91c1a.appspot.com",
  messagingSenderId: "523125404608",
  appId: "1:523125404608:web:324cd134f2eb8e1ae70e25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const open = document.querySelector("#open-dialog");
const add = document.querySelector(".add-dialog");
const close = document.querySelector(".close-modal");
const db = getFirestore(app);
const table = document.querySelector(".car-table");

open.addEventListener("click", () => {
  add.showModal();
});

close.addEventListener("click", () => {
  add.close();
});

document.querySelector(".submit").addEventListener("click", async function () {
  const car = {
    day: document.querySelector(".day").value,
    time: document.querySelector(".time").value,
    AmPm: document.querySelector(".dn").value,
    useHour: document.querySelector(".useHour").value,
    state: document.querySelector(".state").value,
    place: document.querySelector(".place").value,
    date: new Date(),
  };

  await addDoc(collection(db, "share"), car);
  location.reload();
});

let template = `
<div class="car-shcedule">
  <div class="info">
  <span>Day : {{day}}</span>
  <span>Time : {{time}} {{day_night}}</span>
  <span>Use hour : {{use_hour}}</span>
  <span>State : {{state}}</span>
  <span>Place : {{place}}</span>
  </div>
</div>  
`;

const q = query(collection(db, "share"), orderBy("date"));
onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const newTable = document.createElement("div");
    template = template
      .replace("{{day}}", doc.data().day)
      .replace("{{time}}", doc.data().time)
      .replace("{{day_night}}", doc.data().AmPm)
      .replace("{{use_hour}}", doc.data().useHour)
      .replace("{{state}}", doc.data().state)
      .replace("{{place}}", doc.data().place);
    newTable.innerHTML = template;
    table.append(newTable);
    template = template
      .replace(doc.data().day, "{{day}")
      .replace(doc.data().time, "{{time}}")
      .replace(doc.data().AmPm, "{{day_night}}")
      .replace(doc.data().useHour, "{{use_hour}}")
      .replace(doc.data().state, "{{state}}")
      .replace(doc.data().place, "{{place}}");
  });
});
