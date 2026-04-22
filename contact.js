const form = document.getElementById("contactForm");
const bookingList = document.getElementById("bookingList");
const popup = document.getElementById("popup");

// LOAD BOOKINGS
function loadBookings() {
    bookingList.innerHTML = "";
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.forEach((data, index) => {
        const div = document.createElement("div");
        div.classList.add("booking-card");

        div.innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>${data.email}</p>
            <button onclick="editBooking(${index})" class="btn">Edit</button>
            <button onclick="deleteBooking(${index})" class="btn" style="background:#e53935;">Delete</button>
        `;

        bookingList.appendChild(div);
    });
}

loadBookings();

// SUBMIT
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email").value.trim();
    const phoneInput = document.getElementById("phone").value.trim();
    const postcodeInput = document.getElementById("postcode").value.trim();
    const messageInput = document.getElementById("message").value.trim();

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailInput.match(emailPattern)) {
        alert("Enter a valid email");
        return;
    }

    if (!nameInput || !phoneInput || !postcodeInput || !messageInput) {
        alert("Fill all fields");
        return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        postcode: postcodeInput,
        message: messageInput
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    form.reset();
    loadBookings();

    // SHOW POPUP
   popup.classList.add("show");
});

// CLOSE POPUP
function closePopup() {
    popup.style.display = "none";
}

// EDIT
function editBooking(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const data = bookings[index];

    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("postcode").value = data.postcode;
    document.getElementById("message").value = data.message;

    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

// DELETE
function deleteBooking(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (confirm("Delete this booking?")) {
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        loadBookings();
    }
}
function closePopup() {
    popup.classList.remove("show");
}