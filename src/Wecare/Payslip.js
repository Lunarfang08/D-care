import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Payslip.css'; // Styles specific to Payslip

const Payslip = () => {
    const { empId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        // Fetch employee data from localStorage
        const storedEmployees = JSON.parse(localStorage.getItem('employees'));
        const foundEmployee = storedEmployees.find(emp => emp.empId === empId);
        
        if (foundEmployee) {
            setEmployee(foundEmployee);
        }
    }, [empId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: Number(value)
        }));
    };

    const calculateTotalSalary = () => {
        return (
            (Number(employee.basicSalary) || 0) +
            (Number(employee.foodAllowance) || 0) +
            (Number(employee.accommodation) || 0)
        );
    };

    const handlePrint = () => {
        window.print();
    };

    const handleGoBack = () => {
        navigate('/employee-list');
    };

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header>
                <img src="https://i.ibb.co/bmjB52K/logo.jpg" alt="Company Logo" className="logo" />
                <h1>Employee Payslip</h1>
            </header>
            <section className="employee-details">
                <h2>Payslip for {employee.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Employee No:</strong></td>
                            <td>{empId}</td>
                        </tr>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{employee.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Profession:</strong></td>
                            <td>{employee.profession}</td>
                        </tr>
                        <tr>
                            <td><strong>Basic Salary:</strong></td>
                            <td>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    value={employee.basicSalary}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Food Allowance:</strong></td>
                            <td>
                                <input
                                    type="number"
                                    name="foodAllowance"
                                    value={employee.foodAllowance}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Accommodation:</strong></td>
                            <td>
                                <input
                                    type="number"
                                    name="accommodation"
                                    value={employee.accommodation}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total:</strong></td>
                            <td>{calculateTotalSalary()}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <footer>
                <button onClick={handlePrint}>Print Payslip</button>
                <button onClick={handleGoBack}>Go Back</button>
            </footer>
        </div>
    );
};

export default Payslip;
