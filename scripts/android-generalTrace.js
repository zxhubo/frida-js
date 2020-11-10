/*
*Author:bobby
*/
function traceMethod(className,methodName){

  var target_class=Java.use(className);
  var methods=target_class[methodName].overloads;
  methods.forEach(function(method){
    var argsType="('";
    method.argumentTypes.forEach(function(type){                    
      argsType=argsType+type.className+"','";            
    }); 
    if (argsType.length >1) {
      argsType=argsType.substr(0, argsType.length - 2);
    }
    argsType=argsType+")"; 


    method.implementation=function(){
      console.warn("Hook "+className+"."+methodName+argsType+" succeed ......");
      if(arguments.length>0){
        for (var j = 0; j < arguments.length; j++) {
              console.log(methodName+"->arg[" + j + "]: " + arguments[j]);
          }
      }
      getStackTrace();
      var ret= method.apply(this,arguments);
      if(ret!=null||ret!=undefined){
        console.log(methodName+" ret="+ret);
        return ret;
      }
    }
  });
}
