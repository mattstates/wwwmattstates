import React, { Component } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Route } from 'react-router';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
      </Layout>
    );
  }
}
