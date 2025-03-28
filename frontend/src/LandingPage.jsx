
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom";
export function LandingPage() {
    
    const navigate = useNavigate()
    
    return (
        <>
            <GoogleLogin onSuccess={(credentialResponse) => { console.log(credentialResponse)
            navigate("/app") } } 
            onError={() => console.log("Login Failed")}
            auto_select={true} 
            logo_alignment="center"
            />
            
        </>
    )
}