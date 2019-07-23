import React from 'react';
import { Home } from './pages/Home';
import { Layout } from './layouts/Layout';
import { Route } from 'react-router';

export default function App() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
        </Layout>
    );
}
