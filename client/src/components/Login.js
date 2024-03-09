import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { loginUser, registerUser } from '../utils/handleApi';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const login = async(ev) => {
        ev.preventDefault();
        loginUser(username, password, setUserInfo, setRedirect);
    }

    if(redirect) {
        return <Navigate to={'/home'} />
    }
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={login}>
                <h1>Login</h1>
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login