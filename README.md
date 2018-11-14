## 官网React Native基础学习

* Imaage引入图片路径的两种方式
    1.引入被你图片路径：srouce={require('./1.png')}
    2.引入网络图片（注意iOS如果是http不能渲染）：srouce={{url:‘http://.....’}}
    注意：引入网络图片需要制定图片宽高，不然渲染不出来结果
* FlatList列表必须要加keyExtractor参数，不然会报黄色警告：keyExtractor={(item, index) => index.toString()}

### 组件系统

#### 基础组件
* View：搭建用户界面的最基础组件。
    注：View 的设计初衷是和 StyleSheet 搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。
* Text：显示文本内容的组件。
    注意：onChangeText是从TextInput里取值这就是目前唯一的做法！也就是使用在onChangeText中用setState把用户的输入写入到state中，然后在需要取值的地方从this.state中取出值。
    例如：
```
    import React, { Component } from 'react';
    import { TextInput } from 'react-native';

    export default class UselessTextInput extends Component {
        constructor(props) {
            super(props);
            this.state = { text: 'Useless Placeholder' };
        }

        render() {
            return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
            );
        }
    }

```
    注意：有些属性仅在multiline为true或者为false的时候有效。此外，当multiline=false时，为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效。为了能够实现效果你可以使用一个View来包裹TextInput：
```
    import React, { Component } from 'react';
    import { View, TextInput } from 'react-native';

    class UselessTextInput extends Component {
    render() {
        return (
        <TextInput
            {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
            editable = {true}
            maxLength = {40}
        />
        );
    }
    }

    export default class UselessTextInputMultiline extends Component {
    constructor(props) {
        super(props);
        this.state = {
        text: 'Useless Multiline Placeholder',
        };
    }

    // 你可以试着输入一种颜色，比如red，那么这个red就会作用到View的背景色样式上
    render() {
        return (
        <View style={{
        backgroundColor: this.state.text,
        borderBottomColor: '#000000',
        borderBottomWidth: 1 }}
        >
        <UselessTextInput
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        </View>
        );
    }
    }
```
* Image：显示图片内容的组件。
* TextInput：文本输入框。
* ScrollView：可滚动的容器视图。
* StyleSheet：提供类似CSS样式表的样式抽象层。
#### 交互组件


