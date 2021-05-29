import React, {Component} from 'react';
import firebase, {auth }from 'firebase';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
//import {db} from '../Database/firebase';

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import EmailAndPassword from './EmailAndPassword';

export default class Register extends Component {
  state = {
    forgotonpress1: false,
    email: '',
    name: '',
    phone: '',
    password: '',
    isLoading: false,
    errorMessage: '',
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  onForgot = () => {
    this.setState({forgotonpress1: true});
  };

  registerUser = () => {
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.phone === ''
    ) {
      Alert.alert('Enter details to register!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password,
        )
        .then(res => {
            firebase
            .firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({
              name: this.state.name,
              phone: this.state.phone,
              email: this.state.email,
              created: auth().currentUser.metadata.creationTime,
              isAdmin:false
              //LastSignIn: auth().currentUser.metadata.lastSignInDate,
              //uid: res.user.uid,
            });
        })
        .then(() => {
          Alert.alert('User registered successfully!');
          this.setState({
            isLoading: false,
            name: '',
            phone: '',
            email: '',
            password: '',
          });
          // return <EmailAndPassword />;
          // this.props.navigation.navigate('EmailAndPassword');
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            errorMessage: error.message,
          });
          Alert.alert(this.state.errorMessage);
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    } else {
      if (!this.state.forgotonpress1) {
        return (
          <View style={styles.container}>
            <TextInput
              placeholder="name"
              style={styles.input}
              value={this.state.name}
              //   onChangeText={name => this.setState({name})}
              onChangeText={val => this.updateInputVal(val, 'name')}
            />
            <TextInput
              placeholder="phone"
              style={styles.input}
              value={this.state.phone}
              //   onChangeText={phone => this.setState({phone})}
              onChangeText={val => this.updateInputVal(val, 'phone')}
            />
            <TextInput
              placeholder="email"
              style={styles.input}
              value={this.state.email}
              //   onChangeText={email => this.setState({email})}
              onChangeText={val => this.updateInputVal(val, 'email')}
            />
            <TextInput
              placeholder="password"
              style={styles.input}
              value={this.state.password}
              secureTextEntry
              //   onChangeText={password => this.setState({password})}
              onChangeText={val => this.updateInputVal(val, 'password')}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.registerUser}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return <EmailAndPassword />;

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
