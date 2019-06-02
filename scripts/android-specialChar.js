/* author:bobby *day:2019-05-01 */
'use strict'
Java.perform(
        function x() {

            var targetClass = "com.example.hooktest.MainActivity";

            var hookCls = Java.use(targetClass);
            var methods = hookCls.class.getDeclaredMethods();

            for (var i in methods) {
                console.log(methods[i].toString());
                console.log(encodeURIComponent(methods[i].toString().replace(/^.*?\.([^\s\.\(\)]+)\(.*?$/, "$1")));
            }

            hookCls[decodeURIComponent("%D6%8F")]
                .implementation = function (x) {
                    console.log("original call: fun(" + x + ")");
                    var result = this[decodeURIComponent("%D6%8F")](900);
                    return result;
                }
        }
    )
