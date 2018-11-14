## 官网React Native基础学习

* Imaage引入图片路径的两种方式
    1.引入被你图片路径：srouce={require('./1.png')}
    2.引入网络图片（注意iOS如果是http不能渲染）：srouce={{url:‘http://.....’}}
    注意：引入网络图片需要制定图片宽高，不然渲染不出来结果
* FlatList列表必须要加keyExtractor参数，不然会报黄色警告：keyExtractor={(item, index) => index.toString()}

### 组件系统
#### 基础组件
* View：搭建用户界面的最基础组件。
* Text：显示文本内容的组件。
* Image：显示图片内容的组件。
* TextInput：文本输入框。
* ScrollView：可滚动的容器视图。
* StyleSheet：提供类似CSS样式表的样式抽象层。
