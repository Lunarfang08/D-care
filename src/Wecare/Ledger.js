import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import html2canvas from 'html2canvas'; // Import html2canvas to convert the table to an image
import './Ledger.css';

const Ledger = () => {
    const getInitialLedgers = () => {
        const storedLedgers = localStorage.getItem('ledgers');
        return storedLedgers ? JSON.parse(storedLedgers) : [
            { id: '1', date: '28-Jul-24', particulars: 'Trf to Aftab Bhai', debit: 20000, credit: 0, balance: -19000 },
            { id: '2', date: '29-Jul-24', particulars: 'Trf to Gujjar Commission', debit: 1500000, credit: 0, balance: 1481000 },
            { id: '3', date: '30-Jul-24', particulars: 'Trf to Ahad for Onion', debit: 2000000, credit: 0, balance: 3481000 },
            { id: '4', date: '31-Jul-24', particulars: 'Transfer to Haider (10K QAR)', debit: 0, credit: 766000, balance: 2715000 }
        ];
    };

    const [ledgers, setLedgers] = useState(getInitialLedgers);
    const [newLedger, setNewLedger] = useState({
        date: '',
        particulars: '',
        debit: '',
        credit: '',
        balance: ''
    });

    useEffect(() => {
        localStorage.setItem('ledgers', JSON.stringify(ledgers));
    }, [ledgers]);

    const handleAddLedger = (e) => {
        e.preventDefault();
        if (newLedger.date && newLedger.particulars && newLedger.debit && newLedger.credit) {
            const newEntry = { id: Date.now().toString(), ...newLedger };
            setLedgers([...ledgers, newEntry]);
            setNewLedger({ date: '', particulars: '', debit: '', credit: '', balance: '' });
        }
    };

    const handleRemoveLedger = (id) => {
        const updatedLedgers = ledgers.filter(ledger => ledger.id !== id);
        setLedgers(updatedLedgers);
    };

    const calculateTotals = () => {
        let totalDebit = 0;
        let totalCredit = 0;
        let totalBalance = 0;

        ledgers.forEach(ledger => {
            totalDebit += parseFloat(ledger.debit) || 0;
            totalCredit += parseFloat(ledger.credit) || 0;
            totalBalance += parseFloat(ledger.balance) || 0;
        });

        return { totalDebit, totalCredit, totalBalance };
    };

    const downloadPDF = () => {
        const input = document.getElementById('ledger-table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('ledger.pdf');
        });
    };

    const navigate = useNavigate();

    const { totalDebit, totalCredit, totalBalance } = calculateTotals();

    return (
        <div className="ledger-container">
            <h1>Dcare Ltd. Ledger</h1>

            <form onSubmit={handleAddLedger} className="ledger-form">
                <input
                    type="date"
                    placeholder="Date"
                    value={newLedger.date}
                    onChange={(e) => setNewLedger({ ...newLedger, date: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Particulars"
                    value={newLedger.particulars}
                    onChange={(e) => setNewLedger({ ...newLedger, particulars: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Debit"
                    value={newLedger.debit}
                    onChange={(e) => setNewLedger({ ...newLedger, debit: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Credit"
                    value={newLedger.credit}
                    onChange={(e) => setNewLedger({ ...newLedger, credit: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Balance"
                    value={newLedger.balance}
                    onChange={(e) => setNewLedger({ ...newLedger, balance: e.target.value })}
                />
                <button type="submit">Add Entry</button>
            </form>

            <table className="ledger-table" id="ledger-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Particulars</th>
                        <th>Dr (Debit)</th>
                        <th>Cr (Credit)</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ledgers.map((ledger) => (
                        <tr key={ledger.id}>
                            <td>{ledger.date}</td>
                            <td>{ledger.particulars}</td>
                            <td>{ledger.debit}</td>
                            <td>{ledger.credit}</td>
                            <td>{ledger.balance}</td>
                            <td>
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveLedger(ledger.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Total</td>
                        <td>{totalDebit}</td>
                        <td>{totalCredit}</td>
                        <td>{totalBalance}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            <div className="button-group">
                <button className="go-back-button" onClick={() => navigate("/")}>
                    Go Back
                </button>
                <button className="download-btn" onClick={downloadPDF}>
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default Ledger;
