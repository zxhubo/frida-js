/* author:bobby *day:2020-11-22 */
'use strict'

function getStackTrace(){
	var clazz_Log = Java.use("android.util.Log");
	console.log(clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new()));
}


function traceMethod(className,methodName,isPrintParameter,isNoneOp){
  var target_class=Java.use(className);
  var methods=target_class[methodName].overloads;
    methods.forEach(function(method){
      var argsType="('";
      method.argumentTypes.forEach(function(type){                  
        argsType=argsType+type.className+"','"; 

      }); 
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



if (Java.available) {


Java.perform(function() {



	/*
	* hook class okhttp3.CertificatePinner 
	* hook method check
	*/
    try {

			var class_name = "okhttp3.CertificatePinner";	
			traceMethod(class_name,"check",false,true);
			// traceMethod(class_name,"check$okhttp",true);

	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.warn(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }
	}

	/*
	* hook class com.android.org.conscrypt.Platform 
	* hook method checkServerTrusted
	*/

	try {

			var class_name = "com.android.org.conscrypt.Platform";	
			traceMethod(class_name,"checkServerTrusted",false,true);

	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.warn(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }
	}


	/*
	* hook class org.conscrypt.Platform 
	* hook method checkServerTrusted
	*/
	try {

			var class_name = "org.conscrypt.Platform";	
			traceMethod(class_name,"checkServerTrusted",false,true);

	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.warn(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }


	}



	/*
	* hook class android.webkit.WebViewClient，但是在实际情况中，都是继承WebViewClient然后重写账这几个函数，因此需要填入实际的类名
	* hook method onReceivedSslError、stopLoading、onReceivedError
	*/
	try {
			var class_name = "android.webkit.WebViewClient";
			// var class_name = "com.tencent.smtt.sdk.WebViewClient";

			traceMethod(class_name,"onReceivedSslError",false,true);
			// traceMethod(class_name,"stopLoading",false,true);
			traceMethod(class_name,"onReceivedError",false,true);

	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.warn(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }


	}

	try{

			var class_name = "javax.net.ssl.X509TrustManager";	
			traceMethod(class_name,"checkServerTrusted",false,true);
	}catch(e){
		if (e.message.indexOf('ClassNotFoundException') != -1) {

			console.log(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }
		
	}

});
} 
