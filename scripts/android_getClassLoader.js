'use strict'

if(Java.available) {
    Java.perform(function(){
        var application = Java.use("android.app.Application");
        var reflectClass = Java.use("java.lang.Class");
 
        console.log("application: " + application);
 
        application.attach.overload('android.content.Context').implementation = function(context) {
            var result = this.attach(context); // 先执行原来的attach方法
            var classloader = context.getClassLoader(); // 获取classloader
            Java.classFactory.loader = classloader;
            var clz = Java.classFactory.use("xxx"); //这里能直接使用Java.use，因为java.use会检查在不在perform里面，不在就会失败
            console.log("clz: " + clz);
 
            return result;
        }
 
    });
}
