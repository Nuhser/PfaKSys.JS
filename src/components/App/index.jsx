import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import PfaksysNavbar from "../Navbar"
import Sidebar from "../Sidebar";
import LoadingIndicator from "../LoadingIndicator";
import AddItem from "../../feature/Items/Add"

function App() {
    return (
        <div className="App">
            <Router>
                <PfaksysNavbar />
                <Sidebar />

                <main>
                    <Routes>
                        <Route path="/" exact element={<p>Hello World!</p>} />
                        <Route path="/items/add" element={<AddItem />} />
                    </Routes>
                </main>
            </Router>
            <LoadingIndicator />
        </div>
    );
}

export default App;
