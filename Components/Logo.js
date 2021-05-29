import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// create a component

const Logo = () => {
  return (
    <View>
      <Image
        source={require('../Assets/Logo.jpg')}
        style={{height: 150, width: 150, borderRadius: 75}}
      />
    </View>
  );
};

//make this component available to the app
export default Logo;
