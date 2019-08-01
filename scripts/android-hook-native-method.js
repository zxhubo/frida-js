'use strict'

Interceptor.attach(Module.getExportByName("xxx.so" , "xxx"), {
    onEnter: function(args) {
        console.log("xxx called!");
    },
    onLeave:function(retval){
    
    }
});

    var c = undefined;
    var exports = Module.enumerateExportsSync("xxx.so");
    for(var i=0;i<exports.length;i++){
        if(exports[i].name=="xxx"){
            c=exports[i].address;
            console.log("[***]xxx at "+c);
            break;
        }
    }
    var nativePointer=new NativePointer(c);

	Interceptor.attach(nativePointer, {
	    onEnter: function(args) {
	        console.log("[***]xxx called!");
	        var env=Java.vm.getEnv();
	        console.log("args[2]: "+Java.cast(args[2],Java.use("java.lang.String")));
	        console.log(args[3].toInt32());
	    },
	    onLeave:function(retval){
	    	var env=Java.vm.getEnv();
	    	var jstrings=env.newStringUtf("aaaaaaaaaaaaaaaaaaaaaa");
	    	retval.replace(jstrings);
	    	
	    }
	});
