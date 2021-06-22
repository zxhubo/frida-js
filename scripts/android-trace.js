
/* author:bobby *day:2019-06-01 ,changed by booby *day:2020-02-21*/
'use strict'

function getStackTrace(){
  var clazz_Log = Java.use("android.util.Log");
  console.log(clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new()));
}

Java.perform(function(){
  console.error("[***] Hooking im strating");
  
  //Toast
  var Toast=Java.use("android.widget.Toast");
    Toast.makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking makeText(p1,p2,p3) successful");
      getStackTrace();
      return this.makeText(p1,p2,p3);
    }
    Toast.makeText.overload('android.content.Context', 'android.os.Looper', 'java.lang.CharSequence', 'int').implementation=function(p1,p2,p3,p4){
      console.warn("Hooking android.widget.Toast.makeText(p1,p2,p3,p4) successful");
      getStackTrace();
      return this.makeText(p1,p2,p3,p4);
    }
    Toast.show.implementation=function(){
      console.warn("Hooking android.widget.Toast.show() successful");
      getStackTrace();
      return this.show();
    }
 
  // hook Dialog's show
  var Dialog=Java.use("android.app.Dialog");
    Dialog.show.implementation=function(){
      console.warn("Hooking android.app.Dialog.show() successful");
      getStackTrace();
      this.show();
    }

 //if or not dynamic load so、dex、apk、jar or other files
  
  var System=Java.use("java.lang.System");
  System.load.implementation=function(p1){
    console.warn("Hooking java.lang.System.load() successful");
    console.log(p1);
    getStackTrace();
    this.load(p1);
  }

  var DexClassLoader=Java.use("dalvik.system.DexClassLoader");
  DexClassLoader.$init.implementation=function(p1,p2,p3,p4){
      console.warn("Hooking dalvik.system.DexClassLoader.$init() successful");
      console.log(p1);
      console.log(p2);
      console.log(p3);
      console.log(p4);
      getStackTrace();
      this.$init(p1,p2,p3,p4);
  }
  
 //String
  
  var String = Java.use("java.lang.String");
    String.endsWith.implementation = function(arg_0) {
      console.warn("[***] Hook java.lang.String.endsWith() succeed ......");
      console.log("String->endsWith (argType: java.lang.String): " + arg_0);
      var retval = this.endsWith(arg_0);
      console.log("String->endsWith (retType: java.lang.String): " + retval);
      return retval;

    }
  
  String.contains.implementation = function(arg_0) {
    console.warn("[***] Hook java.lang.String.contains() succeed ......");
    console.log("String->contains (argType: java.lang.String): " + arg_0);
    var retval = this.contains(arg_0);
    console.log("String->contains (retType: java.lang.String): " + retval);
    return retval;

        }
  
  // Pattern
  var Pattern = Java.use("java.util.regex.Pattern");

    Pattern.compile.overload('java.lang.String').implementation = function(arg_0) {
        console.warn("[***] Hook java.util.regex.Pattern.compile() succeed ......");
        getStackTrace();
        console.log("Pattern->compile (argType: java.lang.String): " + arg_0);
        var retval = this.compile(arg_0);
        console.log("Pattern->compile (retType: java.lang.String): " + retval);
        return retval;
    }
  
    Pattern.compile.overload('java.lang.String', 'int').implementation = function(arg_0,arg_1) {
        console.warn("[***] Hook java.util.regex.Pattern.compile(arg_0,arg_1) succeed ......");
        getStackTrace();
        console.log("Pattern->compile (argType: java.lang.String): " + arg_0);
        var retval = this.compile(arg_0,arg_1);
        console.log("Pattern->compile (retType: java.lang.String): " + retval);
        return retval;

    }

    Pattern.matcher.overload('java.lang.CharSequence').implementation = function(arg_0) {
        console.warn("[***] Hook java.util.regex.Pattern.matcher() succeed ......");
        getStackTrace();
        console.log("Pattern->matcher (argType: java.lang.String): " + arg_0);
        var retval = this.matcher(arg_0);
        console.log("Pattern->matcher (retType: java.lang.String): " + retval);
        return retval;

    }
  
    Pattern.matcher.overload('java.lang.CharSequence').implementation = function(arg_0) {

      if(arg_0=="http://xxx.xxx.xxx/"){
        console.warn("[***] Hook java.util.regex.Pattern.matcher() succeed ......");
        // getStackTrace();
        console.log("Pattern->matcher (argType: java.lang.String): " + arg_0);
        var retval = this.matcher(arg_0);
        console.log("Pattern->matcher (retType: java.lang.String): " + retval);
        return retval;

      }else{
        return this.matcher(arg_0);
      }
     }
  
  //textView
  var TextView=Java.use("android.widget.TextView");
    TextView.setText.overload('java.lang.CharSequence').implementation=function(p1){
      console.warn("Hooking setText() successful");
      console.warn(p1);
      getStackTrace();
      return this.setText(p1);
    }
    TextView.setText.overload('int').implementation=function(p1){
      console.warn("Hooking setText('int') successful");
      console.warn(p1);
      getStackTrace();
      return this.setText(p1);
    }
  
  //hook WebView methods
  
  var WebView_name="android.webkit.WebView";
  // var WebView_name="com.tencent.smtt.sdk.WebView";
  // var WebView_name="com.uc.webview.export.WebView";
  // var WebView_name="android.taobao.windvane.extra.uc.WVUCWebView";
  // var WebView_name="android.alibaba.support.hybird.view.HybridWebView";
  // var WebView_name="com.miui.webkit.WebView";
  // var WebView_name="com.miui.webkit_api.WebView";
  
  var WebView=Java.use(WebView_name);
    WebView.getUrl.implementation=function(){
      console.warn("Hooking "+WebView_name+".getUrl(p1) successful");
      var ret=this.getUrl();
      console.log("WebView.getUrl() ,ret="+ret);
      return ret;
    }

    WebView.loadUrl.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking "+WebView_name+".loadUrl(p1) successful,url = "+p1);
      getStackTrace();
      this.loadUrl(p1);
    }

    WebView.loadUrl.overload('java.lang.String','java.util.Map').implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".loadUrl(p1,p2) successful,url = "+p1+", map.size() ="+p2.size());
      getStackTrace();
      if(p2!=null && p2.size()!=0){
        var iterator = p2.entrySet().iterator();
        while(iterator.hasNext()){
            var entry = Java.cast(iterator.next(),Java.use('java.util.HashMap$Node'));
            console.log(entry.getKey()+": "+entry.getValue());   
        }
      }
      this.loadUrl(p1,p2);
    }

    WebView.addJavascriptInterface.implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".addJavascriptInterface() successful, "+p1+":"+p2);
      // getStackTrace();
      this.addJavascriptInterface(p1,p2);
    }

    WebView.removeJavascriptInterface.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".removeJavascriptInterface() successful, "+p1);
      // getStackTrace();
      this.removeJavascriptInterface(p1);
    }

    WebView.evaluateJavascript.implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".evaluateJavascript() successful, p1="+p1);
      getStackTrace();
      this.evaluateJavascript(p1,p2);
    }

    WebView.setWebChromeClient.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".setWebChromeClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebChromeClient(p1);
    }

    WebView.setWebViewClient.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".setWebViewClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebViewClient(p1);
    }
 
  
  // hook WebViewClient 
  // 因为这里的WebViewClient_name针对于每个app都会不同，为了方便不用每次都要去注释代码出错，使用try catch来捕获异常
  
  try {

    var WebViewClient_name="xxx.WebViewClient";
    var WebViewClient=Java.use(WebViewClient_name);

    var overloads=WebViewClient.shouldOverrideUrlLoading.overloads;
    overloads.forEach(function(overload) {
      var argsType="('";
      overload.argumentTypes.forEach(function(type){                    
        argsType=argsType+type.className+"','";            
      }); 
      if (argsType.length >1) {
        argsType=argsType.substr(0, argsType.length - 2);
      }
      argsType=argsType+")";      
      overload.implementation=function(){
        console.warn("Hook "+WebViewClient_name+".shouldOverrideUrlLoading"+argsType+" succeed ......");
        getStackTrace();
        console.log("shouldOverrideUrlLoading->arg[0]:"+arguments[0].getUrl());
        if (argsType.indexOf("WebResourceRequest")>-1) {
          console.log("shouldOverrideUrlLoading->arg[1]:"+decodeURIComponent(arguments[1].getUrl()));
        }else{
          console.log("shouldOverrideUrlLoading->arg[1]:"+decodeURIComponent(arguments[1]));
        }

        var ret= overload.apply(this,arguments);
        console.log("shouldOverrideUrlLoading ret="+ret);
        return ret;
      }

    });

    WebViewClient.onReceivedSslError.implementation = function(arg1,arg2,arg3){
      console.log("Hook "+WebViewClient_name+".onReceivedSslError() successful");
      getStackTrace();
      arg2.proceed();
      return;
     }
  } catch(e) {

    if (e.message.indexOf('ClassNotFoundException') != -1) {

      console.warn(WebViewClient_name + " not found!");
    } else {
      // throw new Error(e);
    }
  }
  
  // hook WebChromeClient 

  try {
    var WebChromeClient_name="xxx.WebChromeClient";
    var WebChromeClient = Java.use(WebChromeClient_name);

      WebChromeClient.onJsPrompt.implementation = function(arg_0, arg_1, arg_2, arg_3, arg_4) {
        console.warn("Hook "+WebChromeClient_name+".onJsPrompt() succeed ......");
        console.log("WebChromeClient->onJsPrompt (argType: WebView): " + arg_0);
        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_1);
        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_2);
        console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_3);
        console.log("WebChromeClient->onJsPrompt (argType: JsPromptResult): " + arg_4);
        var retval = this.onJsPrompt(arg_0, arg_1, arg_2, arg_3, arg_4);
        console.log("WebChromeClient->onJsPrompt (retType: boolean): " + retval);
        return retval;
      }


      WebChromeClient.onJsConfirm.implementation = function(arg_0, arg_1, arg_2, arg_3) {
        console.warn("Hook "+WebChromeClient_name+".onJsConfirm() succeed ......");
        console.log("WebChromeClient->onJsConfirm (argType: android.webkit.WebView): " + arg_0);
        console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_1);
        console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_2);
        console.log("WebChromeClient->onJsConfirm (argType: JsConfirmResult): " + arg_3);
        var retval = this.onJsConfirm(arg_0, arg_1, arg_2, arg_3);
        console.log("WebChromeClient->onJsConfirm (retType: boolean): " + retval);
        return retval;
      }

      WebChromeClient.onConsoleMessage.overload('com.miui.webkit_api.ConsoleMessage').implementation = function(arg_0) {
        console.warn("Hook "+WebChromeClient_name+".onConsoleMessage() succeed ......");
        console.log(arg_0.message())
        var retval = this.onConsoleMessage(arg_0);
        console.log("WebChromeClient->onConsoleMessage (retType: boolean): " + retval);
        return retval;
      }
      WebChromeClient.onConsoleMessage.overload('java.lang.String', 'int', 'java.lang.String').implementation = function(arg_0,arg_1,arg_2) {
        console.warn("Hook "+WebChromeClient_name+".onConsoleMessage() succeed ......");
        console.log(arg_0)
        console.log(arg_1)
        console.log(arg_2)
        var retval = this.onConsoleMessage(arg_0,arg_1,arg_2);
        console.log("WebChromeClient->onConsoleMessage (retType: boolean): " + retval);
        return retval;
      }
  } catch(e) {

    if (e.message.indexOf('ClassNotFoundException') != -1) {

      console.warn(WebChromeClient_name + " not found!");
    } else {
      // throw new Error(e);
    }
  }
  
  // hook CookieManager
  var CookieManager_name=undefined;
  if(WebView_name=="android.webkit.WebView"){
    CookieManager_name="android.webkit.CookieManager";
  }else if (WebView_name=="com.tencent.smtt.sdk.WebView") {
    CookieManager_name="com.tencent.smtt.sdk.CookieManager";
  }else if (WebView_name=="com.uc.webview.export.WebView") {
    CookieManager_name="com.uc.webview.export.CookieManager";
  }else if (WebView_name=="com.miui.webkit.WebView") {
    CookieManager_name="com.miui.webkit.CookieManager";
  }else if (WebView_name=="com.miui.webkit_api.WebView") {
    CookieManager_name="com.miui.webkit_api.CookieManager";
  }

  var CookieManager=Java.use(CookieManager_name);
    CookieManager.getInstance.overload().implementation=function(){
      console.warn("Hooking "+CookieManager_name+".getInstance() successful");
      getStackTrace();
      return this.getInstance();
    }

    CookieManager.setCookie.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking "+CookieManager_name+".setCookie() successful");
      console.log(p1+" :"+p2);
      getStackTrace();
      return this.setCookie(p1,p2);
    }
  
  
  //hook Activity methods
  var Activity=Java.use("android.app.Activity");
    Activity.finish.overload().implementation=function(){
      console.warn("Hooking android.app.Activity.finish() successful");
      getStackTrace();
      this.finish();
    }

    Activity.finish.overload('int').implementation=function(int){
      console.warn("Hooking android.app.Activity.finish('int') successful");
      getStackTrace();
      this.finish(int);
    } 

    Activity.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.startActivity(p1) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1);
    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1,p2);
    }

    Activity.startActivityForResult.overload('android.content.Intent', 'int').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int') successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivityForResult(p1,p2);
        }

    Activity.startActivityForResult.overload('android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivityForResult(p1,p2,p3);
    }

    Activity.startActivityForResult.overload('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3,p4){
      console.warn("Hooking android.app.Activity.startActivityForResult('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p2);
      getStackTrace();
      console.log(decodeURIComponent(p2.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivityForResult(p1,p2,p3,p4);
    }
  
    Activity.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      return this.startService(p1);
    }

    Activity.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1);
    }
    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,3);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,p3);
    }

  //hook Service methods
  var Service=Java.use("android.app.Service");
    Service.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1);
    }
    Service.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.startActivity(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1,p2);
    }

    Service.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startService(p1);
    }

    Service.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1);
    }
    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,3);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,p3);
    }

  //ContextWrapper
  var ContextWrapper=Java.use("android.content.ContextWrapper");
    ContextWrapper.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1);
    }
    ContextWrapper.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.startActivity(p1,p2);
    }

    ContextWrapper.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      return this.startService(p1);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1);
    }
    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,3);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(Java.use("android.content.Intent").URI_ALLOW_UNSAFE.value)));
      this.sendBroadcast(p1,p2,p3);
    }

  // hook Intent methods
  var Intent=Java.use("android.content.Intent");
    Intent.putExtra.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.putExtra('java.lang.String', 'java.lang.String') successful");
      // console.log("key ="+p1+",value ="+p2);
      // getStackTrace();
      return this.putExtra(p1,p2);
    }

    Intent.putExtra.overload('java.lang.String', 'java.lang.CharSequence').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.putExtra('java.lang.String', 'java.lang.CharSequence') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      return this.putExtra(p1,p2);
    }

    Intent.$init.overload('android.os.Parcel').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('android.os.Parcel') successful");
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('java.lang.String') successful");
      console.log(p1);
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('android.content.Intent') successful");
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('java.lang.String', 'android.net.Uri').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('java.lang.String', 'android.net.Uri') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('android.content.Context', 'java.lang.Class').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('android.content.Context', 'java.lang.Class') successful");
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('android.content.Intent', 'int').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('android.content.Intent', 'int') successful");
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('java.lang.String', 'android.net.Uri', 'android.content.Context', 'java.lang.Class').implementation=function(p1,p2,p3,p4){
      console.warn("Hooking android.content.Intent.$init('java.lang.String', 'android.net.Uri', 'android.content.Context', 'java.lang.Class') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      this.$init(p1,p2,p3,p4);
    }
});
