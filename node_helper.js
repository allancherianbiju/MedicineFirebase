const firebase = require ('firebase')
var NodeHelper = require("node_helper")
var countdown;
var rootRef, urlRef;
/*var config = {
    apiKey: "AIzaSyCULXr7H74AiyB-NIhER_aai9vKVbzeqPc",
    authDomain: "solidalenext.firebaseapp.com",
    databaseURL: "https://solidalenext.firebaseio.com/",
    projectId: "solidalenext",
    storageBucket: "solidalenext.appspot.com",
    messagingSenderId: "8906941174"
};*/

module.exports = NodeHelper.create({

    start: function() {
      var self = this;

  },
  setupHandlers: function(){
      var self = this
       rootRef = firebase.app().database().ref();
       urlRef = rootRef.child(self.config.firebaseDatabaseRootRef);
       urlRef.on('value', (snapshot) => {
         snapshot.forEach((child)=>{
            //console.log(child.key+": "+child.val());
            countdown = child.val();
            console.log("test3" + countdown);
            });
       },
       function(errorObject){
         console.log("Read from database failed. Oops..." + errorObject.code);
       });
   
      //When a new child has been added
      urlRef.on("child_added", (snapshot, prevChildKey) =>{
        var newPost = snapshot.val();
        self.countdown = newPost;
        console.log("New entry: ");
        console.log("Name : " + newPost.medName);
        console.log("Day : " + newPost.medDay);
        console.log("Time : " + newPost.medTime);
        console.log("Food : " + newPost.medFood);
        self.sendSocketNotification('MEDICINE_ADDED', newPost);
       });
  
      //When a child has been updated
      urlRef.on("child_changed", function(snapshot){
        var changedPost = snapshot.val();
        self.countdown = changedPost;
        console.log("Updated details");
        console.log("Name : " + changedPost.medName);
        console.log("Day : " + changedPost.medDay);
        console.log("Time : " + changedPost.medTime);
        console.log("Food : " + changedPost.medFood);
        //this.sendSocketNotification("DO_YOUR_JOB", this.x);
      });
  
      //When a child has been eliminated. Headshot.
      urlRef.on("child_removed", function(snapshot){
        var deletedPost = snapshot.val();
        console.log("Deleted: " + deletedPost.medName);
      });
  },
  listenToChanges: function() {
    var self=this
    firebase
      .database()
      .ref(self.config.firebaseDatabaseRootRef).child('medicines/106336659285619048398')
      .on('value', (snapshot) => {
        //const medicines = snapshot.val();
        self.sendSocketNotification('MEDICINES_CHANGED', snapshot.val());
      });
  },
  /*stop: function() {
    firebase
      .database()
      .ref(child('medicines/106336659285619048398'))
      .off();
  },*/

  socketNotificationReceived: function(notification, payload) {
    var self = this
    console.log(
      `socketNotificationReceived notification: ${notification}`,
      payload,
    );

    if (notification === 'SEND_CONFIG') {
      self.config = payload;
      firebase.initializeApp(self.config.firebaseConfig);
      self.setupHandlers()
      this.listenToChanges();
      return true;
    }
  },  
})
