import { Col, Row } from "antd";
import React from "react";
import './Footer.css'

interface HeaderProps {
}

const Footer: React.FC<HeaderProps> = (props) => {
    return (
        <div className="rtc-footer">
            <Row justify='center' align='middle' style={{ padding: '1rem 0' }}>
                <Col span={24}>
                    <p className="footer-text">
                        Reddit Time Capsule © 2021 · Created by Danny Hines
                    </p>
                </Col>
                <Col span={24}>
                    <p className="footer-subtitle">
                        Data comes from <a href="https://pushshift.io" target="_blank" rel="noreferrer">pushshift.io</a>
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
