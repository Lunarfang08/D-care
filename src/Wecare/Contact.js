import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
            .then((result) => {
                console.log(result.text);
                alert('Message sent!');
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset(); // reset form after submission
    };

    return (
        <div>
            <div className="contact-section">
                <h1>Contact Manager</h1>
                <form onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
