export class Input{
	constructor({name: name = "", container: container = null, required: required = false}){
		this._name = name;
		this._container = container;
		this._label = container.querySelector(".input-label");
		this._input = container.querySelector(".input");
		this._errorMessage = container.querySelector(".error-message");
		this._required = required;

		this.setEventListeners();
	}
	get name(){
		return this._name;
	}
	get value(){
		if(this._input){
			return this._input.value;
		}
		else return "";
	}
	set value(str){
		if(this._input){
			this._input.value = str;
		}
	}
	focus(){
		if(this._label){
			this._label.classList.add("focused");
		}
		if(this._input && this._container){
			this._input.classList.remove("invalid");
			this._container.classList.remove("invalid");
			this._container.classList.add("focused");
		}
		this.validInput();
	}
	unfocus(){
		if(this._label && !this._input.value.length){
			this._label.classList.remove("focused");
		}
		if(this._container){
			this._container.classList.remove("focused");
		}
		this.isOk();
	}
	isOk(){
		if(this.value.length < 1 && this._required){
			this.invalidInput();
			return false;
		}
		this.validInput();
		return true;
	}
	invalidInput(){
		if(this._input){
			this._input.classList.add("invalid");
		}
		if(this._container){
			this._container.classList.add("invalid");
		}
		if(this._errorMessage){
			this._errorMessage.classList.remove("hidden");
		}
	}
	validInput(){
		if(this._input){
			this._input.classList.remove("invalid");
		}
		if(this._container){
			this._container.classList.remove("invalid");
		}
		if(this._errorMessage){
			this._errorMessage.classList.add("hidden");
		}
	}
	setEventListeners(){
		this._input.addEventListener("focus", this.focus.bind(this));
		this._input.addEventListener("blur", this.unfocus.bind(this));
	}
}
export class EmailInput extends Input{
	constructor({name: name = "", container: container = null}){
		super({name, container});
		this._check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}
	invalidInput(){
		if(this._input){
			this._input.classList.add("invalid");
		}
		if(this._container){
			this._container.classList.add("invalid");
		}
		if(this._errorMessage){
			if(this._input.value.length){
				this._errorMessage.innerHTML = "Неверный адрес";
			}
			else{
				this._errorMessage.innerHTML = "*Обязательное поле";
			}
			this._errorMessage.classList.remove("hidden");
		}
	}
	isOk(){
		if(!this._check.test(this.value)){
			this.invalidInput();
			return false;
		}
		this.validInput();
		return true;
	}
}