// Configura tu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXrhhM4QlP56nEKYiaa5DumQL0iAF4LLw",
    authDomain: foro-"hypermemetico.firebaseapp.com",
    projectId: "foro-hypermemetico",
    storageBucket: "foro-hypermemetico.appspot.com",
    messagingSenderId: "47951992575",
    appId: "1:47951992575:web:7372df444776b64a63deca"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

let commentThreads = [];

function checkPassword() {
    const password = document.getElementById("password").value;
    if (password === "COMUNISMOACIDO") {
        document.querySelector(".password-screen").style.display = "none";
        document.querySelector(".forum").style display = "block";
    } else {
        document.getElementById("error-message").textContent = "Incorrect password. Try again.";
    }
}

function addComment(button) {
    const nameInput = button.previousElementSibling.previousElementSibling;
    const commentInput = nameInput.nextElementSibling;
    const name = nameInput.value;
    const commentText = commentInput.value;

    if (name && commentText) {
        // Conecta con la base de datos de Firestore y agrega el comentario
        const db = firebase.firestore();
        const commentsRef = db.collection("comments");

        commentsRef.add({
            name: name,
            text: commentText
        })
        .then(function(docRef) {
            console.log("Comentario agregado con ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error al agregar comentario: ", error);
        });

        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.innerHTML = `<strong>${name}:</strong> ${commentText}
                                <input type="text" class="name-input dark-background" placeholder="Your Name">
                                <input type="text" class="comment-input dark-background" placeholder="Leave a comment">
                                <button class="comment-submit subtle-button" onclick="addComment(this)">Comment</button>`;
        commentInput.value = "";
        nameInput.value = "";

        // Determine the context for the comment (original post or a reply)
        const parentComment = button.closest(".comment");
        if (parentComment) {
            parentComment.appendChild(commentDiv);
        } else {
            document.querySelector(".comments").appendChild(commentDiv);
        }
    }
}