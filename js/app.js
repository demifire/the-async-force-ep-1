console.log('App.js connected');

// Sets the number of stars we wish to display
const numStars = 100;

// For every star we want to display
for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    star.style.zIndex = -1;
    document.body.append(star);
}

// Gets random x, y values based on the size of the container
function getRandomPosition() {
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
}

document.addEventListener('click',function starwars() {

    document.removeEventListener('click',starwars);
    var audio = new Audio("https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg");
    audio.oncanplaythrough = function () {

        const container = document.createElement('div');
        container.id = "scroll-container";
        document.body.appendChild(container);
        const intro = document.createElement('section');
        intro.className = 'intro';
        intro.id = 'intro';
        let myImg = new Image;
        myImg.src = 'pics/wat.jpg';
        myImg.className = 'myWat';
        intro.innerHTML = 'Long long ago, in a galaxy far far away, on a timeline so confuse wat';
        container.appendChild(myImg);
        container.appendChild(intro);
        const logo = document.createElement('section');
        logo.className = 'logo';
        logo.id = 'logo';
        logo.innerHTML = 'STAR WARS'
        container.appendChild(logo);
        const board = document.createElement('div');
        board.id = 'board'; 
        container.appendChild(board);
        content = document.createElement('div');
        content.id = 'content';
        board.appendChild(content);
        content.appendChild(main);

        document.getElementById("scroll-container").style.display = "block";
        document.getElementById("main").style.display = "block";
        audio.play();
        setTimeout(function(){
            document.getElementById("scroll-container").style.display = "none";
            getData();
         }, 96000);
    };
});

function getData(){

theTitle.innerHTML = 'The Async Force Ep 1';

const firstRequest = newReq('https://swapi.co/api/people/4');
firstRequest.addEventListener("load", function(res){

    person4Name.innerHTML = JSON.parse(res.currentTarget.response).name; // Darth Vader

    const planetReq = newReq('https://swapi.co/api/planets/1/');
    planetReq.addEventListener("load",function(res){

        person4HomeWorld.innerHTML = JSON.parse(res.currentTarget.response).name; // Tatooine

    });

    const secondRequest = newReq('https://swapi.co/api/people/14/');
    secondRequest.addEventListener("load",function(res){

        person14Name.innerHTML = JSON.parse(res.currentTarget.response).name; // Han Solo

        const speciesReq = newReq('https://swapi.co/api/species/1/');
        speciesReq.addEventListener("load",function(res){

            person14Species.innerHTML = JSON.parse(res.currentTarget.response).name; // Human

        });

        const thirdRequest = newReq('https://swapi.co/api/films/');
        thirdRequest.addEventListener("load",function(res){

            const movieArr = JSON.parse(res.currentTarget.response).results;

            for(let i=0;i<movieArr.length;i++){
                let filmItem = newElem('li', 'film', filmList);
                let movieItem = newElem('h3', 'filmTitle', filmItem, movieArr[i].title);
                let planetHeader = newElem('h4', null, movieItem, 'Planets');
                let planetList = newElem('ul', 'filmPlanets', planetHeader);

                for(let j=0;j<movieArr[i].planets.length;j++){
                    let planetItem = newElem('li', 'planet', planetList);
                    let moviePlanets = newElem('h5', 'planetName', planetItem);

                    let planetNameReq = newReq(movieArr[i].planets[j]);
                    planetNameReq.addEventListener("load",function(res){

                        moviePlanets.innerHTML = JSON.parse(res.currentTarget.response).name; // Planets

                    });
                }
            }
        });
    });
});

document.body.appendChild(main2);

function newElem(elem, myClass, parent, guts){
    const newElement = document.createElement(elem);
    newElement.className = myClass;
    parent.appendChild(newElement);
    if(guts){
        newElement.innerHTML = guts;
    }
    return newElement
}

function newReq(url){
    const newRequest = new XMLHttpRequest();
    newRequest.open('GET', url);
    newRequest.send();
    return newRequest
}

// let stylesheet = document.styleSheets[0];
// stylesheet.disabled = true;

for ( i=0; i<document.styleSheets.length; i++) {
    void(document.styleSheets.item(i).disabled=true);
}
}