Module.register("MMM-MedicineFirebase",{
  defaults: {
    firebaseDatabaseRootRef: '/medicines/106336659285619048398',
    title: 'Medicines',
  },
  getScripts: function() {
    return [
      'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js',
    ];
  },
  getStyles: function() {
    return [
      'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css',
      'MMM-MedicineFirebase.css',
    ];
  },
  start: function() {
    this.sendConfig();
  },

  sendConfig: function() {
    Log.info(`[${this.name}]: SEND_CONFIG`, this.config);
    //this.sendSocketNotification('SEND_CONFIG', this.config);
  },
  getDom: function() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <h2 class="title">Medicines</h2>
		`;
    const subElement = document.createElement("p");
      subElement.id = "DETAILS";
      wrapper.appendChild(subElement);
    
    return wrapper;
      },
  
  socketNotificationReceived: function(notification, payload) {
    Log.info(
      `[${this.name}] socketNotificationReceived notification ${notification}`,
      payload,
    );

    if (notification === 'MEDICINE_ADDED'){
      var elem = document.getElementById("NAME");
        elem.innerHTML = payload.medName + ", " + payload.medDay + ", " + payload.medTime + ", " + payload.medFood;
      
      }
    if (notification === 'MEDICINES_CHANGED') {
      this.medicines = payload;
      return this.updateDom();
    }

    return false;
  },
});
