import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="menuItem">
                <div className="brand">MovieNote</div>
            </Link>
            <div className="menu">
                <Link to="/MoviePage" className="menuItem">Movie</Link>
                <Link to="/Login" className="menuItem">Login</Link>
            </div>
        </nav>
    );
}
