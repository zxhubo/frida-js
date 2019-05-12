/* author:bobby *day:2019-05-11 */
'use strict'


String.prototype.endWith = function(str){
     if(str==null || str=="" || this.length == 0 ||str.length > this.length){   
       return false;
     }
     if(this.substring(this.length - str.length)){
         return true;
     }else{
         return false;
     }
     return true;
};
 
 String.prototype.startWith = function(str){
  if(str == null || str== "" || this.length== 0 || str.length > this.length){
     return false;
  } 
  if(this.substr(0,str.length) == str){
     return true;
  }else{
     return false;
   }       
  return true; 
 };



console.log("[*] hook starting");
Java.perform(function(){
    var InterfaceImpl=Java.use("com.example.cryptutils.util.InterfaceImpl");
    Java.enumerateLoadedClasses(
                {
                    "onMatch": function (className) {

                        // 排除一些关键字和基本类型等,例如void、byte、int等
                        if(className.indexOf(".")<0){
                            return;
                        }
                        // 排除一些系统类
                        
                        // if (className.startWith("android")|className.startWith("java")|className.startWith("com.android")
                        //     |className.startWith("sun")|className.startWith("org")|className.startWith("[")|className.startWith("libcore")) {
                        //     return;
                        // }
                        var pattern = /^(android|java|sun|org|libcore|\[|com\.android)/g;
                        if (pattern.test(className)) {
                            return;
                        }
                        var hookCls = Java.use(className);
                        var interFaces = hookCls.class.getGenericInterfaces();
                        if(interFaces.length != 0){
                    
                            for (var i in interFaces) {
                                // 此处更改需要查找的interface
                                if (interFaces[i].getTypeName()=="com.example.cryptutils.myinterface.InterfaceA") {
                                    console.log("implClassName = "+className);
                                    console.log("\t ", interFaces[i].getTypeName());
                                }
                            }


                        }
                    },
                    "onComplete": function () { }
                }
            )

});
	
