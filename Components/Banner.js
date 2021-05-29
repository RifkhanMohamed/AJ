import React, {Component} from 'react';
import {View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,} from 'react-native';
  import {Colors} from 'react-native/Libraries/NewAppScreen';
import Account from './Account';
import Loading from './Loading';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
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

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      ImageUri: '',
      fileStorage: '',
      isLoading: '',
      isReady: false,
      Back: '',
    };
    var user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({id: doc.id});
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
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('../Assets/Logo.jpg')} style={styles.images} />
      );
    }
  }

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
    var data = {
      ImageFile: remoteUri,
    };
    firebase
      .firestore()
      .collection('BannerPhotos')
      .doc()
      .set(data)
      .then(() => {
        Alert.alert('Successfully Posted...');
        this.setState({
          isLoading: false,
          fileData: '',
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

  uploadPhoto = async uri => {
    this.setState({
      isLoading: true,
    });
    var user = firebase.auth().currentUser;
    const path = `Banner/${user.uid}/${Date.now()}.jpg`;
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
                  <View style={styles.body}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        paddingBottom: 10,
                      }}>
                      Pick Images from Camera or Gallery
                    </Text>
                    <View style={styles.ImageSections}>
                      <View
                        onValueChange={val =>
                          this.updateInputVal(val, 'fileData')
                        }>
                        {this.renderFileData()}
                      </View>
                    </View>

                    <View style={styles.btnParentSection}>
                      <TouchableOpacity
                        onPress={this.chooseImage}
                        style={styles.btnSection}>
                        <Text style={styles.btnText}>Choose File</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnParentSection}>
                      <TouchableOpacity
                        onPress={this.Submit}
                        style={styles.buttonContainer}>
                        <Text style={styles.SubmitbuttonText}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    borderColor: 'black',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
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
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  SubmitbuttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#3B3B98',
    padding: 15,
    borderRadius: 8,
  },
  buttonContainer1: {
    alignSelf: 'stretch',
    margin: 10,
  },
  button: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#A0A0A0',
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 16,
  },
});