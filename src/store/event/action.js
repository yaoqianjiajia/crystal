
//状态管理
export default {
    addevent: ({commit}, param) => commit('ADDEVENT', {items: param}), //添加事件函数
    eventdone: ({commit}, param) => commit('EVENTDONE', {id: param}),
    eventtodo: ({commit}, param) => commit('EVENTTODO', {id: param}),
    eventcancel: ({commit}, param) => commit('EVENTCANCEL', {id: param}),
    delevent: ({commit}, param) => commit('DELEVENT', param),
    editevent: ({commit}, param) => commit('EDITEVENT', param)
}