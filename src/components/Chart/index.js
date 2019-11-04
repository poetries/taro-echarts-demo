import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual.js'
import Nerv from 'nervjs'
import * as echarts from '../ec-canvas/echarts'

/**
https://github.com/eyelly-wu/taro-echarts
 */
 
let Taro_ = Taro
if (process.env.TARO_ENV === 'h5') {
  Taro_ = require('@tarojs/taro-h5').default
}

const commonFunc = (_this, chart) => {
  const { option, loading, loadingConf } = _this.props
  _this.beforeSetOption()
  _this.chartInstance = chart
  if (loading) {
    _this.chartInstance.showLoading('default', loadingConf)
  } else {
    _this.chartInstance.setOption(option)
  }
}

const initChart = ((type) => {
  switch (type) {
    case 'h5':
      return (_this) => {
        const { chartId } = _this.props
        let node = document.getElementById(chartId)
        let chart = echarts.init(node)
        commonFunc(_this, chart)
      }
    case 'weapp':
      return (_this) => {
        _this.chartRef.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          })
          canvas.setChart(chart)
          commonFunc(_this, chart)
          return chart
        })
      }
  }
})(process.env.TARO_ENV)

export default class Chart extends Taro_.Component {

  config = {
    component: true,
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas'
    }
  }

  componentDidMount() {
    initChart(this)
  }

  componentWillReceiveProps(nextProps) {
    const { option: newOption } = nextProps
    // if (!_isEqual(nextProps, this.props)) {
    //   this.refreshChart(newOption)
    // }
    if(nextProps.option !== this.props.option) {
      this.refreshChart(newOption)
    }
  }

  shouldComponentUpdate(nextProps) {
    // return !_isEqual(this.props, nextProps)

    if(nextProps.option !== this.props.option) {
      return true
    }
    return false
  }

  refreshChart = (newOption) => {
    const { option, loading, loadingConf } = this.props
    if (this.chartInstance) {
      if (loading) {
        this.chartInstance.showLoading('default', loadingConf)
      } else {
        this.chartInstance.hideLoading()
        this.chartInstance.setOption(newOption || option, true)
      }
    }
  }

  beforeSetOption = () => {
    const { onBeforeSetOption } = this.props
    onBeforeSetOption && onBeforeSetOption(echarts)
  }

  setChartRef = node => this.chartRef = node

  render() {
    const { chartId, width, height, customStyle } = this.props
    let chartContainerStyle = `${customStyle}width:${width};height:${height};`

    return (
      <View style={chartContainerStyle}>
        {
          {
            'h5': <View style={`width:${width};height:${height};`} id={chartId} />,
            'weapp': <ec-canvas ref={this.setChartRef} canvasId={chartId} ec={{ lazyLoad: false,disableTouch: false }} />
          }[process.env.TARO_ENV]
        }
      </View>
    )
  }
}

Chart.propTypes = {
  chartId: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  customStyle: PropTypes.string,
  loading: PropTypes.bool,
  loadingConf: PropTypes.object,
  option: PropTypes.object.isRequired,
  onBeforeSetOption: PropTypes.func
}

Chart.defaultProps = {
  width: '100%',
  height: '200px',
  customStyle: '',
  loading: null,
  loadingConf: null,
  onBeforeSetOption: null
}