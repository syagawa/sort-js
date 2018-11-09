(function(global){

  global.APP = global.APP ? global.APP : {};
  var APP = global.APP;

  APP.makeArr = function(len){
    var arr = [];
    for(var i = 0; i < length; i++){
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
      o = Math.ceil(Math.random() * arr.length);
      elm = arr.splice(o, 1)[0];
      random_arr.push(elm);
    }
    return random_arr;
  };


  var length = 100;
  var arr1 = APP.makeArr(length);
  var arr2 = APP.sortRandomly(arr1); 
  console.info(arr2);

})(window);