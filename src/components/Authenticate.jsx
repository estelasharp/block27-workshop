import { useState } from "react";
import './form.css'

export default function Authenticate({ token, setToken }) {
    const [error, setError] = useState(null)
    const [successMessage, setsuccessMessage] = useState(null)
    const [userData, setUserData] = useState(null)

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            const result = await response.json();
            const user = result.data.username.username
            setToken(result.token)
            setUserData(user)
            setsuccessMessage(result.message)
            setError("")
        }
        catch(error){
            setError(error.message)
            console.log("error message: ",error.message)
        }
    }


    return (
        <>
        <div className="authenticate">
            <h2>Authenticate</h2>
            {successMessage&&successMessage!=="jwt malformed" ? <p className="success">{successMessage}</p> : ""}
            {userData ? <p>Username: {userData}</p> : ""}
            {error ? <p className="error">{error}</p> : ""}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
        </>
    )
}