'use strict';
/**
 * 此脚本在以下环境测试通过
 * android os: 7.1.2 32bit  (64位可能要改OpenMemory的签名)
 * legu: libshella-2.8.so
 * 360:libjiagu.so
 */




Java.perform(function(){

    console.log("[+] start ......");
    var c = undefined;
    var exports = Module.enumerateExportsSync("libart.so");
    for(var i=0;i<exports.length;i++){
        
        var name =exports[i].name;
        c=exports[i].address;

        //if(name=="_ZN3art7DexFile10OpenCommonEPKhjRKNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEjPKNS_10OatDexFileEbbPS9_PNS0_12VerifyResultE"){
        if(name.indexOf("OpenCommon")!=-1){
            console.log("[***]"+name +" at :"+c);
            break;
        }
        
            
        
    }

    
    
    var nativePointer=new NativePointer(c);


    Interceptor.attach(nativePointer, {
    onEnter: function (args) {
      
        console.log("[*] hook OpenCommond succeed ......");
        //dex起始位置
        var begin = args[1];
        //打印magic
        console.log("magic : " + Memory.readUtf8String(begin));
        //dex fileSize 地址
        //var address = parseInt(begin,16) + 0x20
        var address = ptr(parseInt(begin,16)).add(0x20);
        //dex 大小
        var dex_size = Memory.readInt(ptr(address));

        console.log("dex_size :" + dex_size);
        //dump dex 到/data/data/pkg/目录下
        //var file = new File("/data/data/com.Hyatt.hyt/" + dex_size + ".dex", "wb")
        var file = new File("/data/data/com.babytree.apps.lama/" + dex_size + ".dex", "wb");
        file.write(Memory.readByteArray(begin, dex_size));
        file.flush();
        file.close();
    },
    onLeave: function (retval) {
        if (retval.toInt32() > 0) {
            /* do something */
        }
    }
});


});


