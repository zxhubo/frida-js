
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

		});

	}
});

