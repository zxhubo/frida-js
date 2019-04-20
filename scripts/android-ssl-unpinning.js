
"use strict"

setImmediate(function() {
	if(Java.available){
		Java.perform(function(){
			/*
			hook list:
			1.SSLcontext
			2.okhttp
			3.webview
			4.XUtils
			5.httpclientandroidlib
			6.JSSE
			7.network\_security\_config (android 7.0+)
			8.Apache Http client (support partly)
			*/
			console.log("[+] starting to unpinning!");
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

		});

	}
});

