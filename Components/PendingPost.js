import React, { Component } from 'react';
import {StyleSheet,   RefreshControl,FlatList, Text, View, Alert, Image} from 'react-native';
import Loading from './Loading';
import firebase from 'firebase';
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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class PendingPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        isReady: false,
        Back: '',
        refreshing:false,
        DataList: [],
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
componentDidUpdate(){
    getData(this.onDataReceived);
}
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      if (this.state.DataList.length > 0) {
        return (
          <Container>
              <ScrollView
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.onRefresh}
                            />
                          }>
            <View style={styles.MainContainer}>
              <FlatList
                data={this.state.DataList}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({item}) => (
                  // <View>
                  //   <Image
                  //     style={styles.itemContainer}
                  //     source={{uri: item.ImageFile}}
                  //   />
                  //   <Text
                  //     style={styles.item}
                  //     // onPress={this.onDataReceived.bind(
                  //     //   this,
                  //     //   'Id : ' + item.Price + ' Value : ' + item.Title,
                  //     // )}
                  //   >
                  //     {item.Title}
                  //   </Text>
                  //   <Text style={styles.item}>{item.Price}</Text>
                  // </View>
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
      } else {
        return (
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
  });

export async function getData(DataRetreived) {
    var DataList = [];
    firebase.firestore()
    .collection('posts')
    .where('Status', '==',false)
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
