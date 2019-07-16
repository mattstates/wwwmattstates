import './Footer.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export function Footer() {
    return (
        <Row className="footer green-svg">
            <Col className="text-center">
                <p>© {new Date().getFullYear()} Matt States</p>
            </Col>
        </Row>
    );
}
