/* ===================================================
   Array & Price Calculation
   =================================================== */
function calculatePharmacyBill() {
    const prices = [150, 400, 250, 300, 100];
    let totalBill = 0;

    for (let i = 0; i < prices.length; i++) {
        totalBill += prices[i];
    }

    const threshold = 1000;
    const discountRate = 0.10; // 10% discount
    let finalAmount = totalBill;
    let discountApplied = false;

    if (totalBill > threshold) {
        finalAmount = totalBill - (totalBill * discountRate);
        discountApplied = true;
    }

    const outputDiv = document.getElementById("billOutput");
    outputDiv.classList.remove("d-none");
    
    if (discountApplied) {
        outputDiv.className = "mt-3 alert alert-success";
        outputDiv.innerHTML = `
            <strong>Total Bill:</strong> ₹${totalBill}<br>
            <strong>Discount (10%):</strong> Applied (Exceeded ₹${threshold})<br>
            <strong>Final Payable Amount:</strong> ₹${finalAmount}
        `;
    } else {
        outputDiv.className = "mt-3 alert alert-info";
        outputDiv.innerHTML = `
            <strong>Total Bill:</strong> ₹${totalBill}<br>
            <strong>Discount:</strong> No discount applied (Bill must exceed ₹${threshold})<br>
            <strong>Final Payable Amount:</strong> ₹${finalAmount}
        `;
    }
}

/* ===================================================
   Button Text Handling ('this' Keyword)
   =================================================== */
function changeButtonText(buttonElement) {
    buttonElement.innerText = "Submitted!";
    buttonElement.classList.add("disabled");
}

/* ===================================================
   Dynamic Character Counter
   =================================================== */
function countCharacters() {
    const textInput = document.getElementById("feedbackInput").value;
    const charCountSpan = document.getElementById("charCount");
    charCountSpan.innerText = textInput.length;
}

/* ===================================================
   Form Validation Logic
   =================================================== */
function validateRegistrationForm(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.getElementById("gender").value;

    const alertBox = document.getElementById("formAlert");
    alertBox.classList.remove("d-none", "alert-danger", "alert-success");

    if (name === "") {
        showAlert(alertBox, "Please enter your Full Name.", "danger");
        return false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        showAlert(alertBox, "Please enter a valid 10-digit Mobile Number.", "danger");
        return false;
    }

    if (email === "" || !email.includes("@")) {
        showAlert(alertBox, "Please enter a valid Email address.", "danger");
        return false;
    }

    if (password.length < 6) {
        showAlert(alertBox, "Password must be at least 6 characters long.", "danger");
        return false;
    }

    if (password !== confirmPassword) {
        showAlert(alertBox, "Passwords do not match.", "danger");
        return false;
    }

    if (gender === "") {
        showAlert(alertBox, "Please select a Gender.", "danger");
        return false;
    }

    showAlert(alertBox, "Patient Registration Successful!", "success");
    document.getElementById("registrationForm").reset();
    return true;
}

function showAlert(element, message, type) {
    element.className = `alert alert-${type}`;
    element.innerText = message;
}

/* ===================================================
   Meal Order Workflow (Nested Callbacks)
   =================================================== */
function startDietOrder() {
    const logBox = document.getElementById("dietLogs");
    logBox.innerHTML = "Initializing meal order...<br>";

    selectFood(logBox, () => {
        confirmOrder(logBox, () => {
            prepareFood(logBox, () => {
                assignDeliveryPartner(logBox, () => {
                    deliverFood(logBox);
                });
            });
        });
    });
}

function selectFood(box, callback) {
    setTimeout(() => {
        box.innerHTML += "• Meal items selected<br>";
        callback();
    }, 800);
}

function confirmOrder(box, callback) {
    setTimeout(() => {
        box.innerHTML += "• Order confirmed by kitchen<br>";
        callback();
    }, 800);
}

function prepareFood(box, callback) {
    setTimeout(() => {
        box.innerHTML += "• Preparing fresh meal...<br>";
        callback();
    }, 800);
}

function assignDeliveryPartner(box, callback) {
    setTimeout(() => {
        box.innerHTML += "• Ward attendant assigned<br>";
        callback();
    }, 800);
}

function deliverFood(box) {
    setTimeout(() => {
        box.innerHTML += "<strong class='text-success'>• Meal delivered to patient ward!</strong><br>";
    }, 800);
}

/* ===================================================
   Pharmacy Order Workflow (Promise Chaining)
   =================================================== */
function appendLog(boxId, message) {
    document.getElementById(boxId).innerHTML += message + "<br>";
}

function selectProduct() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("• Medicines selected"), 800);
    });
}

function checkAvailability() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("• Stock availability verified"), 800);
    });
}

function addToCart() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("• Added to cart"), 800);
    });
}

function makePayment() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("• Payment processed successfully"), 800);
    });
}

function generateOrderConfirmation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("• Order receipt generated"), 800);
    });
}

function startPharmacyOrder() {
    const boxId = "pharmacyLogs";
    document.getElementById(boxId).innerHTML = "Processing pharmacy request...<br>";

    selectProduct()
        .then((msg) => { appendLog(boxId, msg); return checkAvailability(); })
        .then((msg) => { appendLog(boxId, msg); return addToCart(); })
        .then((msg) => { appendLog(boxId, msg); return makePayment(); })
        .then((msg) => { appendLog(boxId, msg); return generateOrderConfirmation(); })
        .then((msg) => { appendLog(boxId, `<strong class='text-success'>${msg}</strong>`); })
        .catch((error) => { appendLog(boxId, `<span class='text-danger'>Error: ${error}</span>`); });
}

/* ===================================================
   Appointment Booking Workflow (Async/Await & Try/Catch)
   =================================================== */
function delayOperation(message, isSuccess = true, delay = 800) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(message);
            } else {
                reject("Booking Error: Doctor slot no longer available!");
            }
        }, delay);
    });
}

async function startAppointmentBooking() {
    const boxId = "appointmentLogs";
    document.getElementById(boxId).innerHTML = "Checking doctor schedule...<br>";

    try {
        let step1 = await delayOperation("• Doctor & Department selected");
        appendLog(boxId, step1);

        let step2 = await delayOperation("• Consultation time slot available");
        appendLog(boxId, step2);

        let step3 = await delayOperation("• Slot temporarily reserved");
        appendLog(boxId, step3);

        let step4 = await delayOperation("• Consultation fee paid");
        appendLog(boxId, step4);

        let step5 = await delayOperation("• Digital appointment pass generated!");
        appendLog(boxId, `<strong class='text-success'>${step5}</strong>`);
    } catch (error) {
        appendLog(boxId, `<strong class='text-danger'>${error}</strong>`);
    }
}