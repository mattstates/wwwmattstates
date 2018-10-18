import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Home.css';
import { GitHub } from './GitHub';
import { Twitter } from './Twitter';

export class Home extends Component {
    displayName = Home.name;

    render() {
        return (
            <Grid fluid>
                <Grid>
                    <Row>
                        <h1>Matt States</h1>
                        <p>Web Developer</p>
                    </Row>
                </Grid>
                <Grid fluid className="technologies">
                    
                </Grid>
                <Grid>
                    <Row>
                        <h4>
                            As a developer, I strive to balance finding the best solutions against
                            the available resources and the expected ROI.
                        </h4>
                        <h4>
                            As a lead, I encourage ownership, leadership, mentorship, and
                            collaboration. I firmly believe that the best ideas come through
                            collaboration.
                        </h4>
                    </Row>

                    <Row>
                        <h2>About Me:</h2>
                        <article>
                            <p>
                                I have always been passionate about my interests. Growing up, that
                                passion was mainly focused on music and that interest took me all
                                the way through college where I earned my Bachelor's Degree in
                                Contemporary Music Performance. Unfortunately I had never quite
                                found the contentment I thought I would have achieved by persuing
                                that dream. But all the while I had consistently found a way to stay
                                connected to technology. Throughout school, college, and every
                                menial job I had, there was a way to incorporate technology. Looking
                                back, I had often dabbled in writing code: small scripts, macros,
                                configuring tools...
                            </p>
                            <p>
                                Eventually something clicked and I had realized that writing code
                                afforded me the opporunity to be creative in a structured way. I
                                love the highs and lows of writing applications - pitting the
                                expressiveness of a human software developer against the rigid logic
                                of ones and zeros. I actually enjoy debugging! I am grateful and
                                abundantly fortunate to have the opporunity to create and build
                                things that people will use to make thier lives better in some way.
                            </p>
                        </article>

                    </Row>
                    <Row>
                        <GitHub />
                    </Row>
                    <Row>
                    <Twitter />
                    </Row>
                </Grid>
            </Grid>
        );
    }
}
