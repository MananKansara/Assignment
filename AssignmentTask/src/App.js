/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import NewsList from './components/NewsList';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

const store = configureStore()

export default class App extends Component
{
  render()
  {
    return(
      <Provider store={store}> 
          <NewsList />
      </Provider>
     )
  }
}