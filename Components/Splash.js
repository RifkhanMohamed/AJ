import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Welcome to AJ Marketing</Text> */}
        <Image
          source={require('../Assets/Logo.jpg')}
          style={{height: 200, width: 200, borderRadius: 60}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});
