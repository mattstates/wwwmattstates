import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

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
        MongoDB: [],
        'C#': ['.Net Framework', '.Net Core'],
        'SQL (MS SQL)': []
    },
    'Misc.': {
        'Version Control': ['Git', 'Perforce', 'ESLint', 'Prettier'],
        Hosting: ['Linux (Ubuntu)', 'Heroku', 'Digital Ocean', 'WordPress']
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
        <Row>
            {title ? <h2>{title}</h2> : null}
            {Object.entries(obj).map((technology, index, array) => {
                const techs = Object.entries(technology[1]).map((domain, tIndex) => {
                    return (
                        <li key={index + tIndex}>
                            <span>{domain[0]}</span>
                            <ul>
                                {domain[1].sort().map((tech, i) => (
                                    <li key={index + tIndex + i}>{tech}</li>
                                ))}
                            </ul>
                        </li>
                    );
                });

                return (
                    <Col key={index} xs={12} md={12 / array.length}>
                        <h3>{technology[0]}</h3>
                        <ul>{techs}</ul>
                    </Col>
                );
            })}
        </Row>
    );
}

export class Home extends Component {
    displayName = Home.name;

    render() {
        return (
            <Grid fluid>
                <Row>
                    <h1>Matt States in Docker</h1>
                    <p>Web Developer</p>
                </Row>

                {techContent}

                {softSkillContent}

                <Row>
                    <h4>
                        As a developer, I strive to balance finding the best solutions against the
                        available resources and the expected ROI.
                    </h4>
                    <h4>
                        As a lead, I encourage ownership, leadership, mentorship, and collaboration.
                        I firmly believe that the best ideas come through collaboration.
                    </h4>
                </Row>

                <Row>
                    <h2>About Me:</h2>
                    <article>
                        <p>
                            I have always been passionate about my interests. Growing up, that
                            passion was mainly focused on music and that interest took me all the
                            way through college where I earned my Bachelor's Degree in Contemporary
                            Music Performance. Unfortunately I had never quite found the contentment
                            I thought I would have achieved by persuing that dream. But all the
                            while I had consistently found a way to stay connected to technology.
                            Throughout school, college, and every menial job I had, there was a way
                            to incorporate technology. Looking back, I had often dabbled in writing
                            code: small scripts, macros, configuring tools...
                        </p>
                        <p>
                            Eventually something clicked and I had realized that writing code
                            afforded me the opporunity to be creative in a structured way. I love
                            the highs and lows of writing applications - pitting the expressiveness
                            of a human software developer against the rigid logic of ones and zeros.
                            I actually enjoy debugging! I am grateful and abundantly fortunate to
                            have the opporunity to create and build things that people will use to
                            make thier lives better in some way.
                        </p>
                    </article>
                </Row>
            </Grid>
        );
    }
}
