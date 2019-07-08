import React from 'react';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Route } from 'react-router';

export default function App() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
        </Layout>
    );
}
