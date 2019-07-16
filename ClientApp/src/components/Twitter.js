import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Twitter.css';

function loadTwitter() {
    const scriptTags = document.getElementsByTagName('script')[0];
    const id = 'twitter-wjs';

    if (document.getElementById(id)) return;

    const jsScriptTag = document.createElement('script');

    jsScriptTag.id = id;
    jsScriptTag.src = 'https://platform.twitter.com/widgets.js';

    return new Promise((resolve, reject) => {
        jsScriptTag.onload = function() {
            const twttr = window.twttr || {};
            twttr._e = [];

            twttr.ready = function(f) {
                twttr._e.push(f);
            };
            resolve(true);
        };

        jsScriptTag.onerror = function(message) {
            reject(message);
        };

        scriptTags.parentNode.insertBefore(jsScriptTag, scriptTags);
    });
}

function createTweet(tweetId, elementId) {
    window.twttr.widgets.createTweet(tweetId, document.getElementById(elementId), {
        dnt: true,
        linkColor: '#55acee'
    });
}

function Twitter() {
    const [twitterClientScriptIsLoaded, updateTwitterClientScriptIsLoaded] = useState(false);
    const [twitterDataIsLoaded, updateTwitterDataIsLoaded] = useState(false);
    const [twitterData, updateTwitterData] = useState([]);

    useEffect(() => {
        loadTwitter()
            .then(isLoaded => {
                updateTwitterClientScriptIsLoaded(isLoaded);
            })
            .catch(message => {
                console.error(message);
                updateTwitterClientScriptIsLoaded(false);
            });
    }, []);

    useEffect(
        () => {
            if (!twitterClientScriptIsLoaded || twitterDataIsLoaded) return;
            const abortController = new AbortController();
            const signal = abortController.signal;

            fetch('/api/twitter/tweets', { signal })
                .then(response => response.json())
                .then(data => {
                    updateTwitterData(data);
                    updateTwitterDataIsLoaded(true);
                })
                .catch(err => console.error(err.message));

            return () => {
                abortController.abort();
            };
        },
        [twitterClientScriptIsLoaded]
    );

    return (
        <Row>
            <div id="tweets">
                {twitterDataIsLoaded ? <h4 className="text-center">Twitter</h4> : ''}
                {twitterDataIsLoaded
                    ? twitterData.map((tweet, index) => {
                          return (
                              <Col xs={12} sm={6} md={4} key={`tweet${tweet.id_str}${index}`}>
                                  <Tweet
                                      tweetId={tweet.id_str}
                                      elementId={`tweet${tweet.id_str}`}
                                  />
                              </Col>
                          );
                      })
                    : '...loading'}
            </div>
        </Row>
    );
}

function Tweet({ tweetId, elementId }) {
    useEffect(
        () => {
            createTweet(tweetId, elementId);
        },
        [elementId]
    );
    return <div className="tweet" id={elementId} />;
}

export default Twitter;
