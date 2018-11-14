import { Form } from "./form.js";
const firebase = require("firebase/app");
require("firebase/firestore");

window.onload = function(){
	const db = firebase.firestore();
	const formOwnConfig = {
		name: "Продажи со своего канала",
		element: document.querySelector("#form-own")
	};
	const formAdsConfig = {
		name: "Продажи с рекламы",
		element: document.querySelector("#form-ads")
	};
	const formOwn = new Form(formOwnConfig);
	const formAds = new Form(formAdsConfig);
	const buttonOwn = document.getElementById("button-own");
	const buttonAds = document.getElementById("button-from-ads");
	const buttonsClosePopUp = document.querySelectorAll(".pop-up-close-button");
	const buttonsOpenPopUp = document.querySelectorAll(".pop-up-open-button");

	db.settings({
		timestampsInSnapshots: true
	});
	formOwn.dataBase = db;
	formAds.dataBase = db;

	buttonOwn.addEventListener("click", e => {
		scrollTo(document.getElementById("section-own"));
	});
	buttonAds.addEventListener("click", e => {
		scrollTo(document.getElementById("section-ads"));
	});
	buttonsClosePopUp.forEach(button => {
		button.addEventListener("click", closePopUp);
	});
	buttonsOpenPopUp.forEach(button => {
		button.addEventListener("click", openPopUp);
	});
}
function openPopUp(e){
	const popUpId = e.currentTarget.dataset.target;
	document.body.classList.add("no-overflow");
	document.getElementById(popUpId).classList.remove("pop-up_hidden");
}
function closePopUp(e){
	const popUp = e.currentTarget.parentNode;
	document.body.classList.remove("no-overflow");
	popUp.classList.add("pop-up_hidden");
}
function scrollTo(element){
	element.scrollIntoView({ 
		behavior: "smooth"
	});
}
var firebaseConfig = {
	apiKey: "AIzaSyB-IAMODUWun1yPADCHMrIIRkJwkLY7Qf4",
	authDomain: "video-target.firebaseapp.com",
	databaseURL: "https://video-target.firebaseio.com",
	projectId: "video-target",
	storageBucket: "",
	messagingSenderId: "88038667361"
};

firebase.initializeApp(firebaseConfig);