

const start  = document.querySelector('button') 
const chrono = document.querySelector('.chrono')
const icons = [
    {icon : '🌝' , name : 'face'}, 
    {icon :'🚀' , name:'rocket'},
    {icon:'⚽' , name : 'football'},
    {icon : '🌙' , name : 'lune'},
    {icon : '' , name : 'vide'} ,
    {icon : '⌚' , name : 'horloge'},
    {icon : '⚾' , name :'golf'},
    {icon : '🌺' , name : 'fleure'},
    {icon : '🌝' , name : 'face'}, 
    {icon :'🚀' , name:'rocket'},
    {icon:'⚽' , name : 'football'},
    {icon : '🌙' , name : 'lune'},
    {icon : '' , name : 'vide'} ,
    {icon : '⌚' , name : 'horloge'},
    {icon : '⚾' , name :'golf'},
    {icon : '🌺' , name : 'fleure'}
]
const cards = document.querySelectorAll('.card') 
const active = '❓'
const desactive = ' '
const backFaceCards= document.querySelectorAll('.back-face')
let clicked = false 
let  firstCardClicked, secondCardClicked 

start.addEventListener('click',()=>{
    chrono.style.color = '#fff'
    start.style.display = "none"
    startChrono()
    melangeIcon()
    stateOfCard(active)
    cards.forEach(card=>card.addEventListener('click',cardActive))
})


function startChrono(){
    let count = 35
    const myInterval = setInterval(()=>{
        count--
        chrono.innerText = count
        if(count<=-1){
            clearInterval(myInterval)
            stopChrono() 
            chrono.innerText = 00
            alert('Vous avez perdu ! \n Veuillez essayer à nouveau ')  
        }
        if(count <= 5 ){
            chrono.style.color = 'red'
        }
        if(win() === true ){
            alert('Bravo vous avez gagner \n Veuillez lancer une nouvelle partie')
            clearInterval(myInterval)
            stopChrono() 
            chrono.innerText = 35
            chrono.style.color = '#fff'
        
        }

    } , 1000)
}

function stopChrono(){
    start.style.display = "block"
    stateOfCard(desactive)
    cardDesactive()
}

const stateOfCard=(state)=> {
    cards.forEach((card)=>{
        card.childNodes[1].innerText = state
        card.style.cursor= state === ' '? 'default': 'pointer'

    })
}


function cardActive(){
   this.classList.add('active')
   if(!clicked){
       clicked = true
       firstCardClicked = this
       
   }else{
    clicked = false
    secondCardClicked = this

    if(firstCardClicked.childNodes[3].dataset.icon === secondCardClicked.childNodes[3].dataset.icon){
        firstCardClicked.removeEventListener('click' , cardActive)
        secondCardClicked.removeEventListener('click' , cardActive)
    }else{
        setTimeout(()=>{
            firstCardClicked.classList.remove('active')
            secondCardClicked.classList.remove('active')
        } , 300)
           
    }
   }
   
}

function cardDesactive(){
    cards.forEach(card=>card.classList.remove('active'))
    cards.forEach(card=>card.removeEventListener('click',cardActive))
}


function melangeIcon(){
   for(let i =0 ; i<16 ; i++){
       const firstIndex = Math.floor(Math.random()*16)
       const secondIndex = Math.floor(Math.random()*16)
       let temp = 0 ; 
       temp = icons[firstIndex]
       icons[firstIndex] = icons[secondIndex]
       icons[secondIndex] = temp
   }

   let index = 0
   backFaceCards.forEach((card)=>{
        card.innerText = icons[index].icon
        card.dataset.icon = icons[index].name
        index++
   })

}

function win(){
    let count = 0 
    cards.forEach(card=>{
        count += card.classList.contains('active') === true? 1 : -1
    })
    if(count===16){
        return true
     }
   
}