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
    var medicine;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <h2 class="title">Medicines</h2>`;
    var subElement = document.createElement("div");
      subElement.id = "DETAILS";
    //return subElement;

      if (medicine === null) {
      subElement.innerHTML =
        '<div class="loading"><span class="zmdi zmdi-rotate-right zmdi-hc-spin"></span> Loading...</div>';
      return subElement;
    }
    return wrapper;

    //I'm not sure whether I want to pass the payload over here and then display the values or display the values down in the 
    //NotificationReceived method. I'm not doing it right, so both aren't working anyway. :(
    
    subElement.innerHTML = `
      <h2 class="title">Medicines</h2>
      <ul class="attributes">
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-user zmdi-hc-fw"></span>-->
          <span class="name">Medicine Name</span>
          <span class="value">${medicine.medName}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-car zmdi-hc-fw"></span>-->
          <span class="name">Day</span>
          <span class="value">${medicine.medDay}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-clock-outline-alt zmdi-hc-fw"></span>-->
          <span class="name">Time</span>
          <span class="value">${medicine.medTime}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-food-outline zmdi-hc-fw"></span>-->
          <span class="name">Food</span>
          <span class="value">${medicine.medFood}</span>
        </li>
		  </ul>
		`;
    wrapper.appendChild(subElement);
    return subElement;
    
  },
  
  socketNotificationReceived: function(notification, payload) {
    Log.info(
      `[${this.name}] socketNotificationReceived notification ${notification}`,
      payload,
    );

    if (notification === 'MEDICINE_ADDED'){
      var elem = document.getElementById("DETAILS");
      elem.innerHTML = `
      <h2 class="title">Medicines</h2>
      <ul class="attributes">
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-user zmdi-hc-fw"></span>-->
          <span class="name">Medicine Name</span>
          <span class="value">${medicine.medName}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-car zmdi-hc-fw"></span>-->
          <span class="name">Day</span>
          <span class="value">${medicine.medDay}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-clock-outline-alt zmdi-hc-fw"></span>-->
          <span class="name">Time</span>
          <span class="value">${medicine.medTime}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-food-outline zmdi-hc-fw"></span>-->
          <span class="name">Food</span>
          <span class="value">${medicine.medFood}</span>
        </li>
		  </ul>
		`;
    return elem;
      this.medicine = payload;
      return this.updateDom();
      }
    if (notification === 'MEDICINES_CHANGED') {
      this.medicine = payload;
      return this.updateDom();
    }

    return false;
  },
});
