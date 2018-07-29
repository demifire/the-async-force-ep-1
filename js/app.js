console.log('App.js connected');

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