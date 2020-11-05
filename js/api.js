const API_KEY = "11394945ae964207879126f610b9fff8";
const LEAGUE_ID = 2021;

let baseUrl = "https://api.football-data.org/v2/";
let standing = `${baseUrl}competitions/${LEAGUE_ID}/standings`;
let teamUrl = `${baseUrl}competitions/${LEAGUE_ID}/teams`;
let teamData;

let fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  });
};

function loading() {
  document.getElementById("loading").style.display = "";
}

function noLoading() {
  document.getElementById("loading").style.display = "none";
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStanding() {
  loading();
  if ("caches" in window) {
    caches.match(standing).then(function (response) {
      if (response) {
        response
          .json()
          .then(function (data) {
            standingHtml(data);
          })
          .then(noLoading());
      }
    });
  }

  fetchApi(standing)
    .then(status)
    .then(json)
    .then(function (data) {
      standingHtml(data);
    })
    .then(noLoading())
    .catch(error);
}

function getTeams() {
  loading();
  if ("caches" in window) {
    caches.match(teamUrl).then(function (response) {
      if (response) {
        response
          .json()
          .then(function (data) {
            getAllTeams(data);
          })
          .then(noLoading());
      }
    });
  }

  fetchApi(teamUrl)
    .then(status)
    .then(json)
    .then(function (data) {
      getAllTeams(data);
    })
    .catch(error);
}

function standingHtml(data) {
  let html = "";

  let str = JSON.stringify(data).replace(/http:/g, "https:");
  data = JSON.parse(str);

  data.standings[0].table.forEach(function (team) {
    html += `<tr>
    <td class="center">${team.position}</td>
      <td><img class="responsive-img" width="20" height="20" src="${team.team.crestUrl}"> ${team.team.name}</td>
      <td>${team.playedGames}</td>
      <td>${team.won}</td>
      <td>${team.draw}</td>
      <td>${team.lost}</td>
      <td>${team.goalsFor}</td>
      <td>${team.goalsAgainst}</td>
      <td>${team.goalDifference}</td>
      <td>${team.points}</td>
    </tr>
  `;
  });
  document.getElementById("standing").innerHTML = html;
}

function getAllTeams(data) {
  let html = "";
  let str = JSON.stringify(data).replace(/http:/g, "https:");
  data = JSON.parse(str);
  teamData = data;

  html += "";
  data.teams.forEach((team) => {
    html += `
              <div class="card tim">
                  <div class="card-image">
                  <img class="gbr" width="60" height="60" src="${team.crestUrl}">                  
                  </div>

                  <div class="card-stacked">
                      <div class="card-content">
                        <h5 class="center text-bold">${team.name}</h5>                              
                      </div>
                        <div class="info-tim">
                          <p class="info">
                            Country: ${team.area.name} <br />                          
                            Founded: ${team.founded} <br />
                            Team Venue: ${team.venue} <br />
                            Website: <a href="${team.website}" target="_blank">${team.website}</a>
                          </p>
                        </div>
                  </div>
                      <div class="card-action center-align">
                      <a class="waves-effect waves-light btn green tombol" onclick="listenerInsert(${team.id})"><i class="material-icons right"></i>Add to Favorite</a>
                      </div>                                    
              </div>
        `;
  });
  document.getElementById("teams").innerHTML = html;
}

function getFavoriteTeams() {
  loading();
  let dataDB = getFavTeams();
  dataDB.then(function (data) {
    let html = "";
    data.forEach(function (team) {
      html += `
              <div class="card tim">
                  <div class="card-image">
                  <img class="gbr" width="70" height="70" src="${team.crestUrl}">                  
                  </div>

                  <div class="card-stacked">
                      <div class="card-content">
                        <h5 class="center text-bold">${team.name}</h5>                              
                      </div>
                        <div class="info-tim">
                          <p class="info">
                            Country: ${team.area.name} <br />
                            Founded: ${team.founded} <br />
                            Team Venue: ${team.venue} <br />
                            Website: <a href="${team.website}" target="_blank">${team.website}</a>
                          </p>
                        </div>
                  </div>
                      <div class="card-action center-align">
                      <a class="waves-effect waves-light btn red tombol" onclick="listenerDelete(${team.id})"><i class="material-icons right"></i>Delete</a>
                      </div>                  
              </div>              
`;
    });
    if (data.length == 0)
      html +=
        '<h5 class="center-align">Kamu belum menambahkan tim favorit!</h5>';
    document.getElementById("fav-teams").innerHTML = html;
    noLoading();
  });
}
