import React from 'react'
import Marker from './Marker'
import '../map.scss'

class CreateMarker extends React.Component {
  static propTypes = {
    map: Object
  }
  constructor(props){
    super(props)
    this.map = props.map
    this.id = 1
    this.map = null
    this.resizeTimer = null
    this.tempMarkers = []
    this.mouseDown = false
    this.state = {
      markers: []
    }
  }
  
  componentDidMount() {
    const mapDom = document.getElementById('map')
    mapDom.addEventListener('mousedown', () => {
      this.mouseDown = true
    })
    mapDom.addEventListener('mouseup', () => {
      this.mouseDown = false
      this.isStart = false
      this.showMarker()
    })

    this.map.on('mapmove', this.reSetMarker);

    window.setPosition = this.setPosition
    this.map.on('moveend', this.mapMoveEnd)
    
    this.map.on('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.reSetMarker()
      }, 100);
    })
  }

  mapClick = () => {
    console.log(123)
  }

  // 移动地图时需要重新计算位置, 多了的时候会有点卡, 后期考虑防抖
  reSetMarker = () => {
    const {markers} = this.state
    markers.forEach(item => {
      const pixel = this.map.lngLatToContainer(new window.AMap.LngLat(item.lng, item.lat));
      item.left = pixel.x
      item.top = pixel.y
    })
    this.setState({
      markers
    })
  }

  
  mapMoveEnd = () => {
    // 计算最新一个marker的left和top值, 必须在mapMoveEnd计算才准确
    if(this.mouseDown) return
    const {markers} = this.state
    const newMarker = this.tempMarkers.shift()
    if(newMarker){
      const pixel = this.map.lngLatToContainer(new window.AMap.LngLat(newMarker.lng, newMarker.lat));
      newMarker.left = pixel.x
      newMarker.top = pixel.y
      this.setState({
        markers: [...markers, newMarker]
      }, () => {
        if(this.tempMarkers.length === 0){
          this.isStart = false
          return
        }
        setTimeout(() => {
          this.showMarker(true)
        }, 1000);
      })
    }
  }
 
  // 获取新事故的坐标, 这里是模拟
  setPosition = () => {
    var lng = 121.138398 + Math.floor(Math.random() * 589828) / 1e6; //经度范围[121.138398, 121.728226]
    var lat = 30.972688 + Math.floor(Math.random() * 514923) / 1e6; //纬度范围[30.972688, 31.487611]
    this.createTempMarkers(lng, lat)
  }

  createTempMarkers = (lng, lat) => {
    this.id++
    this.tempMarkers.push({lng, lat, id: this.id})
    this.showMarker()
  }

  isStart = false
  showMarker = (autoPlay) => {
    if(this.tempMarkers.length === 0) {
      this.isStart = false
      return
    }

    if(!this.isStart || autoPlay){
      const marker = this.tempMarkers[0]
      this.isStart = true
      this.map.setCenter([marker.lng, marker.lat]); 
    }
  }

  removeMarkerByID = (id) => {
    const {markers} = this.state
    const newMarkers = markers.filter(item => item.id !== id)
    this.setState({
      markers: newMarkers
    })
  }

  render() {
    const {markers} = this.state
    const {map} = this.props
    return <>
      <div id="markers">
        {markers.map(item => <Marker 
          map={map} 
          key={item.id}
          item={item} 
          remove={this.removeMarkerByID} 
        />)}
      </div>
        
    </>
  }
}

export default CreateMarker