import frida
import sys

device = frida.get_remote_device()

pid = device.spawn(["com.xxx.yyy"])

session = device.attach(pid)

device.resume(pid)

scr = """
```
Interceptor.attach(Module.findExportByName("libxyz.so" , "Java_com_xxx_aaa_jni_abc_nativemethod"), {
    
    onEnter: function(args) {
        #Memory.readUtf8String(args[1])
        send("[+]nativemethod param is: ", Memory.readByteArray(args[0], 256));
    },
    
    onLeave:function(retval){
    
    }
});
```
"""
def on_message(message ,data):
    print(message['payload'])

script = session.create_script(scr)

script.on("message" , on_message)

script.load()

sys.stdin.read()
