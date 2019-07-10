/****
 *  creator:crow
 *  date: 2019/05/27
 */
const sidebar={
    state:{
        isCollapse:false
    },
    mutations:{
        SET_ISCOLLAPSE(state){
            state.isCollapse=!state.isCollapse
        }
    },
    actions:{
        /**
         *   设置 sidebar 展开状态
         */
        setSidebarOpenStatus({commit}){
           
            commit("SET_ISCOLLAPSE")
        }
    }
}
export default sidebar