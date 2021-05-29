import React, {Component} from 'react';
import {View, StyleSheet, FlatList,TouchableOpacity, Alert,Linking} from 'react-native';
import Account from './Account';
import Loading from './Loading';
import {Container, Text} from 'native-base';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      isReady: false,
      Back: '',
      GridListItems: [],
    };
    console.log(props.route.params.paramKey);
  }
  GetGridViewItem(item) {
    //Linking.openURL('http://documents.gov.lk/files/gz/2020/12/2020-12-11(I-I)S.pdf')
    if(item==1){
      this.props.navigation.navigate('Gezzet')
    }
  }
  BackButton = () => {
    this.setState({
      Back: true,
    });
  };
  componentDidMount() {
    if(this.props.route.params.paramKey==6){
      this.setState({
        GridListItems: [
          {key: 'Gezzet',id:1},
        ],
      })
    }
    if(this.props.route.params.paramKey==5){
      this.setState({
        GridListItems: [
          {key: 'Government Jobs',id:2},
          {key: 'Private Jobs',id:3}
        ],
      })
    }
    if(this.props.route.params.paramKey==4){
      this.setState({
        GridListItems: [
          {key: 'Contact Numbers',id:4}
        ],
      })
    }
    if(this.props.route.params.paramKey==3){
      this.setState({
        GridListItems: [
          {key: 'News',id:5}
        ],
      })
    }
    if(this.props.route.params.paramKey==2){
      this.setState({
        GridListItems: [
          {key: 'Books',id:6},
          {key: 'Application Forms',id:7}
        ],
      })
    }
    if(this.props.route.params.paramKey==1){
      this.setState({
        GridListItems: [
          {key: 'Medical',id:2}
        ],
      })
    }
    setTimeout(() => this.setState({isReady: true}), 500);
  }
  render() {
    if (!this.state.isReady) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.GridListItems}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.GridViewContainer} onPress={this.GetGridViewItem.bind(this, item.id)}>
                <Text style={styles.GridViewTextLayout}>
                  {' '}
                  {item.key}{' '}
                </Text>
              </TouchableOpacity>
              
            )}
            numColumns={2}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: 'black',
    borderRadius:60/2
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'red',
    padding: 10,
  },
});
