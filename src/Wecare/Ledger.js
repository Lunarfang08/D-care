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
        const { totalDebit, totalCredit, totalBalance } = calculateTotals();
        const pdf = new jsPDF('p', 'mm', 'a4'); // Initialize PDF (Portrait, mm units, A4 page size)
    
        // Set title
        pdf.setFontSize(18);
        pdf.text('Dcare Ltd. Ledger', 105, 20, { align: 'center' });
    
        // Add a small subtitle with today's date
        pdf.setFontSize(12);
        pdf.text('Generated on: ' + new Date().toLocaleDateString(), 10, 30);
    
        // Define headers and rows for the table
        const headers = ['Date', 'Particulars', 'Debit', 'Credit', 'Balance'];
        const rows = ledgers.map((ledger) => [
            ledger.date,
            ledger.particulars,
            ledger.debit.toString(),
            ledger.credit.toString(),
            ledger.balance.toString(),
        ]);
    
        // Add totals row to the data
        rows.push([
            'Total',
            '',
            totalDebit.toString(),
            totalCredit.toString(),
            totalBalance.toString(),
        ]);
    
        // Start drawing the table on the PDF (at Y position 40)
        let startY = 40;
        pdf.setFontSize(10);
        headers.forEach((header, index) => {
            pdf.text(header, 10 + index * 40, startY); // Place headers evenly spaced
        });
    
        // Draw each row under the headers
        rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                pdf.text(cell, 10 + cellIndex * 40, startY + (rowIndex + 1) * 10);
            });
        });
    
        // Save the PDF with the given filename
        pdf.save('ledger.pdf');
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

            <div className="table-container">
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
</div>

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
