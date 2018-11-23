(function(global){

  global.APP = global.APP ? global.APP : {};
  var APP = global.APP;

  var sorts = [
    {
      name: "sortNormal",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        array.sort(function(a, b){
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
          array: array,
          count: count,
          label: "sortNormal"
        };
      }
    },
    {
      name: "sortRandom",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var random_arr = [];

        var o = 0;
        var len = array.length;
        var elm;

        for(var i = 0; i < len; i++){
          o = Math.floor(Math.random() * array.length);
          elm = array.splice(o, 1)[0];
          random_arr.push(elm);
          count++;
        }
        return {
          array: random_arr,
          count: count,
          label: "sortRandom"
        };
      }
    }
  ];

  var runCode = function(name, obj){
    var code = sorts.find(function(elm){
      if(elm.name === name){
        return elm;
      }
    }).action;

    APP.timer.start();
    var res = code(obj);
    var t = APP.timer.end();
    APP.displayCount(res.count, res.label);
    res.time = t;
    return res;
  };


  APP.makeArr = function(len){
    var arr = [];
    for(var i = 0; i < len; i++){
      arr.push(i + 1);
    }
    return arr;
  };

  APP.displayCount = function(count, label){
    console.info(label + " count: ", count);
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


  var app = new Vue({
    el: "#app",
    data: {
      elements: arr1,
      element_min_height: 5,
      result: ""
    },
    computed: {
      sortname: function(){
        return this.result.label;
      },
      sortcount: function(){
        return this.result.count;
      },
      sorttime: function(){
        return this.result.time;
      }

    },
    methods: {
      getHeightStyle: function(elm){
        return (this.element_min_height + elm * 2) + "px";
      },
      sort: function(){
        var res = runCode("sortNormal", {array: this.elements, count: 0});
        this.elements = res.array;
        this.result = res;
      },
      sortRandom: function(){
        var res = runCode("sortRandom", {array: this.elements, count: 0});
        this.elements = res.array;
        this.result = res;
      }
    },
    mounted: function(){

    },
    created: function(){

    }
  });


})(window);