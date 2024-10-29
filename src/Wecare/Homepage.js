import React from 'react';
import './Homepage.css';

const Homepage = () => {
    return (
        <div className="homepage-container">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Welcome to Care Company</h1>
                <p>Your trusted employee management system</p>
                <a href="/employee-list" className="cta-button">View Employee List</a>
            </section>

            {/* Additional Text Section */}
            <section className="text-section">
                <h2>Why Choose Care Company?</h2>
                <p>
                    At Care Company, we believe in providing exceptional employee management solutions. Our system ensures
                    seamless payroll management, employee tracking, and powerful analytics that help businesses thrive.
                </p>
                <p>
                    Join thousands of satisfied clients who trust us for their employee management needs. We are here to
                    simplify and enhance the way you manage your most important asset: your people.
                </p>
                <img src="https://i.ibb.co/bmjB52K/logo.jpg" alt="About Us Image" />
            </section>
        </div>
    );
};

export default Homepage;
