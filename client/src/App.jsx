import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HealthBar from "./HealthBar";


function App() {

    return (
        <div>
            <h1>My Health Bar</h1>
            <HealthBar maxHealth={10.0} />
        </div>
    );
}

export default App;
