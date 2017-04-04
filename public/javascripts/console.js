window.onload = function() {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');
    const output = document.getElementById('output');   

    const getCommand = (pad) => {
        const promptIndex = pad.value.lastIndexOf(">>>") + 3;
        return pad.value.substring(promptIndex);
    }

    const executeCommand = () => {
        const command = getCommand(pad);
        output.innerHTML += `<p>Requested command ${command}</p>`;
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
};