//axios请求
import axios from 'axios'

const Axios = {
    get : function (obj) {
        axios.get(obj.url)
        .then(function (response) {
            // console.log(response);
            obj.cb(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    post: function (obj) {
        axios.post(obj.url, obj.body)
        .then(function (response) {
            // console.log(response);
             obj.cb(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
 

export default Axios