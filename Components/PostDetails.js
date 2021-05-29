import React, { Component } from 'react';
import {View,   Linking, TouchableOpacity,TouchableWithoutFeedback,Modal, Dimensions, Alert,StyleSheet,ImageBackground} from 'react-native';
import {
    Container,
    Right,
    Left,
    Card,
    CardItem,
    Content,
    Icon,
    Text,
    Toast,
    Root,
    Header, Body,Button
  } from 'native-base';
import firebase from 'firebase';
import {FlatGrid} from 'react-native-super-grid';
import Loading from './Loading';
import Swiper from 'react-native-swiper';
import TimeAgo from './TimeAgo1';
var {width} = Dimensions.get('window');
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
import Image from 'react-native-image-progress';
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';


export default class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:'',
            desc:'',
            imageFile:'',
            imageFile1:'',
            imageFile2:'',
            location:'',
            name:'',
            phone:'',
            postedAt:'',
            price:'',
            isLoading: true,
            PhotoList: [],
            Id:'',
            status:false,
            errorMessage:'',
            DataList:[],
            indexValue:'',
          }
          firebase
          .firestore()
          .collection('posts')
          .doc(props.route.params.paramKey)
          .get()
          .then(doc => {
            this.setState({
                category: doc.data().Category,
                desc:doc.data().Description,
                imageFile:doc.data().ImageFile,
                imageFile1:doc.data().ImageFile1,
                imageFile2:doc.data().ImageFile2,
                location: doc.data().Location,
                name:doc.data().Name,
                phone:doc.data().Phone,
                postedAt:doc.data().PostedAt,
                price:doc.data().Price,
                title:doc.data().Title,
                status:doc.data().Status,
                Id:doc.id,
              isLoading:false
            })
          })
          .catch(err => {
            Alert.alert(err);
          });
    
          
      }

     async shareIt(){
        const options={
          message:'Hello World',
        }
     await Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
      }
    
      dialCall = () => {
        let phoneNumber = '';
          console.log(Platform.OS);
          phoneNumber = 'tel:' + this.state.phone;
        Linking.openURL(phoneNumber);
      };

    async  getData(DataRetreived){

        var DataList=[];
        var indexValue;
       await firebase.firestore()
        .collection('posts')
        .where('Category', '==',this.props.route.params.paramKey1)
        .where('Status','==',true)
        .orderBy('PostedAt','desc')
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              const DataItem = doc.data();
              DataItem.id = doc.id;
              DataList.push(DataItem);
            });
            this.setState({
              indexValue:DataList.findIndex(x=>x.id==this.props.route.params.paramKey)
            })
            DataList.splice(this.state.indexValue,1);
            DataRetreived(DataList);
          });
          console.log(this.state.indexValue,"abc");
      }
      
      onDataReceived = DataList => {
        this.setState(prevState => ({
          DataList: (prevState.DataList = DataList),
          PhotoList:[],
          isLoading: false,
        }));
      };

      componentDidMount() {
         this.getData(this.onDataReceived);
      }
      componentWillMount(){
       // this.getData(this.onDataReceived);
      }
      componentWillUnmount(){
        //this.getData(this.onDataReceived);
      }
      componentDidUpdate(){
        //this.getData(this.onDataReceived);
      }
      
    
      render() {

        if(this.state.imageFile!=""){
            this.state.PhotoList.push(this.state.imageFile);
        }
        if(this.state.imageFile1!=""){
            this.state.PhotoList.push(this.state.imageFile1);
        }
        if(this.state.imageFile2!=""){
            this.state.PhotoList.push(this.state.imageFile2);
        }
        if (this.state.isLoading) {
            return <Loading />;
          } else{   
            return (
                <Container style={{backgroundColor:'#e5e5e5'}}>
                    <ScrollView>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate('Gallery',{paramKeyImage:this.state.imageFile,paramKeyImage1:this.state.imageFile1,paramKeyImage2:this.state.imageFile2})
                          }>
                        <Swiper
                style={{height: width / 2}}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={5}
                key={this.state.PhotoList.length}>
                {this.state.PhotoList.map(itemBanner => {
                  return (
                    <Image
                      style={styles.imageBanner}
                      resizeMode="contain"
                      source={{uri: itemBanner}}
                      key={Image.id}
                      indicator={Progress.Circle}
                    />
                  );
                })}
              </Swiper>
                        </TouchableOpacity>
    
              <View>    
                {/* <Text style={styles.name}>{this.state.name} - {this.state.phone}</Text> */}
                
            <Content >
              <Card >
                <CardItem header>
                <Text style={{fontSize:28,color:'#696969',fontWeight: '600'}}>{this.state.title}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                  <Text style={{fontSize:16,color:'#696969',fontWeight: '600',textAlign:'left'}}>{this.state.desc} </Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                <Text style={{fontSize:20,color:'#696969',fontWeight: '600'}}>Rs. {this.state.price} </Text>
                </CardItem>
                <CardItem footer>
                  <Left>
                  <Entypo name="location-pin" size={30} color="#F02A4B"/> 
                  <Text style={styles.name}>{this.state.location}</Text>
                  </Left>
                  
                  <Right>
                        <View style={{marginBottom:5}}>
                          <TouchableWithoutFeedback onPress={this.shareIt}>
                            <View style={[styles.button, styles.secondary]}>
                              <Entypo name="share" size={20} color="#F02A4B" />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        {this.props.route.params.paramKey2==firebase.auth().currentUser.uid?
                        <Text></Text>:
                        <View>
                          <TouchableWithoutFeedback onPress={this.dialCall}>
                            <View style={[styles.button, styles.secondary]}>
                              <Entypo name="phone" size={20} color="#F02A4B" />
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                        }
                        
                  </Right>
                </CardItem>
             </Card>

             <Card >
                <CardItem header>
                <Text style={{fontSize:28,color:'#696969',fontWeight: '600'}}>RELATED POST</Text>
                </CardItem>

             </Card>
            </Content>
            {this.state.DataList.length > 0 ? (
                          <FlatList
                          itemDimension={130}
                          data={this.state.DataList}
                          style={styles.gridView}
                          renderItem={({item, rowItemIndex}) => (
                            <TouchableOpacity onPress={()=>this.props.navigation.push('Post',{paramKey:item.id,paramKey1:item.Category,paramKey2:item.ID})}>
                            <View>
                              <Content>
                               
                                <Card style={{borderRadius: 5}}>
                                  <CardItem cardBody>
                                    {/* <TouchableOpacity
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
                                      }> */}
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
            ):(
              <View style={styles.textContainer}>
            <Text style={styles.emptyTitle}>No Results Found</Text>
          </View>
            )}

            {/* <Text style={styles.name}>{this.state.category}</Text> */}

                {/* <Text style={styles.name}>{this.state.postedAt}</Text>
                <Content >
                    <View style={{flexDirection:'row'}}>
                      {this.state.status==false?
                      <Button success style={{marginTop:20,marginLeft:20}} onPress={()=>this.onSuccess()}><Text> Publish </Text></Button>:<Text></Text>}
                    <Button danger style={{marginTop:20,marginLeft:20}} onPress={()=>this.onDelete()}><Text> Remove </Text></Button>
                    </View>
    
                </Content> */}
                
               </View>
                </ScrollView>
                </Container>
                
                
        );
        }
      }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        color: '#696969',
        fontWeight: '600',
       // marginLeft:20
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
      itemContainer: {
        justifyContent: 'flex-end',
        //borderRadius: 5,
        padding: 93,
        height: 200,
        width:'100%'
      },
      imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 5,
        flex: 1,
      },
      textContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 20,
        marginBottom: 16,
      },
      button: {
       // position: 'absolute',
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
      secondary: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#000',
      },
})
