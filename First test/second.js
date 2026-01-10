let player = document.getElementById('player')
let xpos = 700
let locat = document.getElementById('backgrounds') 
var world = [["back/CT0.jpg", false], ["back/CT1.jpg", false],["back/CT2.jpg",false], ["back/CT3.jpg",false], ["back/CT4.jpg"]] // массив локаций. 0 - фон, 2 - доступность охоты. 1 - Вода или нет? 
let aworld = 0
var energy = 100
if (localStorage.getItem('Xpos') !== null && localStorage.getItem('Xpos') !== undefined && localStorage.getItem('Xpos') !== 0) {
    aworld = parseInt(localStorage.getItem('Xpos'))
    console.log('ERROR' + localStorage.getItem('Xpos'))
}
function right(){ //Кот идёт влево
    xpos-=100
    if (xpos > 1400) {
        xpos = 1400
    }else if (xpos < 0) {
        xpos = 0
    }
    player.style.left=xpos+"px"
    console.log(xpos)
    update(0)
    energy--
}
function left(){ // кот идёт вправо
    xpos+=100
    if (xpos >= 1400) {
        xpos = 1400
    }else if (xpos < 0) {
        xpos = 0
    }
    player.style.left=xpos+'px'
    console.log(xpos)
    update(0)
    energy--
}
function update(lengt){
    let rmovebut = document.getElementById('rmove')
    let lmovebut = document.getElementById('lmove')
    let energytext = document.getElementById('energytxt')
    aworld+=lengt
        if (lengt != 0){
        xpos = 700
        player.style.left=xpos+"px"
        
    }
    if (aworld >= world.length){
        aworld = 0
    }else if (aworld < 0){
        aworld = world.length-1
        console.log(aworld)
    }
    locat.src = world[aworld ][0]
    console.log(world[aworld ][0])
    console.log(aworld)
    console.log(world)
    if (xpos >= 1400){
        rmovebut.style.visibility = "visible"
    }else if(xpos == 0){
        lmovebut.style.visibility = "visible"
    }else{
        rmovebut.style.visibility = "hidden"
        lmovebut.style.visibility = "hidden"
    }
    console.info("aworld:"+aworld)
    if (energy > 100) {
        energy = 100
    }
    energytext.innerText = "Бодрость: " + energy+'%'
    if (energy < 50){
        let sleepbut = document.getElementById('sleepbut')
        sleepbut.style.visibility = 'visible'
    }else{
        let sleepbut = document.getElementById('sleepbut')
        sleepbut.style.visibility = 'hidden'
    }
    localStorage.setItem("Xpos",(aworld))
}
function sleep(){
    let qwerty = document.getElementsByClassName('qwerty')
    let sleepbut = document.getElementById('sleepbut')
    let timer = document.getElementById('timer')
    let i = 10
    energy = 100
    qwerty[0].style.visibility = 'hidden'
    qwerty[1].style.visibility = 'hidden'
    sleepbut.style.visibility = 'hidden'
    timer.style.visibility = 'visible'
    let countdown = setInterval(function() {
        timer.style.display = 'inline'
        timer.innerText=("Спать ещё: "+i+" секунд.")
        i--
        if (i <= 0) {
            clearInterval(countdown);
            qwerty[0].style.visibility = 'visible'
            qwerty[1].style.visibility = 'visible'
            sleepbut.style.visibility = 'visible'
        }
    },1000)
    timer.style.display='none'
    timer.style.visibility = 'hidden'
    update(0)
}
function clearstorage(){
    localStorage.clear
    let warning = confirm('Вы уверены? все сохрания пропадут!')
    if (warning) {
        localStorage.clear
    }

}