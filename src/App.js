import React from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./login/Login";
import { getToken } from "./utilits";
import { tokenKey } from "./constants/Constants";
import MainComponent from "./Components/MainComponent";
import Staff from "./Components/Staff/Staff";
import Tabel from "./Components/Tabel/Tabel";
import Davomat from "./Components/Davomat/Davomat";
import Sozlashlar from "./Components/Sozlashlar/Sozlashlar";
import PasswordChange from "./Components/PasswordChange/PasswordChange";
import SendNotification from "./Components/Notification/SendNotification";
import CheckDavomad from "./Components/Davomat/CheckDavomad";

function App() {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!getToken(tokenKey)) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainComponent/>} >
                <Route path="/dashboard" element={<Staff/>}/>
                <Route path="/dashboard/tabel" element={<Tabel/>} />
                <Route path="/dashboard/davomad" element={<Davomat/>} />
                <Route path="/dashboard/setting" element={<Sozlashlar/>} />
                <Route path="/dashboard/updatepasword" element={<PasswordChange/>} />
                <Route path="/dashboard/notification" element={<SendNotification/>} />
                <Route path="/dashboard/checkdavomad" element={<CheckDavomad/>}/>
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;
