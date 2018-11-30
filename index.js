(function(global){

  global.APP = global.APP ? global.APP : {};
  var APP = global.APP;

  var swap = function(array, a, b){
    var t = array[a];
    array[a] = array[b];
    array[b] = t;
    return array;
  };

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
    },
    {
      name: "sortBubble",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var len = array.length;

        var snapshots = [];
        snapshots.push(array.join(","));

        for(var i = 0; i < len; i++){
          for(var j = 0; j < len; j++){
            var a = j;
            var b = j + 1;
            if(b >= len){
              continue;
            }
            if(array[a] > array[b]){
              array = swap(array, a, b);
              count++;
              snapshots.push(array.join(","));
            }
          }
        }

        return {
          array: array,
          count: count,
          label: "sortBubble",
          snapshots: snapshots
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
  var sort_array = APP.makeArr(length);

  var app = new Vue({
    el: "#app",
    data: {
      // elements: sort_array,
      element_min_height: 5,
      result: "",
      array_length: 100,
      array: []
    },
    computed: {
      elements: function(){
        return this.array;
      },
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
      sortNormal: function(){
        var res = runCode("sortNormal", {array: this.elements, count: 0});
        this.array = res.array;
        this.result = res;
      },
      sortRandom: function(){
        var res = runCode("sortRandom", {array: this.elements, count: 0});
        this.array = res.array;
        this.result = res;
      },
      sortBubble: function(){
        var res = runCode("sortBubble", {array: this.elements, count: 0});
        this.array = res.array;
        this.result = res;
      },
      changeLength: function(){
        this.array = APP.makeArr(this.array_length);
      }
    },
    mounted: function(){
      this.array = APP.makeArr(this.array_length);
    },
    created: function(){
      global.app = this;
    }
  });


})(window);