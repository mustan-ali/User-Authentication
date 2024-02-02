import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const StatusBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="status-bar">
            {user ? (
                <div>
                    <p>Welcome, {user}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : null}
        </div>
    );
};

export default StatusBar;
