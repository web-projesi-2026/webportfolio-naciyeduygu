// Hamburger Menü Kontrolü
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function toggleMenu() {
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
}

// Tema Kontrolü
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);

    updateThemeIcon();
}

function updateThemeIcon() {
    const themeBtn = document.getElementById("theme-toggle-btn");

    if (themeBtn) {
        const theme = document.documentElement.getAttribute("data-theme");
        themeBtn.innerHTML = theme === "light"
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// Yukarı Çık Butonu
const backToTopBtn = document.getElementById("back-to-top");

window.onscroll = function () {
    if (!backToTopBtn) return;

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Modal Yönetimi
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.toggle("active");

        if (modalId === "cart-modal") {
            renderCart();
        }
    }
}

// Modal dışına tıklanınca kapat
window.addEventListener("click", function (e) {
    const modals = document.querySelectorAll(".modal");

    modals.forEach(function (modal) {
        if (modal.classList.contains("active") && e.target === modal) {
            modal.classList.remove("active");
        }
    });
});

// Kitap Verileri
const books = [
    {
        id: 1,
        title: "Kuyucaklı Yusuf",
        author: "Sabahattin Ali",
        category: "Türk Klasikleri",
        price: 45,
        img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
    },
    {
        id: 2,
        title: "Suç ve Ceza",
        author: "Dostoyevski",
        category: "Dünya Klasikleri",
        price: 65,
        img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500"
    },
    {
        id: 3,
        title: "Çalıkuşu",
        author: "Reşat Nuri Güntekin",
        category: "Roman",
        price: 50,
        img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500"
    },
    {
        id: 4,
        title: "Küçük Prens",
        author: "Antoine de Saint-Exupéry",
        category: "Dünya Klasikleri",
        price: 35,
        img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500"
    },
    {
        id: 5,
        title: "Otuz Beş Yaş",
        author: "Cahit Sıtkı Tarancı",
        category: "Şiir",
        price: 40,
        img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500"
    },
    {
        id: 6,
        title: "Tutunamayanlar",
        author: "Oğuz Atay",
        category: "Roman",
        price: 95,
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500"
    }
];

// Sepet Sistemi
let cart = JSON.parse(localStorage.getItem("cici-cart")) || [];

function saveCart() {
    localStorage.setItem("cici-cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }

    saveCart();
}

function addToCart(id) {
    const book = books.find(function (item) {
        return item.id === id;
    });

    if (!book) return;

    cart.push(book);
    updateCartUI();
    renderCart();

    alert(book.title + " sepete eklendi! 🐾");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");

    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Sepetiniz henüz boş. 🐾</p>";
        if (cartTotal) cartTotal.innerText = "0 TL";
        return;
    }

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(function (item, index) {
        total += item.price;

        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.author}</p>
                    <strong>${item.price} TL</strong>
                </div>
                <button onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.innerText = total + " TL";
    }
}

// Kitapları Ekrana Basma
function renderBooks(targetId, bookList) {
    const grid = document.getElementById(targetId);

    if (!grid) return;

    grid.innerHTML = "";

    bookList.forEach(function (book) {
        grid.innerHTML += `
            <div class="book-card">
                <img src="${book.img}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-category">${book.category}</p>
                <strong>${book.price} TL</strong>
                <button class="btn btn-primary" onclick="addToCart(${book.id})">
                    Sepete Ekle
                </button>
            </div>
        `;
    });
}

// Arama ve Filtreleme
function filterBooks() {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");

    let filteredBooks = books;

    if (searchInput && searchInput.value.trim() !== "") {
        const searchText = searchInput.value.toLowerCase();

        filteredBooks = filteredBooks.filter(function (book) {
            return book.title.toLowerCase().includes(searchText) ||
                   book.author.toLowerCase().includes(searchText);
        });
    }

    if (categorySelect && categorySelect.value !== "Hepsi") {
        filteredBooks = filteredBooks.filter(function (book) {
            return book.category === categorySelect.value;
        });
    }

    renderBooks("book-list", filteredBooks);
}

// Demo Login
function loginDemo() {
    const email = document.getElementById("login-email");

    if (email) {
        localStorage.setItem("cici-user", email.value);
    }

    alert("Giriş başarılı! 🐾");
    toggleModal("login-modal");
}

// Kargo Takip Demo
function checkCargo() {
    const cargoCode = document.getElementById("cargo-code");
    const cargoResult = document.getElementById("cargo-result");

    if (!cargoCode || !cargoResult) return;

    if (cargoCode.value.trim().toUpperCase() === "CICI2026") {
        cargoResult.innerHTML = "🐾 Kargonuz dağıtıma çıktı.";
    } else if (cargoCode.value.trim() === "") {
        cargoResult.innerHTML = "Lütfen takip numarası giriniz.";
    } else {
        cargoResult.innerHTML = "Takip numarası bulunamadı.";
    }
}

// Sayfa Yüklenince
window.addEventListener("DOMContentLoaded", function () {
    updateThemeIcon();
    updateCartUI();
    renderCart();

    renderBooks("featured-books", books.slice(0, 4));
    renderBooks("book-list", books);

    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");

    if (searchInput) {
        searchInput.addEventListener("input", filterBooks);
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", filterBooks);
    }
});
