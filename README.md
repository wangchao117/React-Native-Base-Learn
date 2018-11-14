## 官网React Native基础学习

* Imaage引入图片路径的两种方式
    1.引入被你图片路径：srouce={require('./1.png')}
    2.引入网络图片（注意iOS如果是http不能渲染）：srouce={{url:‘http://.....’}}
    注意：引入网络图片需要制定图片宽高，不然渲染不出来结果
* FlatList列表必须要加keyExtractor参数，不然会报黄色警告：keyExtractor={(item, index) => index.toString()}


## 组件系统
### 基础组件
#### View：搭建用户界面的最基础组件。
    注：View 的设计初衷是和 StyleSheet 搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。
#### Text：显示文本内容的组件。

#### Image：显示图片内容的组件。
下面的例子分别演示了如何显示从本地缓存、网络甚至是以'data:'的 base64 uri 形式提供的图片。
```
    import React, { Component } from 'react';
    import { AppRegistry, View, Image } from 'react-native';

    export default class DisplayAnImage extends Component {
        render() {
            return (
                <View>
                    <Image
                        source={require('/react-native/img/favicon.png')}
                    />
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                    <Image
                        style={{width: 66, height: 58}}
                        source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                    />
                </View>
            );
        }
    }
```
注意：默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在android/app/build.gradle文件中根据需要手动添加以下模块：
```
    dependencies {
    // 如果你需要支持Android4.0(API level 14)之前的版本
    compile 'com.facebook.fresco:animated-base-support:1.10.0'

    // 如果你需要支持GIF动图
    compile 'com.facebook.fresco:animated-gif:1.10.0'

    // 如果你需要支持WebP格式，包括WebP动图
    compile 'com.facebook.fresco:animated-webp:1.10.0'
    compile 'com.facebook.fresco:webpsupport:1.10.0'

    // 如果只需要支持WebP格式而不需要动图
    compile 'com.facebook.fresco:webpsupport:1.10.0'
    }
```
#### TextInput：文本输入框。
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
    注意：有些属性仅在multiline为true或者为false的时候有效。此外，当multiline=false时，
    为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效。
    为了能够实现效果你可以使用一个View来包裹TextInput：
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
>   TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，
    则需要设置padding: 0，同时设置underlineColorAndroid="transparent"来去掉底边框。
>   又，在安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: 'top'样式来使其居顶显示。
>   又又，在安卓上长按选择文本会导致windowSoftInputMode设置变为adjustResize，这样可能导致绝对定位的元素被键盘给顶起来。
    要解决这一问题你需要在AndroidManifest.xml中明确指定合适的windowSoftInputMode( https://developer.android.com/guide/topics/manifest/activity-element.html )值，或是自己监听事件来处理布局变化。

#### ScrollView：可滚动的容器视图。
    ScrollView必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。要给一个ScrollView确定一个高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度。
    一般来说我们会给ScrollView设置flex: 1以使其自动填充父容器的空余空间，但前提条件是所有的父容器本身也设置了flex或者指定了高度，否则就会导致无法正常滚动，你可以使用元素查看器来查找问题的原因。

    ScrollView和FlatList应该如何选择？ScrollView会简单粗暴地把所有子元素一次性全部渲染出来。其原理浅显易懂，使用上自然也最简单。然而这样简单的渲染逻辑自然带来了性能上的不足。想象一下你有一个特别长的列表需要显示，可能有好几屏的高度。创建和渲染那些屏幕以外的JS组件和原生视图，显然对于渲染性能和内存占用都是一种极大的拖累和浪费。

    这就是为什么我们还有专门的FlatList组件。FlatList会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。这种惰性渲染逻辑要复杂很多，因而API在使用上也更为繁琐。除非你要渲染的数据特别少，否则你都应该尽量使用FlatList，哪怕它们用起来更麻烦。

    此外FlatList还可以方便地渲染行间分隔线，支持多列布局，无限滚动加载等等。

#### StyleSheet：提供类似CSS样式表的样式抽象层。

### 交互控件
#### Button: 一个简单的跨平台的按钮控件。
    这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那你需要使用TouchableOpacity或是TouchableNativeFeedback组件来定制自己所需要的按钮。
    示例：
```
    import { Button } from 'react-native';
    ...

    <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
```
*    onPress:用户点击此按钮时所调用的处理函数
*   title:按钮内显示的文本
*   accessibilityLabel:用于给残障人士显示的文本（比如读屏应用可能会读取这一内容）
*   color:文本的颜色(iOS)，或是按钮的背景色(Android)
*   disabled:设置为 true 时此按钮将不可点击。
*   testID:用来在端到端测试中定位此视图。
*   hasTVPreferredFocus(ios独有):(Apple TV only) TV preferred focus (see documentation for the View component).

#### Picker: 在iOS和Android上调用各自原生的选择器控件。
```
    <Picker
        selectedValue={this.state.language}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
    >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
    </Picker>
```
*    onValueChange:某一项被选中时执行此回调。调用时带有如下参数：
>       itemValue: 被选中项的value属性
>       itemPosition: 被选中项在picker中的索引位置
         
*   selectedValue: 默认选中的值。可以是字符串或整数
*   enabled(Android): 如果设为false，则会禁用此选择器。
*   mode(Android): 在Android上，可以指定在用户点击选择器时，以怎样的形式呈现选项：
>       'dialog': 显示一个模态对话框。默认选项。
>       'dropdown': 以选择器所在位置为锚点展开一个下拉框。
                    
*    prompt(Android): 设置选择器的提示字符串。在Android的对话框模式中用作对话框的标题。
*   itemStyle（iOS）：指定应用在每项标签上的样式。

#### Slider: 滑动数值选择器。

#### Switch: 开关控件。
注意这是一个“受控组件”（controlled component）。你必须使用onValueChange回调来更新value属性以响应用户的操作。如果不更新value属性，组件只会按一开始给定的value值来渲染且保持不变，看上去就像完全点不动。
* trackColor: 开启状态时的背景颜色。
* ios_backgroundColor: 在iOS上，自定义背景颜色。当开关值为假或开关被禁用（并且开关是半透明的）时，可以看到此背景颜色。
* onValueChange: 当值改变的时候调用此回调函数，参数为新的值。
* thumbColor: 开关上圆形按钮的背景颜色。在iOS上设置此颜色会丢失按钮的投影。
* tintColor: 关闭状态时的边框颜色(iOS)或背景颜色(Android)。
* value: 表示此开关是否打开。默认为false（关闭状态）。


### 列表视图
#### FlatList:高性能的滚动列表组件。
*   完全跨平台。
*   支持水平布局模式。
*   行组件显示或隐藏时可配置回调事件。
*   支持单独的头部组件。
*   支持单独的尾部组件。
*   支持自定义行间分隔线。
*   支持下拉刷新。
*   支持上拉加载。
*   支持跳转到指定行（ScrollToIndex）
```
    <FlatList
        data={[{key: 'a'}, {key: 'b'}]}
        renderItem={({item}) => <Text>{item.key}</Text>}
    />
```

#### SectionList:类似FlatList，但是多了分组显示。
    如果你的列表不需要分组(section)，那么可以使用结构更简单的<FlatList>。
*   完全跨平台。
*   行组件显示或隐藏时可配置回调事件。
*   支持单独的头部组件。
*   支持单独的尾部组件。
*   支持自定义行间分隔线。
*   支持分组的头部组件。
*   支持分组的分隔线。
*   支持多种数据源结构
*   支持下拉刷新。
*   支持上拉加载。



### iOS 独有的组件和 API



### Android 独有的组件和 API



### 其他
