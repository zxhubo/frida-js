## 如何修改frida-server 服务端的默认监听端口

```
/data/local/tmp/fs64 -l 0.0.0.0:1234
adb forward tcp:1234 tcp:1234
frida -H 127.0.0.1:1234 package_name -l hook.js
```

- https://bbs.pediy.com/thread-254974.htm

