import React, {Component} from 'react';
import firebase from 'firebase';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import LoginForm from './Login';
import HomeScreen from './Starter';
import Loading from './Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

class App extends Component {

    state = {
        loggedIn: null,
      };
    
  componentDidMount() {
    var firebaseConfig = {
        apiKey: "AIzaSyA_Bs1VOBgxXbXs43yBthEKOTqNQVy1igY",
        authDomain: "marketingproject-617fd.firebaseapp.com",
        databaseURL: "https://marketingproject-617fd.firebaseio.com",
        projectId: "marketingproject-617fd",
        storageBucket: "marketingproject-617fd.appspot.com",
        messagingSenderId: "327833320880",
        appId: "1:327833320880:web:2db9bb119d6ea7575f6a75",
        measurementId: "G-NKJXRK7CZ1"
      };
      // Initialize Firebase
      !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
    //  firebase.initializeApp(firebaseConfig);
    //   firebase.analytics();


      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            loggedIn: true,
          });
        } else {
          this.setState({
            loggedIn: false,
          });
        }
      });
    };

    renderContent = () => {
        switch (this.state.loggedIn) {
          case false:
            return (
              <ImageBackground
                style={styles.container}
                source={require('../Assets/BG2.jpg')}>
    
                <LoginForm />
              </ImageBackground>
            );        

    
          case true:
            return <HomeScreen />;

          default:
           return <Loading />;

        }
      };
      render() {
        return <View style={styles.container}>{this.renderContent()}</View>;
      }

}  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      },
});

export default App;