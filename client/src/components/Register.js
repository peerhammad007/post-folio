import React, { useState } from 'react'
import { registerUser } from '../utils/handleApi';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async(ev) => {
        ev.preventDefault();
        registerUser(username, password);
    }
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={register}>
                <h1>Register</h1>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register