import React from "react";
import Person from "./person.jsx";
import PrintPage from './PrintPage.jsx';
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        
        <div className="main">
            <div className="heading">
                <h1>Moi vainga</h1>
            </div>
            <Routes>
                <Route path="/printPage" element={<PrintPage />} />
                <Route path="/" element={<Person />} />
            </Routes>
            
        </div>
    );
}

export default App;
