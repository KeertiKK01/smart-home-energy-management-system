import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Profile.css";

const UploadImage = () => {

const [image, setImage] = useState(null);

/* ================= LOAD EXISTING IMAGE ================= */

useEffect(() => {

const storedUser = JSON.parse(localStorage.getItem("user"));

if (storedUser && storedUser.profilePic) {
setImage("http://localhost:8081/uploads/" + storedUser.profilePic);
}

}, []);


/* ================= IMAGE CHANGE ================= */

const handleImageChange = async (e) => {

const file = e.target.files[0];

if (!file) return;

/* FILE TYPE VALIDATION */

if (!file.type.startsWith("image/")) {
alert("Please upload a valid image file");
return;
}

try {

const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.email) {
alert("User not found. Please login again.");
return;
}

const formData = new FormData();
formData.append("file", file);
formData.append("email", storedUser.email);

/* SEND TO BACKEND */

const response = await axios.post(
"http://localhost:8081/profile/upload",
formData,
{
headers: {
"Content-Type": "multipart/form-data"
}
}
);

/* BACKEND RETURNS FULL IMAGE URL */

const imageUrl = response.data;

/* SHOW IMAGE */

setImage(imageUrl);

/* GET FILE NAME FROM URL */

const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

/* UPDATE LOCAL STORAGE */

storedUser.profilePic = fileName;

localStorage.setItem("user", JSON.stringify(storedUser));

/* UPDATE NAVBAR */

window.dispatchEvent(new Event("profileUpdated"));

alert("Image uploaded successfully");

} catch (error) {

console.error("Upload error:", error);

if (error.response) {

if (typeof error.response.data === "string") {
alert(error.response.data);
} else if (error.response.data.message) {
alert(error.response.data.message);
} else {
alert("Image upload failed");
}

} else {
alert("Server connection failed");
}

}

};


/* ================= OPEN FILE SELECTOR ================= */

const handleUploadClick = () => {
document.getElementById("imageUploadInput").click();
};


/* ================= UI ================= */

return (

<div className="d-flex flex-column align-items-center gap-3">

{image && (

<img
src={image}
alt="Profile"
style={{
width: "180px",
height: "180px",
objectFit: "cover",
borderRadius: "50%",
border: "3px solid #ddd"
}}
/>

)}

<button
className="btn btn-secondary"
onClick={handleUploadClick}
>
Upload Image
</button>

<input
type="file"
id="imageUploadInput"
accept="image/*"
onChange={handleImageChange}
style={{ display: "none" }}
/>

</div>

);

};

export default UploadImage;