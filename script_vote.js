// Variables globales
const joueurs = ["Jen", "Lola",
             "Quentin"];
let votes = new Array(joueurs.length).fill(0);
let selectedPlayerIndex = null;  // Variable pour stocker l'indice du joueur sélectionné pour retirer un vote

// Fonction pour afficher les joueurs et les boutons de vote
function updateDisplay() {
    const container = document.getElementById('players');
    if (!container) {
        console.error("Erreur : Impossible de trouver l'élément #players !");
        return;
    }
    container.innerHTML = "";
    joueurs.forEach((nom, index) => {
        const div = document.createElement('div');
        div.className = "player";
        div.innerHTML = `
            <h3>${nom}</h3>
            <button class="vote-btn" onclick="addVote(${index})">Voter</button>
            <button class="remove-vote-btn" onclick="showRemoveVotePopup(${index})">Retirer un vote</button>
        `;
        container.appendChild(div);
    });
}

// Fonction pour ajouter un vote
function addVote(index) {
    votes[index]++;
    showPopup(joueurs[index]); // Affiche la pop-up avec le nom du joueur
}

// Affiche la pop-up de confirmation de vote
function showPopup(nomJoueur) {
    document.getElementById("voteMessage").innerText = `✅ Votre vote pour ${nomJoueur} a été pris en compte !`;
    document.getElementById("popupOverlay").style.display = "block";
    document.getElementById("votePopup").style.display = "block";
}

// Ferme la pop-up de vote
function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("votePopup").style.display = "none";
}

// Fonction pour afficher la pop-up de retrait de vote
function showRemoveVotePopup(index) {
    selectedPlayerIndex = index;  // Enregistre l'indice du joueur pour lequel on veut retirer un vote
    document.getElementById("confirmPlayerName").innerText = joueurs[index];
    document.getElementById("removeVoteModal").style.display = "block";
    document.getElementById("popupOverlay").style.display = "block";
}

// Fonction pour retirer un vote
function removeVote() {
    if (selectedPlayerIndex !== null && votes[selectedPlayerIndex] > 0) {
        votes[selectedPlayerIndex]--;
        closeRemoveVoteModal();
        updateDisplay();  // Met à jour l'affichage des votes
    }
}

// Ferme la pop-up de retrait de vote
function closeRemoveVoteModal() {
    document.getElementById("removeVoteModal").style.display = "none";
    document.getElementById("popupOverlay").style.display = "none";
}

// Fonction pour afficher les résultats dans une pop-up
function showResults() {
    const resultsContainer = document.getElementById('resultsPopup');
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = "";

    joueurs.forEach((nom, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${nom}</strong>: ${votes[index]} votes`;
        resultsList.appendChild(li);
    });

    // Afficher la pop-up des résultats
    document.getElementById("popupOverlay").style.display = "block";
    resultsContainer.style.display = "block";
}

// Fonction pour afficher les résultats totaux
function showTotalResults() {
    const totalResultsContainer = document.getElementById('totalResultsPopup');
    const totalResultsList = document.getElementById('totalResultsList');
    totalResultsList.innerHTML = "";
    
    const totalVotes = votes.reduce((total, voteCount) => total + voteCount, 0); // Calcul des votes totaux
   
    // Trouver la personne avec le plus de votes
    const maxVotes = Math.max(...votes);
    const personWithMostVotesIndex = votes.indexOf(maxVotes);
    const personWithMostVotes = joueurs[personWithMostVotesIndex];

    totalResultsList.innerHTML = `<li>Total des votes : ${totalVotes}</li>`;
    totalResultsList.innerHTML += `<li>${personWithMostVotes}</strong> (${maxVotes} votes)</li>`;

    totalResultsContainer.style.display = "block";
    closeResults(); // Ferme la pop-up des résultats par joueur
}

// Ferme la pop-up des résultats par joueur
function closeResults() {
    document.getElementById('resultsPopup').style.display = "none";
}

// Ferme la pop-up des résultats totaux
function closeTotalResults() {
    document.getElementById('totalResultsPopup').style.display = "none";
    document.getElementById("popupOverlay").style.display = "none"; // Fermer l'overlay aussi
}

// Réinitialiser les votes
function resetVotes() {
    votes = new Array(joueurs.length).fill(0);
    const resultsContainer = document.getElementById('resultsPopup');
    resultsContainer.style.display = "none"; // Cache la section des résultats
}

// Ajout des événements pour les icônes
document.getElementById('showResultsIcon').addEventListener('click', showResults); // Afficher les résultats

// Réinitialisation des votes
document.getElementById('resetIcon').addEventListener('click', resetVotes);

// Fermer les pop-ups lorsque l'utilisateur clique sur l'overlay
document.getElementById("popupOverlay").addEventListener("click", function () {
    closePopup();
    closeResults();
    closeTotalResults();
    closeRemoveVoteModal();
});

// Appeler updateDisplay une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', updateDisplay);
