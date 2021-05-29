import React, {Component} from 'react';
import firebase from 'firebase';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EmailAndPassword from './EmailAndPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class forgot extends Component {
  state = {
    forgotonpress1: false,
    email: '',
  };
  onForgot = () => {
    this.setState({forgotonpress1: true});
  };

  onResetPassword = () => {
    var auth = firebase.auth();
    var emailAddress = this.state.email.trim();

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        Alert.alert(
          'Password Change',
          'Successfully sent mail',
          [{text: 'OK', onPress: this.onForgot}],
          {cancelable: false},
        );
      })
      .catch(function(error) {
        Alert.alert(error.message);
      });
  };
  render() {
    if (!this.state.forgotonpress1) {
      return (
        <View style={styles.container}>
          <TextInput
            placeholder="email"
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onResetPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <EmailAndPassword />;

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
  buttonContainer: {
    backgroundColor: '#3B3B98',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
