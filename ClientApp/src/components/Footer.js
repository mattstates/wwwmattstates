import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Footer.css';

export class Footer extends Component {
    render() {
        return (
            <Row className='footer green-svg'>
                <Col></Col>
                <Col className='text-center'>
                    <p>© {new Date().getFullYear()} Matt States</p>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}
