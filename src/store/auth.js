import { loginAPI, logoutAPI, registerAPI } from "@/api/auth";
import { createBillAPI } from "@/api/bill";

export default {
  actions: {
    login({dispatch, commit}, {email, password}) {
      loginAPI(email, password)
        .then((res) => {
          console.log('data', res.data);
          if (typeof res.data === 'string') {
            commit('setError', res.data)
          } else {
            commit('setUser', res.data)
            //get bill
          }
        })
        .catch(e => {
          throw new Error(e)
        })
    },
    logout({dispatch, commit}, id) {
      logoutAPI(id)
    },
    register({dispatch, commit}, {email, password, name}) {
      //     const uid = await dispatch('getUid')
      registerAPI(email, password, name)
        .then(res => {
          console.log(res.data);
          if (typeof res.data === 'string') {
            commit('setError', res.data)
          } else {
            commit('setUser', res.data)
            createBillAPI(res.data.id, 0)
              .then(res => {
                console.log(res.data);
              })
          }
        })
        .catch(e => {
          commit('setError', e)
          throw new Error(e)
        })
    },
    isAuth({dispatch}, id) {
      isAuthAPI(id)
        .then(res => {
          if (!!res.data) {
            console.log('Yes');
          } else {
            console.log('No');
          }
        })
    }
  }
}
