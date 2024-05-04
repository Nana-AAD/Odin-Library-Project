class Book {
    constructor(title, author, numberOfPages, isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }
}

// Function to set event listeners
function setEventListeners() {
    const addBookBtn = document.getElementById("addBookBtn");

    addBookBtn.addEventListener("click", function() {
        const modal = document.getElementById("modal-form");
        modal.showModal();
    });

    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", function() {
        const modal = document.getElementById("modal-form");
        modal.close();
    });

    const form = document.getElementById("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const newBookTitle = e.target.elements["title"].value;
        const newBookAuthor = e.target.elements["author"].value;
        const newBookPages = e.target.elements["pages"].value;
        const newBookIsRead = e.target.elements["read"].checked;

        libraryManager.addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookIsRead);

        // Reset the form
        e.target.reset();

        // Close the modal
        const modal = document.getElementById("modal-form");
        modal.close();
    });
}

const libraryManager = {
    library: [],

    // Function to add a book to the library
    addBookToLibrary: function(title, author, numOfPages, isRead) {
        this.library.push(new Book(title, author, numOfPages, isRead));
        this.render();
    },
    // Function to toggle the read status of a book
    toggleReadBook: function(index) {
        this.library[index].isRead = !this.library[index].isRead;
        this.render();
    },

    // Function to remove a book from the library
    removeBook: function(index) {
        this.library.splice(index, 1);
        this.render();
    },

    // Function to render the library
    render: function() {
        const table = document.getElementById("table");
        table.innerHTML = ""; // Clear existing content

        // Loop through each book in the library and create a table row for it
        this.library.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = 
            `<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.numberOfPages}</td>
            <td class="read-status">${book.isRead ? "Read" : "Not Read"}</td>
            <td><button class="toggle-read-btn" data-index="${index}">${book.isRead ? "Mark Unread" : "Mark Read"}</button></td>
            <td><button class="remove-btn" data-index="${index}">Remove</button></td>`;

            table.appendChild(row);
        });

        // Attach event listeners
        const toggleReadButtons = document.querySelectorAll(".toggle-read-btn");
        toggleReadButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const {index} = e.target.dataset;
                this.toggleReadBook(index);
            });
        });

        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const {index} = e.target.dataset;
                this.removeBook(index);
            });
        });
    }
};

// Initial books in the library
libraryManager.addBookToLibrary("The Sorcerer's Stonehenge", "Rowling Stones", 336, false);
libraryManager.addBookToLibrary("The Fellowship of the Bling", "J. R. R. Token", 527, false);
libraryManager.addBookToLibrary("A Game of Groans", "George R. R. Martian", 694, false);
libraryManager.addBookToLibrary("The Lion, the Witch, and the Wardrobe Malfunction", "C.S. Flew-Is", 208, false);
libraryManager.addBookToLibrary("The Hobbit: There and Backpack Again", "J.R.R. Tugboat", 304, false);
libraryManager.addBookToLibrary("Percy Jackhammer and the Lightning Thief", "Riot Riordan", 377, false);
libraryManager.addBookToLibrary("The Chronicles of Narnia: The Lion, the Twitch, and the Audible Wardrobe", "C.S. Mouse", 767, false);
libraryManager.addBookToLibrary("The Hitchhiker's Guide to the Gag-alaxy", "Douglas Fart-Adams", 215, false);
libraryManager.addBookToLibrary("Alice's Restaurant in Wonderland", "Lewis Carol King", 365, false);
libraryManager.addBookToLibrary("A Clash of Canapes", "George R. R. Martini", 874, false);

setEventListeners(); // Call the function to set event listeners for the "Add book" button
libraryManager.render(); // Render the initial library
