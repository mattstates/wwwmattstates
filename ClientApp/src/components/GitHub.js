import React, { Component } from 'react';

export class GitHub extends Component {
    constructor() {
        super();
        this.state = {
            githubData: {},
            loaded: false
        };
    }

    componentDidMount() {
        fetch('/api/github/githubevents')
            .then(response => response.json())
            .then(githubData => {
                // console.log(githubData);

                this.setState({ githubData, loaded: true });
            })
            .catch(err => console.error(err.message));
    }

    render() {
        return <div />;
    }
}
