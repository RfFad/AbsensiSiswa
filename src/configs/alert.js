const Swal = require('sweetalert2');

// Function to show success alert
function showSuccessMessage(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
}

// Function to show error alert
function showErrorMessage(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
}

// Export the functions
module.exports = {
    showSuccessMessage,
    showErrorMessage,
};
