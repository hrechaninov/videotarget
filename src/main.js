import { Form } from "./form.js";
const firebase = require("firebase/app");
require("firebase/firestore");

window.onload = function(){
	const db = firebase.firestore();
	const popUp = {
		attached: false
	};
	const formOwnConfig = {
		name: "Продажи со своего канала",
		element: document.querySelector("#form-own"),
		popUp: popUp
	};
	const formAdsConfig = {
		name: "Продажи с рекламы",
		element: document.querySelector("#form-ads"),
		popUp: popUp
	};
	const formOwn = new Form(formOwnConfig);
	const formAds = new Form(formAdsConfig);

	db.settings({
		timestampsInSnapshots: true
	});
	formOwn.dataBase = db;
	formAds.dataBase = db;

	document.getElementById("button-own").addEventListener("click", e => {
		scrollTo(document.getElementById("section-own"));
	});
	document.getElementById("button-from-ads").addEventListener("click", e => {
		scrollTo(document.getElementById("section-ads"));
	});
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