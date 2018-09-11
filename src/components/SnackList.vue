<template>
  <div>       
    <div v-if="snackGroup" class="box">
        <a class="close" v-on:click="deleteGroup(indexGroup)"><span aria-hidden="true">&times;</span></a>
        <h2>{{snackGroup.name}} ({{snackGroup.list.length}} item)
            <div v-bind:style="getTextColor" v-if="snackGroup.list.length">
                <i class="fa fa-thumbs-o-up" style="font-size:24px"></i> {{snackGroup.groupAnswer.yes}} <i class="fa fa-thumbs-o-down" style="font-size:24px"></i> {{snackGroup.groupAnswer.no}}
            </div>
        </h2>
        Snack name: <input v-model="snackName"> Snack price: <input type="number" v-model="snackPrice"> <button v-on:click="addSnack">Add</button>
        <div v-for= "(item, index) in snackGroup.list" :key="index">
            <div class="wrapper">
                <div class="product-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA0P9rTMZCHNFNg4Czqj1HlwRWgDoxZEzM7YufueiMAXA79alX" height="420" width="327">
                </div>
                <div class="product-info">
                    <div class="product-text">
                        <h1>{{ item.name }}</h1><br>
                        <h2>Price : {{item.snackPrice}} Bath</h2>
                        <h2>Ask : {{ item.answer }}</h2>
                    </div>
                    <div class="product-price-btn">
                        <button v-on:click="deleteSnack(index)">Delete</button><button v-on:click="ask(index)">Ask</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>
</template>

<script>
export default {
  props: ["snackGroup", "indexGroup"],
  data: () => ({
    snackName: "",
    snackPrice:''
  }),
  methods: {
    addSnack: function() {
      var addSnackObj = null;
      if (this.snackName != "" && this.snackPrice != "") {
        addSnackObj = {
          indexGroup: this.indexGroup,
          snackName: this.snackName,
          snackPrice: this.snackPrice
        };
        (this.snackName = ""), (this.snackPrice = "");
      }
      this.$emit("add-snack", addSnackObj);
    },
    ask: function(index) {
      var askObj = null;
      askObj = {
        indexGroup: this.indexGroup,
        indexSnack: index
      };
      this.$emit("get-answer", askObj);
    },
    deleteSnack: function(index) {
      var deleteSnackObj = null;
      deleteSnackObj = {
        indexGroup: this.indexGroup,
        indexSnack: index
      };
      this.$emit("delete-snack", deleteSnackObj);
    },
    deleteGroup: function() {
      this.$emit("delete-group", this.indexGroup);
    }
  },
  computed: {
    getTextColor: function() {
      if (this.snackGroup.groupAnswer.yes > this.snackGroup.groupAnswer.no) {
        return { color: "green" };
      } else if (
        this.snackGroup.groupAnswer.yes < this.snackGroup.groupAnswer.no
      ) {
        return { color: "red" };
      } else {
        return { color: "blue" };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
