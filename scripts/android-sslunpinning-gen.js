/* author:bobby *day:2019-06-14 */

'use strict'
var clazz_Thread = null;
var clazz_Log = null;
function printStackTrace(){
	var stackTrace = clazz_Thread.currentThread().getStackTrace().slice(2,5).reverse().toString().replace(/,/g,"\r\n");
	console.log(stackTrace);
}

function getStackTrace(){
	console.log(clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new()));
}
if (Java.available) {


Java.perform(function() {


	


	clazz_Thread = Java.use("java.lang.Thread");
	clazz_Log = Java.use("android.util.Log");

	try {

			var class_name = "org.conscrypt.Platform";

			var Platform  = Java.use(class_name);


			Platform.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'org.conscrypt.ConscryptEngine').implementation = function(arg1,arg2,arg3,arg4){


				console.log("[*]hook org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'org.conscrypt.ConscryptEngine') successful");
				return;
			}


			Platform.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'org.conscrypt.AbstractConscryptSocket').implementation = function(arg1,arg2,arg3,arg4){

				console.log("[*]hook hook org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'org.conscrypt.AbstractConscryptSocket') successful");

				return;
			}


	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.log(class_name + " not found!");
		 } else {

			throw new Error(e);

		 }


	}



	try {

			var class_name1 = "com.android.org.conscrypt.Platform";
			var Platform1  = Java.use(class_name1);		
			// 兼容某些厂家的ROM
			try{
				Java.use("com.android.org.conscrypt.OpenSSLEngineImpl");
				Java.use("com.android.org.conscrypt.OpenSSLSocketImpl");
				Platform1.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLEngineImpl').implementation = function(arg1,arg2,arg3,arg4){
					console.log("[*]hook com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLEngineImpl') successful");
					console.log(getCaller());
					return;
				}


				Platform1.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLSocketImpl').implementation = function(arg1,arg2,arg3,arg4){			 
					console.log("[*]hook  com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLSocketImpl') successful");
					return;
				}
			}catch(e){
				if(e.message.indexOf('ClassNotFoundException') != -1){
					console.log("[**Warn**]com.android.org.conscrypt.OpenSSLEngineImpl or com.android.org.conscrypt.OpenSSLSocketImpl not found!");
				}else{
					throw new Error(e);
					
				}
			}
			// 兼容某些厂家的ROM
			try{
				Java.use("com.android.org.conscrypt.ConscryptEngine");
				Java.use("com.android.org.conscrypt.AbstractConscryptSocket");
				Platform1.checkServerTrusted.overload(
					'javax.net.ssl.X509TrustManager', 
					'[Ljava.security.cert.X509Certificate;', 
					'java.lang.String', 
					'com.android.org.conscrypt.ConscryptEngine'
					).implementation = function(arg1,arg2,arg3,arg4){
					console.log("[*]hook com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.ConscryptEngine') successful");
					return;
				}


				Platform1.checkServerTrusted.overload(
					'javax.net.ssl.X509TrustManager', 
					'[Ljava.security.cert.X509Certificate;', 
					'java.lang.String', 
					'com.android.org.conscrypt.AbstractConscryptSocket'
					).implementation = function(arg1,arg2,arg3,arg4){	 
					console.log("[*]hook com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.AbstractConscryptSocket') successful");

					return;
				}
				
			}catch(e){
				if(e.message.indexOf('ClassNotFoundException') != -1){
					console.log("[**Warn**]com.android.org.conscrypt.ConscryptEngine or com.android.org.conscrypt.AbstractConscryptSocket not found!");
				}else{
					throw new Error(e);
					
				}
			}
			


	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.log(class_name1 + " not found!");
		 } else {

			throw new Error(e);

		 }


	}


	try {

			var class_name2 = "android.webkit.WebViewClient";

			var Platform2  = Java.use(class_name2);


			Platform2.onReceivedSslError.implementation = function(arg1,arg2,arg3){
				console.log("[*]hook android.webkit.WebViewClient.onReceivedSslError() successful");
				getStackTrace();
				arg2.proceed();
				 return;

				
			}

			Platform2.onReceivedError.overload('android.webkit.WebView', 'int', 'java.lang.String', 'java.lang.String').implementation = function (a,b,c,d){
				 console.log("[*]hook successful");
				 send("WebViewClient android.webkit.WebViewClient.onReceivedError('android.webkit.WebView', 'int', 'java.lang.String', 'java.lang.String') invoked");
				 return ;
			};

			Platform2.onReceivedError.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError').implementation = function (){
				 console.log("[*]hook android.webkit.WebViewClient.onReceivedError('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError') successful");
				 send("WebViewClient onReceivedError invoked");
				 return ;
			};



	} catch(e) {

	   
		 if (e.message.indexOf('ClassNotFoundException') != -1) {

			 console.log(class_name2 + " not found!");
		 } else {

			throw new Error(e);

		 }


	}
	
	

	try{
		var clz = Java.use("javax.net.ssl.X509TrustManager");
		clz.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;','java.lang.String').implementation = function(a,b){
			console.log("[*]hook javax.net.ssl.X509TrustManager.checkServerTrusted('[Ljava.security.cert.X509Certificate;','java.lang.String') successful");
			return;
			
		}
	}catch(e){
		if (e.message.indexOf('ClassNotFoundException') != -1) {

			console.log(clz + " not found!");
		 } else {

			throw new Error(e);

		 }
		
	}

});
} 
