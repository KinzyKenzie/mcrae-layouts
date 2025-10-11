const runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
const runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const runDataActiveRunSurrounding = nodecg.Replicant('runDataActiveRunSurrounding', 'nodecg-speedcontrol');
const timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');

var fontSize = -1.0;

runDataActiveRun.on('change', (newVal, oldVal) => {
    if (!!document.getElementById('run-runner')) {
        document.getElementById('run-runner').innerHTML = getPlayerSequential(newVal, 1);
    }
    if (!!document.getElementById('run-runner2')) {
        document.getElementById('run-runner2').innerHTML = getPlayerSequential(newVal, 2);
    }
    if (!!document.getElementById('run-runner3')) {
        document.getElementById('run-runner3').innerHTML = getPlayerSequential(newVal, 3);
    }
    if (!!document.getElementById('run-runner4')) {
        document.getElementById('run-runner4').innerHTML = getPlayerSequential(newVal, 4);
    }
    if (!!document.getElementById('run-runner-all')) {
        document.getElementById('run-runner-all').innerHTML = getAllRunners(newVal);
    }
    if (!!document.getElementById('run-game')) {
        document.getElementById('run-game').innerHTML = newVal.game ?? '';
    }
    if (!!document.getElementById('run-category')) {
        document.getElementById('run-category').innerHTML = newVal.category ?? '';
    }
    if (!!document.getElementById('run-estimate')) {
        document.getElementById('run-estimate').innerHTML = 'EST: ' + newVal.estimate;
    }
    
    setComms(document.getElementById('run-comms'), newVal.customData);
    setHost(document.getElementById('run-host'), newVal.customData);

    runTextScaling();
});

timer.on('change', (newVal, oldVal) => {
    let timer = document.getElementById('timer');
    if (!timer) { return }

    timer.innerHTML = newVal.time;

    switch(newVal.state) {
        case 'running':
            timer.style.color = '#eee';
            break;
        case 'finished':
            if (Math.floor(0.001 * newVal.milliseconds) < runDataActiveRun.value.estimateS) {
                timer.style.color = '#c0aa00';
            } else {
                timer.style.color = '#0080c0';
            }
            break;
        default:
            timer.style.color = '#888';
            break;
    }
});

runDataActiveRunSurrounding.on('change', (newVal, oldVal) => {
    if (!!newVal.next) {
        runDataArray.value.forEach((runData) => {
            if (runData.id == newVal.next) {
                if(!!document.getElementById('run-next')) {
                    document.getElementById('run-next').innerHTML = runData.game + ' by ' + getAllRunners(runData);
                }
                if(!!document.getElementById('run-game-next')) {
                    document.getElementById('run-game-next').innerHTML = runData.game;
                }
                if(!!document.getElementById('run-runner-next')) {
                    document.getElementById('run-runner-next').innerHTML = getAllRunners(runData);
                }
                return;
            }
        });
    }
});

function setComms(field, customData) {
    if (!field) { return }

    if (Object.hasOwn(customData, 'comms')) {
        field.parentElement.style.display = 'flex';
        field.innerHTML = customData.comms;
    } else {
        field.parentElement.style.display = 'none';
    }
}

function setHost(field, customData) {
    if (!field) { return }

    if (Object.hasOwn(customData, 'host')) {
        field.parentElement.style.display = 'flex';
        field.innerHTML = customData.host;
    } else {
        field.parentElement.style.display = 'none';
    }
}

function getPlayerSequential(run, id) {
    let bulk = [];
    
    for (let i = 0; i < run.teams.length; i++) {
        for (let j = 0; j < run.teams[i].players.length; j++) {
            bulk.push(run.teams[i].players[j].name);
        }
    }
    
    if (bulk.length == 0) return '';
    return bulk[id - 1] ?? '';
}

function getAllRunners(run) {
    if (run.teams.length == 0) {
        return '';
    } else if (run.teams.length == 1 && run.teams[0].players.length == 1) {
        return run.teams[0].players[0].name;
    }

    let out = [];
    
    for (let i = 0; i < run.teams.length; i++) {
        let team = [];

        for (let j = 0; j < run.teams[i].players.length; j++) {
            team.push(run.teams[i].players[j].name);
        }

        out.push(team.join(', '));
    }
    
    return out.join(' vs. ');
}

function runTextScaling() {
    var scaledStrings = document.getElementsByClassName('scalable');
    
    for (let i = 0; i < scaledStrings.length; i++) {
        if (scaledStrings[i].innerHTML.length == 0) { continue; }

        let scaleWidth = scaledStrings[i].offsetWidth / (scaledStrings[i].innerHTML.length * 25.00);
        let oldSize = parseFloat(window.getComputedStyle(scaledStrings[i]).getPropertyValue("font-size"));

        if (fontSize < oldSize) { fontSize = oldSize; }

        if (scaleWidth < 1.0) {
            scaledStrings[i].style.fontSize = '' + (fontSize * scaleWidth) + 'px';
        } else {
            scaledStrings[i].style.fontSize = '' + fontSize + 'px';
        }
    }
}
