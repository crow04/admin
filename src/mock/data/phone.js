const phonePrice = [
  {
    name: "一线城市",
    value: [2.2, 17.8, 24.8, 29.6, 17.8, 7.8]
  },
  {
    name: "二线城市",
    value: [2.0, 20.3, 30.0, 29.1, 15.0, 3.7]
  },
  {
    name: " 三线城市",
    value: [3.0, 21.9, 33.0, 26.4, 12.8, 2.8]
  },
  {
    name: "四线城市及其他",
    value: [4.4, 21.3, 35.7, 29.2, 7.1, 2.3]
  },
]
export default {
  getPhonePrice: () => phonePrice
}
