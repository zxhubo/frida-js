/* author:bobby *day:2019-06-01 */
'use strict'
/*
* the obj is a class of instance.When if java,you can use obj.getClass().getName() to get the className of an obj,but in frida,
* you can't use obj.getClass().getName(),the Error is "TypeError: undefined not callable (property 'getName' of [object Object])",
* so you can use the bellow js to getClassName.
*/
var clz = Java.use("java.lang.Class");
var clz_name = clz.getName.call(obj.getClass());
