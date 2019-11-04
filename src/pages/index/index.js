import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

import Chart from '../../components/Chart'
    

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        <Chart 
        height={'300px'}
        chartId='chart-heart'
        option={{
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              triggerOn: 'click',
              // @FIX tooltip到了容器边缘不改变位置。 给 position return 百分数数组无效，返回[number,number]是有效果的
              position: function (pos, params, dom, rect, size) {
                  // 鼠标在左侧，tooltip 鼠标在右侧
                  if (pos[0] < size.viewSize[0] / 2) {
                      return [pos[0] + 10, pos[1] - 30];
                  } else {
                      // 鼠标在右侧，tooltip 鼠标在左侧
                      return [pos[0] - size.contentSize[0] - 15, pos[1] - 15];
                  }
              }
          },
          animation: false,
          backgroundColor: '#fff',
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  axisLine: {
                    lineStyle: {
                      color: '#333'
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },    
                  axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        color: '#333'
                    },
                    formatter: '{value}'
                    // formatter: function (value) {
                    //     return moment(value).format('HH:mm')
                    // }
                  },
                  data : ['周一','周二','周三','周四','周五','周六','周日']
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  axisLine:{
                    show: false
                  },
                  axisTick:{       //y轴刻度线
                    "show":false
                  },
                  splitLine: {     //网格线
                    "show": false
                  },
                  nameTextStyle: {
                      color: '#333'
                  },
                  axisLabel: {
                      textStyle: {
                          color: '#333'
                      }
                  },
              }
          ],
          series : [
              {
                  name:'邮件营销',
                  type:'line',
                  stack: '总量',
                  areaStyle: {},
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'联盟广告',
                  type:'line',
                  stack: '总量',
                  areaStyle: {},
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  areaStyle: {},
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'直接访问',
                  type:'line',
                  stack: '总量',
                  areaStyle: {normal: {}},
                  data:[320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name:'搜索引擎',
                  type:'line',
                  stack: '总量',
                  label: {
                      normal: {
                          show: true,
                          position: 'top'
                      }
                  },
                  areaStyle: {normal: {}},
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
        }} 
      />
      </View>
    )
  }
}

export default Index
