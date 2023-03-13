// validation modal
const closeModalValidationButton = document.querySelector(".close-validation");
const modalValidation = document.querySelector(".btn-close");

// form and inputs
const form = document.querySelector('form');
const formBtn = document.querySelector(".btn-submit");
const firstNameFieldParent = document.querySelector(".first");
const lastNameFieldParent = document.querySelector(".last");
const emailFieldParent = document.querySelector(".email");
const birthdateFieldParent = document.querySelector(".birthdate");
const quantityFieldParent = document.querySelector(".quantity");
const locationEvent = document.getElementsByName('location');
const radio = document.querySelector(".radio");
const conditions = document.querySelector("#checkbox1");
const condition = document.querySelector(".checkbox");

// regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;

// conditions
const isEmpty = value => value === '' ? true : false;
const nameMinValue = 2;
const isTooShort = (length) => length < nameMinValue ? true : false;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


/**
 * on form validated and submitted
 * hide the form modal
 */
const launchValidationModal = () => {
	modalbg.style.display = "none";
	document.querySelector(".bground-validation").style.display = "block";
}

const closeValidationModal = () => {
	document.querySelector(".bground-validation").style.display = "none";
}

/**
 * show the actual error message on "input" event
 * the function is called by field
 */
const showError = (element, message) => {
    if (element.classList.contains('success')) {
        element.classList.remove('success');
    }

    if (false === element.classList.contains('error')) {
        element.classList.add('error');
    }

	element.querySelector('small').textContent = message;
};

/**
 * remove the error message on "input" event
 * the function is called by field
 */
const showSuccess = (element) => {
	element.classList.remove('error');
	element.classList.add('success');
	const error = element.querySelector('small');
	error.textContent = '';
}

/**
 * check firstname input
 */
const checkFirstName = () => {
	const firstNameField = firstNameFieldParent.querySelector('input').value.trim();
	
	if (isEmpty(firstNameField)) {
		showError(firstNameFieldParent, 'Veuillez indiquer votre prénom');

        return false;
	} 
    
    if (isTooShort(firstNameField.length)) {
		showError(firstNameFieldParent, `Veuillez entrer ${nameMinValue} caractères ou plus pour le champ du prénom.`);

        return false;
	} 

    if (false === nameRegex.test(firstNameField)) {
		showError(firstNameFieldParent, `Veuillez n'utiliser que des caractères autorisés (A-a, accents, - ou &nbsp;).`);

        return false;
	}

    showSuccess(firstNameFieldParent);

	return true;
}

/**
 * check name input
 */
const checkLastName = () => {
	const lastNameField = lastNameFieldParent.querySelector('input').value.trim();

	if (isEmpty(lastNameField)) {
		showError(lastNameFieldParent, 'Veuillez indiquer votre nom.');

		return false;
	} 
	
	if (isTooShort(lastNameField.length, nameMinValue)) {
		showError(lastNameFieldParent, `Veuillez entrer ${nameMinValue} caractères ou plus pour le champ du prénom.`);

		return false;
	} 
	
	if (false === nameRegex.test(lastNameField)) {
		showError(lastNameFieldParent, `Veuillez n'utiliser que des caractères autorisés (A-a, accents, - ou &nbsp;).`);

		return false;
	} 
	
	showSuccess(lastNameFieldParent);

	return true;
}

/**
 * check email input
 */
const checkEmail = () => {
    const emailField = emailFieldParent.querySelector('input').value.trim();
    const isEmailValid = (emailField) => {return emailRegex.test(emailField);};

	if (isEmpty(emailField)) {
		showError(emailFieldParent, 'Veuillez indiquer votre email.');
		
		return false;
	} 
	
	if (false === isEmailValid(emailField)) {
		showError(emailFieldParent, 'Veuillez indiquer un email valide');

		return false;
	} 
	
	showSuccess(emailFieldParent);

	return true;
}

/**
 * check birthdate input
 */
const checkBirth = () => {
	const birthField = birthdateFieldParent.querySelector('input').value.trim();
    const isBirthValid = (birth) => {return dateRegex.test(birth);};
    const currentDate = new Date().toISOString().split('T')[0];

	if (isEmpty(birthField)) {
		showError(birthdateFieldParent, 'Veuillez indiquer votre date de naissance.');

		return false;
	} 
	
	if (false === isBirthValid(birthField)) {
		showError(birthdateFieldParent, 'Veuillez indiquer une date de naissance valide.');

		return false;
	} 
	
	if (birthField > currentDate) {
		showError(birthdateFieldParent, 'Veuillez indiquer une date de naissance valide.');

		return false;
	} 

	showSuccess(birthdateFieldParent);
	
	return true;
}

/**
 * check quantity of event input
 */
const checkQuantityEvent = () => {
	const min = 0, max = 99;
	const quantityField = quantityFieldParent.querySelector('input').value.trim();

	if (isEmpty(quantityField)) {
		showError(quantityFieldParent, 'Veuillez indiquer votre nombre de participation.');

		return false;
	} 
	
	if (false === isBetween(quantityField, min, max)) {
		showError(quantityFieldParent, `Le nombre de participation accepté est entre ${min} et ${max}.`);

		return false;
	}
		
	showSuccess(quantityFieldParent);
	
	return true;
}

/**
 * check location of event input
 */
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
/**
 * check if the conditions are selected
 */
const checkConditions = () => {
	if (conditions.checked) {
		showSuccess(condition);

		return true;
	}

	showError(condition, 'Veuillez vérifier que vous acceptez les termes et conditions.');

	return false;
}

/**
 * delay the showError/showSuccess on "input" event
 */
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

// modal validation events trigger
modalValidation.addEventListener("click", closeValidationModal);
closeModalValidationButton.addEventListener("click", closeValidationModal);

/**
 * Validate form on "submit" event
 */
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
	if (false === isFormValid) {
		return;
	} 

	launchValidationModal();

	form.reset();
});

/**
 * Show form inputs errors on "input" event
 */
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