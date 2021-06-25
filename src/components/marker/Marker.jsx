import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './marker.scss'

let scaleTimer = null
const scaleMarkerAnimation = (fromScale, toScale, dom) => {
  // 这个动画的时间为100毫秒, 按显示器fps为60来算, 16毫秒为一帧, 100毫秒能显示6.25帧, 每一帧应变大 distance / 6.25
  const distance = toScale - fromScale
  const r = distance / 6.25
  let scale = fromScale
  scaleTimer = setInterval(() => {
    scale = scale + r
    dom.style.transform = `scale(${scale})`
  }, 16);
}

// 缓存marker之前的zIndex, 鼠标移开后恢复为这个值
let tempZIndex = 0

const Marker = (props) => {
  // fix: top值偏移量, 要以实际div高度为准, 所以在useEffect里获取了重新设置
  const [fix, setFix] = useState(402)
  useEffect(() => {
    const {id} = props.item
    const markerDom = document.getElementById(`marker_${id}`)
    setFix(markerDom.offsetHeight)
    // 显示一段时间后清空, 看是否有这个需求, 先把功能做到这儿
    clearMarkerTimer(markerDom)
  }, [])

  const clearMarkerTimer = (markerDom) => {
    setTimeout(() => {
      markerDom.className = `${markerDom.className} hideMarker`
      const currentScale = markerDom.style.transform.match(/\d+\.\d+/)[0] * 1
      // 阈值0.09, 如果原来scale越小, 那么应该放大的值相对来说也小一点
      const toScale = currentScale + currentScale * 0.09
      scaleMarkerAnimation(currentScale, toScale, markerDom)
      setTimeout(() => {
        clearInterval(scaleTimer)
        scaleTimer = null
        props.remove(props.item.id)
      }, 500);
    }, 10000);
  }

  const mouseEnter = (e) => {
    tempZIndex = e.currentTarget.style.zIndex
    e.currentTarget.style.zIndex = 9999
  }

  const mouseLeave = (e) => {
    e.currentTarget.style.zIndex = tempZIndex
  }

  // 点击信息框是否定位到地图中间, 预留, 看后面需求
  // const handleClick = () => {
  //   const {map, item: {lng, lat}} = props
  //   map.setCenter([lng, lat])
  // }

  const {left, top, id} = props.item
  // 放大比例取最小值, 不然可能会很大, 带来一个意外好处: 当拉到一定程度时其实重点是后面的信息了, 
  // 当前不需要再放大, 有点智能的感觉
  const scale = Math.min(1.3, (top - top * 0.3) / (window.innerHeight / 2))
  const opacity = Math.min(1, top * 1.0028 - top)
  return <div 
    className="marker" 
    onMouseEnter={mouseEnter} 
    onMouseLeave={mouseLeave}
    // onClick={handleClick}
    id={`marker_${id}`} 
    style={{left: left - 211, top: top - fix, display: top < 150 ? 'none' : 'block', opacity, transform: `scale(${scale})`, zIndex: parseInt(top)}}>
      <div className="marker-wrapper">
        <div className="content">
          <h1>{id} <span>故障报警</span></h1>
          <ul>
            <li>
              <i className="icon icon_1"></i>
              <div>公司名称:</div>
              <div>成都公交集团</div>
            </li>
            <li>
              <i className="icon icon_2"></i>
              <div>报警时间:</div>
              <div>2021-06-22 18:30:30</div>
            </li>
            <li>
              <i className="icon icon_3"></i>
              <div>故障原因:</div>
              <div>爆胎爆胎</div>
            </li>
          </ul>
        </div>
        
        <div className="top_blcok"></div>
        <div className="bottom_blcok"></div>

        {/* 顶部部线条 */}
        <div>
          <div className="top_line1"></div>
          <div className="top_line2"></div>
          <div className="top_line3"></div>
          <div className="top_line4"></div>
          <div className="top_line5"></div>
          <div className="top_line6"></div>
          <div className="top_line7"></div>
          <div className="top_line8"></div>
          <div className="top_line9"></div>
        </div>
        {/* 底部线条 */}
        <div>
          <div className="bottom_line1"></div>
          <div className="bottom_line2"></div>
          <div className="bottom_line3"></div>
          <div className="bottom_line4"></div>
          <div className="bottom_line5"></div>
          <div className="bottom_line6"></div>
          <div className="bottom_line7"></div>
          <div className="bottom_line8"></div>
          <div className="bottom_line9"></div>
          <div className="bottom_line10"></div>
        </div>
      </div>
    <div className="marker-bottom">
      <div className="marker-bottom-light"></div>
      <div className="marker-bottom-outer">
        <div className="marker-bottom-1"></div>
        <div className="marker-bottom-2"></div>
      </div>
    </div>
  </div>
}
Marker.propTypes = {
  id: PropTypes.number,
  item: PropTypes.object,
  remove: PropTypes.func
}

export default Marker