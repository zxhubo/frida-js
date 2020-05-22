
/* author:bobby *day:2019-06-01 ,changed by booby *day:2020-02-21*/
'use strict'
var clazz_Log = null;

function getStackTrace(){
  console.log(clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new()));
}

Java.perform(function(){
    
  clazz_Log = Java.use("android.util.Log");
  });

Java.perform(function(){
  console.error("[***] Hooking im strating");
  var Toast=Java.use("android.widget.Toast");
    Toast.makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking makeText() successful");
      getStackTrace();
      return this.makeText(p1,p2,p3);
    }
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
  
  var Dialog=Java.use("android.app.Dialog");
    Dialog.show.implementation=function(){
      console.warn("Hooking android.app.Dialog.show() successful");
      getStackTrace();
      this.show();
    }

  //tentcent sdk webview
  var TXWebView=Java.use("com.tencent.smtt.sdk.WebView");
    TXWebView.getUrl.implementation=function(){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.getUrl(p1) successful");
      var ret=this.getUrl();
      console.log("TXWebView.getUrl() ,ret="+ret);
      return ret;
    }
  

    TXWebView.loadUrl.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.loadUrl(p1) successful,url = "+p1);
      getStackTrace();
      this.loadUrl(p1);
    }

    TXWebView.loadUrl.overload('java.lang.String','java.util.Map').implementation=function(p1,p2){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.loadUrl(p1,p2) successful,url = "+p1+", map ="+p2.size());
      getStackTrace();
      // var hashMapNode = Java.use('java.util.HashMap$Node');
      // var iterator = p2.entrySet().iterator();
      // while(iterator.hasNext()){
      //     var entry = Java.cast(iterator.next(),hashMapNode);
      //     console.log(entry.getKey()+": "+entry.getValue());
          
      // }


      //getStackTrace();
      this.loadUrl(p1,p2);
    }

    TXWebView.addJavascriptInterface.implementation=function(p1,p2){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.addJavascriptInterface() successful, "+p1+":"+p2);
      getStackTrace();
      this.addJavascriptInterface(p1,p2);
    }

    TXWebView.removeJavascriptInterface.implementation=function(p1){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.removeJavascriptInterface() successful, "+p1);
      getStackTrace();
      this.removeJavascriptInterface(p1);
    }


    TXWebView.evaluateJavascript.implementation=function(p1,p2){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.evaluateJavascript() successful, p1="+p1);
      getStackTrace();
      this.evaluateJavascript(p1,p2);
    }
    
    TXWebView.setWebChromeClient.implementation=function(p1){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.setWebChromeClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebChromeClient(p1);
    }

    TXWebView.setWebViewClient.implementation=function(p1){
      console.warn("Hooking com.tencent.smtt.sdk.WebView.setWebViewClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebViewClient(p1);
    }

  var CookieManager=Java.use("com.tencent.smtt.sdk.CookieManager");
    CookieManager.getInstance.implementation=function(){
      console.warn("Hooking com.tencent.smtt.sdk.CookieManager.getInstance() successful");
      // getStackTrace();
      return this.getInstance();
    }

    CookieManager.setCookie.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking com.tencent.smtt.sdk.CookieManager.setCookie() successful");
      console.log(p1+" :"+p2);
      getStackTrace();
      return this.setCookie(p1,p2);
    }
  
  //hook android.webkit.WebView methods
  var WebView=Java.use("android.webkit.WebView");
    WebView.getUrl.implementation=function(){
      console.warn("Hooking android.webkit.WebView.getUrl(p1) successful");
      var ret=this.getUrl();
      console.log("WebView.getUrl() ,ret="+ret);
      return ret;
    }


    WebView.loadUrl.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking android.webkit.WebView.loadUrl(p1) successful,url = "+p1);
      getStackTrace();
      this.loadUrl(p1);
    }


    WebView.loadUrl.overload('java.lang.String','java.util.Map').implementation=function(p1,p2){
      console.warn("Hooking android.webkit.WebView.loadUrl(p1,p2) successful,url = "+p1+", map ="+p2.size());
      getStackTrace();
      // var hashMapNode = Java.use('java.util.HashMap$Node');
      // var iterator = p2.entrySet().iterator();
      // while(iterator.hasNext()){
      //     var entry = Java.cast(iterator.next(),hashMapNode);
      //     console.log(entry.getKey()+": "+entry.getValue());
          
      // }


      //getStackTrace();
      this.loadUrl(p1,p2);
    }

    WebView.addJavascriptInterface.implementation=function(p1,p2){
      console.warn("Hooking addJavascriptInterface() successful, "+p1+":"+p2);
      getStackTrace();
      this.addJavascriptInterface(p1,p2);
    }

    WebView.removeJavascriptInterface.implementation=function(p1){
      console.warn("Hooking removeJavascriptInterface() successful, "+p1);
      // getStackTrace();
      this.removeJavascriptInterface(p1);
    }


    WebView.evaluateJavascript.implementation=function(p1,p2){
      console.warn("Hooking android.webkit.WebView.evaluateJavascript() successful, p1="+p1);
      // getStackTrace();
      this.evaluateJavascript(p1,p2);
    }

    WebView.setWebChromeClient.implementation=function(p1){
      console.warn("Hooking android.webkit.WebView.setWebChromeClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebChromeClient(p1);
    }

    WebView.setWebViewClient.implementation=function(p1){
      console.warn("Hooking android.webkit.WebView.setWebViewClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebViewClient(p1);
    }

  var CookieManager=Java.use("android.webkit.CookieManager");
    CookieManager.getInstance.implementation=function(){
      console.warn("Hooking CookieManager.getInstance() successful");
      // getStackTrace();
      return this.getInstance();
    }
    CookieManager.setCookie.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking CookieManager.setCookie() successful");
      console.log(p1+" :"+p2);
      // getStackTrace();
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
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    Activity.startActivityForResult.overload('android.content.Intent', 'int').implementation=function(p1,p2){
            console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int') successful, p1="+p1);
            getStackTrace();
            console.log(decodeURIComponent(p1.toUri(256)));
            this.startActivityForResult(p1,p2);
        }

    Activity.startActivityForResult.overload('android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3){
        console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p1);
        getStackTrace();
        console.log(decodeURIComponent(p1.toUri(256)));
        this.startActivityForResult(p1,p2,p3);
    }

    Activity.startActivityForResult.overload('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3,p4){
        console.warn("Hooking android.app.Activity.startActivityForResult('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p2);
        getStackTrace();
        console.log(decodeURIComponent(p2.toUri(256)));
        this.startActivityForResult(p1,p2,p3,p4);
    }
  
    Activity.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      return this.startService(p1);
    }

    Activity.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2,3);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2,p3);
    }

  //hook Service methods
  var Service=Java.use("android.app.Service");
    Service.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    Service.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.startActivity(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startService(p1,p2);
    }

    Service.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startService(p1);
    }

    Service.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1);
    }
    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,3);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,p3);
    }



  //ContextWrapper
  var ContextWrapper=Java.use("android.content.ContextWrapper");
    ContextWrapper.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    ContextWrapper.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    ContextWrapper.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      return this.startService(p1);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1);
    }
    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,3);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
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
