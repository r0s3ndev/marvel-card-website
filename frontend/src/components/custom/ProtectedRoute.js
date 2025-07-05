import { useEffect, useState } from 'react'
import axios from 'axios';
import {Navigate} from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/users/check_user_session", {
            withCredentials: true
        })
        .then((res) => {
            console.log("check session front end", res)
            setIsAuthenticated(true);

        })
        .catch((err) => {
            console.error("ErrorException: Unauthorized,", err.message);
            setIsAuthenticated(false);
        })
    }, []);

    if (isAuthenticated === null) {
        // Loading state while checking authentication
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute