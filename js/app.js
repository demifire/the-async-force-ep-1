console.log('App.js connected');

let oReq = new XMLHttpRequest()
oReq.addEventListener("load", function(res){
    console.log('this is a res', res);
    console.log('this is the res.currentTarget', res.currentTarget);
    console.log('req1 Object', JSON.parse(res.currentTarget.response));
    console.log('This is Person 4', JSON.parse(res.currentTarget.response).name);
    person4Name.innerHTML = JSON.parse(res.currentTarget.response).name;
    const planetReq = new XMLHttpRequest();
    planetReq.addEventListener("load",function(res){
        console.log('this is planet Req', res);
        console.log('this is the planet Req currentTarget', res.currentTarget);
        console.log('Planet Req Object', JSON.parse(res.currentTarget.response));
        person4HomeWorld.innerHTML = JSON.parse(res.currentTarget.response).name;
    })
    planetReq.open('GET', 'https://swapi.co/api/planets/1/')
    planetReq.send();
    const oReq2 = new XMLHttpRequest();
    oReq2.addEventListener("load",function(res){
        console.log('this is a res2', res);
        console.log('this is the res2.currentTarget', res.currentTarget);
        console.log('req2 Object', JSON.parse(res.currentTarget.response));
        console.log('This is Person 14', JSON.parse(res.currentTarget.response).name);
        person14Name.innerHTML = JSON.parse(res.currentTarget.response).name;
        const speciesReq = new XMLHttpRequest();
        speciesReq.addEventListener("load",function(res){
            console.log('this is planet Req', res);
            console.log('this is the planet Req currentTarget', res.currentTarget);
            console.log('Planet Req Object', JSON.parse(res.currentTarget.response));
            person14Species.innerHTML = JSON.parse(res.currentTarget.response).name;
        });
        speciesReq.open('GET', 'https://swapi.co/api/species/1/')
        speciesReq.send();
        const oReq3 = new XMLHttpRequest();
        oReq3.addEventListener("load",function(res){
            console.log('this is a res3', res);
            console.log('this is the res3.currentTarget', res.currentTarget);
            console.log('req 3 Object', JSON.parse(res.currentTarget.response));
            console.log('An array of movie objects', JSON.parse(res.currentTarget.response).results);
            const movieArr = JSON.parse(res.currentTarget.response).results;
            for(let i=0;i<movieArr.length;i++){
                let filmItem = document.createElement('li');
                filmItem.className = 'film';
                let movieItem = document.createElement('h3');
                movieItem.className = 'filmTitle';
                movieItem.innerHTML = movieArr[i].title;
                filmList.appendChild(filmItem);
                filmItem.appendChild(movieItem);
                let planetHeader = document.createElement('h4');
                planetHeader.innerHTML = 'Planets';
                movieItem.appendChild(planetHeader);
                let planetList = document.createElement('ul');
                planetList.className = 'filmPlanets';
                planetHeader.appendChild(planetList);
                for(let j=0;j<movieArr[i].planets.length;j++){
                    let planetItem = document.createElement('li');
                    planetItem.className = 'planet';
                    let moviePlanets = document.createElement('h5');
                    moviePlanets.className = 'planetName';
                    let planetNameReq = new XMLHttpRequest();
                    planetNameReq.addEventListener("load",function(res){
                        moviePlanets.innerHTML = JSON.parse(res.currentTarget.response).name;
                    })
                    planetNameReq.open('GET', movieArr[i].planets[j])
                    planetNameReq.send();
                    planetList.appendChild(planetItem);
                    planetItem.appendChild(moviePlanets);
                }
            }
        })
        oReq3.open('GET', 'https://swapi.co/api/films/')
        oReq3.send();
    })
    oReq2.open('GET', 'https://swapi.co/api/people/14/')
    oReq2.send();
});
oReq.open('GET', 'https://swapi.co/api/people/4')
oReq.send();



