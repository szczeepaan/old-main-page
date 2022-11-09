function invalidCommand() {
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += "<br>Error: invalid command '" + input + "'.<br><br>";
}

function help(page) {
    page = page.toLowerCase();
    if (page !== '') {
        if (commandList.includes(page)) {
            container.innerHTML += '>> ' + input + '<br>';
            container.innerHTML += `<br>${commandHelp[page]}<br><br>`;
            return;
        }
        container.innerHTML += '>> ' + input + '<br>';
        container.innerHTML += `<br>Error: Unknown command: ${page}<br><br>`;
        return;
    }
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += '<br>List of commands:<br>';
    for (let i = 0; i < commandList.length; i++) {
        container.innerHTML += `&nbsp;&nbsp;${commandList[i]}${commandDesc[commandList[i]]}<br>`;

    }
    container.innerHTML += '<br>';
}

function list() {
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += '<br>List of projects:<br>';
    projectList.forEach((value) => {
        container.innerHTML += `&nbsp;&nbsp;${value}<br>`;
    });
    container.innerHTML += '<br>';
}

function view(p) {
    container.innerHTML += '>> ' + input + '<br>';
    p = p.toLowerCase();
    if (!projectList.includes(p)) {
        container.innerHTML += "<br>Invalid project name. Type 'list' for a list of project names.<br><br>";
        return;
    }
    container.innerHTML += `<br>Opened '${p}' in new tab.<br><br>`;
    window.open(projectLinks[p], '_blank').focus();
}

function color(c) {
    root.style.setProperty('--font', c);
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += `<br>Font color set to ${c}<br><br>`;
}

function bgcolor(c) {
    root.style.setProperty('--bg', c);
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += `<br>Background color set to ${c}<br><br>`;
}

function tf() {
    tfAnimation.play();
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += '<br>trolled<br><br>';
}



const projectList = [
    'wordle_clone'
];
const projectLinks = {
    wordle_clone: 'https://szczeepaan.github.io/wordle-clone'
}
const commandList = [
    'help',
    'list',
    'view',
    'color',
    'bgcolor',
    'close',
    'tf'
];
const commandHelp = {
    help: 'help - Displays the command list<br>Arguments:<br>&nbsp;&nbsp;command_name - Displays info about a command (optional). Not case sensitive.',
    list: 'list - Displays a list of projects.',
    view: 'view - Opens a project in another tab.<br>Arguments:<br>&nbsp;&nbsp;project_name - Name of project to open (required). Not case sensitive.',
    color: "color - Changes the font color.<br>Arguments:<br>&nbsp;&nbsp;color - Color name or HEX value (required)<br>&nbsp;&nbsp;Available colors: black, blue, green, cyan, red, purple, yellow, white, gray (or other HTML colors)",
    bgcolor: "bgcolor - Changes the background color.<br>Arguments:<br>&nbsp;&nbsp;color - Color name or HEX value (required)<br>&nbsp;&nbsp;Available colors: black, blue, green, cyan, red, purple, yellow, white, gray (or other HTML colors)",
    close: 'close - Closes the tab.',
    tf: '???'
}
const commandDesc = {
    help: ' - shows this message',
    list: ' - shows a list of projects',
    view: " - opens a specified project. (see 'list' for project names)",
    color: " - changes the font color. (see 'help color' for details)",
    bgcolor: " - changes the background color. (see 'help bgcolor' for details)",
    close: ' - closes the tab',
    tf: ' - ???'
};

const trollface = document.querySelector('#tf');
const tfcontainer = document.querySelector('#tfcont');
const tfAnimation = trollface.animate(
    [
        { transform: 'rotate(0) scale(0.1)', opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { transform: 'rotate(720deg) scale(1)', opacity: 0}
    ],
    {
        duration: 800,
        iterations: 1
    }
);

const root = document.querySelector(':root');
const container = document.querySelector('.container');
const currentLine = document.querySelector('#current-line');
let input = '';
let check = '';

window.addEventListener('keydown', (e) => {
    let key = e.key;
    let ascii = key.charCodeAt(0);
    input = currentLine.value;
    if (key == 'Enter') {
        if (input.includes(' ')) {
            check = input.replace('(', '').replace(')', '').slice(0, input.indexOf(' '));
        } else {
            check = input.replace('(', '').replace(')', '');
        }
        check = check.toLowerCase();
        if (eval('window.' + check)) {
            eval(`${check}("${input.slice(check.length + 1, input.length)}")`);
        } else {
            invalidCommand();
        }
        input = '';
        currentLine.value = input;
    }
});

currentLine.addEventListener('blur', () => { currentLine.focus() });
tfAnimation.cancel();