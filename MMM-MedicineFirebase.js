Module.register("MMM-MedicineFirebase",{
  defaults: {
    message: '',
    medName: '',
    medDay: '',
    medTime: '',
    medFood: '',
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
  
  
  socketNotificationReceived: function(notification, payload) {
    Log.info(
      `[${this.name}] socketNotificationReceived notification ${notification}`,
      payload,
    );

    if (notification === 'MEDICINE_ADDED'){
      this.config.message = payload;
      this.config.medName = payload.medName;
      this.config.medDay = payload.medDay;
      this.config.medTime = payload.medTime;
      this.config.medFood = payload.medFood;
      this.updateDom();
      }
    if (notification === 'MEDICINES_CHANGED') {
      this.config.message = payload;
      return this.updateDom();
    }

    return false;
  },
  
  getDom: function() {
    var test = this.config.message;
    const wrapper = document.createElement('div').id("MAIN");
    if (this.config.message === null) {
      Log.log(this.name + "is empty!");
    wrapper.innerHTML =
        '<div class="loading"><span class="zmdi zmdi-rotate-right zmdi-hc-spin"></span> Loading...</div>';
    return wrapper;
    }
    
    wrapper.innerHTML = `
      <h2 class="title">Medicines</h2>
      <ul class="attributes">
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-user zmdi-hc-fw"></span>-->
          <span class="name">Medicine Name</span>
          <span class="value">${this.config.medName}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-car zmdi-hc-fw"></span>-->
          <span class="name">Day</span>
          <span class="value">${this.config.medDay}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-clock-outline-alt zmdi-hc-fw"></span>-->
          <span class="name">Time</span>
          <span class="value">${this.config.medTime}</span>
        </li>
        <li class="attribute">
          <!--<span class="icon zmdi zmdi-food-outline zmdi-hc-fw"></span>-->
          <span class="name">Food</span>
          <span class="value">${this.config.medFood}</span>
        </li>
		  </ul>
		`;
    return wrapper;
  },
});
