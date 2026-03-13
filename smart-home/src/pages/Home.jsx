import { Outlet } from "react-router-dom";
import ENavBar from "../components/ENavBar";
import SNavBar from "../components/SNavBar";
import Footer from "../components/Footer";

const Home = () => {

return (

<div style={{ display: "flex", minHeight: "100vh" }}>

<ENavBar />

<div
style={{
marginLeft: "240px",
width: "calc(100% - 240px)",
display: "flex",
flexDirection: "column"
}}
>

<SNavBar />

<div
style={{
flex: 1,
padding: "20px",
overflowY: "auto"
}}
>

<Outlet />

</div>

<Footer />

</div>

</div>

);
};

export default Home;