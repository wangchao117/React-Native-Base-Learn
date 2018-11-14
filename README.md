### 官网React Native基础学习

* Imaage引入图片路径的两种方式
    1.引入被你图片路径：srouce={require('./1.png')}
    2.引入网络图片（注意iOS如果是http不能渲染）：srouce={{url:‘http://.....’}}
    注意：引入网络图片需要制定图片宽高，不然渲染不出来结果
* FlatList列表必须要加keyExtractor参数，不然会报黄色警告：keyExtractor={(item, index) => index.toString()}
