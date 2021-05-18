import axios from 'axios';

export default {

  async getRandom() {
    return await axios.get('/random')
  },
  async updateHighScore(puzzle) {
    await axios.post('/highscore', puzzle);
  }

}
