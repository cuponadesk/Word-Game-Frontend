<template>
  <div class="container">
    <div class="row">
      <div class="col-12 px-0">
        <div class="card">
          <div
            class="card-header bg-success text-white text-center"
            v-show="badWord[0] == '+'"
          >
            <h3>Score: {{ badWord }} points</h3>
          </div>
          <div
            class="card-header bg-primary text-white text-center"
            v-show="badWord == ''"
          >
            <h3>Score: {{ score }} points</h3>
          </div>
          <div
            class="card-header bg-danger text-white text-center text-white"
            v-show="
              badWord != '' && alreadyGuessed == false && badWord[0] != '+'
            "
          >
            <h3>{{ badWord }} isn't a valid word.</h3>
          </div>
          <div
            class="card-header bg-danger text-white text-center text-white"
            v-show="
              badWord != '' && alreadyGuessed == true && badWord[0] != '+'
            "
          >
            <h3>{{ badWord }} was already added</h3>
          </div>
          <div class="card-body text-center">
            <h4>
              <span style="color: white">A</span
              ><span v-for="word in guessedWords" v-bind:key="word"
                >&nbsp;{{ word.toUpperCase() }}&nbsp;</span
              >
              <span style="color: white">A</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt-2 mb-n2">
      <div class="col-12 text-capitalize text-center">
        <h1>
          <span style="color: white">A</span>{{ builder
          }}<span style="color: white">A</span>
        </h1>
      </div>
    </div>
    <div class="row mt-n4 justify-content-center">
      <div class="col-auto mr-4 mb-md-0 mb-5 pb-5 mt-n4">
        <div class="hex-row">
          <div class="hex">
            <div class="left-clear"></div>
            <div class="middle-clear"></div>
            <div class="right-clear"></div>
          </div>
          <div class="hex even">
            <div class="left"></div>
            <div
              class="middle pointer"
              v-on:click="addLetter(randomizedLetters[0])"
            >
              {{ randomizedLetters[0].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
          <div class="hex">
            <div class="left-clear"></div>
            <div class="middle-clear"></div>
            <div class="right-clear"></div>
          </div>
        </div>
        <div class="hex-row">
          <div class="hex">
            <div class="left"></div>
            <div class="middle" v-on:click="addLetter(randomizedLetters[1])">
              {{ randomizedLetters[1].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
          <div class="hex even">
            <div class="left-center"></div>
            <div class="middle-center" v-on:click="addLetter(required)">
              {{ required.toUpperCase() }}
            </div>
            <div class="right-center"></div>
          </div>
          <div class="hex">
            <div class="left"></div>
            <div class="middle" v-on:click="addLetter(randomizedLetters[2])">
              {{ randomizedLetters[2].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
        </div>
        <div class="hex-row">
          <div class="hex">
            <div class="left"></div>
            <div class="middle" v-on:click="addLetter(randomizedLetters[3])">
              {{ randomizedLetters[3].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
          <div class="hex even">
            <div class="left"></div>
            <div class="middle" v-on:click="addLetter(randomizedLetters[4])">
              {{ randomizedLetters[4].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
          <div class="hex">
            <div class="left"></div>
            <div class="middle" v-on:click="addLetter(randomizedLetters[5])">
              {{ randomizedLetters[5].toUpperCase() }}
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt-2 pt-sm-5">
      <div class="col-12 text-center">
        <button
          style="z-index: 1000;"
          class="btn btn-primary mr-2"
          v-on:click="save()"
        >
          Save</button
        ><button class="btn btn-primary ml-2 mr-2" v-on:click="shuffle()">
          Shuffle Letters
        </button>
        <div class="btn btn-primary ml-2" v-on:click="erase()">Erase</div>
      </div>
    </div>

    <div class="row pt-4">
      <div class="col-12 col-sm-6">
        <div class="card">
          <div class="card-header bg-light text-dark text-center">
            <h5>Rules</h5>
          </div>
          <div class="card-body text-center">
            Build words using the letters. Words must be atleast four letters
            long. All valid words require using the center letter. Letters may
            be used more than once. Generally, plurals aren't considered valid.
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="card">
          <div class="card-header bg-light text-dark text-center">
            <h5>Scoring</h5>
          </div>
          <div class="card-body text-center">
            Words with four letters are worth 1 point, five letters – 3 points,
            six letters – 7 points, seven letters – 16 points, eight letters –
            31 points, 9 letters or more – 63 points.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wordService from "../services/WordService";
export default {
  name: "home",
  data() {
    return {
      words: [],
      letters: [],
      required: "",
      randomizedLetters: ["A", "A", "A", "A", "A", "A", "A"],
      guessedWords: [],
      builder: "",
      badWord: "",
      alreadyGuessed: false,
      score: 0,
    };
  },
  mounted() {
    if (this.$store.state.words.length != 0) {
      this.words = this.$store.state.words;
      this.letters = this.$store.state.letters;
      this.required = this.$store.state.required;
    } else {
      wordService
        .getRandom()
        .then((response) => {
          this.words = response.data.words;
          this.letters = response.data.letters;
          this.required = response.data.required;
          this.shuffle();

          this.$store.commit("REMEMBER_WORDS", this.words);
          this.$store.commit("REMEMBER_LETTERS", this.letters);
          this.$store.commit("REMEMBER_REQUIRED", this.required);
        })
        .catch((error) => {
          alert("Error:", error);
        });
      this.score = 0;
    }
  },
  methods: {
    shuffle() {
      let array = this.letters.filter((elem) => elem != this.required);
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.randomizedLetters = array;
    },
    addLetter(letter) {
      this.badWord = "";
      this.alreadyGuessed = false;
      this.builder += letter.toLowerCase();
      this.builder = this.builder.toUpperCase();
    },
    save() {
      if (
        this.words.filter((elem) => elem == this.builder.toLowerCase())
          .length != 0 &&
        this.guessedWords.filter((elem) => elem == this.builder.toLowerCase())
          .length == 0 &&
        this.builder.length > 3
      ) {
        this.guessedWords.push(this.builder.toLowerCase());

        switch (this.builder.length) {
          // default: this.score += 55;
          // this.badWord = "+55";
          //                   break;
          // case 11: this.score += 34;
          //           this.badWord = "+34";
          //                   break;
          // case 10: this.score += 21;
          //           this.badWord = "+21";
          //                   break;
          default:
            this.score += 63;
            this.badWord = "+63";
            break;
          case 8:
            this.score += 31;
            this.badWord = "+31";
            break;
          case 7:
            this.score += 15;
            this.badWord = "+15";
            break;
          case 6:
            this.score += 7;
            this.badWord = "+7";
            break;
          case 5:
            this.score += 3;
            this.badWord = "+3";
            break;
          case 4:
            this.score += 1;
            this.badWord = "+1";
            break;
        }
      } else if (
        this.guessedWords.filter((elem) => elem == this.builder.toLowerCase())
          .length != 0
      ) {
        this.badWord = this.builder;
        this.alreadyGuessed = true;
      } else {
        this.badWord = this.builder;
      }
      this.erase();
    },
    erase() {
      this.builder = "";
    },
  },
};
</script>
