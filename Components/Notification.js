import React, {Component} from 'react';
import {View,Button} from 'react-native';
import Account from './Account';
import Loading from './Loading';
import firebase from 'firebase';
import {
  Container,
  Header,
  Body,
  Text,
  Title,
  Right,
  Left,
  Icon,
} from 'native-base';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      isReady: false,
      Back: '',
    };

    // PushNotification.configure({
      // onRegister: function (token) {
      //   console.log("TOKEN:", token);
      // },
      // onNotification: function (notification) {
      //   console.log("NOTIFICATION:", notification);
      //   notification.finish(PushNotificationIOS.FetchResult.NoData);
      // },
      // onAction: function (notification) {
      //   console.log("ACTION:", notification.action);
      //   console.log("NOTIFICATION:", notification);
    
      // },
      // onRegistrationError: function(err) {
      //   console.error(err.message, err);
      // },
      // getChannels:function (channel_ids) {
      //   console.log(channel_ids); // ['channel_id_1']
      // },
      // permissions: {
      //   alert: true,
      //   badge: true,
      //   sound: true,
      // },
      // popInitialNotification: true,
      // requestPermissions: true,
    // });

  }
  BackButton = () => {
    this.setState({
      Back: true,
    });
  };

  sendMessage=()=>{
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "This is AJ", // (required)     
    });

    // firebase.messaging.requestPermissions().then(function(){
    //   console.log('Have permission');
    // })
    // PushNotification.localNotificationSchedule({
    //   message: "Hi", 
    //   date: new Date(Date.now() + 10 * 1000), 
    //   allowWhileIdle: false,
    // });
    // PushNotificationIOS.presentLocalNotification({
    //   alertTitle:"Ios",
    //   alertBody:"Hello"
    // });

  }
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
            <Text> Notification Screen </Text>
            <Button onPress={()=>this.sendMessage()} title="Click here to send message"></Button>
          </View>
        </Container>
      );
    }
  }
}

//import firebase from 'firebase';

// var firebaseConfig = {
//   apiKey: "AIzaSyA_Bs1VOBgxXbXs43yBthEKOTqNQVy1igY",
//   authDomain: "marketingproject-617fd.firebaseapp.com",
//   databaseURL: "https://marketingproject-617fd.firebaseio.com",
//   projectId: "marketingproject-617fd",
//   storageBucket: "marketingproject-617fd.appspot.com",
//   messagingSenderId: "327833320880",
//   appId: "1:327833320880:web:2db9bb119d6ea7575f6a75",
//   measurementId: "G-NKJXRK7CZ1"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging=firebase.messaging();
// messaging.requestPermission()
// .then(function(){
//   console.log("Have Permission");
//   return messaging.getToken();
// })
// .then(function(token){
//   console.log(token);
// })
// .catch(function(err){
//   console.log('Error Occured');
// })