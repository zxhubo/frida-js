### hook so里面的native方法，读取一些入参
```
//读取jstring
Java.vm.getEnv().getStringUtfChars(args[1], null).readCString()


//读取c/c++的char[],char*之类
Memory.readCString(args[0])
当然如果知道长度，我们也可以直接读取直接字节数组
console.log(Memory.readByteArray(args[0],128));

```


