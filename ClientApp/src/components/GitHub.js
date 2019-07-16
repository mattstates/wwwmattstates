import './GitHub.css';
import React, { useEffect, useState } from 'react';
import { Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

const pushEventCount = 4;
const pullRequestCount = 3;
const EVENT_TYPES = {
    gitPush: 'pushevent',
    gitPullRequest: 'pullrequestevent'
};

export function GitHub() {
    const [githubData, updateGithubData] = useState([]);
    const [isLoaded, updateIsLoaded] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch('/api/github/githubevents', { signal })
            .then(response => response.json())
            .then(responseJson => {
                const prunedEvents = [
                    ...responseJson
                        .filter(event => event.type.toLowerCase() === EVENT_TYPES.gitPush)
                        .splice(0, pushEventCount),
                    ...responseJson
                        .filter(event => event.type.toLowerCase() === EVENT_TYPES.gitPullRequest)
                        .splice(0, pullRequestCount)
                ].sort((a, b) => b.id - a.id);

                updateGithubData(prunedEvents);
                updateIsLoaded(true);
            })
            .catch(err => console.error(err.message));
        return () => {
            abortController.abort();
        };
    }, []);

    if (!isLoaded) return <div />;

    return (
        <Col xs={12}>
            <h4 className="text-center">GitHub</h4>
            {githubData.length ? (
                <ListGroup>{githubData.map(formatGitHubEvent)}</ListGroup>
            ) : (
                <div>
                    If you are seeing this, I guess it has been a while since my last git push/pull
                    to a public repo.
                </div>
            )}
        </Col>
    );
}

function formatGitHubEvent(event) {
    if (!event) return;
    const eventType = event.type.toLowerCase();
    const { actor, repo, created_at, payload } = event;
    const { commits } = payload;

    switch (eventType) {
        case EVENT_TYPES.gitPush:
            return (
                <ListGroupItem
                    key={event.id}
                    className="githubEvent"
                    href={repo.url}
                    header={`${new Date(created_at).toDateString()} - ${repo.name}`}
                >
                    <Image rounded src={actor.avatar_url} alt="GitHub Profile - Matt States" />
                    Git Push - {commits[0].sha.substr(0, 15)}
                    ... "{commits[0].message}" {actor.login}
                </ListGroupItem>
            );
        case EVENT_TYPES.gitPullRequest:
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
