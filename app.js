//tooltip activation
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


//variabili
var fast = undefined;
var targetFine = undefined;
var Dimensione = 0;
var volume = 0;

//var effetti sonori
var audio_win = new Audio ('audio/audio-win.wav');
var audio_lose = new Audio ('audio/audio-gameover.wav');
var audio_colpo = new Audio ('audio/audio-colpo.wav');







//effetto all'hover del tasto start
addEventListener('mouseover', function(evt) {
    let start = document.getElementById('playBTN');
    let end = document.getElementsByClassName('end');
    if (evt.path[0] == start){
        start.style.filter = 'grayscale(0)';
        if(end[0].style.display == 'none' && end[1].style.display == 'none' ){
        }else{
            end[0].style.color = 'red';
            end[1].style.color = 'red';
        }
    }
});
addEventListener('mouseout', function(evt) {
    let start = document.getElementById('playBTN');
    let end = document.getElementsByClassName('end');
    if(evt.path[0] == start){
        start.style.filter = 'grayscale(100%)';
        end[0].style.color = 'black';
        end[1].style.color = 'black';
        
    }
});

//effetto fadeout del logo
function fadeout(){
    let elemento = document.getElementById('logo');
    elemento.classList.remove('animate__fadeInDown');
    elemento.classList.add('animate__fadeOutDown');
};


function start(){
    //inizializazione dati 
    fast = (100-document.querySelector('#customRange1').value) * 40 +500;
    targetInizio = (document.querySelector('#targetInizio').value);
    targetFine = (document.querySelector('#targetFine').value);
    volume = document.querySelector('#flexSwitchCheckChecked').checked;
    switch (true) {
        case document.querySelector('#btnradio1').checked:
            Dimensione = 'img/target-small.png';
            break;
        case document.querySelector('#btnradio2').checked:
            Dimensione = 'img/target-medium.png';
            break;
        case document.querySelector('#btnradio3').checked:
            Dimensione = 'img/target-big.png';
            break;
    };

    //fadeOut navbar
    let nav = document.querySelector('.navbar');
    nav.classList.add('animate__fadeOutUp');

    //pulizia campo
    playBTN.style.display = 'none';
    vittoria.style.display = 'none';
    sconfitta.style.display = 'none';
    var reset = document.querySelectorAll('.target');
    for (let index = 0; index < reset.length; index++) {
        reset[index].remove();
    };

    //creazione 1° target e inizializazione degli altri
    let randomX = (Math.random() * (95 -5) +5) + 'vw';
    let randomY = (Math.random() * (95 -5) +5) + 'vh';
    let img = document.createAttribute('src');
    img.value = Dimensione;
    let Target = document.createElement('img');
    Target.setAttributeNode(img);
    Target.classList.add('target');
    Target.style.position = "absolute";
    Target.style.left = randomX;
    Target.style.top = randomY;
    campoGioco.appendChild(Target);
    setTimeout('build()', fast);
    for (let index = 1; index < targetInizio; index++) {
        build();
    }
};

//funzione cratrice dei target
function build(){
    let count = document.querySelectorAll('.target');
    if(count.length == 0){
        win();
        return;
    }else if((count.length) >= targetFine){
        lose();
        return;
    }else{
        setTimeout('build()', fast);
    }
    let randomX = (Math.random() * 90 +5) + 'vw';
    let randomY = (Math.random() * 90 +5) + 'vh';
    let img = document.createAttribute('src');
    img.value = Dimensione;
    let Target = document.createElement('img');
    Target.setAttributeNode(img);
    Target.classList.add('target');
    Target.style.position = "absolute";
    Target.style.left = randomX;
    Target.style.top = randomY;
    campoGioco.appendChild(Target);
};

//funzione target colpito
document.addEventListener('click', function colpito(click){
    if(click.target.classList[0] == 'target'){
        if(volume == true){
            audio_colpo.play();
        };
        click.target.remove();
    };
});


function lose(){
    playBTN.style.display = 'inline';
    document.querySelector('#sconfitta').style.display = 'inline';
    let nav = document.querySelector('.navbar');
    nav.classList.remove('animate__fadeOutUp');
    nav.classList.add('animate__fadeInDown');
    if(volume == true){
        audio_lose.play();
    };
};


function win(){    
    playBTN.style.display = 'inline';
    document.querySelector('#vittoria').style.display = 'inline';
    let nav = document.querySelector('.navbar');
    nav.classList.remove('animate__fadeOutUp');
    nav.classList.add('animate__fadeInDown');
    if(volume == true){
        audio_win.play();
    };
};
