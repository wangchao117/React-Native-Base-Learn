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
        <Image style={styles.thumbnail} source={{uri: movie.posters.thumbnail}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
  
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 横向
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    // 图片
    width: 53,
    height: 81
  },
  rightContainer: {
    // 横向除了如片，其他全部空间
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
});