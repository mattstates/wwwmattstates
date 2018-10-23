import React, { Component } from 'react';
import { Glyphicon, Grid, Row, Col, Clearfix, Panel, Image } from 'react-bootstrap';
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
                        <h3>Web Developer</h3>
                    </Row>
                </Grid>

                <Grid>
                    <Row>
                        
                        <p className='pitch'>
                        <Image src='/images/matt-lonepine.jpg' rounded responsive/>
                            I am currently a web developer and team lead at{' '}
                            <a href="https://www.lampsplus.com" target="_new">
                                Lamps Plus
                            </a>{' '}
                            where I lead a long term project team named, "Top Gun". On Top Gun I
                            strive to motivate and mentor developers as well as keep our projects
                            organized and sprints running smoothly. My development work on Top Gun
                            is primarily front end, but I have had a great time getting more
                            familiar with .Net, .NetCore, and MSSQL.
                        </p>
                    </Row>
                    <Row>
                        <h2><Glyphicon glyph="minus" /> Technology Overview</h2>
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
                        <h2><Glyphicon glyph="minus" /> What I'm Up To</h2>
                    </Row>
                    <Row>
                        <Twitter />
                    </Row>
                    <Row>
                        <GitHub />
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
