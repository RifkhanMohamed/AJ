import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import firebase from 'firebase';
//import firestore from '@react-native-firebase/firestore';
import Loading from './Loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  ListItem,
  Content,
} from 'native-base';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      name: '',
      isAdmin: false,
      isAbout: false,
      isBanner: false,
      isPost: false,
      isProfile: false,
      show: false,
      Admin: '',
      ImageFile: '',
      isLoading: true,
    };
    var user = firebase.auth().currentUser;
    
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          name: doc.data().name,
          ImageFile: doc.data().ImageFile,
          isLoading: false,
        });
        if (
          // user.uid === 'xROkThQ0OASp8WCd6gbcdNE5n8j1' ||
          doc.data().isAdmin
        ) {
          this.setState({
            show: true,
          });
        }
      })
      .catch(err => {
        Alert.alert(err);
      });
  }

  componentDidMount() {
    setTimeout(() => this.setState({isReady: true}), 1000);
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
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
                </View>
              </View>
              <Content>
                <ListItem itemDivider />
                <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color={'red'}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('MyProfile')
                      }>
                      <Text>My Profile</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('MyProfile')
                      }>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <Entypo active name="megaphone" size={24} color={'red'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('MyPost')}>
                      <Text>My Posts</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('MyPost')}>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                <ListItem itemDivider />
                <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <Entypo active name="image" size={20} color={'red'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('BannerAdvertising')
                      }>
                      <Text>Banner Advertising</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('BannerAdvertising')
                      }>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <Entypo active name="info" size={20} color={'red'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('About')}>
                      <Text>About</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('About')}>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                {/* <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <Entypo active name="message" size={20} color={'red'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PersonalChat')
                      }>
                      <Text>Chat</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PersonalChat')
                      }>
                      <Icon active name="arrow-forward" />
                    </TouchableOpacity>
                  </Right>
                </ListItem> */}
                <ListItem itemDivider />
                <ListItem icon>
                  <Left>
                    <Button style={{backgroundColor: '#000', borderRadius: 75}}>
                      <Entypo active name="log-out" size={20} color={'red'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                      <Text>Logout</Text>
                    </TouchableOpacity>
                  </Body>
                </ListItem>

                {this.state.show ? (
                  <View style={styles.btnParentSection}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Admin')}
                      style={styles.btnSection}>
                      <Text style={styles.btnText}>Admin</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </Content>
            </View>
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
    color: '#696969',
    fontWeight: '600',
  },
});
