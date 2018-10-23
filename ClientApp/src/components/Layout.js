import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
import './Layout.css';

export class Layout extends Component {
    displayName = Layout.name;

    render() {
        return (
            <Grid fluid>
                <Row className='main'>
                    <NavMenu />
                        <div className="content">{this.props.children}</div>
                    <Footer />
                </Row>
            </Grid>
        );
    }
}
