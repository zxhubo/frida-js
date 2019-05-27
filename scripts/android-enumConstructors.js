/* author:bobby *day:2019-05-27 */
'use strict'

var targetClass="xxx.xxx.xxx";
var clz=Java.use(targetClass);
var overloads = clz.$init.overloads; 
overloads.forEach(function(overload) {                
	var proto = "(";                
	overload.argumentTypes.forEach(function(type){                    
		proto += type.className + ", ";                
	});                
	if(proto.length > 1){                   
 		proto = proto.substr(0, proto.length - 2);                
 	}                
	proto += ")";              
	console.log("hooking "+targetClass+proto);
});
