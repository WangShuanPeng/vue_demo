import axios from 'axios'

var Myaxios={};
Myaxios.install=function(Vue){
    const instance= axios.create({
        baseURL:'http://localhost:8888/api/private/v1/'
    });
    Vue.prototype.$http=instance
};
export default Myaxios
