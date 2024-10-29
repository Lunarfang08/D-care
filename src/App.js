// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Todolist/Home';
// import TodoList from './Todolist/TodoList';
// import './App.scss';

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/todolist" element={<TodoList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./FYP/Home";
// import "./FYP/Home.css";
// import Contact from "./FYP/Contact";
// import About from "./FYP/About";
// import PlayGame from "./FYP/Playgame";
// import Game1 from "./FYP/Game1"; 
// import Game2 from "./FYP/Game2";
// import Game3 from "./FYP/Game3";
// import Game4 from "./FYP/Game4";
// import Game5 from "./FYP/Game5";
// import Game6 from "./FYP/Game6";
// import Game7 from "./FYP/Game7";
// import Game8 from "./FYP/Game8";
// import Game9 from "./FYP/Game9";
// import Sign from "./FYP/Sign";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/play-game" element={<PlayGame />} />
//         <Route path="/game1" element={<Game1 />} />
//         <Route path="/game2" element={<Game2 />} />
//         <Route path="/game3" element={<Game3 />} />
//         <Route path="/game4" element={<Game4 />} />
//         <Route path="/game5" element={<Game5 />} />
//         <Route path="/game6" element={<Game6 />} />
//         <Route path="/game7" element={<Game7 />} />
//         <Route path="/game8" element={<Game8 />} />
//         <Route path="/game9" element={<Game9 />} />
//         <Route path="/Sign" element={<Sign />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// & "C:\Program Files\Git\bin\git.exe" remote set-url origin (https://github.com/Lunarfang08/Todolist.git)
// // & "C:\Program Files\Git\bin\git.exe" add .
// // & "C:\Program Files\Git\bin\git.exe" commit -m "new project"
// // & "C:\Program Files\Git\bin\git.exe" push origin main


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Book from './Healthcare-mgmt/Book';
// import About from './Healthcare-mgmt/About';
// import Contact from './Healthcare-mgmt/Contact';
// import Location from './Healthcare-mgmt/Location';
// import Receipt from './Healthcare-mgmt/Receipt';
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Book />} /> {/* Home Page */}
//           <Route path="/about" element={<About />} /> {/* About Page */}
//           <Route path="/contact" element={<Contact />} /> {/* About Page */}
//           <Route path="/location" element={<Location />} /> {/* About Page */}
//           <Route path="/receipt" element={<Receipt />} /> {/* About Page */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employeelist from './Wecare/Employeelist';
import Payslip from './Wecare/Payslip';
import Homepage from './Wecare/Homepage';
import About from './Wecare/About';
import Contact from './Wecare/Contact';
import Navbar from './Wecare/Navbar'; // Navbar component included
import Ledger from "./Wecare/Ledger"; // Navbar component included
function App() {
    return (
        <Router>
            <div>
                {/* Include the Navbar at the top for all routes */}
                <Navbar />

                <Routes>
                    {/* Homepage Route */}
                    <Route path="/" element={<Homepage />} />

                    {/* Employee List Route */}
                    <Route path="/employee-list" element={<Employeelist />} />

                    {/* Payslip Page Route */}
                    <Route path="/payslip/:empId" element={<Payslip />} />

                    {/* About Page Route */}
                    <Route path="/about" element={<About />} />

                    {/* Contact Page Route */}
                    <Route path="/contact" element={<Contact />} />

                    
                    {/* ledgar Page Route */}
                    <Route path="/ledger" element={<Ledger />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;