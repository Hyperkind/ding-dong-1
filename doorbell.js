var Gpio = require('onoff').Gpio,
    led = new Gpio(14, 'out'),
    button = new Gpio(4, 'in', 'both');

module.exports = {

  exit: function() {
    led.unexport();
    button.unexport();
    process.exit();
  },

  press: function(err, value) {
      if (err) {
        throw err;
      }
      if (value) {
        console.log('button push');
      }
      led.writeSync(value);
  }

};
