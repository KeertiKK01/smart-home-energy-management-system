import { useState, useEffect } from "react";
import UploadImage from "../components/UploadImage";
import "./Profile.css";
import InnerLoadingPage from "./InnerLoadingPage";

const Profile = () => {

const [isInitialLoading, setIsInitialLoading] = useState(true);

const [user, setUser] = useState({
name: "",
email: "",
phone: "",
streetNum: "",
street: "",
unit: "",
city: "",
state: "",
zipcode: "",
country: "",
profilePic: ""
});


/* ================= LOAD USER DATA ================= */

useEffect(() => {

try{

const storedUser = JSON.parse(localStorage.getItem("user"));

if (storedUser) {

setUser({
name: storedUser.name || "",
email: storedUser.email || "",
phone: storedUser.phone || "",

streetNum: storedUser?.address?.streetNum || "",
street: storedUser?.address?.street || "",
unit: storedUser?.address?.unit || "",
city: storedUser?.address?.city || "",
state: storedUser?.address?.state || "",
zipcode: storedUser?.address?.zipcode || "",
country: storedUser?.address?.country || "",

profilePic: storedUser.profilePic || ""
});

}

}catch(error){
console.log("User data error:", error);
}

setTimeout(() => {
setIsInitialLoading(false);
}, 300);

}, []);


/* ================= HANDLE INPUT ================= */

const handleChange = (e) => {

setUser({
...user,
[e.target.name]: e.target.value
});

};


/* ================= SAVE ADDRESS ================= */

const saveAddress = () => {

const storedUser = JSON.parse(localStorage.getItem("user")) || {};

const updatedUser = {
...storedUser,
address: {
streetNum: user.streetNum,
street: user.street,
unit: user.unit,
city: user.city,
state: user.state,
zipcode: user.zipcode,
country: user.country
}
};

localStorage.setItem("user", JSON.stringify(updatedUser));

alert("Address Saved Successfully");

};


/* ================= LOADING ================= */

if (isInitialLoading) return <InnerLoadingPage />;


/* ================= UI ================= */

return (

<div className="profile-wrapper">

<h2 className="profile-title">My Profile</h2>

<div className="profile-top">

<div className="profile-card upload-card">
<UploadImage profilePic={user.profilePic}/>
</div>

<div className="profile-card">

<h4>User Information</h4>

<div className="profile-info">

<p><strong>Name:</strong> {user.name || "Not Available"}</p>
<p><strong>Email:</strong> {user.email || "Not Available"}</p>
<p><strong>Phone:</strong> {user.phone || "Not Available"}</p>

</div>

</div>

</div>


{/* ADDRESS SECTION */}

<div className="profile-card">

<h4>Address Information</h4>

<div className="profile-info">

<input
name="streetNum"
placeholder="Street Number"
value={user.streetNum}
onChange={handleChange}
/>

<input
name="street"
placeholder="Street"
value={user.street}
onChange={handleChange}
/>

<input
name="unit"
placeholder="Unit"
value={user.unit}
onChange={handleChange}
/>

<input
name="city"
placeholder="City"
value={user.city}
onChange={handleChange}
/>

<input
name="state"
placeholder="State"
value={user.state}
onChange={handleChange}
/>

<input
name="zipcode"
placeholder="Zip Code"
value={user.zipcode}
onChange={handleChange}
/>

<input
name="country"
placeholder="Country"
value={user.country}
onChange={handleChange}
/>

<button className="save-btn" onClick={saveAddress}>
Save Address
</button>

</div>

</div>

</div>

);

};

export default Profile;