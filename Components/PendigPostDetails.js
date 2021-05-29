import React, { Component } from 'react';
import {View,  TouchableOpacity,  Image,Modal, Dimensions, Alert,StyleSheet,ImageBackground} from 'react-native';
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
import Loading from './Loading';
import Swiper from 'react-native-swiper';
var {width} = Dimensions.get('window');
import {ScrollView} from 'react-native-gesture-handler';


export default class PendigPostDetails extends Component {
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

  componentDidMount() {
  }

  onSuccess(){
    this.setState({
        isLoading: true,
      });
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
  
      var  updatePostedAt=year +'-' + ('0' + month).slice(-2) +'-' +('0' + date).slice(-2) +' ' + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2) +':' + ('0' + sec).slice(-2);
   
    firebase.firestore().collection('posts').doc(this.props.route.params.paramKey).update({Status:true,PostedAt:updatePostedAt}).then(()=>
    {
        this.props.navigation.navigate('PendingPost');
        Alert.alert("Successfully Published..!");
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
  }

  onDelete(){
      firebase.firestore().collection('posts').doc(this.props.route.params.paramKey).delete().then(()=>{
        this.props.navigation.navigate('PendingPost');
        Alert.alert("Successfully Removed..!");
          this.setState({
            isLoading: false,
          });
      })    .catch(error => {
        this.setState({
          isLoading: false,
          errorMessage: error.message,
        });
        Alert.alert(this.state.errorMessage);
      });
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
            <Container>
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
                />
              );
            })}
          </Swiper>
                    </TouchableOpacity>

          <View>    
            <Text style={styles.name}>{this.state.name} - {this.state.phone}</Text>
            
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
         </Card>
        </Content>
        <Text style={styles.name}>{this.state.category}</Text>
             <Text style={styles.name}>{this.state.location}</Text>
            <Text style={styles.name}>{this.state.postedAt}</Text>
            <Content >
                <View style={{flexDirection:'row'}}>
                  {this.state.status==false?
                  <Button success style={{marginTop:20,marginLeft:20}} onPress={()=>this.onSuccess()}><Text> Publish </Text></Button>:<Text></Text>}
                {/* <Button success style={{marginTop:20,marginLeft:20}} onPress={()=>this.onSuccess()}><Text> Publish </Text></Button> */}
                <Button danger style={{marginTop:20,marginLeft:20}} onPress={()=>this.onDelete()}><Text> Remove </Text></Button>
                </View>

            </Content>
            
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
        marginLeft:20
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
      imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 5,
        flex: 1,
      },
})


