const API_URL = "https://localhost:7097/api/Movies";

let editingMovieId = null; //melyik sor van szerkesztési módban
const currentYear = new Date().getFullYear(); 

// filmek lekérése, táblázat frissítése
async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const movies = await response.json();
        renderMovies(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// táblázat frissítése
function renderMovies(movies) {
    const moviesTable = document.querySelector("#movies-table tbody");
    moviesTable.innerHTML = "";

    movies.forEach((movie) => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", movie.id);

        if (editingMovieId === movie.id) {
            // szerkesztési mód
            row.innerHTML = `
                <td><input type="text" value="${movie.title}" class="form-control" data-field="title"></td>
                <td><input type="text" value="${movie.director}" class="form-control" data-field="director"></td>
                <td><input type="text" value="${movie.genre}" class="form-control" data-field="genre"></td>
                <td><input type="number" value="${movie.releaseYear}" class="form-control" data-field="releaseYear"></td>
                <td><input type="number" value="${movie.rating}" class="form-control" step="0.1" data-field="rating"></td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="saveMovie(${movie.id})">Mentés</button>
                    <button class="btn btn-secondary btn-sm" onclick="cancelEdit()">Mégse</button>
                </td>
            `;
        } else {
            // normál mód
            row.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.director}</td>
                <td>${movie.genre}</td>
                <td>${movie.releaseYear}</td>
                <td>${movie.rating}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editMovie(${movie.id})">Szerkesztés</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Törlés</button>
                </td>
            `;
        }

        moviesTable.appendChild(row);
    });
}




// szerkesztési mód aktiválás
function editMovie(id) {
    editingMovieId = id;
    fetchMovies();
}

// szerkesztési mód megszakítás
function cancelEdit() {
    editingMovieId = null;
    fetchMovies();
}

//film mentése
async function saveMovie(id) {
    const inputs = document.querySelectorAll(`tr[data-id="${id}"] input[data-field]`);
    const updatedMovie = {};
    let isValid = true;

    // adatok ellenőrzése
    inputs.forEach((input) => {
        const field = input.dataset.field;
        const value = input.value;

        // kiadás éve
        if (field === "releaseYear") {
            const releaseYear = parseInt(value);
            if (!releaseYear || releaseYear < 1900 || releaseYear > currentYear) {
                alert(`Kérlek, adj meg egy valós évet 1900 és ${currentYear} között.`);
                isValid = false;
            } else {
                updatedMovie[field] = releaseYear;
            }
        }
        // értékelés
        else if (field === "rating") {
            const rating = parseFloat(value);
            if (!rating || rating < 1 || rating > 10) {
                alert("Kérlek, adj meg egy értékelést 1 és 10 között.");
                isValid = false;
            } else {
                updatedMovie[field] = rating;
            }
        } else {
            updatedMovie[field] = value;
        }
    });

    // csak akkor folytatódik ha az adatok érvényesek
    if (!isValid) return;

    updatedMovie.id = id; // ID hozzáadása az objektumhoz

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }

        editingMovieId = null; // kilépés a szerkesztési módból
        fetchMovies(); // Táblázat frissítése
    } catch (error) {
        console.error("Hiba a film mentésekor:", error);
    }
}
    // film törlése
async function deleteMovie(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`HTTP hiba! Státusz: ${response.status}`);
        }

        fetchMovies();
    } catch (error) {
        console.error("Hiba a film törlésekor:", error);
        alert("Hiba történt a film törlése közben. Próbáld újra!");
    }
}



// hozzáadás ellenőrzése
function validateForm() {
    const releaseYearInput = document.getElementById("releaseYear");
    const ratingInput = document.getElementById("rating");
    const saveButton = document.getElementById("save-movie");

    const releaseYearError = document.getElementById("releaseYear-error");
    const ratingError = document.getElementById("rating-error");

    let isValid = true;

    // kiadás éve
    const releaseYear = parseInt(releaseYearInput.value);
    if (!releaseYear || releaseYear < 1900 || releaseYear > currentYear) {
        releaseYearError.textContent = `Kérlek, adj meg egy valós évet 1900 és ${currentYear} között.`;
        isValid = false;
    } else {
        releaseYearError.textContent = "";
    }

    // értékelés
    const rating = parseFloat(ratingInput.value);
    if (!rating || rating < 1 || rating > 10) {
        ratingError.textContent = "Kérlek, adj meg egy értékelést 1 és 10 között.";
        isValid = false;
    } else {
        ratingError.textContent = "";
    }

    // mentés gomb engedélyezése/tiltása
    saveButton.disabled = !isValid;
}


//film hozzáadása
document.querySelector("#add-movie-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newMovie = {
        title: document.querySelector("#title").value,
        director: document.querySelector("#director").value,
        genre: document.querySelector("#genre").value,
        releaseYear: parseInt(document.querySelector("#releaseYear").value),
        rating: parseFloat(document.querySelector("#rating").value),
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        fetchMovies(); 
        document.querySelector("#add-movie-form").reset();
        document.getElementById("add-movie-container").classList.add("hidden");
    } catch (error) {
        console.error("Error adding movie:", error);
    }
});

// eseményfigyelők az űrlaphoz
document.getElementById("releaseYear").addEventListener("input", validateForm);
document.getElementById("rating").addEventListener("input", validateForm);

//megjelenítés/elrejtés
document.getElementById("show-add-form").addEventListener("click", () => {
    document.getElementById("add-movie-container").classList.remove("hidden");
});

document.getElementById("cancel-add").addEventListener("click", () => {
    document.getElementById("add-movie-container").classList.add("hidden");
});

//filmek lekérése induláskor
fetchMovies();
