const getters = {
  // code:state => state.user.code,
  token: state => state.user.token,
  //status:state => state.user.status,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  isCollapse: state => state.sidebar.isCollapse,
  phonePrice: state => state.charts.price
}
export default getters
