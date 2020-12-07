// open proxy (not working)
Java.perform(function() {
    Java.use('android.net.Proxy').setHttpProxySystemProperty(Java.use('android.net.ProxyInfo').buildDirectProxy('1.0.0.1', 8081));
});



var type = Java.use("java.net.Proxy$Type").valueOf("HTTP");
var socket = Java.use("java.net.InetSocketAddress").$new("192.168.0.12",8088);
var proxy = Java.use("java.net.Proxy").$new(type,socket);
var builder = Java.use("okhttp3.OkHttpClient$Builder").$new();
builder = builder.proxy(proxy);
var okHttpClient = builder.build();

