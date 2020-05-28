Module.register("MMM-MedicineFirebase",{

  defaults: {
    firebaseDatabaseRootRef: '',
    title: 'Medicines',
    message: '',
    medName: '',
    medDay: '',
    medTime: '',
    medFood: '',  
    firebaseConfig: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""  
    }
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
    this.sendSocketNotification('SEND_CONFIG', this.config);
  },
  
  
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MEDICINE_ADDED'){
      this.config.message = payload;
      this.config.medName = payload.medName;
      this.config.medDay = payload.medDay;
      this.config.medTime = payload.medTime;
      this.config.medFood = payload.medFood;
      var elem = document.getElementById("INSIDE")

      this.updateDom();
      }
    if (notification === 'MEDICINES_CHANGED') {
      this.config.message = payload;
      this.config.medName = payload.medName;
      this.config.medDay = payload.medDay;
      this.config.medTime = payload.medTime;
      this.config.medFood = payload.medFood;
      
      this.updateDom();
    }
  },
  
  getDom: function() {
    var test = this.config.message;
    var wrapper = document.createElement('div');
    var elem = document.createElement('div');
    elem.id = "INSIDE"
    wrapper.appendChild(elem);
    wrapper.innerHTML = `
      <h2 class="title">Medicines</h2>
      <ul class="attributes">
        <li class="attribute">
          <span class="icon zmdi zmdi-hospital zmdi-hc-fw"></span>
          <span class="name">Medicine</span>
          <span class="value">${this.config.medName}</span>
        </li>
        <li class="attribute">
          <span class="icon zmdi zmdi-sun zmdi-hc-fw"></span>
          <span class="name">Day</span>
          <span class="value">${this.config.medDay}</span>
        </li>
        <li class="attribute">
          <span class="icon zmdi zmdi-hourglass-alt zmdi-hc-fw"></span>
          <span class="name">Time</span>
          <span class="value">${this.config.medTime}</span>
        </li>
        <li class="attribute">
          <span class="icon zmdi zmdi-cutlery zmdi-hc-fw"></span>
          <span class="name">Food</span>
          <span class="value">${this.config.medFood}</span>
        </li>
      </ul>
    `;
    return wrapper;
  },
});
