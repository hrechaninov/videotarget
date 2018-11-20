import {Input, EmailInput} from "./input.js";

export class Form{
	constructor({name, element}){
		const nameInputConfig = {
			name: "nameInput",
			required: true,
			container: element.querySelector(".name-input-container")
		};
		const emailInputConfig = {
			name: "emailInput",
			required: true,
			container: element.querySelector(".email-input-container")
		};
		const phoneNumberInputConfig = {
			name: "phoneNumberInput",
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
				return;
			}
			if(!this._db){
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
		});
	}
}