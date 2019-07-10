import api from '../../api/request'

var chart = {
  state: {
    price: ""
  },
  mutations: {
    SET_PRICE(state, data) {
      state.price = data
    }
  },
  actions: {
    getPhonePrice({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api({
            url: "/phone/price",
            method: "post",
            data: ""
          })
          .then(rs => {
            var rdata = rs.data;
            commit("SET_PRICE", rdata)
            resolve(rdata)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
export default chart
