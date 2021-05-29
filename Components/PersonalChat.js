// import React from 'react';
// import firebase from 'firebase';
// import firestore from '@react-native-firebase/firestore';
// import {Alert} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import Backend from './ChatBackend';
// import PropTypes from 'prop-types';
// import Home from './Home';

// export default class Chat extends React.Component {
//   //messagesRef = null;
//   constructor(props) {
//     super(props);
//     // this.toPerson = props.toWhom;
//     this.state = {
//       messages: [],
//       uid: '',
//       Name: '',
//     };
//     // firebase.initializeApp({
//     //   apiKey: 'AIzaSyA_Bs1VOBgxXbXs43yBthEKOTqNQVy1igY',
//     //   authDomain: 'marketingproject-617fd.firebaseapp.com',
//     //   databaseURL: 'https://marketingproject-617fd.firebaseio.com',
//     //   projectId: 'marketingproject-617fd',
//     //   storageBucket: 'marketingproject-617fd.appspot.com',
//     //   messagingSenderId: '327833320880',
//     //   appId: '1:327833320880:web:2db9bb119d6ea7575f6a75',
//     // });
//     // firestore()
//     //   .collection('users')
//     //   .doc(firebase.auth().currentUser.uid)
//     //   .get()
//     //   .then(doc => {
//     //     this.setName(doc.data().name);
//     //   });
//     firebase.auth().onAuthStateChanged(user => {
//       firestore()
//         .collection('users')
//         .doc(user.uid)
//         .get()
//         .then(doc => {
//           this.setState({
//             Name: doc.data().name,
//           });
//         });
//       if (user) {
//         this.setState({
//           uid: user.uid,
//         });
//       } else {
//         firebase
//           .auth()
//           .signInAnonymously()
//           .catch(error => {
//             Alert.alert(error.message);
//           });
//       }
//     });
//   }
//   componentWillMount() {}

//   loadMessages(callback) {
//     //const curreUser = firebase.auth().currentUser;
//     //const toPerson = this.props.route.params.toWhom;
//     const messagesRef = firebase.database().ref('messages');
//     // .orderByChild('user/_id')
//     // .equalTo(firebase.auth().currentUser.uid);

//     this.messagesRefSend = firebase.database().ref('messages');
//     messagesRef.off();
//     const onReceive = data => {
//       const message = data.val();
//       if (
//         (message.user.toWhom === this.props.route.params.toWhom ||
//           message.user.toWhom === firebase.auth().currentUser.uid) &&
//         (message.user._id === this.props.route.params.toWhom ||
//           message.user._id === firebase.auth().currentUser.uid)
//       ) {
//         callback({
//           _id: data.key,
//           text: message.text,
//           createdAt: new Date(message.createdAt),
//           user: {
//             _id: message.user._id,
//             name: message.user.name,
//           },
//         });
//       }
//     };
//     messagesRef.on('child_added', onReceive);
//     //this.messagesRefGet.on('child_added', onReceive);
//   }
//   // send the message to the Backend
//   sendMessage(message) {
//     for (let i = 0; i < message.length; i++) {
//       this.messagesRefSend.push({
//         text: message[i].text,
//         user: message[i].user,
//         createdAt: firebase.database.ServerValue.TIMESTAMP,
//       });
//     }
//   }
//   // close the connection to the Backend
//   closeChat() {
//     if (this.messagesRef) {
//       this.messagesRef.off();
//     }
//   }
//   render() {
//     const toPerson = this.props.route.params.toWhom;
//     const toName = this.props.route.params.toName;
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={message => {
//           this.sendMessage(message);
//         }}
//         user={{
//           _id: this.state.uid,
//           name: this.state.Name,
//           toName: toName,
//           toWhom: toPerson,
//           id_toWhom: this.state.uid + '_' + toPerson,
//         }}
//       />
//     );
//   }
//   componentDidMount() {
//     this.loadMessages(message => {
//       this.setState(previousState => {
//         return {
//           messages: GiftedChat.append(previousState.messages, message),
//         };
//       });
//     });
//   }
//   componentWillUnmount() {
//     this.closeChat();
//   }
// }

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
        <Container>
          <View>
            <Text> About Screen </Text>
          </View>
        </Container>
      );
    }
  }
}

