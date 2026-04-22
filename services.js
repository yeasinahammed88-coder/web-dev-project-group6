function openCar(name, price, condition, availability) {
    document.getElementById("popup").style.display = "flex";

    document.getElementById("carName").innerText = name;
    document.getElementById("carPrice").innerText = price;
    document.getElementById("carCondition").innerText = "Condition: " + condition;
    document.getElementById("carAvailability").innerText = "Availability: " + availability;
}

function closeCar() {
    document.getElementById("popup").style.display = "none";
}