import React from 'react';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Route } from 'react-router';
import { CONSOLE_TITLE_STYLE, CONSOLE_BODY_STYLE } from './constants/styles.js';
import { EMAIL_ADDRESS } from './constants/index.js';

export default function App() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
        </Layout>
    );
}

console.log('%cMatt States', CONSOLE_TITLE_STYLE);
console.log(
    `%cThanks for inspecting my site. Feel free to reach out at:\n ${EMAIL_ADDRESS}`,
    CONSOLE_BODY_STYLE
);
console.log('%c ', CONSOLE_TITLE_STYLE);
