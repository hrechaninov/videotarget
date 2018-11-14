import {Input, EmailInput} from "./input.js";

export class Form{
	constructor({name, element}){
		const nameInputConfig = {
			name: "nameInput",
			label: element.querySelector(".name-input-label"),
			input: element.querySelector(".name-input"),
			container: element.querySelector(".name-input-container")
		};
		const emailInputConfig = {
			name: "emailInput",
			label: element.querySelector(".email-input-label"),
			input: element.querySelector(".email-input"),
			container: element.querySelector(".email-input-container")
		};
		const phoneNumberInputConfig = {
			name: "phoneNumberInput",
			label: element.querySelector(".phone-number-input-label"),
			input: element.querySelector(".phone-number-input"),
			container: element.querySelector(".phone-number-input-container")
		};

		this._name = name;
		this._nameInput = new Input(nameInputConfig);
		this._emailInput = new EmailInput(emailInputConfig);
		this._phoneNumberInput = new Input(phoneNumberInputConfig);
		this._submitButton = element.querySelector(".submit-button");

		this.setEventListeners();
	}
	set dataBase(db){
		this._db = db;
	}
	setEventListeners(){
		this._submitButton.addEventListener("click", e => {
			e.preventDefault();

			const date = new Date();
			const popUpId = e.currentTarget.dataset.target;
			const inputsOk = [
				this._nameInput.isOk(),
				this._emailInput.isOk(),
				this._phoneNumberInput.isOk()
			].every(check => check === true);

			if(!inputsOk){
				console.log("impropper inputs");
				return;
			}
			if(!this._db){
				console.log("database is not attached, can`t send :(");
				return;
			}

			this._db.collection("contacts").add({
				type: this._name,
				name: this._nameInput.value,
				email: this._emailInput.value,
				phoneNumber: this._phoneNumberInput.value,
				date: date
			});
			document.getElementById(popUpId).classList.remove("pop-up_hidden");
			console.log("added");
		});
	}
}