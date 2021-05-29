import firebase from 'firebase';
//import firestore from '@react-native-firebase/firestore';
// import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import Chat from './Chat';
class Backend {
  uid = '';
  Name = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor(props) {
    //this.Person = props.Person;
    firebase.initializeApp({
      apiKey: 'AIzaSyA_Bs1VOBgxXbXs43yBthEKOTqNQVy1igY',
      authDomain: 'marketingproject-617fd.firebaseapp.com',
      databaseURL: 'https://marketingproject-617fd.firebaseio.com',
      projectId: 'marketingproject-617fd',
      storageBucket: 'marketingproject-617fd.appspot.com',
      messagingSenderId: '327833320880',
      appId: '1:327833320880:web:2db9bb119d6ea7575f6a75',
    });
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
          this.setName(doc.data().name);
        });
      if (user) {
        this.setUid(user.uid);
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
  setUid(value) {
    this.uid = value;
  }
  setName(value) {
    this.Name = value;
  }
  getName() {
    return this.Name;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase
      .database()
      .ref('messages')
      .orderByChild('user/id_toWhom')
      .equalTo(this.uid + '_' + 'kPlu5e2X3wgl4Ztcl17oXRSyv5k2');

    this.messagesRefSend = firebase.database().ref('messages');
    this.messagesRef.off();
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
    this.messagesRef.on('child_added', onReceive);
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
}

export default new Backend();
