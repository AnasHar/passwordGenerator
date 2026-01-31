// ICI : On crée des "boîtes" (tableaux) qui contiennent tous nos ingrédients possibles
// Une boîte avec toutes les lettres, une avec les chiffres, une avec les symboles
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

// ICI : On va "attraper" les éléments de la page (HTML) pour pouvoir jouer avec
const generateBtn = document.getElementById("generate-btn"); // Le bouton
const passwordOneEl = document.getElementById("password-1"); // La première zone de texte
const passwordTwoEl = document.getElementById("password-2"); // La deuxième zone de texte
const lengthInput = document.getElementById("password-length"); // Le champ où on met le nombre
const numbersToggle = document.getElementById("numbers-toggle"); // La case "Numbers"
const symbolsToggle = document.getElementById("symbols-toggle"); // La case "Symbols"

// CETTE FONCTION : Sert juste à prendre UN élément au hasard dans une liste
function getRandomItem(array) {
    // On tire un numéro au hasard (ex: 5)
    let randomIndex = Math.floor(Math.random() * array.length);
    // On renvoie l'élément qui est à cette position (ex: la 5ème lettre)
    return array[randomIndex];
}

// CETTE FONCTION : Prépare le saladier avec tous les caractères qu'on a le droit d'utiliser
function getAvailableCharacters() {
    let pool = [...letters]; // On commence avec les lettres (c'est la base)
    
    // Si la case "Numbers" est cochée, on ajoute les chiffres au saladier
    if (numbersToggle.checked) {
        pool = pool.concat(numbers);
    }
    
    // Si la case "Symbols" est cochée, on ajoute les symboles
    if (symbolsToggle.checked) {
        pool = pool.concat(symbols);
    }
    
    return pool; // On renvoie le saladier complet
}

// CETTE FONCTION : C'est le chef d'orchestre, elle fabrique le mot de passe
function generateRandomPassword() {
    let characterPool = getAvailableCharacters(); // On récupère notre saladier d'ingrédients
    let length = lengthInput.value; // On regarde quelle longueur l'utilisateur a choisie
    let randomPassword = ""; // On commence avec un mot de passe vide
    
    // On boucle autant de fois que la longueur demandée
    // Si on veut 15 caractères, on va piocher 15 fois
    for (let i = 0; i < length; i++) {
        randomPassword += getRandomItem(characterPool); // On ajoute le caractère pioché
    }
    
    return randomPassword; // On livre le résultat final
}

// CETTE FONCTION : On l'appelle pour afficher le résultat à l'écran
function renderPasswords() {
    // On remplit les deux zones de texte avec deux nouveaux mots de passe
    passwordOneEl.textContent = generateRandomPassword();
    passwordTwoEl.textContent = generateRandomPassword();
}


// --- BONUS : Pour copier le texte quand on clique ---

// Cette fonction copie le texte dans le presse-papier de l'ordinateur
function copyToClipboard(element) {
    const textToCopy = element.textContent;
    
    // S'il n'y a rien d'intéressant à copier (juste "..."), on ne fait rien
    if(!textToCopy || textToCopy === "...") return;

    // La commande magique du navigateur pour copier
    navigator.clipboard.writeText(textToCopy).then(() => {
        // --- Petit effet visuel pour dire "Copié !" ---
        const originalText = textToCopy;
        element.textContent = "Copied!"; // On change le texte
        element.style.color = "#ffffff"; // On change la couleur en blanc

        // On attend 1,5 secondes (1500 ms) puis on remet comme avant
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = "#55F991";
        }, 1500);
    }).catch(err => {
        console.error("Oups, impossible de copier : ", err);
    });
}

// ICI : On dit "Quand on clique sur la boîte 1, lance la copie"
passwordOneEl.parentElement.addEventListener("click", () => copyToClipboard(passwordOneEl));
// Pareil pour la boîte 2
passwordTwoEl.parentElement.addEventListener("click", () => copyToClipboard(passwordTwoEl));

// ICI : On dit "Quand on clique sur le gros bouton vert, lance la génération"
generateBtn.addEventListener("click", renderPasswords);
