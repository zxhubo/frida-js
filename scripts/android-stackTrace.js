
var clazz_Thread = null;
var clazz_Log = null;
// method 1
function getStackTrace(){
	return clazz_Thread.currentThread().getStackTrace().slice(2,5).reverse().toString().replace(/,/g,"\r\n");
	//return clazz_Thread.currentThread().getStackTrace().slice(2,5).reverse().toString().replace(/,/g,"\r\n");
}
// method 2
function getStackTrace(){
	return clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new());
}

if (Java.available) {
	Java.perform(function(){
		clazz_Thread = Java.use("java.lang.Thread");
		clazz_Log = Java.use("android.util.Log");
    console.log("[+] onload getCaller() successful!");
		console.log("[+] onload getStackTrace() successful!");
	});

}
