const runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');
var fontSize = -1.0;

runDataActiveRun.on('change', (newVal, oldVal) => {
    document.getElementById('run-runner').innerHTML = getSinglePlayer(getSingleTeam(newVal)).name;
    document.getElementById('run-game').innerHTML = newVal.game;
    document.getElementById('run-category').innerHTML = newVal.category;
    document.getElementById('run-estimate').innerHTML = 'EST: ' + newVal.estimate;

    runTextScaling();
});

timer.on('change', (newVal, oldVal) => {
    document.getElementById('timer').innerHTML = newVal.time;
});

function getSingleTeam(run) {
    if (Object.hasOwn(run, 'teams')) {
        return run.teams[0];
    }
    return null;
}

function getSinglePlayer(team) {
    if (Object.hasOwn(team, 'players')) {
        return team.players[0];
    }
    return null;
}

function runTextScaling() {
    var scaledStrings = document.getElementsByClassName('scalable');
    
    for (let i = 0; i < scaledStrings.length; i++) {
        let scaleWidth = scaledStrings[i].offsetWidth / (scaledStrings[i].innerHTML.length * 25.00);
        let oldSize = parseFloat(window.getComputedStyle(scaledStrings[i]).getPropertyValue("font-size"));

        if (fontSize < oldSize) { fontSize = oldSize; }

        if (scaleWidth < 1.0) {
            scaledStrings[i].style.fontSize = '' + (oldSize * scaleWidth) + 'px';
        } else {
            scaledStrings[i].style.fontSize = '' + fontSize + 'px';
        }
    }
}
