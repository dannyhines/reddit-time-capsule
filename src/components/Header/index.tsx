import React from "react";
import logo from './reddit-icon.png';
import './Header.css'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="Reddit Logo" />
            <h3 style={{ margin: 0 }}>
                Reddit Time Capsule
            </h3>
        </header>
    );
};

export default Header;
