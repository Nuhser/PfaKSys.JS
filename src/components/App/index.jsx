import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";
import PfaksysNavbar from "../Navbar"
import Sidebar from "../Sidebar";
import PfaksysToastContainer from '../ToastContainer';
import LoadingIndicator from "../LoadingIndicator";
import ItemList from "../../feature/Items/List";
import AddItemForm from "../../feature/Items/Add";
import UserList from "../../feature/Users/List";

function App() {
    return (
        <div className="App">
            <Router>
                <PfaksysNavbar />
                <Sidebar />
            
                <PfaksysToastContainer
                    ref={(toastContainer) => {window.toastContainer = toastContainer}}
                />

                <main>
                    <Routes>
                        <Route path="/" exact element={<p>Hello World!</p>} />
                        <Route path="/items" element={<ItemList />} />
                        <Route path="/items/add" element={<AddItemForm />} />
                        <Route path="/users" element={<UserList />} />
                    </Routes>
                </main>
            </Router>

            <LoadingIndicator />
        </div>
    );
}

export default App;
