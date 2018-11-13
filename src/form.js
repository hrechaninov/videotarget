import {Input, EmailInput} from "./input.js";

export class Form{
	constructor({name, element, popUp}){
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
		this._confirmationPopUp = document.querySelector("#confirmation-pop-up");
		this._confirmationPopUpButton = document.querySelector(".pop-up-close-button");

		this.setEventListeners(popUp);
	}
	set dataBase(db){
		this._db = db;
	}
	setEventListeners(popUp){
		this._submitButton.addEventListener("click", e => {
			e.preventDefault();

			const date = new Date();
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
			console.log("added");
			this._confirmationPopUp.classList.remove("pop-up_hidden");
		});
		
		if(popUp.attached) return;

		popUp.attached = true;
		this._confirmationPopUpButton.addEventListener("click", e => {
			this._confirmationPopUp.classList.add("pop-up_hidden");
		});
	}
}