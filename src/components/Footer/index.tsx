import { Row } from "antd";
import React from "react";
import './Footer.css'

interface HeaderProps {
}

const Footer: React.FC<HeaderProps> = (props) => {
    return (
        <div className="rtc-footer">
            <Row justify='center' align='middle'>
                <p className="footer-text">
                    Reddit Time Capsule © 2021 · Created by Danny Hines
                </p>
            </Row>
        </div>
    );
};

export default Footer;
