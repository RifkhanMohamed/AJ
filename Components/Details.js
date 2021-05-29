import React, {Component} from 'react';
import {Text, View,Alert, Image,FlatList, StyleSheet,ImageBackground} from 'react-native';
import firebase from 'firebase';
import Loading from './Loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Left,
  Button,
  Icon,
  Content,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
// var admin=require('firebase-admin');
// var serviceAccount=require('./marketingproject-617fd-firebase-adminsdk-fll3r-d23dab1e00.json');
// admin.initializeApp({
//   credential:admin.credential.cert(serviceAccount),
//   databaseURL: "https://marketingproject-617fd.firebaseio.com"
// })

export default class Details extends Component {
  constructor(props) {
    super(props);
//console.log(props);
    this.state = {
      name:'',
      phone:'',
      mail:'',
      image:'',
      created:'',
      isAdmin:false,
      isLoading: true,
      DataList: [],
    }
    firebase
    .firestore()
    .collection('users')
    .doc(props.route.params.paramKey)
    .get()
    .then(doc => {
      this.setState({
        name: doc.data().name,
        phone:doc.data().phone,
        mail:doc.data().email,
        image:doc.data().ImageFile,
        created:doc.data().created,
        isAdmin:doc.data().isAdmin,
        isLoading:false
      })
        // console.log(doc.data());

    })
    .catch(err => {
      Alert.alert(err);
    });


}

// onDataReceived = DataList => {
//   this.setState(prevState => ({
//     DataList: (prevState.DataList = DataList),
//     isLoading: false,
//   }));
// };

getData(DataRetreived){
  var DataList=[];
  firebase.firestore()
  .collection('posts')
  .where('ID', '==',this.props.route.params.paramKey)
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

onDataReceived = DataList => {
  this.setState(prevState => ({
    DataList: (prevState.DataList = DataList),
    isLoading: false,
  }));
};

FlatListItemSeparator = () => {
  return (
    //Item Separator
    <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
  );
};
GetItem(item) {
  //Function for click on an item
  Alert.alert(item);
}

componentDidMount() {
 this.getData(this.onDataReceived);
}
// componentDidUpdate(){
//   this.getData();
// }


makeAdmin(){
  this.setState({
      isLoading: true,
    });
 
  firebase.firestore().collection('users').doc(this.props.route.params.paramKey).update({isAdmin:true}).then(()=>
  {
    this.props.navigation.navigate('UserDetails');
      Alert.alert("Successfully Maked Admin..!");
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

removeAdmin(){
  this.setState({
      isLoading: true,
    });
    if(this.props.route.params.paramKey1){
      this.props.navigation.navigate('Admin');
    }
    else{
      this.props.navigation.navigate('UserDetails');
    }
    
  firebase.firestore().collection('users').doc(this.props.route.params.paramKey).update({isAdmin:false}).then(()=>
  {
      Alert.alert("Successfully Remove from Admin..!");
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

render() {
  if (this.state.isLoading) {
    return <Loading />;
  } else{
    return (

                <Container>
                        <View >
        {this.state.image ? (
                <ImageBackground
                  source={{uri: this.state.image}}
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
        <Text style={styles.name}>Name     :   {this.state.name}</Text>
        <Text style={styles.name}>Phone    :   {this.state.phone}</Text>
        <Text style={styles.name}>E-mail    :   {this.state.mail}</Text>
              <Text style={styles.name}>Created :   {this.state.created} </Text>
              {this.state.isAdmin?
              <Button danger style={{marginTop:20,position:'relative',alignSelf:'center'}} onPress={()=>this.removeAdmin()} ><Text> Remove from Admin </Text></Button>
              :
              <Button success style={{marginTop:20,position:'relative',alignSelf:'center'}} onPress={()=>this.makeAdmin()} ><Text> Make Admin </Text></Button>
              }
              
      </View>
                <ScrollView>
              <View style={styles.MainContainer}>
                <FlatList
                  data={this.state.DataList}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({item}) => (
                    <Content>
                      <List>
                      <TouchableOpacity onPress={() =>
                          this.props.navigation.navigate('PendingPostDetails',{paramKey:item.id})
                          
                        }>
                        <ListItem thumbnail>
                          <Left>
                            <Thumbnail square source={{uri: item.ImageFile}} />
                          </Left>
                          <Body>
                            <Text>{item.Title}</Text>
                            <Text note numberOfLines={1}>
                              {item.Description}
                            </Text>
                            <Text>Rs {item.Price}</Text>
                          </Body>
                        </ListItem>
                        </TouchableOpacity>
                      </List>
                    </Content>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
                </ScrollView>
  
            </Container>
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
    //backgroundColor: 'rgba(52, 52, 52, 0.8)',
     height: 300,
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
    fontSize: 20,
    color: '#696969',
    fontWeight: '600',
  },
  deleteBtn:{
    alignItems:"center"
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
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 93,
    height: 250,
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


// export async function getData(DataRetreived) {
//   console.log(Details.props.route.params.paramKey);
//   var DataList = [];
//   firebase.firestore()
//   .collection('posts')
//   .where('ID', '==',Details.props.route.params.paramKey)
//   .orderBy('PostedAt','desc')
//     .get()
//     .then(snapshot => {
//       snapshot.docs.forEach(doc => {
//         const DataItem = doc.data();
//         DataItem.id = doc.id;
//         DataList.push(DataItem);
//       });
//       DataRetreived(DataList);
//     });
// }

