import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token');
const currentUser = JSON.parse(localStorage.getItem('user'));
const storedWords = localStorage.getItem('words');
const storedLetters = localStorage.getItem('letters');
const storedRequired = localStorage.getItem('required');

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    words: [] || storedWords,
    letters: storedLetters || [],
    required: storedRequired || "",
    highscore: 0
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    REMEMBER_WORDS(state, words) {

      state.words = words;
      localStorage.setItem('words', words);
    },
    REMEMBER_LETTERS(state, letters) {

      state.letters = letters;
      localStorage.setItem('letters', letters);
    },
    REMEMBER_REQUIRED(state, required) {

      state.required = required;
      localStorage.setItem('required', required);
    }
  }
})
