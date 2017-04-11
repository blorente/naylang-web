const exec = require('child_process').exec;
const path = require('path');

let reqIndex = 0;
let interpreters = [];

class Interpreter {
    constructor(index) {
        this.index = index;
        this.buffer = "";
        this.process = exec(path.join(appRoot, 'bin/interpreter'),
            { env:
                {LD_LIBRARY_PATH : '$LD_LIBRARY_PATH:' + path.join(appRoot, 'lib/')}
            });
        this.setupProcess();
    }

    setupProcess() {
        this.process.stdout.on('data', (data) => {
            if (data != '>>> ') {
                console.log(`Process ${this.index} Buffered data: ${data}`);
                this.buffer += data;
            } else {
                console.log("Discarded data: " + data);
            }
        });
        this.process.on('exit', (code) => {
            console.log(`Child process ${this.index} exited with exit code ${code}`);
        });
    }

    execCommand(command, callback)  {
        this.process.stdin.write(command);
        this.process.stdin.end();
        callback(this.fetchBuffered());
    }

    fetchBuffered() {
        const data = this.buffer;
        this.buffer = "";
        return data;
    }
}

module.exports += Interpreter;
module.exports.interpreters = interpreters;