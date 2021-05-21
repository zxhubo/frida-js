'use strict'
console.error("[+++] Hook ios app start !!! ");

// for (var className in ObjC.classes)
//     {
//         if (ObjC.classes.hasOwnProperty(className))
//         {
//             //console.log(className);

//             if(className.indexOf("WKWebView")>-1){
//             	console.log(className);

//             }

//         }
// }


var methods = ObjC.classes.NSMutableURLRequest.$methods;
// console.log(methods);

methods.forEach(function(argument) {
	// body...
	// console.log(argument);

	if(argument.indexOf("setValue")>-1){
		console.log(argument);
	}

});


var printStackTrace = function(context){

	console.log('\tBacktrace:\n\t' + Thread.backtrace(context,
	Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n\t'));
}


if (ObjC.available)
{
    var loadRequest = ObjC.classes.WKWebView["- loadRequest:"];
    Interceptor.attach(loadRequest.implementation, {
        onEnter: function(args) {

            var receiver = new ObjC.Object(args[0]);
            console.log("Target class : " + receiver);
            console.log("Target superclass : " + receiver.$superClass);
            var sel = ObjC.selectorAsString(args[1]);
            console.warn("Hooked the target method : " + sel);
            var obj = ObjC.Object(args[2]);
            console.log("Argument : " + obj.toString());

            printStackTrace(this.context);

        }
    });
	
    /*OC调用js*/
    var evaluateJavaScript = ObjC.classes.WKWebView["- evaluateJavaScript:completionHandler:"];
    Interceptor.attach(evaluateJavaScript.implementation, {
        onEnter: function(args) {

            var receiver = new ObjC.Object(args[0]);
            console.log("Target class : " + receiver);
            console.log("Target superclass : " + receiver.$superClass);
            var sel = ObjC.selectorAsString(args[1]);
            console.warn("Hooked the target method : " + sel);
            var obj = ObjC.Object(args[2]);
            console.log("Argument1 : " + obj.toString());

            var obj = ObjC.Object(args[3]);
            console.log("Argument2 : " + obj.toString());


            printStackTrace(this.context);

        }
    });

    var addScriptMessageHandler = ObjC.classes.WKUserContentController["- addScriptMessageHandler:name:"];
    Interceptor.attach(addScriptMessageHandler.implementation, {
        onEnter: function(args) {

            var receiver = new ObjC.Object(args[0]);
            console.log("Target class : " + receiver);
            console.log("Target superclass : " + receiver.$superClass);
            var sel = ObjC.selectorAsString(args[1]);
            console.warn("Hooked the target method : " + sel);
            var obj = ObjC.Object(args[2]);
            console.log("Argument : " + obj.toString());
            var obj = ObjC.Object(args[3]);
            console.log("Registe native method : " + obj.toString());

            printStackTrace(this.context);

        }
    });

    var addScriptMessageHandler = ObjC.classes.WKUserContentController["- addScriptMessageHandler:contentWorld:name:"];
    Interceptor.attach(addScriptMessageHandler.implementation, {
        onEnter: function(args) {

            var receiver = new ObjC.Object(args[0]);
            console.log("Target class : " + receiver);
            console.log("Target superclass : " + receiver.$superClass);
            var sel = ObjC.selectorAsString(args[1]);
            console.warn("Hooked the target method : " + sel);
            var obj = ObjC.Object(args[2]);
            console.log("Argument : " + obj.toString());
            var obj = ObjC.Object(args[3]);
            console.log("Registe native method : " + obj.toString());

            printStackTrace(this.context);

        }
    });


    /*
	* hook setValue函数查看添加的Http Header
    */
    var setValue = ObjC.classes.NSMutableURLRequest["- setValue:forHTTPHeaderField:"];
    Interceptor.attach(setValue.implementation, {
        onEnter: function(args) {

            var receiver = new ObjC.Object(args[0]);
            console.log("Target class : " + receiver);
            console.log("Target superclass : " + receiver.$superClass);
            var sel = ObjC.selectorAsString(args[1]);
            console.warn("Hooked the target method : " + sel);
            console.log("HTTPHeaderField key :"+ObjC.Object(args[3])+",HTTPHeaderField value : "+ObjC.Object(args[2]));

            printStackTrace(this.context);

        }
    });

}
