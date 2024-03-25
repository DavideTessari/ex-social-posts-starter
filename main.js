const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Descrizione:
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script 
// JS in cui:

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, 
// stampiamo i post del nostro feed.

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo 
// del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback 
// che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato 
// dobbiamo decrementare il contatore e cambiare il colore del bottone.

// Consigli del giorno:
// Ragioniamo come sempre a step.
// Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
// console.log() è nostro amico.
// Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo 
// in funzioni più piccole.
// In allegato trovate lo starter pack da utilizzare come base sulla quale elaborare 
// il javascript.

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");

    // Funzione per generare un singolo post
    function generatePost(post) {
        // Creazione del post element
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Header del post (autore e tempo)
        const postHeader = document.createElement("div");
        postHeader.classList.add("post__header");

        // Creazione del contenuto del post header
        postHeader.innerHTML = `
            <div class="post-meta">
                <div class="post-meta__icon">
                    ${post.author.image ? `<img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">` : `<div class="profile-pic-default">${getInitials(post.author.name)}</div>`}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${formatDate(post.created)}</div>
                </div>
            </div>
        `;

        // Testo del post
        const postText = document.createElement("div");
        postText.classList.add("post__text");
        postText.textContent = post.content;

        // Immagine del post
        const postImage = document.createElement("div");
        postImage.classList.add("post__image");
        postImage.innerHTML = `<img src="${post.media}" alt="">`;

        // Footer del post (contatore Mi Piace e pulsante Mi Piace)
        const postFooter = document.createElement("div");
        postFooter.classList.add("post__footer");

        // Creazione del contenuto del post footer
        postFooter.innerHTML = `
            <div class="likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone</div>
            </div>
        `;

        // Aggiunta degli elementi al post
        postElement.appendChild(postHeader);
        postElement.appendChild(postText);
        postElement.appendChild(postImage);
        postElement.appendChild(postFooter);

        // Aggiunta del post al contenitore principale
        container.appendChild(postElement);

        // Gestione del click sul pulsante "Mi Piace" specifico per questo post
        const likeButton = postFooter.querySelector(".js-like-button");
        const likeCounter = postFooter.querySelector(`#like-counter-${post.id}`);

        likeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const isLiked = likeButton.classList.toggle("like-button--liked");
            const increment = isLiked ? 1 : -1;
            const currentLikes = parseInt(likeCounter.textContent);
            likeCounter.textContent = currentLikes + increment;
        });
    }

    // Funzione per ottenere le iniziali di un nome
    function getInitials(name) {
        const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
        return initials.length > 1 ? initials.slice(0, 2) : initials;
    }

    // Funzione per formattare la data nel formato italiano (gg/mm/aaaa)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Genera i post nel feed
    posts.forEach(generatePost);
});


