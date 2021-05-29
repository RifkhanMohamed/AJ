import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Linking,
  Platform,
  BackHandler,
  FlatList
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
// import firestore from '@react-native-firebase/firestore';
import {FlatGrid} from 'react-native-super-grid';
import Loading from './Loading';
import TimeAgo from './TimeAgo1';
var {width} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from 'firebase';
import Image from 'react-native-image-progress';
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';

export default class mainCategories extends Component {
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

      async  getData(DataRetreived){

        var DataList=[];
       await firebase.firestore()
        .collection('posts')
        .where('Category', '==',this.props.route.params.paramKey)
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
    
      onRefresh = () => {
        this.setState({
          refreshing: true,
        });
        this.wait(2000).then(() => {
          this.setState({
            refreshing: false,
          });
        });
        this.getData(this.onDataReceived);
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
        this.getData(this.onDataReceived);
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
    
      render()    {
         // const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

      // const y = new Animated.Value(0);
      // const onScroll = Animated.event([{nativeEvent:{contentOffset:{y}}}],{
      //   useNativeDriver:true,
      // })
  
    
  
      // const translateY = Animated.add(
      //   Animated.add(
      //     y,
      //     y.interpolate({
      //       inputRange:[0,0.00001+index]
      //     })
      //   )
      // )
  
      const phoneStyle = {
        transform: [
          {scale: this.animation},
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -60],
            }),
          },
        ],
      };
  
      const infoStyle = {
        transform: [
          {scale: this.animation},
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -120],
            }),
          },
        ],
      };
  
      const rotation = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg'],
            }),
          },
        ],
      };
  
      const opacity = this.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
      });
      if (this.state.isLoading) {
        return <Loading />;
      }
      return this.state.DataList.length > 0 ? (
        <Container style={{backgroundColor:'#e5e5e5'}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>

  
            <FlatList
              itemDimension={130}
              data={this.state.DataList}
              style={styles.gridView}
              renderItem={({ index,item}) => (
                
                <TouchableOpacity onPress={()=>this.props.navigation.push('Post',{paramKey:item.id,paramKey1:item.Category})}>
                <View>
                  <Content>
                   
                    <Card style={{borderRadius: 15}}>
                      <CardItem cardBody>
                          <Image
                            style={styles.itemContainer}
                            source={{uri: item.ImageFile}}
                            indicator={Progress.Circle}
                          />
                        {/* </TouchableOpacity> */}
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
                </TouchableOpacity>
              )}
            />
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
      width:'100%'
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
  


  