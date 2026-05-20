const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

    let isFormValid = isRequiredValid;

    if (isFormValid) {
        const idUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPAsswordValid = checkLength(password, 6, 25);
        const isPasswordMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = idUsernameValid && isEmailValid && isPAsswordValid && isPasswordMatch;
    }

    if (isFormValid) {
        alert('Registration successful!');
        form.reset();
        document.querySelectorAll('.form-group').forEach((group) => {
            group.className = 'form-group';
        });
    }
});

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    }
    if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be no more than ${max} characters`);
        return false;
    }
    return true;
}

function checkEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

function checkPasswordsMatch(passwordInput, confirmPasswordInput) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match');
        return false;
    }
    return true;
}

function checkRequired(inputArr) {
    let isValid = true;
    for (let input of inputArr) {
        if (input.value.trim() === ``) {
            showError(input, `${formatFieldName(input)} is required`);
            isValid = false;
        }else{
            showSuccess(input);
        }
    }
    return isValid;
}

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}