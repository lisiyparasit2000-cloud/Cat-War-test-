let player = document.getElementById('player')
let xpos = 700
let locat = document.getElementById('backgrounds') 
var world = [["back/CT0.jpg", false, false], ["back/CT1.jpg", false, true],["back/CT2.jpg",false], ["back/CT3.jpg",false, true], ["back/CT4.jpg", true, false]] // массив локаций. 0 - фон, 1 вода или нет? 2 - Охота
let aworld = 0
var energy = 100
var heal = 100
var pain = 0
var act = false
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
    if (world[aworld][1]){
        energy = energy - 9
        if (energy < 10){
            heal-=5
            pain++
        }
    }
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
    if (world[aworld][1]){
        energy = energy - 9
        if (energy < 10){
            heal-=5
            pain++
        }
    }
}
function update(lengt){
    let rmovebut = document.getElementById('rmove')
    let lmovebut = document.getElementById('lmove')
    let energytext = document.getElementById('energytxt')
    aworld+=lengt
        if (lengt != 0){ // Если смена локации
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
    energytext.innerText = "Бодрость: " + energy+'%' //Отображение бодрости


    if (false == act && false == world[aworld][1]){
        if (energy < 50){
        let sleepbut = document.getElementById('sleepbut') //отоброжение кнопки поспать
        sleepbut.style.visibility = 'visible'
    }else{
        let sleepbut = document.getElementById('sleepbut')
        sleepbut.style.visibility = 'hidden'}



    if (heal < 100){
        let healbut = document.getElementById('healbut') //отоброжение кнопки Вылизать раны
        healbut.style.visibility = 'visible'
    }else{
        let healbut = document.getElementById('healbut')
        healbut.style.visibility = 'hidden'
    }


    localStorage.setItem("Xpos",(aworld))
    localStorage.setItem("health points",heal)
    if (lengt != 0) { // Смена локации
        if (pain > 2){
            energy-=3
        }
        if (pain >0){
            pain--
        }
    }
    if (energy < 0){ // если слишком устал то здоровье уменьшается
        energy = 0
        heal--
    }
    if (heal < 0){
        window.location.replace('dead.html')
    }
    }
    
}
function sleep(){
    let qwerty = document.getElementsByClassName('qwerty')
    let sleepbut = document.getElementById('sleepbut')
    let timer = document.getElementById('timer')
    let i = 20
    energy = 100
    act = true
    qwerty[0].style.visibility = 'hidden'
    qwerty[1].style.visibility = 'hidden'
    sleepbut.style.visibility = 'hidden'
    timer.style.visibility = 'visible'
    healbut.style.visibility = 'hidden'
    timer.style.display = "inline"
    timer.innerText=("Спать ещё: "+i+" секунд.")
    if (pain > 0){
        pain -= 2
    }
    if (heal < 91 ){
        heal += 10
    }else if(heal > 91 && heal < 100){
        heal+=5
    }
    let countdown = setInterval(function() {
        i--
        timer.innerText=("Спать ещё: "+i+" секунд.")
        healbut.style.visibility = 'hidden'
        if (i <= 0) {
            clearInterval(countdown);
            qwerty[0].style.visibility = 'visible'
            qwerty[1].style.visibility = 'visible'
            sleepbut.style.visibility = 'hidden'
            timer.style.visibility = 'hidden'
            timer.style.display = "none"
            act = false
        }
    },1000)
    
    update(0)
    healbut.style.visibility = 'hidden'
}

function health(){
    console.log('Здоровье и боль: '+heal+' '+pain)
    if (heal == 100 && pain == 0){
        alert('Я чувствую себя хорошо.')
    }else if(pain <= 2 && heal >= 80){
        alert('Мне не очень хорошо, слегка больно')
    }else if(pain >=3 && pain < 5){
        alert('Довольно больно!')
    }else if(pain >= 5 && pain < 10){
        alert('Очень больно!')
    }else if(pain >= 10){
        alert('ААААААААААА!')
    }else if(heal <= 90 && pain == 0 && heal > 50){
        alert('Мне не очень хорошо.')
    }else if(heal <=50){
        alert('Мне плохо.')
    }else if (heal <=30){
        alert('Мне сильно плохо , чувствую слабость.')
    }
}
function healing(){ //Вылизывание ран
    let qwerty = document.getElementsByClassName('qwerty')
    let sleepbut = document.getElementById('sleepbut')
    let timer = document.getElementById('timer')
    let healbut = document.getElementById('healbut')
    let i = 10
    qwerty[0].style.visibility = 'hidden'
    qwerty[1].style.visibility = 'hidden'
    sleepbut.style.visibility = 'hidden'
    healbut.style.visibility = 'hidden'
    timer.style.visibility = 'visible'
    timer.style.display = "inline"
    timer.innerText=("Зализывать раны ещё: "+i+" секунд.")
    act = true
    if (pain > 0){
        pain --
    }
    if (heal < 100 ){
        heal += 5
    let countdown = setInterval(function() {
        i--
        timer.innerText=("Зализывать раны ещё: "+i+" секунд.")
        
        if (i <= 0) {
            clearInterval(countdown);
            qwerty[0].style.visibility = 'visible'
            qwerty[1].style.visibility = 'visible'
            sleepbut.style.visibility = 'hidden'
            timer.style.visibility = 'hidden'
            timer.style.display = "none"
            healbut.style.visibility = 'hidden'
            act = false
        }
    },1000)}
    
    update(0)
} 
