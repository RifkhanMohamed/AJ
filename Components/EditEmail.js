import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import MyProfile from './MyProfile';
import Loading from './Loading';
import firebase from 'firebase';
//import firestore from '@react-native-firebase/firestore';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Left,
  Button,
  Icon,
  ListItem,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class EditEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isReady: false,
      Back: '',
      email: '',
      ImageFile: '',
      password: '',
      iconCurrent: 'eye-off',
      PasswordCurrent: true,
    };
    var user = firebase.auth().currentUser;
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          email: user.email,
          ImageFile: doc.data().ImageFile,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  BackButton = () => {
    this.setState({
      Back: true,
    });
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  reauthenticate = currentPassword => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };
  Update = () => {
    this.setState({
      isLoading: true,
    });
    this.reauthenticate(this.state.password)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(this.state.email.trim())
          .then(() => {
            Alert.alert('Email Updated...!');
            this.setState({
              isLoading: false,
            });
          })
          .catch(error => {
            Alert.alert(error.message);
            this.setState({
              isLoading: false,
            });
          });
      })
      .catch(error => {
        Alert.alert(error.message);
        this.setState({
          isLoading: false,
        });
      });
  };
  componentDidMount() {
    setTimeout(() => this.setState({isReady: true}), 500);
  }
  VisibleEyeCurrent = () => {
    this.setState(prevState => ({
      iconCurrent: prevState.iconCurrent === 'eye' ? 'eye-off' : 'eye',
      PasswordCurrent: !prevState.PasswordCurrent,
    }));
  };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <Container>
          <View style={styles.container}>
            {this.state.ImageFile ? (
              <ImageBackground source={{uri: this.state.ImageFile}} style={{}}>
                <View style={styles.header} />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={require('../Assets/img_avatar.png')}
                style={{}}>
                <View style={styles.header} />
              </ImageBackground>
            )}
            {this.state.ImageFile ? (
              <Image
                style={styles.avatar}
                source={{uri: this.state.ImageFile}}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('../Assets/img_avatar.png')}
              />
            )}
            <ListItem itemDivider style={{marginTop: 80}} />
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={val => this.updateInputVal(val, 'email')}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Current Password</Label>
                  <Input
                    value={this.state.password}
                    secureTextEntry={this.state.PasswordCurrent}
                    onChangeText={val => this.updateInputVal(val, 'password')}
                  />
                  <Icon
                    name={this.state.iconCurrent}
                    onPress={() => this.VisibleEyeCurrent()}
                  />
                </Item>
              </Form>
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.Update}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
              </View>
            </Content>
          </View>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 20,
    position: 'relative',
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    width: '100%',
  },

  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 500,
    marginRight: 140,
    alignSelf: 'center',
  },
  header: {
    //backgroundColor: '#00BFFF',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    //padding: 40,
    marginBottom: 50,
    marginTop: 20,
  },
  name: {
    fontSize: 28,
    color: '#000',
    fontWeight: '600',
  },
  phone: {
    marginTop: 10,
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
  },
  email: {
    marginTop: 10,
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
  },
});
