import './Layout.css';
import React from 'react';
import { Footer } from '../components/Footer';
import { Grid, Row } from 'react-bootstrap';

export function Layout({ children }) {
    return (
        <Grid fluid>
            <Row className="main">
                <div className="content">{children}</div>
                <Footer />
            </Row>
        </Grid>
    );
}
