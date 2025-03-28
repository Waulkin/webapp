import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const Home = () => {
    const navigate = useNavigate()
    function handleLogout() {
    googleLogout()
    navigate("/")
    }
    return (
        <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
        <button onClick={handleLogout}>Logout</button>
        </div>   
    );
    }
    export default Home;