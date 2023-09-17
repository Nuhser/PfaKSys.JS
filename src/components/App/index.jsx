import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";

// general components
import PfaksysNavbar from "../Navbar"
import Sidebar from "../Sidebar";
import PfaksysToastContainer from '../ToastContainer';
import LoadingIndicator from "../LoadingIndicator";

// feature pages
import ItemList from "../../feature/Items/List";
import ItemDetailPage from "../../feature/Items/DetailPage";
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
                        <Route path="/items/:id" element={<ItemDetailPage />} />
                        <Route path="/users" element={<UserList />} />
                    </Routes>
                </main>
            </Router>

            <LoadingIndicator />
        </div>
    );
}

export default App;
