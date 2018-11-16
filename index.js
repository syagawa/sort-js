(function(global){

  global.APP = global.APP ? global.APP : {};
  var APP = global.APP;

  APP.makeArr = function(len){
    var arr = [];
    for(var i = 0; i < len; i++){
      arr.push(i + 1);
    }
    return arr;
  };


  APP.sortRandomly = function(arr){
    var random_arr = [];

    var o = 0;
    var len = arr.length;
    var elm;

    for(var i = 0; i < len; i++){
      o = Math.floor(Math.random() * arr.length);
      elm = arr.splice(o, 1)[0];
      random_arr.push(elm);
    }
    return random_arr;
  };


  var length = 100;
  var arr1 = APP.makeArr(length);
  console.info(arr1);
  var arr2 = APP.sortRandomly(arr1);
  console.info(arr2);

  var app = new Vue({
    el: "#app",
    data: {
      elements: arr2,
      element_min_height: 5
    },
    computed: {

    },
    methods: {
      getHeightStyle: function(elm){
        return (this.element_min_height + elm * 2) + "px";
      },
      sort: function(){
        this.elements.sort();
      }
    },
    mounted: function(){

    },
    created: function(){

    }
  });


})(window);