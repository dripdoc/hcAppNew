import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPersons } from './components/FetchPersons';
import { SearchNames } from './components/SearchNames';
import { AddPerson } from './components/AddPerson';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/searchnames' component={SearchNames} />
        <Route path='/fetchpersons' component={FetchPersons} />
        <Route path='/addperson' component={AddPerson} />
      </Layout>
    );
  }
}
