import axios from 'axios';

export default {

  getRandom() {
    return axios.get('/random')
  },

}
