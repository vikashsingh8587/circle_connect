

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../../Store/Slice/UserSlice";
import { useNavigate } from "react-router-dom";

function SignUpLogic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_circleConnect;

    const signup = async (email, password, confirmPassword) => {

        setLoading(true);
        setError("");

        try {
            const endpoint = baseUrl + "auth/create";
            const body = { email, password, confirmPassword };

            const response = await axios.post(endpoint, body);

            if (response.status === 200) {
                const endpoint = baseUrl + "auth/login";
                const body = { email, password };
               try {
                const response = await axios.post(endpoint, body);
                if(response.status===200){
                    dispatch(setUser(response.data));
                    console.log("login");
                    
                }
               } catch (error) {
                setError("not loggin ")
               }


                navigate("/");
            }

        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
}

export default SignUpLogic;
