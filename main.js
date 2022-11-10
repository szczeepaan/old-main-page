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
    window.open(projectLinks[p.replace(' ', '_')], '_blank').focus();
}

function color(c) {
    container.innerHTML += '>> ' + input + '<br>';
    if (c == '') {
        root.style.setProperty('--font', '#FFF');
        localStorage.setItem('font-color', '#FFF');
        container.innerHTML += `<br>Font color reset<br><br>`;
    }
    else if (CSS.supports('color', c)) {
        localStorage.setItem('font-color', c);
        root.style.setProperty('--font', c);
        container.innerHTML += `<br>Font color set to ${c}<br><br>`;
    }
    else {
        container.innerHTML += `<br>Invalid color '${c}'. Please only use <a href='https://www.w3schools.com/colors/colors_names.asp' target='_blank'>valid CSS color names/codes.</a><br><br>`;
    }
}

function bgcolor(c) {
    container.innerHTML += '>> ' + input + '<br>';
    if (c == '') {
        root.style.setProperty('--bg', '#0C0C0C');
        localStorage.setItem('background-color', '#0C0C0C');
        container.innerHTML += `<br>Background color reset<br><br>`;
    }
    else if (CSS.supports('color', c)) {
        localStorage.setItem('background-color', c);
        root.style.setProperty('--bg', c);
        container.innerHTML += `<br>Background color set to ${c}<br><br>`;
    }
    else {
        container.innerHTML += `<br>Invalid color '${c}'. Please only use <a href='https://www.w3schools.com/colors/colors_names.asp' target='_blank'>valid CSS color names/codes.</a><br><br>`;
    }
}

tfDisplay = () => { tfcontainer.style.setProperty('display', 'none') }
function tf() {
    tfcontainer.style.setProperty('display', 'flex');
    setTimeout(tfDisplay, tfDuration);
    tfAnimation.play();
    container.innerHTML += '>> ' + input + '<br>';
    container.innerHTML += '<br>trolled<br><br>';
}





const projectList = [
    'wordle clone'
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
    'tf'
];
const commandHelp = {
    help: 'help - Displays the command list<br>Arguments:<br>&nbsp;&nbsp;command_name - Displays info about a command (optional). Not case sensitive.',
    list: 'list - Displays a list of projects.',
    view: 'view - Opens a project in another tab.<br>Arguments:<br>&nbsp;&nbsp;project_name - Name of project to open (required). Not case sensitive.',
    color: "color - Changes the font color. Changes will be saved.<br>Arguments:<br>&nbsp;&nbsp;color - Color name or HEX value (optional)<br>&nbsp;&nbsp;Available colors: black, blue, green, cyan, red, purple, yellow, white, gray (or <a href='https://www.w3schools.com/colors/colors_names.asp' target='_blank'>other CSS colors</a>)<br>&nbsp;&nbsp;Providing no arguments resets to default.",
    bgcolor: "bgcolor - Changes the background color. Changes will be saved.<br>Arguments:<br>&nbsp;&nbsp;color - Color name or HEX value (optional)<br>&nbsp;&nbsp;Available colors: black, blue, green, cyan, red, purple, yellow, white, gray (or <a href='https://www.w3schools.com/colors/colors_names.asp' target='_blank'>other CSS colors</a>)<br>&nbsp;&nbsp;Providing no arguments resets to default.",
    tf: '???'
}
const commandDesc = {
    help: ' - shows this message',
    list: ' - shows a list of projects',
    view: " - opens a specified project. (see 'list' for project names)",
    color: " - changes the font color. (see 'help color' for details)",
    bgcolor: " - changes the background color. (see 'help bgcolor' for details)",
    tf: ' - ???'
};

const trollface = document.querySelector('#tf');
const tfcontainer = document.querySelector('#tfcont');
const tfDuration = 1500;
const tfAnimation = trollface.animate(
    [
        { transform: 'scale(0.01)', opacity: 0, },
        { transform: ' scale(5)', opacity: 1},
        { transform: ' scale(5)', opacity: 0},
    ],
    {
        duration: tfDuration,
        iterations: 1
    }
);
const version = '1.1.1';
const root = document.querySelector(':root');
const container = document.querySelector('.container');
const currentLine = document.querySelector('#current-line');
let input = '';
let check = '';
if (localStorage.getItem('background-color')) root.style.setProperty('--bg', localStorage.getItem('background-color'));
if (localStorage.getItem('font-color')) root.style.setProperty('--font', localStorage.getItem('font-color'));

document.title = `szczepan ${version}`;
container.innerHTML = `<div>szczepan [${version}]. Type 'help' for list of commands.</div>`;

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
        if (commandList.includes(check)) {
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