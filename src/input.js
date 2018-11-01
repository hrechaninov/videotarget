export class Input{
	constructor({name: name = "", label: label = null, input: input = null, container: container = null}){
		this._name = name;
		this._label = label;
		this._input = input;
		this._container = container;

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
	}
	unfocus(){
		if(this._label){
			this._label.classList.remove("focused");
		}
	}
	isOk(){
		if(this.value.length < 1){
			console.log(`${this._name} is not ok`);
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
	}
	validInput(){
		if(this._input){
			this._input.classList.remove("invalid");
		}
		if(this._container){
			this._container.classList.remove("invalid");
		}
	}
	setEventListeners(){
		this._input.addEventListener("focus", this.focus.bind(this));
		this._input.addEventListener("blur", this.unfocus.bind(this));
	}
}
export class EmailInput extends Input{
	constructor({name: name = "", label: label = null, input: input = null, container: container = null}){
		super({name: name, label: label, input: input, container: container});
		this._check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}
	isOk(){
		if(!this._check.test(this.value)){
			console.log(`${this._name} is not ok`);
			console.log(this._container);
			this.invalidInput();
			return false;
		}
		this.validInput();
		return true;
	}
}