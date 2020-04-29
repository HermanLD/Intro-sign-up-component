function globalFunction() {
    //
    // Variables
    //

    const form = document.getElementById('form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    //
    // Methods
    //

    function insertMsg(theInput, errorMsg) {
        theInput.nextElementSibling.innerHTML = errorMsg;
    }

    function showError(theInput) {
        theInput.className = 'invalid';
        theInput.nextElementSibling.removeAttribute('hidden');
    }

    function clearError(theInput) {
        theInput.className = '';
        theInput.nextElementSibling.setAttribute('hidden', '');
        theInput.nextElementSibling.innerHTML = "";
    }

    function checkForError(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].className === 'invalid') {
                return true;
            }
        }
        return false;
    }

    //
    // Inits & Event Listeners
    //

    form.setAttribute('novalidate', true); //In case script fails, fallback to default error msgs
    form.addEventListener('submit', function (event) {
        
        let inputs = [firstName, lastName, email, password];
        
        for (let i = 0; i < inputs.length; i++) {

            // Remove Error messages
            clearError(inputs[i]);

            // Error message if input left blank
            if (inputs[i].value.trim() === '') {
                insertMsg(inputs[i], `<em>${inputs[i].getAttribute('placeholder')} cannot be empty</em>`);
                showError(inputs[i]);
            }

            // Error message if Email input does not match email pattern
            if (inputs[i].getAttribute('id') === 'email' && inputs[i].value.length !== 0) {
                var emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                if (!emailRegEx.test(inputs[i].value.trim())) {
                    insertMsg(inputs[i], `<em>Looks like this is not an ${inputs[i].getAttribute('placeholder')}</em>`);
                    showError(inputs[i]);
                }
            }
        }
        if (checkForError(inputs) === true) {
          event.preventDefault();
        }
    });
}

globalFunction();