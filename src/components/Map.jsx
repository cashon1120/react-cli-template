import React from 'react'
import ReactDOM from 'react-dom';
import CreateMarker from './marker/CreateMarker'
import {mapConfig} from '../config'
// import axios from '../utils/request'

class Map extends React.Component {

  componentDidMount() {

    const script = document.createElement('script')
    script.type = "text/javascript";
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${mapConfig.mapKey}`
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      const AMap = window.AMap
      this.map = new AMap.Map('map', {
        zoom: 13,
        pitch: 70,
        viewMode: '3D',
        mapStyle: `amap://styles/${mapConfig.styleID}`,
        center: [121.498586, 31.239637], //初始地图中心点
      });
      // 把报警信息渲染到地图里的div里, 不然鼠标在报警框上时不能拖动地图
      ReactDOM.render(<CreateMarker map={this.map} />, document.getElementsByClassName('amap-markers')[0])
    }
  }

  render() {
    return <div className="map">
      <div className="input-item">
        <button id="random-center-btn" onClick={() => {
          window.setPosition()
        }}>随机测试</button>
      </div>
      <div id="map" className="map-container"></div>
    </div>
  }
}

export default Map