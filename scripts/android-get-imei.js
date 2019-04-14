function getIMEI(){
    console.log('IMEI =', Java.use("android.telephony.TelephonyManager").$new().getDeviceId());
}
Java.perform(getIMEI)