import axios from './request'

export function formatTime() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return {
    date: [year, month, day].map(formatNumber).join('-'),
    time: [hour, minute, second].map(formatNumber).join(':')
  }
}

const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export const getAddress = (lat, lon, type) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.tianditu.gov.cn/geocoder?type=geocode&postStr={'lon':${lon},'lat':${lat},'ver':1}&tk=93fa91b3c85e7d827dddc988f0b7b9e1`).then(res => {
      const address = type === 1 ? res.result.addressComponent.address : res.result.formatted_address
      resolve(address)
    })
  })
}

export const formatLongNumber = value => {
  let newValue = value
  if(Math.abs(value) / 1000 > 1){
    newValue = parseInt(value / 1000)
  }
  if(Math.abs(value) / 10000 > 1){
    newValue = parseInt(value / 10000)
  }
  return newValue
}
