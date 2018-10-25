import React, { Component } from 'react';
import { Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import './GitHub.css';

const pushEventCount = 4;
const pullRequestCount = 3;
const EVENT_TYPES = {
    push: 'pushevent',
    pullrequest: 'pullrequestevent'
};

export class GitHub extends Component {
    constructor() {
        super();
        this.state = {
            githubData: [],
            loaded: false
        };
    }

    componentDidMount() {
        if (this.state.loaded) return;
        fetch('/api/github/githubevents')
            .then(response => response.json())
            .then(githubData => {
                const prunedEvents = [
                    ...githubData
                        .filter(event => event.type.toLowerCase() === EVENT_TYPES.push)
                        .splice(0, pushEventCount),
                    ...githubData
                        .filter(event => event.type.toLowerCase() === EVENT_TYPES.pullrequest)
                        .splice(0, pullRequestCount)
                ].sort((a, b) => b.id - a.id);

                this.setState({ githubData: prunedEvents, loaded: true });
            })
            .catch(err => console.error(err.message));
    }

    render() {
        if (!this.state.loaded) return <div />;

        return (
            <Col xs={12}>
                <h4 className="text-center">GitHub</h4>
                <ListGroup>{this.state.githubData.map(formatGitHubEvent)}</ListGroup>
            </Col>
        );
    }
}

function formatGitHubEvent(event) {
    if (!event) return;
    const eventType = event.type.toLowerCase();
    const { actor, repo, created_at, payload } = event;
    const { commits } = payload;

    switch (eventType) {
        case EVENT_TYPES.push:
            return (
                <ListGroupItem
                    key={event.id}
                    className="githubEvent"
                    href={repo.url}
                    header={`${new Date(created_at).toDateString()} - ${repo.name}`}
                >
                    <Image rounded src={actor.avatar_url} />
                    Git Push - {commits[0].sha.substr(0, 15)}
                    ... "{commits[0].message}" {actor.login}
                </ListGroupItem>
            );
        case EVENT_TYPES.pullrequest:
            return (
                <ListGroupItem
                    key={event.id}
                    className="githubEvent"
                    href={repo.url}
                    header={`${new Date(created_at).toDateString()} - ${repo.name}`}
                >
                    <Image rounded src={actor.avatar_url} />
                    Pull Request - {payload.pull_request.head.sha.substr(0, 15)}
                    ... "{payload.pull_request.title}" {actor.login}
                </ListGroupItem>
            );
        default:
            return;
    }
}
