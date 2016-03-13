var Gpio = require('onoff').Gpio,
    led = new Gpio(14, 'out'),
    button = new Gpio(4, 'in', 'both');
var spawn = require('child_process').spawn;



module.exports = {

  exit: exit,

  press: function(err, value) {
      if (err) {
        throw err;
      }
      if (value) {
        console.log('button push');
        var cameraSh = spawn('sh', ['camera.sh'], {
          cwd: undefined,
          env: process.env
        });
      }
      led.writeSync(value);
  }
};

function exit () {
 led.unexport();
    button.unexport();
    process.exit();
}

process.on('SIGINT', exit);


