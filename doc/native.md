### 编译32&64位的so

```
externalNativeBuild {
            cmake {
                cppFlags ""
            }

            ndk {
                // Specifies the ABI configurations of your native
                // libraries Gradle should build and package with your APK.
//                abiFilters  'arm64-v8a', "armeabi-v7a"
                abiFilters "armeabi-v7a"
            }
        }
```
