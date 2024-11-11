
document.addEventListener('DOMContentLoaded', function() {
    const userTypeSelect = document.getElementById('userType');
    const retailerFields = document.getElementById('retailerFields');
    const farmerFields = document.getElementById('farmerFields');

    // Function to show/hide fields based on user type selection
    function showFields() {
        const selectedUserType = userTypeSelect.value;

        // Hide all specific fields initially
        retailerFields.classList.add('hidden');
        farmerFields.classList.add('hidden');

        // Show fields based on the selected user type
        if (selectedUserType === 'retailer') {
            retailerFields.classList.remove('hidden');
        } else if (selectedUserType === 'farmer') {
            farmerFields.classList.remove('hidden');
        }
    }

    // Initial call to set the correct visibility when the page loads
    showFields();

    // Add event listener to userType select element
    userTypeSelect.addEventListener('change', showFields);
});
