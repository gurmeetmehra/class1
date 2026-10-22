import React, { useState } from "react";

import "./Dashbord.jsx";

const BillingExpense = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        if (Username === "KARAN" && Password === "123") {
            alert("Login Successful");
            // Redirect to billing page
            
        } else {
            alert("Invalid Username or Password");
        }
    }

    return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
        <form style={{ display: "inline-block",  backgroundColor: "lightBlue", padding: "20px", borderRadius: "20px" }}>
      <h1>Welcome Back !</h1>
      <h2>User Login</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
      <br />
        <label htmlFor="password">Password:  </label>
      <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <br />
      <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "5px 10px", borderRadius: "5px" }} onClick={handleSubmit}>Login</button>
      <br />
    </form>

    </div>
  );
};

export default BillingExpense;
