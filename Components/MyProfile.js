import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import Account from './Account';
import Loading from './Loading';
import EditProfile from './EditProfile';
import EditEmail from './EditEmail';
import ChangePassword from './ChangePassword';
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
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isReady: false,
      Back: '',
      name: '',
      phone: '',
      email: '',
      isEditProfile: false,
      isEditEmail: false,
      isChangePassword: false,
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
          ImageFile: doc.data().ImageFile,
          email: user.email,
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
  componentDidMount() {
    setTimeout(() => this.setState({isReady: true}), 500);
  }
  onEditProfile = () => {
    this.setState({
      isEditProfile: true,
    });
  };
  onEditEmail = () => {
    this.setState({
      isEditEmail: true,
    });
  };
  onChangePassword = () => {
    this.setState({
      isChangePassword: true,
    });
  };
  render() {
    if (this.state.Back === true) {
      return <Account />;
    } else {
      if (this.state.isLoading) {
        return <Loading />;
      } else {
        if (this.state.isEditProfile === true) {
          return <EditProfile />;
        } else if (this.state.isEditEmail === true) {
          return <EditEmail />;
        } else if (this.state.isChangePassword === true) {
          return <ChangePassword />;
        } else {
          return (
            <Container>
              <View style={styles.container}>
                {this.state.ImageFile ? (
                  <ImageBackground
                    source={{uri: this.state.ImageFile}}
                    style={{}}>
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
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}>{this.state.name}</Text>

                    <Text style={styles.email}>
                      <Ionicons
                        style={styles.emailIcon}
                        size={18}
                        name="ios-mail"
                      />
                      {'  ' + this.state.email}
                    </Text>
                    <Text style={styles.phone}>
                      <FontAwesome
                        style={styles.emailIcon}
                        size={18}
                        name="phone"
                      />
                      {'  ' + this.state.phone}
                    </Text>
                  </View>
                </View>
                <Content style={{marginTop: 80}}>
                  <ListItem itemDivider />
                  <ListItem icon>
                    <Left>
                      <Button
                        style={{backgroundColor: '#000', borderRadius: 75}}>
                        <MaterialCommunityIcons
                          name="account"
                          size={24}
                          color={'red'}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <TouchableOpacity
                        //onPress={this.onEditProfile}
                        onPress={() =>
                          this.props.navigation.navigate('EditProfile')
                        }>
                        <Text>Edit Profile</Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EditProfile')
                        }>
                        <Icon active name="arrow-forward" />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button
                        style={{backgroundColor: '#000', borderRadius: 75}}>
                        <Ionicons
                          active
                          name="ios-mail"
                          size={20}
                          color={'red'}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EditEmail')
                        }>
                        <Text>Edit Email</Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EditEmail')
                        }>
                        <Icon active name="arrow-forward" />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button
                        style={{backgroundColor: '#000', borderRadius: 75}}>
                        <Entypo active name="key" size={20} color={'red'} />
                      </Button>
                    </Left>
                    <Body>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ChangePassword')
                        }>
                        <Text>Change Password</Text>
                      </TouchableOpacity>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('ChangePassword')
                        }>
                        <Icon active name="arrow-forward" />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                </Content>
              </View>
            </Container>
          );
        }
      }
    }
  }
}

const styles = StyleSheet.create({
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
  // emailIcon: {
  //   color: '#696969',
  //   marginLeft: 10,
  // },
});
