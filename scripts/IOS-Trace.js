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


// var methods = ObjC.classes.WKUserContentController.$methods;
// // console.log(methods);

// methods.forEach(function(argument) {
// 	// body...
// 	// console.log(argument);

// 	if(argument.indexOf("addScriptMessageHandler")>-1){
// 		console.log(argument);
// 	}

// });


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
            console.log("Argument : " + obj.toString());

            printStackTrace(this.context);

        }
    });

}
