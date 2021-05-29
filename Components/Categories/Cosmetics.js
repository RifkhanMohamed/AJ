import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Linking,
  Platform,
  BackHandler,
} from 'react-native';
import {
  Container,
  Text,
  Right,
  Left,
  Card,
  CardItem,
  Content,
} from 'native-base';
import Gallery from 'react-native-image-gallery';
//import firestore from '@react-native-firebase/firestore';
import {FlatGrid} from 'react-native-super-grid';
import Loading from '../Loading';
import TimeAgo from '../TimeAgo1';
var {width} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class Cosmetics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      DataList: [],
      PhotoList: [],
      dataBanner: [],
      photos: [],
      isLoading: true,
      isReady: false,
      selectedIndex: 0,
      ID: '',
      ModelTitle: '',
      description: '',
      price: '',
      imageFile: '',
      imageFile1: '',
      imageFile2: '',
      location: '',
      postedAt: '',
      refreshing: false,
      Phone: '',
      id: '',
    };
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.wait(2000).then(() => {
      this.setState({
        refreshing: false,
      });
    });
    getData(this.onDataReceived);
  };

  wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  onDataReceived = DataList => {
    this.setState(prevState => ({
      DataList: (prevState.DataList = DataList),
      isLoading: false,
    }));
  };
  componentDidMount() {
    getData(this.onDataReceived);
    setTimeout(() => this.setState({isReady: true}), 1000);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  GoDetails = () => {
    this.setState({
      ModelShow: true,
    });
  };

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + this.state.Phone;
    } else {
      phoneNumber = 'telprompt:' + this.state.Phone;
    }

    Linking.openURL(phoneNumber);
  };

  renderContent = (
    id,
    ID,
    title,
    Description,
    Price,
    ImageFile,
    ImageFile1,
    ImageFile2,
    Location,
    PostedAt,
    Phone,
    Name,
  ) => {
    if (ImageFile1 =="" && ImageFile2 =="") {
      this.setState({
        id: id,
        ID: ID,
        ModelTitle: title,
        show: true,
        description: Description,
        price: Price,
        imageFile: ImageFile,
        imageFile1: ImageFile1,
        imageFile2: ImageFile2,
        photos: [
          {
            source: {
              uri: ImageFile,
            },
          },
        ],
        location: Location,
        postedAt: PostedAt,
        Phone: Phone,
        Name: Name,
        photoIndex: 0,
      });
    } else if (ImageFile1 =="") {
      this.setState({
        id: id,
        ID: ID,
        ModelTitle: title,
        show: true,
        description: Description,
        price: Price,
        imageFile: ImageFile,
        imageFile1: ImageFile1,
        imageFile2: ImageFile2,
        photos: [
          {
            source: {
              uri: ImageFile,
            },
          },
          {
            source: {
              uri: ImageFile2,
            },
          },
        ],
        location: Location,
        postedAt: PostedAt,
        Phone: Phone,
        Name: Name,
        photoIndex: 0,
      });
    } else if (ImageFile2 =="") {
      this.setState({
        id: id,
        ID: ID,
        ModelTitle: title,
        show: true,
        description: Description,
        price: Price,
        imageFile: ImageFile,
        imageFile1: ImageFile1,
        imageFile2: ImageFile2,
        photos: [
          {
            source: {
              uri: ImageFile,
            },
          },
          {
            source: {
              uri: ImageFile1,
            },
          },
        ],
        location: Location,
        postedAt: PostedAt,
        Phone: Phone,
        Name: Name,
        photoIndex: 0,
      });
    } else {
      this.setState({
        id: id,
        ID: ID,
        ModelTitle: title,
        show: true,
        description: Description,
        price: Price,
        imageFile: ImageFile,
        imageFile1: ImageFile1,
        imageFile2: ImageFile2,
        photos: [
          {
            source: {
              uri: ImageFile,
            },
          },
          {
            source: {
              uri: ImageFile1,
            },
          },
          {
            source: {
              uri: ImageFile2,
            },
          },
        ],
        location: Location,
        postedAt: PostedAt,
        Phone: Phone,
        Name: Name,
        photoIndex: 0,
      });
    }
  };

  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      //useNativeDriver: true,
    }).start();
    this.open = !this.open;
  };

  Navigation = () => {
    this.setState({
      show: false,
    });
    this.props.navigation.navigate('Chat', {
      toWhom: this.state.ID,
      toName: this.state.Name,
      toDocID: this.state.id,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return this.state.DataList.length > 0 ? (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <FlatGrid
            itemDimension={130}
            data={this.state.DataList}
            style={styles.gridView}
            renderItem={({item, rowItemIndex}) => (
              <View>
                <Content>
                  <Card style={{borderRadius: 5}}>
                    <CardItem cardBody>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          this.renderContent(
                            item.id,
                            item.ID,
                            item.Title,
                            item.Description,
                            item.Price,
                            item.ImageFile,
                            item.ImageFile1,
                            item.ImageFile2,
                            item.Location,
                            item.PostedAt,
                            item.Phone,
                            item.Name,
                          )
                        }>
                        <Image
                          style={styles.itemContainer}
                          source={{uri: item.ImageFile}}
                        />
                      </TouchableOpacity>
                    </CardItem>
                    <CardItem style={styles.CardItemTitle}>
                      <Left>
                        <Text style={{fontWeight: 'bold'}}>{item.Title}</Text>
                      </Left>
                    </CardItem>
                    <CardItem style={styles.CardItem}>
                      <Left>
                        <Text>Rs {item.Price}</Text>
                      </Left>
                      <Right>
                        <TimeAgo time={item.PostedAt} interval={2000} />
                      </Right>
                    </CardItem>
                  </Card>
                </Content>
              </View>
            )}
          />
          <Modal
            transparent={true}
            visible={this.state.show}
            animationType="fade"
            onRequestClose={() => {
              this.setState({show: false});
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({show: false});
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  flex: 1,
                }}>
                <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                  <ScrollView>
                    <View style={styles.modalView}>
                      {/* <Lightbox underlayColor="white">
                        <ImageBackground
                          style={styles.ImageContainer}
                          source={{uri: this.state.imageFile}}
                        />
                      </Lightbox> */}

                      <Gallery
                        style={styles.ImageContainer}
                        images={this.state.photos}
                      />

                      <Text style={{padding: 10, fontWeight: 'bold'}}>
                        Title: {this.state.ModelTitle}
                      </Text>
                      <Text style={{padding: 10, paddingEnd: 0}}>
                        Description: {this.state.description}
                      </Text>
                      <Text style={{padding: 10}}>
                        Price: Rs {this.state.price}
                      </Text>
                      <Text style={{padding: 10}}>
                        Location: {this.state.location}
                      </Text>
                      <Text style={{padding: 10}}>
                        PostedAt: {this.state.postedAt}
                      </Text>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          padding: 30,
                          marginBottom: 10,
                          marginRight: 10,
                        }}>
                        <View>
                          <TouchableWithoutFeedback onPress={this.dialCall}>
                            <View style={[styles.button, styles.secondary]}>
                              <Entypo name="phone" size={20} color="#F02A4B" />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        <View style={{marginRight: 50}}>
                          <TouchableWithoutFeedback onPress={this.Navigation}>
                            <View style={[styles.button, styles.secondary]}>
                              <Entypo
                                name="message"
                                size={20}
                                color="#F02A4B"
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </Container>
    ) : (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.textContainer}>
            <Text style={styles.emptyTitle}>No Results found</Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#ffffff',
    margin: 30,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    //borderRadius: 5,
    padding: 93,
    height: 200,
  },
  ImageContainer: {
    borderRadius: 5,
    height: 350,
    //width: 350,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  CardItem: {
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 0,
  },
  CardItemTitle: {
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 5,
    paddingBottom: 0,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  titleStyle: {
    fontSize: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  container1: {
    height: '100%',
    width: '100%',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    flex: 1,
  },
  modelCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    right: 40,
    //justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#000',
  },
});

export async function getData(DataRetreived) {
  var DataList = [];
  firebase.firestore()
    .collection('posts')
    .where('Category', '==','Cosmetics')
    .where('Status','==',true)
    .orderBy('PostedAt','desc')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        const DataItem = doc.data();
        DataItem.id = doc.id;
        DataList.push(DataItem);
      });
      DataRetreived(DataList);
    });
}
