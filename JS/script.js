//const
const fermerDialogue = document.getElementById("dialogFermer");
const dialogue = document.querySelector("dialog");
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");
const deuxJoueurs = document.getElementById("deuxJoueurs")


//Fonction nous permettent au load de la pages et des ressources 
//de creer un délai alétoire pour l'évènement(De pourquoi l'utilisation d'un DOMloader)
document.addEventListener('DOMContentLoaded', function(){
  let tempsAleatoire = Math.random() * 7500 + 10000; //Temps avant que l'évènements se clenche
  setTimeout(Surprise, tempsAleatoire)
})
//Fonction Surprise enclanché Aléatoirement 
function Surprise(){

  let imageSurprise = document.getElementById('imageSurprise')
  let sonsSurprise = document.getElementById('sonsSurprise')

  //SURPRISE!!!!!//
  imageSurprise.style.display = 'block';
  sonsSurprise.play();



 // sert au temps de l'affichage que l'utilisateur voit la surprise
  setTimeout(function(){
  imageSurprise.style.display = 'none';
  }, 5000)
  console.log("Fin Fonction surprise")
}

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyzéèê"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}


//word array

//Pour Insérer des questions c'est ici.
const question = [
  "La catégorie choisie est le prénom de mon chat",
  "La catégorie choisie est un membre de ma famille :D",
  "La catégorie choisie est la physique nucléaire",
  "La catégorie choisie est les animaux",
  "La catégorie choisie est les maladie!!!",
  "La catégorie choisie est les plantes",
];
//Pour ajouter de nouvelle catégorie//
const categories = [
  [
    "leon",
    "persil",
    "tigrou",
    "socrate",
    "cookie",
    "mini-cookie",
    "pythagore"
  ],
    [ 
      "anthony",
      "pierrick",
      "soraya",
      "lily-maude",
      "claudie"
    ],

  [
    "nucleon",
    "positron",
    "spallation",
    "photon",
    "nucleosynthese"],
    [
        "zebre",
        "axolotl",
        "quokka",
        "tarsier",
        "okapi",
        "aye-aye",
        "narval",
        "saola",
        "fossa"
    ],
    [
        "moultramicroscopiquesilicovolcanoconiose",
        "syndrome-de-vogt-koyanagi-harada",
        "anhidrosesectoparotitis",
        "achondroplasie",
        "dermatopolymyosite",
        "hypercholesterolemie-familiale-homozygote",
        "paroxysmal-nocturnal-hemoglobinuria",
        "leucodystrophie-métachromatique",
        "syndrome-de-guillain-barré"
      ],
      [
        "rafflesia-arnoldii",
        "welwitschia-mirabilis",
        "tacca-chantrieri",
        "amorphophallus-titanum",
        "dracaena-cinnabari",
        "nepenthes-attenboroughii",
        "puya-raimondii",
        "ginkgo-biloba",
        "encephalartos-woodii",
        "wollemia-nobilis",
      ]

];
//Pour ajouter des indices//
const hints = [
  [
    "Personnage principal de RE1 RE2 et RE4",
    "Une fine herbe que l'on voit partout",
    "Personnage dans winnie Lepoo",
    "Grand philosophe",
    "c'est bon, rond et sucré..",
    "c'est bon, rond et sucré mais mini",
    "Mathématicien des triangles"
  ],
  [
    "Est aussi un joueur de foot",
    "C'est moi ou pas..bref",
    "Est une ancienne princesse",
    "composé de deux prénom",
    "Prénom connu dans la littérature"
  ],
  [
    "Un composant du noyaux atomique",
    "Home of AC and Inter",
    "Spanish capital",
    "Netherlands capital",
    "Czech Republic capital"
  ],
  [
    "Ça la des rayures noirs",
    "C'est mignon et ça souris",
    "Ça ressemble à un castor et ça souris",
    "Ça vraiment des gros yeux",
    "Ça ressemble à un zèbre sans en être un",
    "C'est affreux on dirait moi à 6am",
    "Ça ressemble à une licorne",
    "On dirait une chèvre",
    "Une loutre cosco edition"
  ],
  [
    "Une maladie causée par l'inhalation de très fines particules de silice",
    "Une maladie auto-imune touchant yeux, peau et système nerveux",
    "Une inflammation de la glande parotide",
    "un trouble de croissance osseuse",
    "un trouble rare de la moelle osseuse",
    "Une maladie inflamatoire affectant les muscle et la peaux",
    "Maladie qui affecte les globules rouges",
    "Une maladie génétique qui affeecte le système nerveux",
    "Maladie dont le système immunitaire attaque les nerfs"
  ],
  [
    "la plus grande fleur individuelle au monde",
    "pousse en Namibie et Angola",
    "connue sous le nom de Fleur chauve-souris",
    "appelée fleur cadavre en raison de son odeur très forte",
    "l'arbre au sang de dragon de Socotra",
    "une plante carnivore découverte à Palawan, aux Philippines",
    "la plus grande espèce de broméliacées connue",
    "un arbre considéré comme un fossile vivant",
    "plantes les plus rares, seulement mâle, découverte en Afrique du Sud",
    "une espèce de conifère très ancienne découverte en Australie"
  ]
 
];

