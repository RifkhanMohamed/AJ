import React, {Component} from 'react';
import firebase from 'firebase';
import {  Toast,Root } from "native-base";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Forgot from './Forgot';
import Register from './Register';

export default () => (
  <Root>
    <EmailAndPassword />
  </Root>
);

class EmailAndPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    forgotonpress: '',
  };

  onButtonPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then(this.onLoginSuccess)
      .catch(err => {
        this.setState({
          error: err.message,
        });
        Toast.show({
          text: err.message,
          duration: 3000,
          type: "danger"
        })
      });
  };
  onLoginSuccess = () => {
    this.setState({
      error: '',
      loading: false,
    });
  };

  onForgot = () => {
    this.setState({forgotonpress: true});
  };

  onRegister = () => {
    this.setState({forgotonpress: false});
  };
  render() {
    switch (this.state.forgotonpress) {
      case false:
        return <Register />;

      case true:
        return <Forgot />;


      default:
        return (
          <View style={styles.container}>
            <TextInput
              placeholder="email"
              style={styles.input}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />

            <TextInput
              placeholder="password"
              style={styles.input}
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onButtonPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onForgot}>
              <Text style={{color: 'black'}}>forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,.5)',
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,
  },
  errorText: {
    fontSize: 25,
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#3B3B98',
    padding: 15,
    borderRadius: 8,
  },
});
