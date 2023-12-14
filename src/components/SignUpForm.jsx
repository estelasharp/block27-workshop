import { useState } from "react"
import './form.css'

export default function SignUpForm({ token, setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault();
        
        setError("")
        setMessage("")

        try {

            //console.log(username)

            if (username.length < 7) {
                return setError("Username must be 8+ characters, please try again")
            }
            else {
                setError("")
                setMessage("Submit Successful")
                const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify({

                        username: { username },
                        password: { password },

                    })
                })

                const APIpost = await response.json();
                setToken(APIpost.token)

                // console.log("API Post: ", APIpost)

                console.log("Token: ", token)
                setUsername("")
                setPassword("")
            }
        }
        catch(error) {
            setError(error.message)
            console.error(error)
        }
    }

    return (
        <div className="form">

            <h2>Sign Up</h2>
            {error ? <p className="error">{error}</p> : ""}
            {message ? <p className="success">{message}</p> : ""}
            <form onSubmit={handleSubmit}>
                <label> Username:
                    <input
                        value={username}
                        onChange={(event) => { setUsername(event.target.value) }}
                    />

                </label><br />
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />

                </label><br /><br />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}