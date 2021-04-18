/*
*Author:bobby
*/

'use strict';

function traceMethod(className,methodName,isPrintParameter,isNoneOp){
	var target_class=Java.use(className);
	var methods=target_class[methodName].overloads;
		methods.forEach(function(method){
		var argsType="('";
		method.argumentTypes.forEach(function(type){                    
		  argsType=argsType+type.className+"','";            
		}); 
			
// 		if (argsType.length >1) {
// 		  argsType=argsType.substr(0, argsType.length - 2);
// 		}
			
		if (argsType.length ==2) {
		  argsType=argsType.substr(0, argsType.length - 1);
		}else if (argsType.length >2) {
		  argsType=argsType.substr(0, argsType.length - 2);
		}
			
		argsType=argsType+")"; 


	  	method.implementation=function(){
	    console.warn("[***] Hook "+className+"."+methodName+argsType+" succeed ......");
	    if(isPrintParameter & arguments.length>0){
	      for (var j = 0; j < arguments.length; j++) {
	            console.log(methodName+"->arg[" + j + "](argType:\""+method.argumentTypes[j].className+"\"): " + arguments[j]);

	            // Object.getOwnPropertyNames(arguments[j]).forEach(function(key){

	            //     console.log(key+": "+arguments[j][key]);

	            // });

	            // var keys=Object.keys(arguments[j]);
	            // console.log(keys);


	            if((arguments[j]!=null) && (Object.keys(arguments[j]).indexOf("getClass")>-1)){
	            	// console.log(arguments[j].getClass());
	            	switch(arguments[j].getClass().getName()){
	            		case "android.content.Intent":
	            		  console.log(decodeURIComponent(arguments[j].toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
	            		  break;

	            		default:
	            		  break;
	            	}
	            }

	        }
	    }
	    getStackTrace();
	    // 判断是否需要什么都不操作直接返回
	    if(isNoneOp){
	    	return;
	    }

	    var ret= method.apply(this,arguments);
	    if(ret!=null||ret!=undefined){
	      console.log(methodName+" ret="+ret);
	      return ret;
	    }
	  }
	});
}



function printMap(map){
  var iterator = map.entrySet().iterator();
  while(iterator.hasNext()){
      var entry = Java.cast(iterator.next(),Java.use('java.util.HashMap$Node'));
      console.log(entry.getKey()+": "+entry.getValue());   
  }
}

function printSet(set){

  var iterator=retval.iterator();
  while (iterator.hasNext()) {
    console.log(iterator.next());
  }

}


function printList(list){
  for(var i=0;i<list.size();i++){
    console.log(list.get(i));
  }
}


function printDeclaredMethods(className){

  try {
    var clz  = Java.use(className);
    clz.class.getDeclaredMethods().forEach(function(method){
      console.log(method);
    });
  } catch(e) {

    if (e.message.indexOf('ClassNotFoundException') != -1) {

      console.warn(className + " not found!");
    } else {
      throw new Error(e);
    }
  }

}

Java.perform(function(){
	console.error("[***] Hooking im strating");
	traceMethod("android.app.PendingIntent","getService",true,false);
	traceMethod("android.app.PendingIntent","getBroadcast",true,false);
	traceMethod("android.app.PendingIntent","getActivity",true,false);
	traceMethod("android.app.PendingIntent","send",true,false);
	traceMethod("android.app.NotificationManager","notify",true,false);
});
