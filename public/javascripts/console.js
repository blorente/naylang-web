let output;

window.onload = function() {
    const pad = document.getElementById('pad');

    output = new Vue({
        el: '#output',
        data: {
            commandResult: "";
        }
    });

    const getCommand = (pad) => {
        const promptIndex = pad.value.lastIndexOf(">>>") + 3;
        return pad.value.substring(promptIndex);
    };

    const executeCommand = () => {
        const command = getCommand(pad);
        post('/interpret/', {command: command});
    };

    const refreshPrompt = () => {
        pad.value += "\n>>> ";
        pad.focus(); //sets focus to element
    }

    const ifEnterExecuteCommand = (event) => {
        const key = event.which || event.keyCode;
        if (key === 13) { // 13 is enter
            executeCommand();
            refreshPrompt();
            event.preventDefault();
        }
    }

    pad.addEventListener('keypress', ifEnterExecuteCommand)
    pad.innerHTML = "";
    refreshPrompt();

    function post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
};

module.exports.output = output;