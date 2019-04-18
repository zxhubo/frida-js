# frida函数调用

我们使用frida，不光是通过使用implementation来让你做代码替换，我们还希望可以实现类似于java中的函数调用，因为就算在函数的hook中，有时候也需要调用其他的方法，例如调用一个base64编码函数。

我们以下列代码为例：
```
package com.example.cryptutils.util;

public class Test {

    private Test(){}
    public Test(String s){}
    private Test(int i){}

    public String test(String s){
        return s;
    }

    private int test(int i){
        return i;
    }

    public static int test_static(int i) {
        return i;

    }

}

```

其实此类问题无非两个需求： 调用静态和非静态方法。

- 静态方法调用

很简单，直接参考如下代码：
```
var clz = Java.use("com.example.cryptutils.util.Test"); 
clz.test_static(4096);
```

- 非静态方法

非静态方法，就需要拿到类的实例，然后通过实例去调用非静态方法，参考如下代码：
```
var ins = clz.$new("a");
ins.test("Hello World!");
```
这里有人问到，那么private类型的构造函数怎么实例化，很简单，直接$new()。以前在java中，可能需要通过Class的getConstructor之类来获取构造函数，在frida中不需要，因为它已经把你做好这些事情了。

- 私有方法

可能有人会问到，上面的私有方法`private int test(int i)`在frida中如何调用，是否需要反射，答案是不需要。
以前我们使用Xposed的时候，需要利用反射来拿到Method，然后使用Method.invoke来进行调用。不过在Frida中，这一步在你使用Java.use的时候就已经帮你做好了。 我们平时hook使用的Java.use("xxx").xxxx其实就跟getDeclaredMethod达到的method类似了。而如果方法有重载就用overload来指定参数列表，当然你不指定的话frida就会报错然后列出所有重载让你选。

当然，有人说非要在frida中通过反射的方式去调用私有方法，这块坑比较多，准备另外起一个文档来说明。

因此私有方法，就跟调用普通的静态和非静态方法一样的方法去调用。

>**注意**：Frida不仅提供了implementation来让你做代码替换，还提供了call来让你做调用。 call的使用方式跟Java里使用invoke是一样的，不过静态方法是clz.methodname.call(类, 参数)，非静态方法就是clz.methodname.call(实例, 参数)。

# 获取类的实例

至于对于非静态方法，如何拿到实例，大概就是两种方式： 
1. new一个，调用Java.use("xxx").$new()，可以自己创建一个实例，并且$new其实也跟其他method一样的，也拥有overloads。关键构造函数的$new()，前面方法调用已经提到，这里就不再说明。
2. Java.choose()，如果你遇到复杂参数或者需要依赖上下文的情况，可以使用choose在内存里找已经存在的实例，然后使用他来调用方法即可。
举个例子，有一个加密函数的密钥和向量实在构造函数里面进行的初始化，那么就需要按照前面讲的需要先拿到构造函数的实例，然后再调用次函数，但是此构造函数的入参是一个需要依赖上下文的变量，并且密钥和向量在getInstance函数里面进行初始化，例如：
```
private CryptoUtils(KeyStore keyStore){
        this.keyStore=keyStore;
    }

    public static CryptoUtils getInstance(Context context){
        KeyStore keyStore;
        File file=new File(context.getFilesDir(),STORE_FILE_NAME);
        if(cryptoUtils==null){
            synchronized (CryptoUtils.class){
                if(cryptoUtils==null){
                    CryptoUtils.context=context;
                    keyStore=createKeyStore(file);
                    initKey(keyStore,file);
                    cryptoUtils=new CryptoUtils(keyStore);
                }
            }
        }

        return cryptoUtils;
    }
```
那么我们就使用Java.choose()在内存里找已经存在的实例，然后使用他来调用方法即可,js代码可以这样写：

```
var clz_c = Java.use("com.example.cryptutils.util.CryptoUtils"); 
Java.choose("com.example.cryptutils.util.CryptoUtils", {
             "onMatch":function(ins){
                  console.log("[*] Instance found");
                  var ret = clz_c.aesEncrypt.call(ins,"hahaha");
                  console.log(ret);
                  if (ret != null) {
                  	console.log(ret.length);

                  }
             },
             "onComplete":function() {
                  console.log("[*] Finished heap search")
             }
        });
```
上面代码有一个判断结果ret是否为空的判断，是因为有些实例，怎么表达呢，你懂得，导致可能获取到的结果ret为null，从打印我们可以看到：

```
[*] Instance found
null
[*] Instance found
null
[*] Instance found
null
[*] Instance found
[object Object]
16
[*] Instance found
null
[*] Finished heap search
```
当然，这个例子也可以直接进行构造函数的构造，参考如下代码：

```
var clz_c = Java.use("com.example.cryptutils.util.CryptoUtils"); 
var KeyStore = Java.use("java.security.KeyStore");
var ks = KeyStore.getInstance(KeyStore.getDefaultType());
var instance1 = clz_c.$new(ks);
console.log(instance1.aesEncrypt("hook"));
var instance = clz_c.getInstance(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext());
var enc = instance.aesEncrypt("123qqqqqqqqqqqqqqqqqqqqqqqq");
console.log(enc.length);
```


# 参考

排名不分先后

- [https://wx.zsxq.com/dweb/#/index/144242521142](https://wx.zsxq.com/dweb/#/index/144242521142)
