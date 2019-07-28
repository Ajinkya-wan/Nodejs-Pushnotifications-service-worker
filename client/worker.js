console.log('SW loaded...')

self.addEventListener('push',e=>{
    const data = e.data.json();
    console.log('Push Received ...');
    self.registration.showNotification(data.title, {

        body:'Notified By Ajinkya',
        icon : 'https://img.icons8.com/cotton/64/000000/appointment-reminders.png'

    });
})
