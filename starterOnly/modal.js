function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalValidation = document.querySelector(".btn-close");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close");
const closeModalValidation = document.querySelector(".close-validation");
const formBtn = document.querySelector(".btn-submit");
const form = document.querySelector('form');
const firstName = document.querySelector("#first");
const first = document.querySelector(".first");
const lastName = document.querySelector("#last");
const last = document.querySelector(".last");
const email = document.querySelector("#email");
const Email = document.querySelector(".email");
const birth = document.querySelector("#birthdate");
const birthDate = document.querySelector(".birthdate");
const quantityEvent = document.querySelector("#quantity");
const quantity = document.querySelector(".quantity");
const locationEvent = document.getElementsByName('location');
const radio = document.querySelector(".radio");
const conditions = document.querySelector("#checkbox1");
const condition = document.querySelector(".checkbox");



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeModalBtn.addEventListener("click", closeModal);

modalValidation.addEventListener("click", closeValidation);
closeModalValidation.addEventListener("click", closeValidation);  

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

const launchValidation = () => {
	modalbg.style.display = "none";
	document.querySelector(".bground-validation").style.display = "block";
}

function closeModal() {
	modalbg.style.display = "none";
}

function closeValidation() {
	document.querySelector(".bground-validation").style.display = "none";
}

const isRequired = value => value === '' ? false : true;
const isTooShort = (length, min) => length < min ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};
const isBirthValid = (birth) => {
	const dateRe = /^\d{4}-\d{2}-\d{2}$/;
	return dateRe.test(birth);
};
const currentDate = new Date().toISOString().split('T')[0];


const showError = (parentElement, message) => {
	const formField = parentElement;
	// add the error class
	formField.classList.remove('error');
	formField.classList.add('error');
	const error = formField.querySelector('small');
	error.textContent = message;
};

const showSuccess = (parentElement) => {
	// get the form-field element
	const formField = parentElement;
	// remove the error class
	formField.classList.remove('error');
	formField.classList.add('success');

	// hide the error message
	const error = formField.querySelector('small');
	error.textContent = '';
}

const checkFirstName = () => {
	let valid = false;
	const min = 2;
	const firstNameField = firstName.value.trim();

	if (!isRequired(firstNameField)) {
		showError(first, 'Veuillez indiquer votre prénom');
	} else if (!isTooShort(firstNameField.length, min)) {
		showError(first, `Veuillez entrer ${min} caractères ou plus pour le champ du prénom.`);
	} else {
		showSuccess(first);
		valid = true;
	}
	return valid;
}

const checkLastName = () => {
	let valid = false;
	const min = 2;
	const lastNameField = lastName.value.trim();


	if (!isRequired(lastNameField)) {
		showError(last, 'Veuillez indiquer votre nom.');
	} else if (!isTooShort(lastNameField.length, min)) {
		showError(last, `Veuillez entrer ${min} caractères ou plus pour le champ du prénom.`);
	} else {
		showSuccess(last);
		valid = true;
	}
	return valid;
}

const checkEmail = () => {
	let valid = false;
	const emailField = email.value.trim();
	if (!isRequired(emailField)) {
		showError(Email, 'Veuillez indiquer votre email.');
	} else if (!isEmailValid(emailField)) {
		showError(Email, 'Veuillez indiquer un email valide')
	} else {
		showSuccess(Email);
		valid = true;
	}
	return valid;
}

const checkBirth = () => {
	let valid = false;
	const birthField = birth.value.trim();

	if (!isRequired(birthField)) {
		showError(birthDate, 'Veuillez indiquer votre date de naissance.');
	} else if (!isBirthValid(birthField)) {
		showError(birthDate, 'Veuillez indiquer une date de naissance valide.')
	} else if (birthField > currentDate) {
		console.log('hi');
		showError(birthDate, 'Veuillez indiquer une date de naissance valide.')
	} else {
		showSuccess(birthDate);
		valid = true;
	}
	return valid;
}

const checkQuantityEvent = () => {

	let valid = false;
	const min = 0,
		max = 99;
	const quantityField = quantityEvent.value.trim();

	if (!isRequired(quantityField)) {
		showError(quantity, 'Veuillez indiquer votre nombre de participation.');
	} else if (!isBetween(quantityField, min, max)) {
		showError(quantity, `Le nombre de participation accepté est entre ${min} et ${max}.`);
	} else {
		showSuccess(quantity);
		valid = true;
	}
	return valid;
}

const checkLocation = () => {
	for (const event of locationEvent) {
		if (event.checked) {
			showSuccess(radio);
			return true;
		}
	  }
	  
	showError(radio, 'Veuillez sélectionner une option.');
	return false;
}

const checkConditions = () => {
	if (conditions.checked) {
		showSuccess(condition);
		return true;
	}

	showError(condition, 'Veuillez vérifier que vous acceptez les termes et conditions.');
	return false;
}

form.addEventListener("submit", (e) => { 
	e.preventDefault();
	let isFirstnameValid = checkFirstName(),
		isLastnameValid = checkLastName(),
		isEmailValid = checkEmail(),
		isBirthValid = checkBirth(),
		isQuantityValid = checkQuantityEvent(),
		isLocationValid = checkLocation();
	isConditionsValid = checkConditions();

	let isFormValid = isFirstnameValid &&
		isLastnameValid &&
		isEmailValid &&
		isBirthValid &&
		isQuantityValid &&
		isLocationValid &&
		isConditionsValid;

	// submit to the server if the form is valid
	if (!isFormValid) {
		return;
	} 

	setTimeout(launchValidation, 100);

	form.reset();

	/* //recupérer element modalBody.
	document.querySelector(".modal-body").style.display = "none";
	//créer div et cacher contenu. 
	document.querySelector(".validation").style.display = "flex"; */
});

const debounce = (fn, delay = 500) => {
	let timeoutId;
	return (...args) => {
		// cancel the previous timer
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// setup a new timer
		timeoutId = setTimeout(() => {
			fn.apply(null, args)
		}, delay);
	};
};

form.addEventListener('input', debounce(function (e) {
	switch (e.target.name) {
		case 'first':
			checkFirstName();
			break;
		case 'last':
			checkLastName();
			break;
		case 'email':
			checkEmail();
			break;
		case 'birthdate':
			checkBirth();
			break;
		case 'quantity':
			checkQuantityEvent();
			break;
		case 'location':
			checkLocation();
			break;
		case 'checkbox1':
			checkConditions();
			break;
	}
}));


