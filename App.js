import React, { Component } from 'react';
import {
  Image, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
} from 'react-native';
// 模拟数据
// var MOCKED_MOVIES_DATA = [
//   {
//     title: "标题",
//     year: "2015",
//     posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
//   }
// ];
// 真是数据
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class moves extends Component {
  constructor(props) {
    super(props);
    // 首先在应用中创建一个初始的 null 状态，这样可以通过this.state.movies == null来判断我们的数据是不是已经被抓取到了。
    // 我们在服务器响应返回的时候执行this.setState({movies: moviesData})来改变这个状态。
    this.state = { movies: null };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          movies: responseData.movies,
        });
      });
  }
  render() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }

    var movie = this.state.movies[0];
    return this.renderMovie(movie);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
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