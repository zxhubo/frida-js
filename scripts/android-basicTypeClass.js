'use strict'
/*
* Java basic type int、boolean、byte and so on can find the Class object by use int.class、boolean.class、byte.class.
* But in frida script, U can't use by that method. 
*/

var Integer = Java.use("java.lang.Integer");
var int_clz=Integer.class.getField("TYPE").get(null);
console.warn(int_clz);

var Bool=Java.use("java.lang.Boolean");
var boolean_clz=Bool.class.getField("TYPE").get(null);
console.warn(boolean_clz);

var Byte=Java.use("java.lang.Byte");
var byte_clz=Byte.class.getField("TYPE").get(null);
console.warn(byte_clz);
