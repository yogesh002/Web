/**
 * As a part of learning Object Oriented Javascript from Packt Publication
 */

var com = com || {};
com.parishram = com.parishram || {};



function Ready() {
    new com.parishram.Clock("clock1", 0);
    new com.parishram.Clock("clock2", -360, "UTC");
    new com.parishram.ThirdClock("clock3", 700, "NEW");

}

com.parishram.Clock = function(id, offset, label) {
    offset = offset || 0;
    label = label || "";
    var d = new Date();
    var offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
    this.d = new Date(offset + d.getTime());
    this.d.autoClock(true);

    this.id = id;
    this.label = label;
    var that = this;
    setInterval(function() {
        that.updateClock();
    }, 1000);
    //  return clock;
}


//define a constructor function that has same arguments as parent
com.parishram.ThirdClock = function(id, offset, label) {
    //call parent constructor but the context is child
    com.parishram.Clock.apply(this, arguments);
}


//Object.create() might not work with older browsers. So, create a helper function createObject() defined below
//com.parishram.ThirdClock.prototype = Object.create(com.parishram.Clock.prototype);

//com.parishram.ThirdClock.prototype.constructor = com.parishram.ThirdClock;
com.parishram.ThirdClock.prototype = createObject(com.parishram.Clock.prototype, com.parishram.ThirdClock);


function createObject(proto, cons) {
    function c() {}
    c.prototype = proto;
    c.constructor = cons;
    return new c();
}


Date.prototype.updateSeconds = function() {
    this.setSeconds(this.getSeconds() + 1);

}

com.parishram.Clock.prototype.version = '1.0';
//static method. NOTE: not using prototype
Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval = function(date) {
    this.__aDates.push(date);
    if (!Date.__interval) {
        Date.__interval = setInterval(function() {
            Date.updateDate();
        }, 1000)
    }

}

Date.updateDate = function() {
    //console.log(Date.__aDates.length);
    for (var i = 0; i < this.__aDates.length; i++) {
        this.__aDates[i].updateSeconds();

    }
}


Date.prototype.autoClock = function(isAuto) {
    var that = this;
    clearInterval(this.clockInterval);
    if (isAuto) {
        /*
            this.clockInterval = setInterval(function(){
              that.updateSeconds();
            }, 1000)*/

        Date.addToInterval(this);

    }
}

com.parishram.Clock.prototype.updateClock = function() {
    //  Date.addToInterval();
    console.log(this.version);
    /*  var date = new Date();
      date = new Date(this.offset + date.getTime());*/
    var date = this.d;
    //    date.updateSeconds();
    var time = this.formatDigits(date.getHours()) +
        ":" + this.formatDigits(date.getMinutes()) +
        ":" + this.formatDigits(date.getSeconds()) + this.label;
    document.getElementById(this.id).innerHTML = time;
};
com.parishram.Clock.prototype.formatDigits = function(val) {
    if (val < 10) {
        val = "0" + val;
    }
    return val;
};





//Loads when document is ready.
window.onload = Ready;


//when we have variables inside an object it is called properties
//when we have method inside an object it is method
