// ------------
// Variables
// ------------

// Bouton
const restart = document.getElementById("restart");

// Affichage
const container = document.getElementById("container");
const compteur = document.getElementById("compteur");

// Liste des images
const imagesListe = document.getElementsByClassName("imagesListe");

// Valeur du compteur
let compteurValeur = 0;

// Tableaux de nombres et d'objets
let tableauNombres = [];
let tableauObjets = [];

// Cartes visibles
let carteVisible1 = "";
let carteVisible2 = "";

// ------------
// Fonctions
// ------------

// Choisit un nombre inclue entre le min et le max
function getRandomIntInclusive(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Mélange un tableau
function arrayRandomizer(array) {
  array.sort(() => Math.random() - 0.5);
}

// Retourne une carte
function rotateY(carte, newSource) {
  carte.style.transform = "rotateY(90deg)";
  setTimeout(() => {
    carte.setAttribute("src", newSource);
    carte.style.transform = "rotateY(0deg)";
  }, 300);
}

// -----------------------
// Gestion des tableaux
// -----------------------

// Crée un tableau de 8 nombres aléatoires (entre 1 et 200) différentes
for (i = 0; i < 8; i++) {
  newValue = getRandomIntInclusive(1, 200);
  if (tableauNombres.includes(newValue)) {
    i--;
  } else {
    tableauNombres.push(newValue);
  }
}

// Mélange le tableau de nombres
arrayRandomizer(tableauNombres);

// Crée un tableau composé de 8 cartes à l'aide des valeurs aléatoires de "tableauNombres"
for (i = 0; i < 8; i++) {
  tableauObjets.push({
    nom: "Pokemon" + tableauNombres.at(i),
    img: "img/Pokemon" + tableauNombres.at(i) + ".png",
  });
}

// Injecte au tableau un clone de lui-même, puis le mélange
tableauObjets = tableauObjets.concat(tableauObjets);
arrayRandomizer(tableauObjets);

// ---------------
// Début du jeu
// ---------------

// Mets les cartes en place, face cachée
for (i = 0; i < 16; i++) {
  container.innerHTML += `<div><img id="image${i}" class="imagesListe" name="${tableauObjets[i].nom}" src="img/dessus.png"></div>`;
}

// Récupère l'id de la carte cliquée
for (i = 0; i < 16; i++) {
  const image = document.getElementById(imagesListe[i].id);
  image.addEventListener("click", () => {
    // Vérifie que la carte cliquée n'est pas déjà visible
    if (image.src.includes("img/dessus.png")) {
      // Vérifie qu'aucune carte ne soit visible
      if (carteVisible1 == "") {
        carteVisible1 = image;
        rotateY(
          carteVisible1,
          `${tableauObjets[carteVisible1.id.substring(5)].img}`
        );
        compteurValeur++;
      }

      // Vérifie que seule UNE carte ne soit visible
      else if (carteVisible2 == "") {
        carteVisible2 = image;
        rotateY(
          carteVisible2,
          `${tableauObjets[carteVisible2.id.substring(5)].img}`
        );

        // Augmente le compteur uniquement si les 2 cartes visibles sont différentes
        if (carteVisible1.name != carteVisible2.name) {
          compteurValeur++;
        } else {
          compteurValeur--;
        }
      }

      // Vérifie si les 2 cartes visibles sont similaires
      else if (carteVisible1.name == carteVisible2.name) {
        rotateY(carteVisible1);
        carteVisible1.style.visibility = "hidden";
        carteVisible1 = image;
        rotateY(
          carteVisible1,
          `${tableauObjets[carteVisible1.id.substring(5)].img}`
        );
        rotateY(carteVisible2);
        carteVisible2.style.visibility = "hidden";
        carteVisible2 = "";
        compteurValeur++;
      }

      // Retourne les 2 cartes visibles
      else {
        rotateY(carteVisible1, "img/dessus.png");
        carteVisible1 = image;
        rotateY(
          carteVisible1,
          `${tableauObjets[carteVisible1.id.substring(5)].img}`
        );
        rotateY(carteVisible2, "img/dessus.png");
        carteVisible2 = "";
        compteurValeur++;
      }

      // Actualise le compteur
      compteur.innerHTML = compteurValeur;
    }
  });
}

restart.addEventListener("click", () => {
  location.reload();
});
