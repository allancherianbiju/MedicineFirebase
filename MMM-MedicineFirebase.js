Module.register("MMM-MedicineFirebase",{
  start: function (){
      this.count = 0
  },
  getDom: function() {
      var element = document.createElement("div")
      element.className = "myContent"
      element.innerHTML = "Medicines"
      var subElement = document.createElement("p")
      subElement.id = "NAME"
      element.appendChild(subElement)
      var subElement2 = document.createElement("p")
      subElement2.id = "DETAILS"
      element.appendChild(subElement2)
      return element
      },
  notificationReceived: function(notification, payload, sender) { 
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
              var x = 1;
              this.sendSocketNotification("DO_YOUR_JOB", this.x);
              break
        }
  },
  socketNotificationReceived: function(notification, payload) {
      switch(notification) {
       case "I_DID":
        var elem = document.getElementById("NAME")
        elem.innerHTML = payload.medName;
        var elem2 = document.getElementById("DETAILS")
        elem2.innerHTML = payload.medDay + ", " + payload.medTime + ", " + payload.medFood       
        break
       }
  },
});
