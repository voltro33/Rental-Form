window.addEventListener("DOMContentLoaded", domLoaded);



function domLoaded() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const cardNum = document.getElementById("cardNumber");
     const cvcInput = document.getElementById("cvc");
    const dateInput = document.getElementById("expirary");
    const emailInput = document.getElementById("emailAddress"); 
const carTypeRadio = document.getElementById("carType"); 
const statePickup = document.getElementById("stateSelectPickup"); 
const stateDropoff = document.getElementById("stateSelectDropoff"); 
const pickupTimeInput = document.getElementById("pickupTime");
 const dropoffTimeInput = document.getElementById("dropoffTime");
 const errorMessageCVC = document.getElementById(cvcInput.id + "Error");
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("confirm");


    cancelBtn.addEventListener("click", cancel);
    submitBtn.addEventListener("click", validateForm);


statePickup.addEventListener("blur", function () {
    validateState(statePickup);
});



stateDropoff.addEventListener("blur", function () {
    validateState(stateDropoff);
});


pickupTimeInput.addEventListener("blur", function () {
        validateDateTime(pickupTimeInput);
    });

dropoffTimeInput.addEventListener("change", function () {
    validateDropOffTime(pickupTimeInput, dropoffTimeInput);
});

emailInput.addEventListener("change", function () {
   
  validateEmail(emailInput);

});


    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        const errorMessage = document.getElementById(input.id + "Error");
        input.addEventListener("input", function () {
            validateControl(input.value, input.id, errorMessage);
        });
    }

    cardNum.addEventListener("input", function () {
        validateCreditCard(cardNum.id);
    });

        

    cvcInput.addEventListener("input", function () {
            validateControl(cvcInput.value, cvcInput.id, errorMessageCVC);
    });


    dateInput.addEventListener("blur", function () {
    validateDate(dateInput);
});

    carTypeRadio.addEventListener("change", function () {
    validateCarType(carTypeRadio);
});





}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function cancel() {
    const inputs = document.querySelectorAll('input[type="text"]');
        const numbers = document.querySelectorAll('input[type="number"]');

     const selects = document.querySelectorAll("select");
         const emailInput2 = document.getElementById("emailAddress"); 
    const dateInput2 = document.getElementById("expirary");
    const pickupTimeInput2 = document.getElementById("pickupTime");
 const dropoffTimeInput2 = document.getElementById("dropoffTime");
         const errorMessage9 = document.getElementById("formError");
          const errorMessage10 = document.getElementById("carTypeError");

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let errorMessage3 = document.getElementById(input.id + "Error");
        errorMessage3.textContent = "";
        input.style.border = "2px solid black"; 
                        input.value = "";

    }

    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
         let errorMessage5 = document.getElementById(select.id + "Error");
        errorMessage5.textContent = "";
        select.style.border = "2px solid black"; 
                        select.value = "";

    }

     for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
         let errorMessage4 = document.getElementById(number.id + "Error");
        errorMessage4.textContent = "";
        number.style.border = "2px solid black"; 
                number.value = "";

    }


    	let errorMessage6 = document.getElementById(emailInput2.id + "Error");
        errorMessage6.textContent = "";
        emailInput2.style.border = "2px solid black";
        emailInput2.value = "";

        errorMessage6 = document.getElementById(dateInput2.id + "Error");
        errorMessage6.textContent = "";
        dateInput2.style.border = "2px solid black";
                dateInput2.value = "";


        errorMessage6 = document.getElementById(pickupTimeInput2.id + "Error");
        errorMessage6.textContent = "";
        pickupTimeInput2.style.border = "2px solid black";
                pickupTimeInput2.value = "";


        errorMessage6 = document.getElementById(dropoffTimeInput2.id + "Error");
        errorMessage6.textContent = "";
        dropoffTimeInput2.style.border = "2px solid black";
                dropoffTimeInput2.value = "";


        errorMessage10.textContent = "";

        errorMessage9.textContent = "";

}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function testLength(value, length) {


    const trimmedValue = value.trim();
    
    if (trimmedValue.length >= length) {
        return true;
    } 
        return false;
    }


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function testNumber(value) {
    return /^\d+$/.test(value);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateControl(value, name, errorMessage) {
    const inputElement = document.getElementById(name);


	if(!testLength(value,1)){
        errorMessage.textContent = `Error: ${name} is required.`;
        inputElement.style.border = "2px solid red";
        return false;
        }

    if (inputElement.id === "cvc") {
        if (!testNumber(value) || value.length !== 3) {
            errorMessage.textContent = "Error: CVC must be a valid 3-digit number.";
            inputElement.style.border = "2px solid red";
            return false;
        } else {
            errorMessage.textContent = "";
            inputElement.style.border = "2px solid green";
        }
    } else if (inputElement.type === "number" && !testNumber(value)) {
        errorMessage.textContent = `Error: ${name} must be a valid number.`;
        inputElement.style.border = "2px solid red";
        return false;
    } else if (inputElement.type === "text" && testNumber(value)) {
        errorMessage.textContent = `Error: ${name} must be a valid string.`;
        inputElement.style.border = "2px solid red";
        return false;
    } else {
        errorMessage.textContent = "";
        inputElement.style.border = "2px solid green";
}
        
    

    return true;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateCreditCard(id) {
    const cardNum = document.getElementById(id);
    const errorMessage = document.getElementById(id + "Error");
    let value = cardNum.value;

    //I didn't remeber how to remove space or hyphens so I got the code below from online
    const trueValue = value.replace(/[\s-]/g, '');
// ^ that code

    if (!testNumber(trueValue)) {
        errorMessage.textContent = "Error: Credit card number must be a valid number.";
        cardNum.style.border = "2px solid red";
        return false;
    }

    const firstDigit = trueValue.charAt(0);
    let cardType = '';

    switch (firstDigit) {
        case '3':
            cardType = 'AmEx';
          break;
        case '4':
        cardType = 'Visa';
        break;
        case '5':
         cardType = 'MasterCard';
       break;
        case '6':
         cardType = 'Discover';
         break;
        default:
         errorMessage.textContent = "Error: Invalid credit card type.";
          cardNum.style.border = "2px solid red";
          return false;
    }

    const cardLength = trueValue.length;

    switch (cardType) {
        case 'AmEx':
            if (cardLength !== 15) {
        errorMessage.textContent = "Error: AmEx card must be 15 digits long.";
            cardNum.style.border = "2px solid red";
        return false;
            }
            break;
        case 'Discover':
        case 'MasterCard':
        case 'Visa':
            if (cardLength !== 16) {
                errorMessage.textContent = `Error: ${cardType} card must be 16 digits long.`;
                cardNum.style.border = "2px solid red";
                return false;
            }
            break;
        default:
            errorMessage.textContent = "Error: Invalid credit card type.";
            cardNum.style.border = "2px solid red";
            return false;
    }

    cardNum.style.border = "2px solid green";
	errorMessage.textContent = "";

    return true;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateDate(event){

        const errorMessage = document.getElementById(event.id+"Error");

        let today = new Date();
        let validDate = new Date(event.value);

        if (validDate <= today) {
      
      event.style.border = "2px solid red"
        errorMessage.textContent = "Error: Please select a date that is greater than today.";
        return false;
    }

    errorMessage.textContent = "";
    event.style.border = "2px solid green";
  return true;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateEmail(event) {

     const errorMessageElement = document.getElementById(event.id+"Error");

     //I got the code below from online. I didn't remeber the format for the email.
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//done ^ code

    if (!emailPattern.test(event.value) || !testLength(event.value, 1)) {
      
        errorMessageElement.textContent = "Please enter a valid email address.";
        event.style.border = "2px solid red";
        return false;
    }
    
    errorMessageElement.textContent = "";
    event.style.border = "2px solid green";
    return true;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateCarType(control) {
    const radioButtons = document.getElementsByName(control.name);
        const errorMessage = document.getElementById("carTypeError");

    let isChecked = false;

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        errorMessage.textContent = "Please select a car type ";
        control.style.border = "1px solid red";
        return false;
    }

        errorMessage.textContent = "";
        control.style.border = "1px solid green";

    return true;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateState(event) {
    const selectElement = event;
    const errorMessage = document.getElementById(event.id + "Error");

    if (selectElement.value === "") {
        selectElement.style.border = "2px solid red";
        errorMessage.textContent = "Error: Please select a state.";
        return false;
    } else {
        selectElement.style.border = "2px solid green";
        errorMessage.textContent = "";
        return true;
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateDateTime(event) {
    const errorMessage = document.getElementById(event.id +"Error");
    const value = event.value;
    const selectedDateTime = new Date(value);
    const currentDate = new Date();

if(value == ""){
	      errorMessage.textContent = "Error: Please select a pickup date and time";
	       event.style.border = "2px solid red";


	return false;
}

    if (selectedDateTime < currentDate) {
        errorMessage.textContent = "Error: Please select a pickup date and time that is in the future.";
        event.style.border = "2px solid red";
        return false;
    }

    if (
        selectedDateTime.getFullYear() === currentDate.getFullYear() &&
        selectedDateTime.getMonth() === currentDate.getMonth() &&
        selectedDateTime.getDate() === currentDate.getDate() &&
        selectedDateTime.getHours() < currentDate.getHours()
    ) {
        errorMessage.textContent = "Error: Please select a pickup time that is in the future.";
        event.style.border = "2px solid red";
        return false;
    }

    errorMessage.textContent = "";
    event.style.border = "2px solid green";
    return true;
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateDropOffTime(pickUpTime, dropOffTime) {
    const pickUpTimeValue = new Date(pickUpTime.value);
    const dropOffTimeValue = new Date(dropOffTime.value);
    const errorMessage = document.getElementById(dropOffTime.id + "Error");

    
if (dropOffTime.value == "") {
	        dropOffTime.style.border = "2px solid red";
        errorMessage.textContent = "Error: Please select a Dropoff date and time.";

	return false;
}

if (pickUpTime.value == "" ) {
	        dropOffTime.style.border = "2px solid red";
        errorMessage.textContent = "Error: Please select a Pick-up date and time.";

	return false;
}

    if (dropOffTimeValue <= pickUpTimeValue) {
        errorMessage.textContent = "Error: Drop-off time must be after pick-up time.";
         dropOffTime.style.border = "2px solid red";

        return false;
    }

         dropOffTime.style.border = "2px solid green";

    errorMessage.textContent = "";
    return true;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function validateForm() {




    const statePickupValid = validateState(document.getElementById("stateSelectPickup"));
    const pickupTimeValid = validateDateTime(document.getElementById("pickupTime"));
    const stateDropoffValid = validateState(document.getElementById("stateSelectDropoff"));
    const dropoffTimeValid = validateDropOffTime(document.getElementById("pickupTime"),document.getElementById("dropoffTime"));
    const carTypeValid = validateCarType(document.querySelector('input[name="carType"]'));
     const firstNameValid = validateControl((document.getElementById("firstName")).value, "firstName", document.getElementById("firstNameError"));
      const lastNameValid = validateControl(document.getElementById("lastName").value, "lastName", document.getElementById("lastNameError"));
    const emailAddressValid = validateEmail(document.getElementById("emailAddress"));
    const cardNameValid = validateControl(document.getElementById("cardName").value, "cardName", document.getElementById("cardNameError"));
    const cardNumberValid = validateCreditCard("cardNumber");
    const cvcValid = validateControl(document.getElementById("cvc").value, "cvc", document.getElementById("cvcError"));
    const expiryValid = validateDate(document.getElementById("expirary"));
        const errorMessage = document.getElementById("formError");
 


    if (
        statePickupValid &&
        pickupTimeValid &&
        stateDropoffValid &&
        dropoffTimeValid &&
        carTypeValid &&
        firstNameValid &&
        lastNameValid &&
        emailAddressValid &&
        cardNameValid &&
        cardNumberValid &&
        cvcValid &&
        expiryValid
    ){
        alert("Payment Submitted"); 
    return true;

    }
            alert("Invalid Submission"); 

errorMessage.textContent = "Please complete the fields marked as red";
    return false; 
}






