var tessel = require('tessel');
var servo = require('servo-pca9685').use(tessel.port.C);
var ir = require('ir-attx4').use(tessel.port.D);

var interval;
var position = 0.0;

servo.on('ready', function(){
	console.log('servo ready');

	servo.configure(1, 0.05, 0.12, function(){
		servo.move(1, 0.0);

		ir.on('ready', function(){
			console.log('IR ready');
		});

		ir.on('data', function(data) {
			position += 0.025;
			console.log(position);
			servo.move(1, position);
			servo.read(1, function(err, reading){
				if (err) {
					console.log("error", err);
				} else {
					console.log(reading);
				}
			});
		});
	});

});

servo.on('error', function(err){
	console.log(err);
});