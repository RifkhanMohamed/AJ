import React, {Component} from 'react';
import {View} from 'react-native';
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

export default class Search extends Component {
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
        <Container>
          <View>
            <Text> Search Screen </Text>
          </View>
        </Container>
      );
    }
  }
}

