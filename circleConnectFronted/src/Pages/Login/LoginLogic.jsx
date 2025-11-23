

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../../Store/Slice/UserSlice";
import { useNavigate } from "react-router-dom";

function LoginLogic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const baseUrl = import.meta.env.VITE_circleConnect;

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = baseUrl + "auth/login";
      const body = { email, password };

      const response = await axios.post(endpoint, body);

      if (response.status === 200) {
       
        dispatch(setUser(response.data));
        

     console.log("navigate");
     
        navigate("/"); 
      }

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export default LoginLogic;
