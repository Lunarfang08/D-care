import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">DCARE</Link>
            </div>

            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><Link to="/employee-list">Employee List</Link></li>
                <li><Link to="/ledger">Ledger</Link></li> {/* New Ledger link */}
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact Manager</Link></li>
            </div>

            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </nav>
    );
};

export default Navbar;
