import React, {Component} from 'react';
import {Container, Header, Body, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: '',
      items: [
        {name: 'Bikes',naviName:'Bikes', code: '#000000', icons: 'motorbike', id: 1},
        {name: 'Books',naviName:'Books',  code: '#0000ff', icons: 'bookshelf', id: 2},
        {name: 'Cosmetics',naviName:'Cosmetics',  code: '#8a2be2', icons: 'spray', id: 3},
        {
          name: 'Delivery Ser..',
          naviName:'Delivery Service', 
          code: '#a52a2a',
          icons: 'truck-delivery',
          id: 4,
        },
        {name: 'Education',naviName:'Education',  code: '#7fff00', icons: 'school', id: 5},
        {name: 'Electronics',naviName:'Electronics',  code: '#d2691e', icons: 'lightbulb-on', id: 6},
        {name: 'Food & Rest..',naviName:'Food & Restaurants',  code: '#6495ed', icons: 'food', id: 7},
        {name: 'Gifts',naviName:'Gifts',  code: '#dc143c', icons: 'gift-outline', id: 8},
        {name: 'Home Needs',naviName:'Home Needs',  code: '#00ffff', icons: 'home', id: 9},
        {name: 'Jewelry',naviName:'Jewelry',  code: '#00008b', icons: 'diamond-stone', id: 10},
        {name: 'Job',naviName:'Job',  code: '#a9a9a9', icons: 'briefcase-variant', id: 11},
        {name: 'Kids Fashion',naviName:'Kids Fashion',  code: '#006400', icons: 'baby-buggy', id: 12},
        {name: 'Medical',naviName:'Medical',  code: '#ff0000', icons: 'medical-bag', id: 13},
        {name: "Men's Fashion",naviName:'Mens Fashion',  code: '#dda0dd', icons: 'tshirt-v', id: 14},
        {
          name: 'Mobile & Acc..',
          naviName:'Mobile & Accessories', 
          code: '#9400d3',
          icons: 'cellphone-iphone',
          id: 15,
        },
        {name: 'Others',naviName:'Others',  code: '#ff1493', icons: 'dropbox', id: 16},
        {name: 'Pets',naviName:'Pets',  code: '#ffd700', icons: 'dog-side', id: 17},
        {name: 'Properties',naviName:'Properties',  code: '#800000', icons: 'home-city', id: 18},
        {name: 'Services',naviName:'Services',  code: '#000080', icons: 'face-agent', id: 19},
        {name: 'Sports',naviName:'Sports',  code: '#008080', icons: 'volleyball', id: 20},
        {name: 'Transport',naviName:'Transport',  code: '#556b2f', icons: 'train-car', id: 21},
        {name: 'Vehicles',naviName:'Vehicles',  code: '#9acd32', icons: 'van-passenger', id: 22},
        {name: "Women's Fas..",naviName:'Womens Fashion',  code: '#2c3e50', icons: 'ring', id: 23},
      ],
    };
  }
  renderContent = id => {
    this.setState({
      ID: id,
    });
  };
  render() {
    const _renderItem = ({item}) => (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          //onPress={() => this.renderContent(item.id)}
          onPress={() => this.props.navigation.navigate('MainCategories',{paramKey:item.naviName})}
          //onPress={() => Alert.alert(item.name)}
          style={styles.imageContainer}>
          <MaterialCommunityIcons
            name={item.icons}
            color={item.code}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.itemMenu}>{item.name}</Text>
      </View>
    );
    return (
      <View style={styles.container}>
        <Container style={{backgroundColor:'#e5e5e5'}}>
          <FlatGrid
            itemDimension={60}
            data={this.state.items}
            spacing={20}
            renderItem={_renderItem}
          />
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemMenu: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 10,
  },
  container: {
    height: '100%',
    width: '100%',
    
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  imageContainer: {},
});
