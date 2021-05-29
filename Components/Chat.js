import React from 'react';
import firebase from 'firebase';
//import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Loading from './Loading';
import Backend from './ChatBackend';
import PropTypes from 'prop-types';
import Home from './Home';

export default class Chat extends React.Component {
  //messagesRef = null;
  constructor(props) {
    super(props);
    // this.toPerson = props.toWhom;
    this.state = {
      messages: [],
      uid: '',
      Name: '',
      isLoading: true,
    };
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyA_Bs1VOBgxXbXs43yBthEKOTqNQVy1igY',
    //   authDomain: 'marketingproject-617fd.firebaseapp.com',
    //   databaseURL: 'https://marketingproject-617fd.firebaseio.com',
    //   projectId: 'marketingproject-617fd',
    //   storageBucket: 'marketingproject-617fd.appspot.com',
    //   messagingSenderId: '327833320880',
    //   appId: '1:327833320880:web:2db9bb119d6ea7575f6a75',
    // });
    // firestore()
    //   .collection('users')
    //   .doc(firebase.auth().currentUser.uid)
    //   .get()
    //   .then(doc => {
    //     this.setName(doc.data().name);
    //   });
    firebase.auth().onAuthStateChanged(user => {
      firebase
      .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          this.setState({
            Name: doc.data().name,
          });
        });
      if (user) {
        this.setState({
          uid: user.uid,
        });
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            Alert.alert(error.message);
          });
      }
    });
  }
  componentWillMount() {}

  loadMessages(callback) {
    //const curreUser = firebase.auth().currentUser;
    //const toPerson = this.props.route.params.toWhom;
    const messagesRef = firebase
      .database()
      .ref(this.props.route.params.toDocID);
    // .orderByChild('user/_id')
    // .equalTo(firebase.auth().currentUser.uid);

    this.messagesRefSend = firebase
      .database()
      .ref(this.props.route.params.toDocID);
    messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    messagesRef.on('child_added', onReceive);
    //this.messagesRefGet.on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRefSend.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
  render() {
    const toPerson = this.props.route.params.toWhom;
    const toName = this.props.route.params.toName;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          this.sendMessage(message);
        }}
        user={{
          _id: this.state.uid,
          name: this.state.Name,
          toName: toName,
          toWhom: toPerson,
        }}
      />
    );
  }
  componentDidMount() {
    this.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    this.closeChat();
  }
}
