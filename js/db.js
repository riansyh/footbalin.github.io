let dbPromise = idb.open("footballIn", 1, (upgradeDb) => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore("teams", { keyPath: "id" });
  }
});

function insertTeam(team) {
  dbPromise
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `${team.name} berhasil ditambahkan!` });
      const title = "Football Information";
      const options = {
        body: "Tim telah berhasil ditambahkan!",
        badge: "icon/icon144.png",
        icon: "icon/icon144.png",
      };
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      } else {
        console.error("FItur notifikasi tidak diijinkan.");
      }
    })
    .catch((err) => {
      console.error("Tim gagal ditambahkan", err);
    });
}

function deleteTeam(teamId) {
  dbPromise
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(teamId);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: "Tim berhasil dihapus!" });
      const title = "Football Information";
      const options = {
        body: "Tim telah berhasil dihapus!",
        badge: "icon/icon144.png",
        icon: "icon/icon144.png",
      };
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, options);
        });
      } else {
        console.error("Fitur notifikasi tidak diijinkan.");
      }
      getFavoriteTeams();
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

function getFavTeams() {
  return dbPromise.then(function (db) {
    let tx = db.transaction("teams", "readonly");
    let store = tx.objectStore("teams");
    return store.getAll();
  });
}

let listenerInsert = (teamId) => {
  let team = teamData.teams.filter((fil) => fil.id == teamId)[0];
  insertTeam(team);
  console.log(teamId + " ditambahkan ke favorite");
};

let listenerDelete = (teamId) => {
  let conf = confirm("Apakah Anda yakin?");
  if (conf == true) {
    deleteTeam(teamId);
    console.log(teamId + " telah dihapus");
  }
};
