function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    if (height === '' || weight === '') {
        alert('Please enter both height and weight');
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    document.getElementById('bmi-result').innerText = bmi;
    let message = '';

    if (bmi < 18.5) {
    message = 'You are underweight.';
} else if (bmi >= 18.5 && bmi <= 24.9) {
    message = 'You have a normal weight.';
} else if (bmi >= 25 && bmi <= 29.9) {
    message = 'You are overweight.';
} else {
    message = 'You are obese.';
}


    document.getElementById('bmi-message').innerText = message;
}

function clearFields() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('bmi-result').innerText = '';
    document.getElementById('bmi-message').innerText = '';
}
