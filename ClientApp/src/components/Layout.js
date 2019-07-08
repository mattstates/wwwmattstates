import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Footer } from './Footer';
import './Layout.css';

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
