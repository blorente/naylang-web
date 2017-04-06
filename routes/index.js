var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  interpreter.execInterpreter();
  res.render('index', { title: 'Naylang Grace Interpreter' });
});

let interpreter = {
  buffer: "",
  execInterpreter: () => {
    interp = exec(path.join(appRoot, 'bin/interpreter'),
    { env:
      {LD_LIBRARY_PATH : '$LD_LIBRARY_PATH:' + path.join(appRoot, 'lib/')}
    });

    interp.stdout.on('data', (data) => {
      if (data != '>>> ') {
        console.log("Buffered data: " + data);
        this.buffer += data;
      } else {
        console.log("Discarded data: " + data);
      }
    })

    interp.on('exit', function (code) {
      console.log('Child process exited with exit code '+code);
    });

    interp.stdin.write('var x := 3');
    interp.stdin.end();
  }
}

module.exports = router;
