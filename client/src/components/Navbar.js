import {useContext, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { getUserProfile, logoutUser } from '../utils/handleApi';
const Navbar = () => {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        getUserProfile(setUserInfo);
    }, []);
    
    function logout() {
        logoutUser(setUserInfo);
    }

    const username = userInfo?.username;

    return (
        <header className="navbar">
            <Link to="/home" className="logo">POSTS APP</Link>
            <nav>
                {username ? (
                    <a className="nav-link" onClick={logout}>Logout</a>
                ) : (
                    <>
                        <Link to="/" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Navbar