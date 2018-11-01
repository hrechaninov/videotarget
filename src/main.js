import {Input, EmailInput} from "./input.js";
const firebase = require("firebase/app");
require("firebase/firestore");

window.onload = function(){
	const nameInputConfig = {
		name: "nameInput",
		label: document.getElementById("name-input-label"),
		input: document.getElementById("name-input"),
		container: document.getElementById("name-input-container")
	};
	const emailInputConfig = {
		name: "emailInput",
		label: document.getElementById("email-input-label"),
		input: document.getElementById("email-input"),
		container: document.getElementById("email-input-container")
	};
	const phoneNumberInputConfig = {
		name: "phoneNumberInput",
		label: document.getElementById("phone-number-input-label"),
		input: document.getElementById("phone-number-input"),
		container: document.getElementById("phone-number-input-container")
	};
	const submitButton = document.getElementById("submit-button");

	const nameInput = new Input(nameInputConfig);
	const emailInput = new EmailInput(emailInputConfig);
	const phoneNumberInput = new Input(phoneNumberInputConfig);

	const db = firebase.firestore();
	db.settings({
		timestampsInSnapshots: true
	});

	submitButton.addEventListener("click", e => {
		e.preventDefault();
		const date = new Date();
		const inputsOk = [
			nameInput.isOk(),
			emailInput.isOk(),
			phoneNumberInput.isOk()
		].every(check => check === true);

		if(!inputsOk) return;

		db.collection("contacts").add({
			name: nameInput.value,
			email: emailInput.value,
			phoneNumber: phoneNumberInput.value,
			date: date
		});
		console.log("added");
	});
}

var config = {
	apiKey: "AIzaSyB-IAMODUWun1yPADCHMrIIRkJwkLY7Qf4",
	authDomain: "video-target.firebaseapp.com",
	databaseURL: "https://video-target.firebaseio.com",
	projectId: "video-target",
	storageBucket: "",
	messagingSenderId: "88038667361"
};

firebase.initializeApp(config);