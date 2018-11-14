import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableHighlight, 
  TouchableOpacity, 
  TouchableNativeFeedback, 
  TouchableWithoutFeedback,
  Platform,
  Canvas,
} from 'react-native';

export default class FlexDimensionsBasics extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    return (
      <View >
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ text })}
        />
        <Text>{this.state.text}</Text>
        <Button
          onPress={this.clickBtn}
          title="点我！"
        />

        
        <TouchableHighlight onPress={this.clickBtn} underlayColor="white">
          <View style={{height: 40,backgroundColor:'red'}}>
            <Text>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>

         <TouchableOpacity onPress={this.clickBtn} underlayColor="white">
          <View style={{height: 40,backgroundColor:'blue'}}>
            <Text>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>

        <TouchableNativeFeedback 
          onPress={this.clickBtn} 
          underlayColor="white"
          background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
        >
          <View style={{height: 40,backgroundColor:'#777'}}>
            <Text>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableWithoutFeedback onPress={this.clickBtn} underlayColor="white">
          <View style={{height: 40,backgroundColor:'#ccc'}}>
            <Text>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        
        <TouchableHighlight onPress={this.clickBtn} onLongPress={this._onLongPressButton} underlayColor="white" underlayColor="white">
          <View style={{height: 40,backgroundColor:'#e2e2e2'}}>
            <Text>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>

        
        {/* 滚动 */}
        


      </View>
    );
  }
  clickBtn() {
    Alert.alert(Platform.OS)
  }
  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }
}