import React, { useState, useEffect } from 'react';
import './Ledger.css';

const QuickBooksLedger = () => {
    const [ledgers, setLedgers] = useState([
        { id: 1, name: 'Uncategorized Asset', type: 'Asset', detailType: 'Other Current Assets', qbBalance: 1491.0, bankBalance: 1491.0 },
        { id: 2, name: 'Retained Earnings', type: 'Equity', detailType: 'Retained Earnings', qbBalance: 2347.5, bankBalance: 2347.5 },
        { id: 3, name: 'Billable Expense Income', type: 'Income', detailType: 'Sales of Product Income', qbBalance: 2457.5, bankBalance: 2457.5 },
        { id: 4, name: 'Sales', type: 'Income', detailType: 'Sales of Product Income', qbBalance: 2517.5, bankBalance: 2517.5 },
        { id: 5, name: 'Employee Benefits', type: 'Expense', detailType: 'Payroll Expenses', qbBalance: 1987.2, bankBalance: 1987.2 },
        { id: 6, name: 'Salaries & Wages', type: 'Expense', detailType: 'Payroll Expenses', qbBalance: 887.9, bankBalance: 887.9 },
        { id: 7, name: 'Uncategorized Expense', type: 'Expense', detailType: 'Other Miscellaneous Services', qbBalance: 527.85, bankBalance: 527.85 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredLedgers = ledgers.filter((ledger) => {
        const matchesSearch = ledger.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'All' || ledger.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="ledger-container">
            <header className="ledger-header">
                <h1>D-care Ledger</h1>
            </header>

            {/* Filter and Search Section */}
            <div className="filter-search-container">
                <div className="batch-actions">
                    <button className="batch-button">Batch Actions</button>
                </div>
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <select value={filterType} onChange={handleFilterChange} className="filter-dropdown">
                    <option value="All">All</option>
                    <option value="Asset">Asset</option>
                    <option value="Equity">Equity</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>

            {/* Ledger Table */}
            <div className="table-wrapper">
                <table className="ledger-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Detail Type</th>
                            <th>QuickBooks Balance</th>
                            <th>Bank Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLedgers.map((ledger) => (
                            <tr key={ledger.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{ledger.name}</td>
                                <td>{ledger.type}</td>
                                <td>{ledger.detailType}</td>
                                <td>${ledger.qbBalance.toFixed(2)}</td>
                                <td>${ledger.bankBalance.toFixed(2)}</td>
                                <td>
                                    <button className="action-button">Run Report</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuickBooksLedger;
