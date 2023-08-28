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
const stateOpen = document.querySelector("#open-state");
const addState = document.querySelector(".add-state");
const closeState = document.querySelector(".close-state");
const placeOpen = document.querySelector("#open-place");
const addPlace = document.querySelector(".add-place");
const closePlace = document.querySelector(".close-place");
const close = document.querySelector(".close-modal");
const db = getFirestore(app);
const table = document.querySelector(".car-table");
const table2 = document.querySelector(".state-table");
const table3 = document.querySelector(".place-table");
const today = new Date();

open.addEventListener("click", () => {
  add.showModal();
});

close.addEventListener("click", () => {
  add.close();
});

stateOpen.addEventListener("click", () => {
  addState.showModal();
});

closeState.addEventListener("click", () => {
  addState.close();
});

placeOpen.addEventListener("click", () => {
  addPlace.showModal();
});

closePlace.addEventListener("click", () => {
  addPlace.close();
});

document.querySelector(".submit").addEventListener("click", async function () {
  const car = {
    day: document.querySelector(".day").value,
    time: document.querySelector(".time").value,
    AmPm: document.querySelector(".dn").value,
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  await addDoc(collection(db, "share"), car);
  location.reload();
});

document
  .querySelector(".submit-state")
  .addEventListener("click", async function () {
    const carState = {
      state: document.querySelector(".state").value,
      month: today.getMonth() + 1,
      date: today.getDate(),
    };

    await addDoc(collection(db, "state"), carState);
    location.reload();
  });

document
  .querySelector(".submit-place")
  .addEventListener("click", async function () {
    const carPlace = {
      place: document.querySelector(".place").value,
      month: today.getMonth() + 1,
      date: today.getDate(),
    };

    await addDoc(collection(db, "place"), carPlace);
    location.reload();
  });

let template = `
<div class="car-shcedule">
  <div class="info">
  <span>Day : {{day}}</span>
  <span>Time : {{time}} {{day_night}}</span>
  </div>
</div>  
`;

let template2 = `
<div class="car-state">
<div class="state-info">
<span>Date : {{month}} / {{date}}</span>
<span>State : {{state}}</span>
</div>
</div>
`;

let template3 = `
<div class="car-place">
<div class="place-info">
<span>Date : {{month}} / {{date}}</span>
<span> Place : {{place}} </span>
</div>
</div> `;

const shceduleQuery = query(collection(db, "share"), orderBy("date"));
onSnapshot(shceduleQuery, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const timeTable = document.createElement("div");
    template = template
      .replace("{{day}}", doc.data().day)
      .replace("{{time}}", doc.data().time)
      .replace("{{day_night}}", doc.data().AmPm);
    timeTable.innerHTML = template;
    table.append(timeTable);
    template = template
      .replace(doc.data().day, "{{day}}")
      .replace(doc.data().time, "{{time}}")
      .replace(doc.data().AmPm, "{{day_night}}");
  });
});

const stateQuery = query(collection(db, "state"), orderBy("date"));
onSnapshot(stateQuery, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const stateTable = document.createElement("div");
    template2 = template2
      .replace("{{month}}", doc.data().month)
      .replace("{{date}}", doc.data().date)
      .replace("{{state}}", doc.data().state);
    stateTable.innerHTML = template2;
    table2.append(stateTable);
    template2 = template2
      .replace(doc.data().month, "{{month}}")
      .replace(doc.data().date, "{{date}}")
      .replace(doc.data().state, "{{state}}");
  });
});

const placeQuery = query(collection(db, "place"), orderBy("date"));
onSnapshot(placeQuery, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const placeTable = document.createElement("div");
    template3 = template3
      .replace("{{month}}", doc.data().month)
      .replace("{{date}}", doc.data().date)
      .replace("{{place}}", doc.data().place);
    placeTable.innerHTML = template3;
    table3.append(placeTable);
    template3 = template3
      .replace(doc.data().month, "{{month}}")
      .replace(doc.data().date, "{{date}}")
      .replace(doc.data().place, "{{place}}");
  });
});
