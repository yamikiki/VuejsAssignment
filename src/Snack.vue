<template>
  <div id="snack">
    <h3>Add snack group ({{snackGroup.length}} group)</h3>
    <input v-model="snackGroupName">
    <button v-on:click="addSnackGroup">Add</button>
    <div><br /></div>
    <snack-list v-for="(item, index) in snackGroup"
                v-bind:key="index"
                v-bind:snack-group="item"
                v-bind:index-group="index"
                @add-snack="addSnack"
                @get-answer="getAnswer"
                @delete-snack="deleteSnack"
                @delete-group="deleteGroup">
    </snack-list>
  </div>
</template>

<script>
import SnackList from "./components/SnackList.vue";
import axios from 'axios';

export default {
  name: "snack",
  components: {
    SnackList
  },
  data() {
    return {
      snackGroup: [],
      snackGroupName: "",
      answer: ""
    };
  },
  methods: {
    addSnackGroup: function() {
      if (this.snackGroupName != "") {
        this.snackGroup.push({
          name: this.snackGroupName,
          list: [],
          groupAnswer: { yes: 0, no: 0 }
        });
        this.snackGroupName = "";
      }
    },
    addSnack: function(snackObj) {
      this.snackGroup[snackObj.indexGroup].list.push({
        name: snackObj.snackName,
        snackPrice: snackObj.snackPrice,
        answer: "Thinking..."
      });
    },
    deleteSnack: function(snack) {
      this.snackGroup[snack.indexGroup].list.splice(snack.indexSnack, 1);
    },
    deleteGroup: function(indexGroup) {
      this.snackGroup.splice(indexGroup, 1);
    },
    getAnswer: function(askObj) {
      var vm = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function(response) {
          vm.snackGroup[askObj.indexGroup].list[askObj.indexSnack].answer =
            response.data.answer;
          if (response.data.answer == "yes") {
            vm.snackGroup[askObj.indexGroup].groupAnswer.yes++;
          } else {
            vm.snackGroup[askObj.indexGroup].groupAnswer.no++;
          }
        })
        .catch(function(error) {
          console.log("Error! Could not reach the API. " + error);
        });
    }
  }
};
</script>

<style>
body {
  background-color: #fdf1ec;
}

.wrapper {
  height: 420px;
  width: 654px;
  margin: 50px auto;
  border-radius: 7px 7px 7px 7px;
  /* VIA CSS MATIC http://goo.gl/cIbnS */
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 7px 0 0 7px;
}

.product-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 7px 0;
  background-color: #ffffff;
}

.product-text {
  height: 300px;
  width: 327px;
}

.product-text h1 {
  margin: 0 0 0 38px;
  padding-top: 52px;
  font-size: 34px;
  color: #474747;
}

.product-text h1,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  margin: 0 0 0 38px;
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

.product-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -13px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

span {
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
}

.product-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 100px;
  margin: 0 40px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9cebd5;
  cursor: pointer;
  outline: none;
}

.product-price-btn button:hover {
  background-color: #79b0a1;
}

.box {
  background-color: #FF9933;
  width: 99%;
  padding: 10px;
  border-radius: 10px 10px;
}

.close {
  cursor: pointer;
  position:absolute;
  right:10px;
 }
</style>
