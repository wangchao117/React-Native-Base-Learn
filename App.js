import React, { Component } from 'react';
import {
  Image, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
} from 'react-native';
// 模拟数据
var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];

export default class moves extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <View style={styles.container}>
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Image style={styles.thumbnail} source={{uri: movie.posters.thumbnail}} />
      </View>
    );
  }
  
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});