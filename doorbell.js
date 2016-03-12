module.exports = {

  exit: function() {
    led.unexport();
    button.unexport();
    process.exit();
  },

  press: function() {
    button.watch(function(err, value) {
      if (err) {
        throw err;
      }
      console.log('button push');
      led.writeSync(value);
    });
  }

};
