const publicVapidKey= "BLlikZ_RIn9QsZGwPOg322pI60I7sjH1f6eDTrhrq2ReJi01u23IIOpKLpy8v6R-h2Ptgp_swcCy47fJscmqTu8";


//Check for service worker

if('serviceWorker' in navigator){

    send().catch(err => console.log(err));

}

//Register service worker , Register PUsh , Send Push
async function send(){

    console.log('Registering Serive Worker');
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope:'/'
    });
    console.log('Service Worker Registered.....');


    //register Push
    console.log('Registering Push');

    const subcription = await register.pushManager.subscribe({

        userVisibleOnly: true ,
        applicationServerKey :urlBase64ToUint8Array(publicVapidKey)

    })

    console.log('Push Registered.....');

    //Send Push Notifications
    console.log('Sending Push.....');

    await fetch('/subscribe' ,{
        method: "POST",
        body : JSON.stringify(subcription),
        headers :{
            'content-type' :'application/json'
        }
    });

    console.log('PUSH SENT .....')

}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
