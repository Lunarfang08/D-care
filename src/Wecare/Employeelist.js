import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import './Employeelist.css';

const EmployeeList = () => {
    const initialEmployees = JSON.parse(localStorage.getItem('employees')) || [
        { empId: '210001', name: 'Aftar Ali Awan', profession: 'Supervisor', basicSalary: 50000, foodAllowance: 5000, accommodation: 10000 },
        { empId: '210002', name: 'John Doe', profession: 'Engineer', basicSalary: 60000, foodAllowance: 6000, accommodation: 12000 },
        { empId: '210003', name: 'Jane Smith', profession: 'HR Manager', basicSalary: 70000, foodAllowance: 7000, accommodation: 14000 }
    ];

    const [employees, setEmployees] = useState(initialEmployees);
    const [newEmployee, setNewEmployee] = useState({
        empId: '',
        name: '',
        profession: '',
        basicSalary: '',
        foodAllowance: '',
        accommodation: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const handleRemoveEmployee = (empId) => {
        const updatedEmployees = employees.filter(employee => employee.empId !== empId);
        setEmployees(updatedEmployees);
    };

    const handleAddEmployee = (e) => {
        e.preventDefault();
        if (
            newEmployee.empId &&
            newEmployee.name &&
            newEmployee.profession &&
            newEmployee.basicSalary &&
            newEmployee.foodAllowance &&
            newEmployee.accommodation
        ) {
            setEmployees([...employees, newEmployee]);
            setNewEmployee({
                empId: '',
                name: '',
                profession: '',
                basicSalary: '',
                foodAllowance: '',
                accommodation: ''
            });
        }
    };

    // Function to generate the overall budget PDF
    const downloadBudgetPDF = () => {
        const pdf = new jsPDF();
        let y = 10; // Initial y position for the text in PDF
        let totalBudget = 0; // To accumulate total budget

        pdf.setFontSize(18);
        pdf.text('Employee Payroll Budget Summary', 10, y);
        y += 10;

        employees.forEach((employee) => {
            const employeeTotal = 
                parseFloat(employee.basicSalary) + 
                parseFloat(employee.foodAllowance) + 
                parseFloat(employee.accommodation);
            totalBudget += employeeTotal;

            pdf.setFontSize(12);
            pdf.text(`Employee ID: ${employee.empId}`, 10, y);
            y += 6;
            pdf.text(`Name: ${employee.name}`, 10, y);
            y += 6;
            pdf.text(`Profession: ${employee.profession}`, 10, y);
            y += 6;
            pdf.text(`Basic Salary: ${employee.basicSalary}`, 10, y);
            y += 6;
            pdf.text(`Food Allowance: ${employee.foodAllowance}`, 10, y);
            y += 6;
            pdf.text(`Accommodation: ${employee.accommodation}`, 10, y);
            y += 6;
            pdf.text(`Total Paycheck: ${employeeTotal}`, 10, y);
            y += 10;

            if (y > 280) { // Create a new page if content overflows
                pdf.addPage();
                y = 10;
            }
        });

        pdf.setFontSize(14);
        pdf.text(`Grand Total Budget for All Employees: ${totalBudget}`, 10, y);

        pdf.save('employees_budget_summary.pdf');
    };

    const downloadAllPayslipsPDF = () => {
        const pdf = new jsPDF();
        let y = 10;

        employees.forEach((employee) => {
            pdf.text(`Payslip - Employee ID: ${employee.empId}`, 10, y);
            y += 10;
            pdf.text(`Name: ${employee.name}`, 10, y);
            y += 10;
            pdf.text(`Profession: ${employee.profession}`, 10, y);
            y += 10;
            pdf.text(`Basic Salary: ${employee.basicSalary}`, 10, y);
            y += 10;
            pdf.text(`Food Allowance: ${employee.foodAllowance}`, 10, y);
            y += 10;
            pdf.text(`Accommodation: ${employee.accommodation}`, 10, y);
            y += 20;

            if (y > 280) {
                pdf.addPage();
                y = 10;
            }
        });

        pdf.save('employees_payslips.pdf');
    };

    return (
        <div className="container">
            <header>
                <img src="https://i.ibb.co/bmjB52K/logo.jpg" alt="Company Logo" className="logo" />
                <h1>Employee Directory</h1>
            </header>

            <section className="employee-list">
                <h2>List of Employees</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Employee No</th>
                            <th>Name</th>
                            <th>Profession</th>
                            <th>View Payslip</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.empId}>
                                <td>{employee.empId}</td>
                                <td>{employee.name}</td>
                                <td>{employee.profession}</td>
                                <td>
                                    <Link to={`/payslip/${employee.empId}`}>View Payslip</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleRemoveEmployee(employee.empId)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Add New Employee</h2>
                <form className="add-employee-form" onSubmit={handleAddEmployee}>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={newEmployee.empId}
                        onChange={(e) => setNewEmployee({ ...newEmployee, empId: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Profession"
                        value={newEmployee.profession}
                        onChange={(e) => setNewEmployee({ ...newEmployee, profession: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Basic Salary"
                        value={newEmployee.basicSalary}
                        onChange={(e) => setNewEmployee({ ...newEmployee, basicSalary: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Food Allowance"
                        value={newEmployee.foodAllowance}
                        onChange={(e) => setNewEmployee({ ...newEmployee, foodAllowance: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Accommodation"
                        value={newEmployee.accommodation}
                        onChange={(e) => setNewEmployee({ ...newEmployee, accommodation: e.target.value })}
                    />
                    <button type="submit">Add Employee</button>
                </form>
            </section>

            <div className="button-group">
                <button className="go-back-button" onClick={() => navigate("/")}>Go Back</button>
                <button className="download-btn" onClick={downloadBudgetPDF}>Download Overall Budget</button>
            </div>

            <footer>
                <p>&copy; 2024 Care Company. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default EmployeeList;
