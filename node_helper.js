const firebase = require ('firebase')
var NodeHelper = require("node_helper")
var countdown;
var rootRef, urlRef;
var config = {
    apiKey: "AIzaSyCULXr7H74AiyB-NIhER_aai9vKVbzeqPc",
    authDomain: "solidalenext.firebaseapp.com",
    databaseURL: "https://solidalenext.firebaseio.com/",
    projectId: "solidalenext",
    storageBucket: "solidalenext.appspot.com",
    messagingSenderId: "8906941174"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
module.exports = NodeHelper.create({
    start: function() {
       rootRef = firebase.app().database().ref();
       urlRef = rootRef.child('medicines');
       urlRef.once('value', function(snapshot) {
         snapshot.forEach(function(child){
	  console.log(child.key+": "+child.val());
	  countdown = child.val();
	  console.log(countdown);
	  });
       });
  },
  socketNotificationReceived: function(notification, payload) { 
      switch(notification) {
         case "DO_YOUR_JOB":   
	  var test = countdown;
	  console.log(test + "Hey");
          this.sendSocketNotification("I_DID", test);      
	  break
      }
  }, 	
})
