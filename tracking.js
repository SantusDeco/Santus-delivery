/* =========================
   MOBILE MENU
========================= */
const menuToggle =
document.getElementById("menuToggle");

const navLinks =
document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");
});

/* =========================
   TRACKING SYSTEM
========================= */
async function trackShipment() {

const trackingId =
document.getElementById("trackingInput").value.trim();

const resultBox =
document.getElementById("trackingResult");

const loading =
document.getElementById("loading");

const steps = [
document.getElementById("step1"),
document.getElementById("step2"),
document.getElementById("step3"),
document.getElementById("step4"),
document.getElementById("step5")
];

steps.forEach(step => {
step.classList.remove("active");
});

resultBox.innerHTML = "";

loading.classList.remove("hidden");

try {

const response =
await fetch(
`http://localhost:3000/track/${trackingId}`
);

if(!response.ok){

const errorData =
await response.json();

throw new Error(errorData.message);

}

const data =
await response.json();

loading.classList.add("hidden");

resultBox.innerHTML = `

<div class="result-card">

<h2>
<i class="bi bi-check-circle-fill"></i>
 Shipment Located
</h2>

<p>
<strong>Status:</strong>
${data.status}
</p>

<p>
<strong>Current Location:</strong>
${data.location}
</p>

<p>
<strong>Estimated Delivery:</strong>
${data.eta}
</p>

</div>

`;

let progressLevel = 1;

if(data.status.includes("Warehouse")){
progressLevel = 2;
}

if(data.status.includes("Transit")){
progressLevel = 3;
}

if(data.status.includes("Custom")){
progressLevel = 4;
}

if(data.status.includes("Delivered")){
progressLevel = 5;
}

for(let i = 0; i < progressLevel; i++){
steps[i].classList.add("active");
}

const truck =
document.getElementById("truck");

truck.style.left =
(progressLevel * 18) + "%";

} catch(error) {

loading.classList.add("hidden");

resultBox.innerHTML = `

<div class="error-card">
❌ ${error.message}
</div>

`;

}

}