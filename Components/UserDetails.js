import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, View, Alert, Image} from 'react-native';
import Account from './Account';
import Loading from './Loading';
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
  Content,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isReady: false,
      Back: '',
      DataList: [],
    };
  }
  BackButton = () => {
    this.setState({
      Back: true,
    });
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
  onDataReceived = DataList => {
    this.setState(prevState => ({
      DataList: (prevState.DataList = DataList),
      isLoading: false,
    }));
  };
  componentDidMount() {
    getData(this.onDataReceived);
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      if (this.state.DataList.length > 0) {
        return (
          <Container>
            <View style={styles.MainContainer}>
              <FlatList
                data={this.state.DataList}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({item}) => (
                  <Content>
                    <List>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate('Details',{paramKey:item.id,paramKey1:false})
                      }>
                      <ListItem thumbnail style={styles.listMargin}>
                        {item.ImageFile ? (
                          <Left>
                            <Thumbnail  source={{uri: item.ImageFile}} />
                          </Left>
                        ) : (
                          <Left>
                            <Thumbnail
                              
                              source={require('../Assets/img_avatar.png')}
                            />
                          </Left>
                        )}
                        <Body>
                          <Text>{item.name}</Text>
                        </Body>

                      </ListItem>
                     </TouchableOpacity>
                    </List>
                  </Content>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Container>
        );
      } else {
        return (
          <Container>
            <View style={styles.textContainer}>
              <Text style={styles.emptyTitle}>No Results found</Text>
            </View>
          </Container>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
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
  row: {
    flex: 1,
    flexDirection: "row"
  },
  listMargin:{
    marginTop:10,
    marginBottom:10
  }
});

export async function getData(DataRetreived) {
  var user = firebase.auth().currentUser;
  var DataList = [];
  firebase.firestore()
    .collection('users')
    .orderBy('name', 'asc')
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
