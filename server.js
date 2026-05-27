const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   STATIC FILES
========================= */
app.use(express.static(__dirname));

/* =========================
   SHIPMENTS
========================= */
const shipments = [

{
id: "STX12345",
status: "In Transit",
location: "Lagos, Nigeria",
eta: "2 Days"
},

{
id: "STX88888",
status: "Warehouse Processing",
location: "Abuja, Nigeria",
eta: "5 Days"
},

{
id: "STX99999",
status: "Delivered",
location: "Port Harcourt, Nigeria",
eta: "Delivered"
}

];

/* =========================
   TRACK API
========================= */
app.get("/track/:id", (req, res) => {

const trackingId = req.params.id;

const shipment =
shipments.find(
item => item.id === trackingId
);

if(!shipment){

return res.status(404).json({
message: "Tracking ID Not Found"
});

}

res.json(shipment);

});

/* =========================
   HOME PAGE
========================= */
app.get("/", (req, res) => {

res.sendFile(
path.join(__dirname, "tracking.html")
);

});

/* =========================
   SERVER
========================= */
app.listen(3000, () => {

console.log(
"Server running on http://localhost:3000"
);

});