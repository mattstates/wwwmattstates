import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Twitter.css';

const tweetId = 'id_str';
let twitterLoaded = false;

function loadTwitter(twitterLoaded) {
    if (twitterLoaded) return;

    window.twttr = (function(d, tag, id) {
        var js,
            fjs = d.getElementsByTagName(tag)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(tag);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };
        twitterLoaded = true;
        return t;
    })(document, 'script', 'twitter-wjs');
}

function createTweet(tweetId, elementId) {
    console.log(tweetId, elementId);
    window.twttr.widgets.createTweet(tweetId, document.getElementById(elementId), {
        conversation: 'none',
        dnt: true,
        linkColor: '#55acee'
    });
}

export class Twitter extends Component {
    constructor(props) {
        super(props);
        loadTwitter(twitterLoaded);

        this.state = {
            twitterData: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch('/api/twitter/tweets')
            .then(response => response.json())
            .then(twitterData => this.setState({ twitterData, loaded: true }))
            .catch(err => console.error(err.message));
    }

    render() {
        return (
            <Row>
                <div id="tweets">
                    {this.state.loaded
                        ? this.state.twitterData.map(tweet => (
                              <Col xs={12} sm={6} md={4}>
                                  <Tweet
                                      key={tweet.id_str}
                                      tweetId={tweet.id_str}
                                      elementId={`tweet${tweet.id_str}`}
                                  />
                              </Col>
                          ))
                        : '...loading'}
                </div>
            </Row>
        );
    }
}

class Tweet extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        createTweet(this.props.tweetId, this.props.elementId);
    }

    render() {
        return <div className="tweet" id={this.props.elementId} />;
    }
}
