// Définition des groupes de caractères
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

// Récupération des éléments du HTML
const generateBtn = document.getElementById("generate-btn");
const passwordOneEl = document.getElementById("password-1");
const passwordTwoEl = document.getElementById("password-2");
const lengthInput = document.getElementById("password-length");
const numbersToggle = document.getElementById("numbers-toggle");
const symbolsToggle = document.getElementById("symbols-toggle");

// Fonction utilitaire pour obtenir un caractère aléatoire depuis un tableau donné
function getRandomItem(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Fonction pour construire le pool de caractères selon les options
function getAvailableCharacters() {
    let pool = [...letters]; // On commence toujours avec les lettres
    if (numbersToggle.checked) {
        pool = pool.concat(numbers);
    }
    if (symbolsToggle.checked) {
        pool = pool.concat(symbols);
    }
    return pool;
}

// Fonction principale qui génère un mot de passe
function generateRandomPassword() {
    let characterPool = getAvailableCharacters();
    let length = lengthInput.value;
    let randomPassword = "";
    
    for (let i = 0; i < length; i++) {
        randomPassword += getRandomItem(characterPool);
    }
    return randomPassword;
}

// Fonction pour mettre à jour l'interface
function renderPasswords() {
    passwordOneEl.textContent = generateRandomPassword();
    passwordTwoEl.textContent = generateRandomPassword();
}


// --- Fonctionnalité Copy-on-Click ---

function copyToClipboard(element) {
    const textToCopy = element.textContent;
    // Vérifie qu'il y a bien un texte à copier (pas "...")
    if(!textToCopy || textToCopy === "...") return;

    // Utilisation de l'API moderne navigator.clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Feedback visuel temporaire
        const originalText = textToCopy;
        element.textContent = "Copied!";
        element.style.color = "#ffffff"; // Change la couleur temporairement

        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = "#55F991"; // Retour à la couleur d'origine
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

// Listeners pour la copie
passwordOneEl.parentElement.addEventListener("click", () => copyToClipboard(passwordOneEl));
passwordTwoEl.parentElement.addEventListener("click", () => copyToClipboard(passwordTwoEl));

// Listener pour le bouton générer
generateBtn.addEventListener("click", renderPasswords);
