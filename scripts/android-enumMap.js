'use strict'

var hashMap = Java.use('java.util.HashMap');
var hashMapNode = Java.use('java.util.HashMap$Node');
var iterator = hashMap.entrySet().iterator();
while(iterator.hasNext()){
	var entry = Java.cast(iterator.next(),hashMapNode);
	console.log(entry.getKey());
	console.log(entry.getValue());
}
