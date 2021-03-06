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
      name: "sortNative",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var snapshots = [];
        snapshots.push(array.join(","));

        array.sort(function(a, b){
          var val;
          if(a < b){
            val = -1;
          }
          if(a > b){
            val = 1;
          }
          count++;
          var current = array.join(",");
          var pre = snapshots[snapshots.length - 1];
          // if(current !== pre){
          //   snapshots.push(current);
          // }
          snapshots.push(current);
          // console.info(val);
          return val;
        });
        // console.info(array, snapshots);
        return {
          array: array,
          count: count,
          label: "sortNative",
          snapshots: snapshots
        };
      }
    },
    {
      name: "sortRandom",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var random_arr = [];

        var snapshots = [];
        snapshots.push(array.join(","));

        var o = 0;
        var len = array.length;
        var elm;

        for(var i = 0; i < len; i++){
          o = Math.floor(Math.random() * array.length);
          elm = array.splice(o, 1)[0];
          random_arr.push(elm);
          count++;
          snapshots.push(random_arr.join(","));
        }
        return {
          array: random_arr,
          count: count,
          label: "sortRandom",
          snapshots: snapshots
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
    },
    {
      name: "sortInsertion",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var len = array.length;

        var snapshots = [];
        snapshots.push(array.join(","));

        for(var i = 1; i < len; i++){
          var temp = array[i];
          if(array[i-1] > temp){
            var j = i;
            do{
              array[j] = array[j-1];
              j--;
              count++;
              snapshots.push(array.join(","));
            }while(j > 0 && array[j - 1] > temp);
            array[j] = temp;
            count++;
            snapshots.push(array.join(","));
          }
        }

        return {
          array: array,
          count: count,
          label: "sortInsertion",
          snapshots: snapshots
        };
      }
    },
    {
      name: "sortSelection",
      action: function(obj){
        var array = obj.array;
        var count = obj.count;
        var len = array.length;

        var snapshots = [];
        snapshots.push(array.join(","));

        var min,min_pos;

        for(var i = 0; i < len; i++){
          min = array[i];
          min_pos = i;
          for(var j = i + 1; j < len; j++){
            if(array[j] < min){
              min = array[j];
              min_pos = j;
              count++;
            }
          }
          array = swap(array, i, min_pos);
          count++;
          snapshots.push(array.join(","));
        }

        return {
          array: array,
          count: count,
          label: "sortSelection",
          snapshots: snapshots
        };
      }
    }


  ];

  var runCode = function(name, obj){

    var tempArr = JSON.parse( JSON.stringify(obj.array) );
    obj.array = tempArr;

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

  var app = new Vue({
    el: "#app",
    data: {
      // elements: sort_array,
      element_min_height: 5,
      result: "",
      array_length: 100,
      array: [],
      time: 10
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
      sortNative: function(){
        var res = runCode("sortNative", {array: this.elements, count: 0});
        this.result = res;
        this.updateArrayInOrder(this.result.snapshots);
      },
      sortRandom: function(){
        var res = runCode("sortRandom", {array: this.elements, count: 0});
        this.result = res;
        this.updateArrayInOrder(this.result.snapshots);
      },
      sortBubble: function(){
        var res = runCode("sortBubble", {array: this.elements, count: 0});
        this.result = res;
        this.updateArrayInOrder(this.result.snapshots);
      },
      sortInsertion: function(){
        var res = runCode("sortInsertion", {array: this.elements, count: 0});
        this.result = res;
        this.updateArrayInOrder(this.result.snapshots);
      },
      sortSelection: function(){
        var res = runCode("sortSelection", {array: this.elements, count: 0});
        this.result = res;
        this.updateArrayInOrder(this.result.snapshots);
      },
      changeLength: function(){
        this.array = APP.makeArr(this.array_length);
      },
      updateArrayInOrder: function(snapshots){
        var self = this;
        var time = this.time;
        var len = snapshots.length;
        var setArray = function(arr){
          return function(){
            self.array = arr;
          };
        };

        for(var i = 0; i < len; i++){
          var arr = snapshots[i].split(",").map(function(elm){ return Number(elm); });
          setTimeout(setArray(arr), time);
        }

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