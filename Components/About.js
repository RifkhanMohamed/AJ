import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import Account from './Account';
import Loading from './Loading';
import {
  Container,
  Header,
  Body,
  Text,
  Title,
  Right,
  Left,
  Button,
  Icon,
} from 'native-base';
import {Assets} from '@react-navigation/stack';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      isReady: false,
      Back: '',
    };
  }
  BackButton = () => {
    this.setState({
      Back: true,
    });
  };
  componentDidMount() {
    setTimeout(() => this.setState({isReady: true}), 500);
  }
  render() {
    if (!this.state.isReady) {
      return <Loading />;
    } else {
      return (
        <ImageBackground
          source={require('../Assets/about.jpg')}
          style={{width: '100%', height: '50%'}}
        />
      );
    }
  }
}
