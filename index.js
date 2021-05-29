/**
 * @format
 */

 
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './Components/App';
import Splash from './Components/Splash';
import {name as appName} from './app.json';

class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {currentScreen: 'splash'};
      console.log('Start doing some tasks for about 3 seconds');
      setTimeout(() => {
        console.log('Done some tasks for about 3 seconds');
        this.setState({currentScreen: 'App'});
      }, 2000);
    }
    render() {
      const {currentScreen} = this.state;
      let mainScreen = currentScreen === 'splash' ? <Splash /> : <App />;
      return mainScreen;
    }
  }

AppRegistry.registerComponent('AJ', () => Main);
