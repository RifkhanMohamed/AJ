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
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isReady: false,
      Back: '',
      email: '',
      ImageFile: '',
      CurrentPassword: '',
      NewPassword: '',
      ConfirmPassword: '',
      iconCurrent: 'eye-off',
      iconNew: 'eye-off',
      iconConfirm: 'eye-off',
      PasswordCurrent: true,
      PasswordNew: true,
      PasswordConfirm: true,
    };
    var user = firebase.auth().currentUser;
    firebase
    .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          ImageFile: doc.data().ImageFile,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }
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
    this.reauthenticate(this.state.CurrentPassword)
      .then(() => {
        if (this.state.NewPassword === this.state.ConfirmPassword) {
          var user = firebase.auth().currentUser;
          user
            .updatePassword(this.state.NewPassword)
            .then(() => {
              Alert.alert('Password Changed...!');
              this.setState({
                isLoading: false,
                CurrentPassword: '',
                NewPassword: '',
                ConfirmPassword: '',
              });
            })
            .catch(error => {
              Alert.alert(error.message);
              this.setState({
                isLoading: false,
                CurrentPassword: '',
                NewPassword: '',
                ConfirmPassword: '',
              });
            });
        } else {
          Alert.alert('Not matched New Password and Confirm Password');
          this.setState({
            isLoading: false,
            CurrentPassword: '',
            NewPassword: '',
            ConfirmPassword: '',
          });
        }
      })
      .catch(error => {
        Alert.alert(error.message);
        this.setState({
          isLoading: false,
        });
      });
  };
  VisibleEyeCurrent = () => {
    this.setState(prevState => ({
      iconCurrent: prevState.iconCurrent === 'eye' ? 'eye-off' : 'eye',
      PasswordCurrent: !prevState.PasswordCurrent,
    }));
  };
  VisibleEyeNew = () => {
    this.setState(prevState => ({
      iconNew: prevState.iconNew === 'eye' ? 'eye-off' : 'eye',
      PasswordNew: !prevState.PasswordNew,
    }));
  };
  VisibleEyeConfirm = () => {
    this.setState(prevState => ({
      iconConfirm: prevState.iconConfirm === 'eye' ? 'eye-off' : 'eye',
      PasswordConfirm: !prevState.PasswordConfirm,
    }));
  };
  componentDidMount() {
    setTimeout(() => this.setState({isReady: true}), 500);
  }
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
                <Item floatingLabel>
                  <Label>Current Password</Label>
                  <Input
                    value={this.state.CurrentPassword}
                    secureTextEntry={this.state.PasswordCurrent}
                    onChangeText={val =>
                      this.updateInputVal(val, 'CurrentPassword')
                    }
                  />
                  <Icon
                    name={this.state.iconCurrent}
                    onPress={() => this.VisibleEyeCurrent()}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>New Password</Label>
                  <Input
                    value={this.state.NewPassword}
                    secureTextEntry={this.state.PasswordNew}
                    onChangeText={val =>
                      this.updateInputVal(val, 'NewPassword')
                    }
                  />
                  <Icon
                    name={this.state.iconNew}
                    onPress={() => this.VisibleEyeNew()}
                  />
                </Item>
                <Item floatingLabel>
                  <Label>Confirm Password</Label>
                  <Input
                    value={this.state.ConfirmPassword}
                    secureTextEntry={this.state.PasswordConfirm}
                    onChangeText={val =>
                      this.updateInputVal(val, 'ConfirmPassword')
                    }
                  />
                  <Icon
                    name={this.state.iconConfirm}
                    onPress={() => this.VisibleEyeConfirm()}
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
