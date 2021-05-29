import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Account from './Account';
import Loading from './Loading';
import MyProfile from './MyProfile';
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
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isReady: false,
      created: '',
      LastSignIn: '',
      Back: '',
      name: '',
      phone: '',
      email: '',
      fileData: '',
      fileUri: '',
      ImageUri: '',
      fileStorage: '',
      ImageFile: '',
    };
    var user = firebase.auth().currentUser;
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          name: doc.data().name,
          phone: doc.data().phone,
          email: doc.data().email,
          created: doc.data().created,
          ImageFile: doc.data().ImageFile,
          LastSignIn: doc.data().LastSignIn,
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
  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.avatar}
        />
      );
    } else {
      if (this.state.ImageFile) {
        return (
          <Image source={{uri: this.state.ImageFile}} style={styles.avatar} />
        );
      } else {
        return (
          <Image
            source={require('../Assets/img_avatar.png')}
            style={styles.avatar}
          />
        );
      }
    }
  }
  uploadPhoto = async uri => {
    this.setState({
      isLoading: true,
    });
    var user = firebase.auth().currentUser;
    const path = `Photos/${user.uid}/${Date.now()}.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase
        .storage()
        .ref(path)
        .put(file);
      upload.on(
        'state_changed',
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        },
      );
    });
  };
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };
  Submit = async () => {
    const remoteUri = await this.uploadPhoto(this.state.fileUri);
    var user = firebase.auth().currentUser;
    var data = {
      ImageFile: remoteUri,
      //name: this.state.name,
      //phone: this.state.phone,
      //email: this.state.email,
      //created: this.state.created,
      //LastSignIn: this.state.LastSignIn,
    };
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .update(data)
      .then(() => {
        Alert.alert('Successfully Updated...');
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          errorMessage: error.message,
        });
        Alert.alert(this.state.errorMessage);
      });
  };
  BackButton = () => {
    this.setState({
      Back: true,
    });
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
            <View onValueChange={val => this.updateInputVal(val, 'fileData')}>
              {this.renderFileData()}
            </View>
            <View style={styles.add}>
              <TouchableOpacity onPress={this.chooseImage}>
                <Ionicons name="ios-camera" size={30} color="red" />
              </TouchableOpacity>
            </View>
            <ListItem itemDivider style={{marginTop: 40}} />
            <Content>
              <Form>
                <Item stackedLabel>
                  <Label>Name</Label>
                  <Input
                    value={this.state.name}
                    onChangeText={val => this.updateInputVal(val, 'name')}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Phone</Label>
                  <Input
                    value={this.state.phone}
                    onChangeText={val => this.updateInputVal(val, 'phone')}
                  />
                </Item>
              </Form>
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.Submit}
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
    backgroundColor: '#000',
    position: 'relative',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 100,
    marginTop: 140,
    alignSelf: 'center',
  },
  NameEdit: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 505,
    marginRight: 80,
    alignSelf: 'center',
  },
  PhoneEdit: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 450,
    marginRight: 80,
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
    borderColor: 'gray',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    //padding: 40,
    marginBottom: 50,
    marginTop: 170,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  phone: {
    marginTop: 20,
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
  },
});
