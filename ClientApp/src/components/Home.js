import React, { Component } from 'react';
import { Glyphicon, Grid, Row, Col, Clearfix, Panel, Image, Table } from 'react-bootstrap';
import './Home.css';
import { GitHub } from './GitHub';
import Twitter from './Twitter.js';

export class Home extends Component {
    displayName = Home.name;

    render() {
        return (
            <Grid fluid>
                <Grid>
                    <Row>
                        <h1>Matt States</h1>
                        <h3>Web Enthusiast - Javascript Developer</h3>
                    </Row>
                </Grid>

                <Grid>
                    <Row>
                        <div className="pitch">
                            <Image src="/images/matt-lampsplus.jpg" rounded responsive />
                            <div>
                                <p>
                                    I am currently a web development manager at{' '}
                                    <a href="https://www.lampsplus.com" target="_new">
                                        Lamps Plus
                                    </a>{' '}
                                    where I manage three cross functional agile teams. My leadership
                                    philosophy borrows heavily from the definition of service
                                    leadership quoted on Wikipedia:
                                </p>
                                <p className="quote">
                                    "James Sipe and Don Frick, in their book The Seven Pillars of
                                    Servant Leadership, state that servant-leaders are individuals
                                    of character, those who put people first, are skilled
                                    communicators, are compassionate collaborators, use foresight,
                                    are systems thinkers, and exercise moral authority."
                                </p>
                                <p>
                                    As a manager I strive to balance and tune performance and
                                    productivity goals of the company with each individual
                                    contributor's needs and desires.
                                </p>
                                <p>
                                    Prior to this role at Lamps Plus, I was a developer Team Lead
                                    where I lead a long term project team named, "Top Gun". On Top
                                    Gun I served to motivate and mentor developers as well as keep
                                    our projects organized and sprints running smoothly. My
                                    development work on Top Gun is primarily front end, but I have
                                    had a great time getting more familiar with .Net, .Net Core, and
                                    MSSQL.
                                </p>
                            </div>
                            <p className="quote">
                                "Any application that can be written in JavaScript, will eventually
                                be written in JavaScript."
                                <span className="attribution">– Atwood's Law</span>
                            </p>
                        </div>
                    </Row>


                    <Row>
                        <h2>
                            <Glyphicon glyph="minus" /> Technology Overview
                        </h2>
                        <Col className="text-center" xs={12} sm={6} md={4}>
                            <h4>I can help someone with these:</h4>
                            <hr />
                            <p>Javascript • React.js • HTML • CSS/Sass • WebPack • Node/Express</p>
                        </Col>

                        <Col className="text-center" xs={12} sm={6} md={4}>
                            <h4>Let me Google something:</h4>
                            <hr />
                            <p>C# • .Net Framework/.NetCore</p>
                        </Col>
                        <Clearfix visibleSmBlock />

                        <Col className="text-center" xs={12} sm={6} md={4}>
                            <h4>I'm asking for help:</h4>
                            <hr />
                            <p>SQL • DevOps</p>
                        </Col>
                    </Row>

                    <Row>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title toggle className="text-center">
                                    Here is an obnoxious list of technologies I have worked with.
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    {techContent}
                                    {softSkillContent}
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </Row>

                    <Row>
                        <h2>
                            <Glyphicon glyph="minus" /> What I'm Up To
                        </h2>
                    </Row>
                    <Row>
                        <Twitter />
                    </Row>
                    <Row>
                        <GitHub />
                    </Row>

                    <Row>
                        <h2>
                            <Glyphicon glyph="minus" /> Connect
                        </h2>
                        <Table responsive>
                            <tbody>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <a href="mailto:mstates@icloud.com">mstates@icloud.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>LinkedIn</td>
                                    <td>
                                        <a
                                            href="https://www.linkedin.com/in/mattstates/"
                                            target="_new"
                                        >
                                            https://www.linkedin.com/in/mattstates/
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>GitHub</td>
                                    <td>
                                        <a href="https://github.com/mattstates" target="_new">
                                            https://github.com/mattstates
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Twitter</td>
                                    <td>
                                        <a href="https://twitter.com/MattStates" target="_new">
                                            https://twitter.com/MattStates
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>CodePen</td>
                                    <td>
                                        <a href="https://codepen.io/mattstates/" target="_new">
                                            https://codepen.io/mattstates/
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <h2>
                            <Glyphicon glyph="minus" /> About This Page
                        </h2>
                        <p>
                            This page is still a work in progress. It serves the purpose of telling
                            people a little bit about me, but also serves as a code playground.
                        </p>
                        <p>
                            While most of my programming knowledge lies in the javascript ecosystem,
                            this site allows me to experiment with C#, Docker, Linux, and eventually
                            a host of other tech that strikes my interest.
                        </p>
                        <a href="https://github.com/mattstates/wwwmattstates" target="_new">
                            https://github.com/mattstates/wwwmattstates
                        </a>
                        <p>Thanks for visiting.</p>
                    </Row>
                </Grid>
            </Grid>
        );
    }
}

const technologies = {
    'Front End': {
        Javascript: [
            'ES6+',
            'React',
            'Redux',
            'D3',
            'jQuery',
            'Backbone/Marionette',
            'Webpack',
            'Parcel'
        ],
        CSS: ['Sass', 'Bootsrap']
    },
    'Back End': {
        Javascript: ['Node', 'Express'],
        'C#': ['.Net Framework', '.Net Core']
    },
    Data: {
        MongoDB: [],
        'SQL (MS SQL)': []
    },
    'Misc.': {
        'Version Control': ['Git', 'Perforce', 'ESLint', 'Prettier'],
        Hosting: ['Linux (Ubuntu)', 'Heroku', 'Digital Ocean', 'WordPress'],
        IDE: ['Visual Studio', 'SQL Server Management Studio', 'Visual Studio Code']
    }
};

const projectManagement = {
    'Collaboration Tools': {
        Atlassian: ['Jira', 'Confluence', 'Bamboo', 'BitBucket'],
        GitHub: []
    },
    Methodologies: {
        Agile: ['Scrum', 'KanBan'],
        Waterfall: []
    }
};

const techContent = parseSkills(technologies, 'Technologies:');
const softSkillContent = parseSkills(projectManagement, 'Project Management:');

function parseSkills(obj, title) {
    return (
        <Row className="skills">
            {title ? <h2 className="text-center">{title}</h2> : null}
            {Object.entries(obj).map((technology, index, array) => {
                const techs = Object.entries(technology[1]).map((domain, tIndex) => {
                    return (
                        <li key={index + tIndex}>
                            <span className="bold">{domain[0]}</span>
                            <ul>
                                {domain[1].sort().map((tech, i) => (
                                    <li key={index + tIndex + i}>{tech}</li>
                                ))}
                            </ul>
                        </li>
                    );
                });

                return (
                    <Col className="text-center" key={index} xs={12} md={12 / array.length}>
                        <h3 className="text-center">{technology[0]}</h3>
                        <ul>{techs}</ul>
                    </Col>
                );
            })}
        </Row>
    );
}
