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

  APP.timer = {
    start_time: "",
    start: function(){
      this.start_time = performance.now();
    },
    end: function(){
      if(!this.start_time){
        console.log("Start time is not set.");
        return false;
      }
      var end_time = performance.now();
      var time = end_time - this.start_time;
      this.start_time = "";
      return time;
    },
    show: function(arr){
      var display = document.getElementById("display");
      var i;
      var len = arr.length;
      for(i = 0; i < len; i++){
        var mes = document.createElement("p");
        mes.innerHTML = arr[i].message;
        var code = document.createElement("p");
        code.innerHTML = arr[i].code;
        display.appendChild(mes);
        display.appendChild(code);
      }
    },
    hide: function(){
      var display = document.getElementById("display");
      display.innerHTML = "";
    },
    make: function(){
      var Timer = function(){
        var self = this;
        self.start_time = performance.now();
        self.end = function(){
          if(!self.start_time){
            console.log("Start time is not set.");
            return false;
          }
          return performance.now() - self.start_time + " ms";
        };
      };
      return new Timer();
    }
  };


  var length = 100;
  var arr1 = APP.makeArr(length);
  console.info(arr1);
  var arr2 = APP.sortRandomly(arr1);
  console.info(arr2);

  var sorts = [
    {
      action: function(list, count){
        list.sort(function(a, b){
          count++;
          if(a < b){
            return -1;
          }
          if(a > b){
            return 1;
          }
          return 0;
        });
        return {
          list: list,
          count: count
        }
      }
    }
  ];


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
        APP.timer.start();
        var res = sorts[0].action(this.elements, 0);
        var t = APP.timer.end();
        console.info(t);
        console.info("count: ", res.count);
      }
    },
    mounted: function(){

    },
    created: function(){

    }
  });


})(window);