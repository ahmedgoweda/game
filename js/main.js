let links=document.querySelectorAll(".nav-link")
 for (let i = 0; i < links.length; i++) {
     links[i].addEventListener('click',function(e){
        const category =e.target.innerHTML
console.log("okok");
        getData(category,i)
     })
    
 }

 window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.getElementById('navbar_top').classList.add('fixed-top');
      document.getElementById('navbar_top').classList.remove('mt-5');

    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      document.getElementById('navbar_top').classList.add('mt-5');
    } 
});

let data =[];
let game;
const dataXhr = null;
getData('mmorpg',0)

function getData(category,index){
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active')
        }
        links[index].classList.add('active')
    const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {

	if (xhr.readyState == 4) {
		data = JSON.parse(xhr.response)
    displayname()
	}
});

xhr.open('GET', `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`);
xhr.setRequestHeader('X-RapidAPI-Key', '940ecd309amsh842455473df9301p10ed53jsn15aa7ef09a92');
xhr.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
xhr.send();


}

function openGame(i){
    
    // window.open(url)
    getGame(data[i].id)
}
function displayname(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=` <div class="col-lg-3 col-md-6 col-12 g-4 mb-5 ">
        <div class="card h-100  mb-3 bg-transparent"   onclick='openGame(${i});' >
        <div class='card-body card-color'>
        <img src="${data[i].thumbnail}"  class="w-100"   alt="">
        <div class='card-content d-flex align-items-center justify-content-between mt-3 mb-3'>
        <h5 class="text-light">${data[i].title}</h5>
        <span class='badge bg-primary text-light p-2 font-weight-light'>Free</span>
        </div>
        <p class="card-text text-center small"> ${data[i].short_description}</p>
        </div>
        <div class='card-footer'>
        <div class="d-flex justify-content-between text-light ">
         <p class='footer-item badge badge-color'>${data[i].platform}</p>
          <p class='footer-item badge badge-color'>${data[i].genre}</p>
         </div>
        </div> 
        </div>  
      
             </div>`

    }
    document.getElementById("dataimg").innerHTML = cols;
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
}

function showGameDetail(){ 
console.log(game)
const gameData = `
<div class='container py-5'>

<div class='game-detail'>
 <h2 class='text-light mb-4'>
  Details Game
 </h2>
 <div class=row>
   <div class='col-md-4 >
     <div class='poster'>
     <img src="${game.thumbnail}"  class="w-100"   alt=""> 
         <a href="${game.game_url}" target="_Blank" class="btn btn-outline-warning mt-3 text-white">Show Game</a>

       </div>
       <div class="col-12 col-md-8 text-light fw-bolder">
       <h3 class="headerFonts">Title: <span>${game.title}</span></h3>
       <p>Category: <span class="headerFonts badge bg-info text-black text-uppercase p-2">${game.genre}</span></p>
       <p>Platform: <span class="headerFonts badge bg-info text-black text-uppercase p-2">${game.platform}</span></p>
       <p>Status: <span class="headerFonts badge bg-info text-black text-uppercase p-2">${game.status}</span></p>
     <p class="mb-3  p-0">${game.description}</p>
 
  
     </div>
     </div>
   </div>
 </div>


<span class='close-game' onclick='closePopup()'>x</span>
</div>
</div>
`
document.querySelector('#game-data').innerHTML = gameData;
document.querySelector('#games-content').style.display='none'
document.querySelector('#game-data').style.display ='block'
}

function getGame(id){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
    
        if (xhr.readyState == 4) {
            game = JSON.parse(xhr.response)
           showGameDetail()
        }
    });
    
    xhr.open('GET', `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`);
    xhr.setRequestHeader('X-RapidAPI-Key', '940ecd309amsh842455473df9301p10ed53jsn15aa7ef09a92');
    xhr.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
    xhr.send();
}


function closePopup(){
document.querySelector('#games-content').style.display='block'
document.querySelector('#game-data').style.display ='none'
}





