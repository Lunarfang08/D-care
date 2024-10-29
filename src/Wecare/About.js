import React from 'react';
import './About.css'; // Import CSS for styling

const About = () => {
    return (
        <div className="about-container">
            <div className="about-section">
                <h1>About DCare</h1>
                <p className="intro">
                    Welcome to <strong>DCare Company</strong>, a forward-thinking organization dedicated to helping businesses manage their most valuable asset—<em>their employees</em>. 
                    We specialize in delivering seamless employee data management and smooth payroll operations for companies of all sizes.
                </p>

                <div className="mission-vision">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to empower businesses by simplifying HR and payroll processes, allowing them to focus on what they do best—growing their business.
                        </p>
                    </div>
                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>
                            We envision a future where every business can effortlessly manage their employees, payroll, and compliance with the latest technologies and best practices.
                        </p>
                    </div>
                </div>

                <div className="core-values">
                    <h2>Core Values</h2>
                    <ul>
                        <li><strong>Integrity:</strong> We operate transparently and ethically in every aspect of our business.</li>
                        <li><strong>Innovation:</strong> We embrace new ideas and technology to deliver efficient solutions.</li>
                        <li><strong>Customer-Centric:</strong> Our clients are at the heart of everything we do.</li>
                        <li><strong>Excellence:</strong> We strive for excellence in every service we provide.</li>
                    </ul>
                </div>

                <div className="contact">
                    <h2>Get in Touch</h2>
                    <p>If you have any questions or want to learn more about our services, feel free to <a href="/contact">contact us</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