//set question,answer and hint
//Le jeu de base Pour choisir une question au hasard
function setAnswer() {
  
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}
//Ici pour toucher tous ce qui est affichage du jeu Plus précisément ce qui touche les _ _ _//
  function generateAnswerDisplay(word) {
    wordDisplay = [];
    var wordArray = word.split("");
    
    //console.log(wordArray);
    for (var i = 0; i < answer.length; i++) {
      if (wordArray[i] !== "-") {
        wordDisplay.push("_");
      } else {
        wordDisplay.push("-");
      }
    }
    console.log(word)
    return wordDisplay.join(" ");
  }
//La fonction pour faire afficher l'indice
function showHint() {
  containerHint.innerHTML = `Clue - ${hint}`;
}
//Le listener de l'indice
buttonHint.addEventListener("click", showHint);

//setting initial condition
//L'initilialisation du jeu en solo est ici (Aussi pour se setter en godmod :D )
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Vous avez ${life} vie!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

//Ici passe l'initiliasisation pour deux joueurs et évite la confusion pour JS elle fait presque comme
//init mais à différence que elle ne génère pas de nouveau mots
function init2Joueurs() {
  life = 10;
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Vous avez ${life} vie!`;
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  //Sert à rafraichir la catégorie choisie par celle de l'utilisateur//
  
  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.remove();
  categoryNameJS.innerHTML = prompt("Quelle thème voulez vous faire deviner?", "rien")
  
  
  console.log(answer);
  //console.log(hint);
}
//Ce qui lance la fonction init au démarrage de la page
window.onload = init();

//reset (play again)
//Bon je pense que en même en anglais c'est assez clair
buttonReset.addEventListener("click", init);

//guess click
//quand la personne appuie sur une touche pour deviner c'est ici
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `Vous gagnez!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `vous avez ${life} vie!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Vous avez ${life} vie!`;
      } else {
        livesDisplay.innerHTML = `GAME OVER!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `Vous gagnez!`;
      return;
    }
  }
}
//Le listener pour la fonction "Deviner"
container.addEventListener("click", guess);
//fonctions pour jouer à deux joueurs//
deuxJoueurs.addEventListener("click",jouerADeux)
function jouerADeux() { 
  var reponseUtilisateur = prompt("Quel mot allez-vous faire deviner à votre ami :D", "hello-world");
  //Condition qui Évite l'utilisitateur de tout briser :(
   if (reponseUtilisateur)
     { 
       answer = reponseUtilisateur.toLowerCase();
       hint = prompt("Et quel indice allez-vous lui laisser?");
      
       var display = generateAnswerDisplay(answer);
       answerDisplay.innerHTML = display;
       life = 10;
       
       init2Joueurs()
      } 
}

// Partie du pendu(Dessins SVG(Si je me rappel bien du nom))//
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];