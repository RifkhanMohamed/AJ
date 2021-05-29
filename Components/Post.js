import React, {Component} from 'react';
import firebase from 'firebase';
//import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  DatePicker,
  Toast,
  Root,
} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loading from './Loading';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default () => (
  <Root>
    <Post />
  </Root>
);

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: 'Bikes',
      selected3: 'Ampara',
      chosenDate: new Date(),
      Title: '',
      Description: '',
      Price: '',
      id: '',
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileData1: '',
      fileData2: '',
      fileUri: '',
      fileUri1: '',
      fileUri2: '',
      ImageUri: '',
      fileStorage: '',
      PostedAt: '',
      isLoading: '',
      Phone: '',
    };
    this.setDate = this.setDate.bind(this);
    var user = firebase.auth().currentUser;
    firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          id: doc.id,
          Phone: doc.data().phone,
          Name: doc.data().name,
        });
      });
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      PostedAt:
        year +
        '-' +
        ('0' + month).slice(-2) +
        '-' +
        ('0' + date).slice(-2) +
        ' ' +
        ('0' + hours).slice(-2) +
        ':' +
        ('0' + min).slice(-2) +
        ':' +
        ('0' + sec).slice(-2),
    });
  }


  chooseImage = () => {
    let options = {
      title: 'Select Image',
      // customButtons: [
      //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      // ],
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
      }
      //else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
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
  chooseImage1 = () => {
    let options = {
      title: 'Select Image',
      // customButtons: [
      //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      // ],
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
      }
      //else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,

          fileData1: response.data,

          fileUri1: response.uri,
        });
      }
    });
  };
  chooseImage2 = () => {
    let options = {
      title: 'Select Image',
      // customButtons: [
      //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      // ],
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
      }
      //else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,

          fileData2: response.data,

          fileUri2: response.uri,
        });
      }
    });
  };
  renderFileData() {
    if (this.state.fileData) {
      return (
        <ImageBackground
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}>
          <TouchableOpacity onPress={this.ImageClose}>
            <View style={{alignItems: 'flex-end'}}>
              <AntDesign name="closecircle" size={24} color={'red'} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  renderFileData1() {
    if (this.state.fileData1) {
      return (
        <ImageBackground
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData1}}
          style={styles.images}>
          <TouchableOpacity onPress={this.ImageClose1}>
            <View style={{alignItems: 'flex-end'}}>
              <AntDesign name="closecircle" size={24} color={'red'} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  renderFileData2() {
    if (this.state.fileData2) {
      return (
        <ImageBackground
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData2}}
          style={styles.images}>
          <TouchableOpacity onPress={this.ImageClose2}>
            <View style={{alignItems: 'flex-end'}}>
              <AntDesign name="closecircle" size={24} color={'red'} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  ImageClose = () => {
    this.setState({
      fileData: '',
      fileUri: '',
    });
  };
  ImageClose1 = () => {
    this.setState({
      fileData1: '',
      fileUri1: '',
    });
  };
  ImageClose2 = () => {
    this.setState({
      fileData2: '',
      fileUri2: '',
    });
  };
  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  renderFileUri1() {
    if (this.state.fileUri1) {
      return (
        <Image source={{uri: this.state.fileUri1}} style={styles.images} />
      );
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  renderFileUri2() {
    if (this.state.fileUri2) {
      return (
        <Image source={{uri: this.state.fileUri2}} style={styles.images} />
      );
    } else {
      return (
        <Image source={require('../Assets/camera.png')} style={styles.images} />
      );
    }
  }
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }
  onValueChange3(value) {
    this.setState({
      selected3: value,
    });
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  Submit = async () => {
    this.componentDidMount();
    if (
      this.state.Title === '' ||
      this.state.selected2 === '' ||
      this.state.selected3 === '' ||
      this.state.Description === '' ||
      this.state.Price === '' ||
      this.chosenDate === ''
    ) {
      // Alert.alert('Enter details to Post!');
      Toast.show({
        text: 'Enter details to Post!',
        type: 'danger',
      });
    } else if (this.state.fileUri === '') {
      Toast.show({
        text: 'You should add 1st Image!',
        type: 'danger',
      });
    } else {
      const remoteUri = await this.uploadPhoto(this.state.fileUri);
      const remoteUri1 = await this.uploadPhoto(this.state.fileUri1);
      const remoteUri2 = await this.uploadPhoto(this.state.fileUri2);
      console.log(this.state.fileUri,this.state.fileUri1,this.state.fileUri2);
      if(this.state.fileUri1==""&&this.state.fileUri2==""){
        var data = {
          Title: this.state.Title,
          Description: this.state.Description,
          Price: this.state.Price,
          Date: this.state.chosenDate,
          Location: this.state.selected3,
          ID: this.state.id,
          ImageFile: remoteUri,
          ImageFile1: "",
          ImageFile2: "",
          //CreatedAt: firebase.firestore().FieldValue.serverTimestamp(),
          PostedAt: this.state.PostedAt,
          Phone: this.state.Phone,
          Name: this.state.Name,
          Category: this.state.selected2, 
          Status: false
        };
      }
      if(this.state.fileUri1!=""&&this.state.fileUri2!=""){
        var data = {
          Title: this.state.Title,
          Description: this.state.Description,
          Price: this.state.Price,
          Date: this.state.chosenDate,
          Location: this.state.selected3,
          ID: this.state.id,
          ImageFile: remoteUri,
          ImageFile1: remoteUri1,
          ImageFile2: remoteUri2,
          //CreatedAt: firebase.firestore().FieldValue.serverTimestamp(),
          PostedAt: this.state.PostedAt,
          Phone: this.state.Phone,
          Name: this.state.Name,
          Category: this.state.selected2, 
          Status: false
        };
      }
      if(this.state.fileUri1!=""&&this.state.fileUri2==""){
        var data = {
          Title: this.state.Title,
          Description: this.state.Description,
          Price: this.state.Price,
          Date: this.state.chosenDate,
          Location: this.state.selected3,
          ID: this.state.id,
          ImageFile: remoteUri,
          ImageFile1: remoteUri1,
          ImageFile2: "",
          //CreatedAt: firebase.firestore().FieldValue.serverTimestamp(),
          PostedAt: this.state.PostedAt,
          Phone: this.state.Phone,
          Name: this.state.Name,
          Category: this.state.selected2, 
          Status: false
        };
      }
      if(this.state.fileUri1==""&&this.state.fileUri2!=""){
        var data = {
          Title: this.state.Title,
          Description: this.state.Description,
          Price: this.state.Price,
          Date: this.state.chosenDate,
          Location: this.state.selected3,
          ID: this.state.id,
          ImageFile: remoteUri,
          ImageFile1: "",
          ImageFile2: remoteUri2,
          //CreatedAt: firebase.firestore().FieldValue.serverTimestamp(),
          PostedAt: this.state.PostedAt,
          Phone: this.state.Phone,
          Name: this.state.Name,
          Category: this.state.selected2, 
          Status: false
        };
      }

      firebase.firestore()
        .collection('posts')
        .doc()
        .set(data)
        .then(() => {
          Toast.show({
            text: 'Your post will be publish after verification...',
            type: 'success',
          });
          this.setState({
            isLoading: false,
            Title: '',
            Description: '',
            Price: '',
            chosenDate: '',
            fileData: '',
            fileData1: '',
            fileData2: '',
            selected3:'',
            fileUri:'',
            fileUri1:'',
            fileUri2:'',
            PostedAt:'',
            selected2:'',

          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            errorMessage: error.message,
          });
          Toast.show({
            text: this.state.errorMessage,
            buttonText: 'Okay',
            type: 'danger',
            duration: 10000,
          });
        });
      //   firebase.firestore()
      //   .collection('Home')
      //   .doc()
      //   .set(data);
      // var user = firebase.auth().currentUser;
      // firebase.firestore()
      //   .collection(user.uid)
      //   .doc()
      //   .set(data);
    }
  };
  uploadPhoto = async uri => {
    if (uri) {
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
    }
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <Container>
            <ScrollView>
              <Form>
                <Item picker style={{margin: 20}}>
                  <Text style={{margin: 10}}>Category : </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Category"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={val =>
                      this.updateInputVal(val, 'selected2')
                    }>
                    <Picker.Item label="Bikes" value="Bikes" />
                    <Picker.Item label="Books" value="Books" />
                    <Picker.Item label="Cosmetics" value="Cosmetics" />
                    <Picker.Item
                      label="Delivery Service"
                      value="Delivery Service"
                    />
                    <Picker.Item label="Education" value="Education" />
                    <Picker.Item label="Electronics" value="Electronics" />
                    <Picker.Item
                      label="Food & Restaurants"
                      value="Food & Restaurants"
                    />
                    <Picker.Item label="Gifts" value="Gifts" />
                    <Picker.Item label="Home Needs" value="Home Needs" />
                    <Picker.Item label="Jewelry" value="Jewelry" />
                    <Picker.Item label="Job" value="Job" />
                    <Picker.Item label="Kid's Fashion" value="Kids Fashion" />
                    <Picker.Item label="Medical" value="Medical" />
                    <Picker.Item label="Men's Fashion" value="Mens Fashion" />
                    <Picker.Item
                      label="Mobile & Accessories"
                      value="Mobile & Accessories"
                    />
                    <Picker.Item label="Others" value="Others" />
                    <Picker.Item label="Pets" value="Pets" />
                    <Picker.Item label="Properties" value="Properties" />
                    <Picker.Item label="Services" value="Services" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Transport" value="Transport" />
                    <Picker.Item label="Vehicles" value="Vehicles" />
                    <Picker.Item
                      label="Women's Fashion"
                      value="Womens Fashion"
                    />
                  </Picker>
                </Item>
                <Item picker style={{margin: 20}}>
                  <Text style={{margin: 10}}>Location : </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{width: undefined}}
                    placeholder="Location"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected3}
                    onValueChange={val =>
                      this.updateInputVal(val, 'selected3')
                    }>
                    <Picker.Item label="Ampara" value="Ampara" />
                    <Picker.Item label="Anuradhapura" value="Anuradhapura" />
                    <Picker.Item label="Badulla" value="Badulla" />
                    <Picker.Item label="Batticaloa" value="Batticaloa" />
                    <Picker.Item label="Colombo" value="Colombo" />
                    <Picker.Item label="Galle" value="Galle" />
                    <Picker.Item label="Gampaha" value="Gampaha" />
                    <Picker.Item label="Hambantota" value="Hambantota" />
                    <Picker.Item label="Jaffna" value="Jaffna" />
                    <Picker.Item label="Kalutara" value="Kalutara" />
                    <Picker.Item label="Kandy" value="Kandy" />
                    <Picker.Item label="Kattankudy" value="Kattankudy" />
                    <Picker.Item label="Kegalle" value="Kegalle" />
                    <Picker.Item label="Kilinochchi" value="Kilinochchi" />
                    <Picker.Item label="Kurunegala" value="Kurunegala" />
                    <Picker.Item label="Mannar" value="Mannar" />
                    <Picker.Item label="Matale" value="Matale" />
                    <Picker.Item label="Matara" value="Matara" />
                    <Picker.Item label="Monaragala" value="Monaragala" />
                    <Picker.Item label="Mullaitivu" value="Mullaitivu" />
                    <Picker.Item label="Nuwara Eliya" value="Nuwara Eliya" />
                    <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
                    <Picker.Item label="Puttalam" value="Puttalam" />
                    <Picker.Item label="Ratnapura" value="Ratnapura" />
                    <Picker.Item label="Trincomalee" value="Trincomalee" />
                    <Picker.Item label="Vavuniya" value="Vavuniya" />
                  </Picker>
                </Item>
                <Item floatingLabel style={{margin: 10}}>
                  <Label>Title</Label>
                  <Input
                    value={this.state.Title}
                    onChangeText={val => this.updateInputVal(val, 'Title')}
                  />
                </Item>
                <Item floatingLabel style={{margin: 10}}>
                  <Label>Description (max 250 letters)</Label>
                  <Input
                    value={this.state.Description}
                    multiline={true}
                    onChangeText={val =>
                      this.updateInputVal(val, 'Description')
                    }
                  />
                </Item>
                <Item floatingLabel style={{margin: 10}}>
                  <Label>Selling Price</Label>
                  <Input
                    value={this.state.Price}
                    keyboardType={'numeric'}
                    onChangeText={val => this.updateInputVal(val, 'Price')}
                  />
                </Item>
                <Item style={{margin: 10}}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        new Date().getDate(),
                      )
                    }
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="Select date (You can post max 1 month)"
                    textStyle={{color: 'green'}}
                    placeHolderTextStyle={{color: '#d3d3d3'}}
                    onDateChange={this.setDate}
                    onValueChange={val =>
                      this.updateInputVal(val, 'chosenDate')
                    }
                    disabled={false}
                  />
                </Item>
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
                    <TouchableOpacity onPress={this.chooseImage}>
                      <View
                        onValueChange={val =>
                          this.updateInputVal(val, 'fileData')
                        }>
                        {this.renderFileData()}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.chooseImage1}>
                      <View
                        onValueChange={val =>
                          this.updateInputVal(val, 'fileData1')
                        }>
                        {this.renderFileData1()}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.chooseImage2}>
                      <View
                        onValueChange={val =>
                          this.updateInputVal(val, 'fileData2')
                        }>
                        {this.renderFileData2()}
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={styles.btnParentSection}>
                    <TouchableOpacity
                      onPress={this.chooseImage}
                      style={styles.btnSection}>
                      <Text style={styles.btnText}>Choose File</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View style={styles.btnParentSection}>
                    <TouchableOpacity
                      onPress={this.Submit}
                      style={styles.buttonContainer}>
                      <Text style={styles.SubmitbuttonText}>Post your Ad</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Form>
            </ScrollView>
          </Container>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    
  },
  containerBody: {
    flex: 100,
    justifyContent: 'center',
    //alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    //justifyContent: 'center',
    borderColor: 'black',
    //borderWidth: 1,
    // height: Dimensions.get('screen').height - 20,
    // width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 8,
    //justifyContent: 'center',
  },
  images: {
    width: 100,
    height: 100,
    //borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 10,
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
});
