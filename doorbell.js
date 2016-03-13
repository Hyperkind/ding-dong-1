var Gpio = require('onoff').Gpio,
    led = new Gpio(14, 'out'),
    button = new Gpio(4, 'in', 'both');
var spawn = require('child_process').spawn;
var moment = require('moment');
var filepath = path.join(__dirname, 'whosthere.jpg');
var mailgun = require('mailgun-js')({apiKey: 'key-5cf681c09c48516a8e0b8b00a580969c', domain: 'sandbox08ea930e43c140d699bd4406076fd445.mailgun.org'});
var CONFIG = require('./config.json');
var user = CONFIG;

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

        var data = {
          from: 'Excited User <me@samles.mailgun.org>',
          to: user.phone + '@mms.att.net',
          subject: user.subject,
          text: moment().format('MMMM Do YYYY, h:mm:ss a'),
          attachment: filepath
        };

        mailgun.messages().send(data, function(error, body) {
          if(error) {
            console.log(error);
          } else {
            console.log(body);
          }
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


