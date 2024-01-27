import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.status === 200) {
            setMessage(data.message);
            setIsSuccess(true);
        }
        else {
            setMessage(data.message);
            setIsSuccess(false);
        }
    }


    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Log In</button>

                {message && <p className={`message ${isSuccess ? 'green' : 'red'}`}>{message}</p>}
            </form>
        </div>
    )
}
