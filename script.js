document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 2. Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    if (navLinks) {
        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 3. Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('checkbox');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            document.body.classList.add(currentTheme);
            if (currentTheme === 'dark-mode') {
                themeToggle.checked = true;
            }
        }

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // --- 4. Fade-in Animation on Scroll ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 5. Testimonials Swiper Carousel ---
    if (document.querySelector('.testimonials-slider')) {
        const swiper = new Swiper('.testimonials-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // --- 6. Booking Form Validation & Modal ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        const bookingModal = document.getElementById('booking-modal');
        const closeBookingModal = document.getElementById('close-booking-modal');

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            // Simple validation check
            if (bookingForm.checkValidity()) {
                bookingModal.style.display = 'flex';
                bookingForm.reset();
            } else {
                // You could add more specific error messages here
                alert('Please fill out all required fields correctly.');
            }
        });

        closeBookingModal.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
    }

    // --- 7. Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightboxModal = document.getElementById('close-lightbox-modal');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxModal.style.display = 'flex';
                lightboxImg.src = item.src;
            });
        });

        closeLightboxModal.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
        });
    }

    // --- 8. Destination Details Modal ---
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    if (viewDetailsButtons.length > 0) {
        const destinationDetails = {
            cebu: {
                title: 'Cebu, Philippines',
                img: 'images/sea2.jpg',
                description: 'Dive into the crystal-clear waters of Cebu! Witness the spectacular sardine run in Moalboal, where millions of fish move as one. Get a chance to swim alongside gentle whale sharks in Oslob and explore vibrant coral gardens teeming with life. Cebu is a perfect mix of thrilling large animal encounters and beautiful reef diving.'
            },
            palawan: {
                title: 'Palawan, Philippines',
                img: 'images/sea3.jpg',
                description: 'Discover the last frontier of the Philippines in Palawan. Explore the sunken Japanese warships of Coron Bay, a world-class wreck diving destination. For the more adventurous, the Tubbataha Reefs Natural Park, a UNESCO World Heritage site, offers pristine coral reefs and an incredible density of marine species, from sharks to turtles and rays.'
            },
            anilao: {
                title: 'Anilao, Philippines',
                img: 'images/sea4.jpg',
                description: 'Welcome to the macro photography capital of the world! Anilao is a critter-lover\'s paradise. Its volcanic sand is home to some of the ocean\'s most bizarre and wonderful creatures. Search for rare nudibranchs, frogfish, octopus, and countless other tiny marvels. It\'s a must-visit for underwater photographers and anyone who loves the small wonders of the sea.'
            },
            bohol: {
                title: 'Bohol, Philippines',
                img: 'images/gallery-4.jpg',
                description: 'Bohol is famous for the stunning coral walls of Balicasag Island, a marine sanctuary with incredible vertical drop-offs. Expect to see large schools of jackfish, barracudas, and a healthy population of sea turtles.'
            },
            apo: {
                title: 'Apo Island, Philippines',
                img: 'images/gallery-1.jpg',
                description: 'As a community-managed protected marine sanctuary, Apo Island is a shining example of conservation success. The reefs are teeming with life, and it\'s one of the best places in the world to swim with numerous sea turtles in their natural habitat.'
            },
            malapascua: {
                title: 'Malapascua, Philippines',
                img: 'images/gallery-6.jpg',
                description: 'Malapascua is a world-famous destination for one primary reason: the elusive thresher shark. Daily dawn dives to Monad Shoal offer a unique opportunity to see these graceful sharks at their cleaning stations. The island also offers great macro and wreck diving.'
            }
        };

        const destinationModal = document.getElementById('destination-modal');
        const closeDestinationModal = document.getElementById('close-destination-modal');
        const destModalImg = document.getElementById('destination-modal-img');
        const destModalTitle = document.getElementById('destination-modal-title');
        const destModalDescription = document.getElementById('destination-modal-description');
        const destModalBookBtn = document.getElementById('destination-modal-book-btn');

        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const destinationId = this.dataset.destination;
                const details = destinationDetails[destinationId];

                if (details) {
                    destModalImg.src = details.img;
                    destModalTitle.textContent = details.title;
                    destModalDescription.textContent = details.description;
                    destinationModal.style.display = 'flex';
                }
            });
        });

        const closeAndResetModal = () => {
            destinationModal.style.display = 'none';
        };

        closeDestinationModal.addEventListener('click', closeAndResetModal);
        destModalBookBtn.addEventListener('click', closeAndResetModal);
    }

    // --- 9. Chatbot Logic ---
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-chatbot");
    const chatContainer = document.querySelector(".chatbot-container");
    const chatInput = document.querySelector(".chat-input input");
    const sendChatBtn = document.getElementById("send-chat-btn");
    const chatLog = document.querySelector(".chat-log");

    const createChatMessage = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat-message", className);
        // Add a bot icon for bot messages
        let chatContent = (className === "bot")
            ? `<span class="bot-icon"><i class="fas fa-robot"></i></span><p>${message}</p>`
            : `<p>${message}</p>`;

        chatLi.innerHTML = chatContent;
        return chatLi;
    }

    const generateResponse = (userMessage) => {
        const message = userMessage.toLowerCase();
        let response = "I'm sorry, I don't understand that. You can ask me about packages, booking, our team, or how to contact us.";

        if (message.includes("hello") || message.includes("hi")) {
            response = "Hello there! How can I assist you with your diving adventure today?";
        } else if (message.includes("package") || message.includes("destination") || message.includes("trip")) {
            response = 'We have amazing dive packages for Cebu, Palawan, Anilao, and more! You can see them all on our <a href="packages.html">Packages Page</a>.';
        } else if (message.includes("book") || message.includes("booking")) {
            response = 'You can book your adventure on our <a href="booking.html">Booking Page</a>. Just fill out the form, and we\'ll get back to you!';
        } else if (message.includes("team") || message.includes("instructor")) {
            response = 'Meet our passionate and certified team on the <a href="team.html">Our Team Page</a>.';
        } else if (message.includes("contact") || message.includes("email") || message.includes("phone")) {
            response = 'You can find our contact details, a contact form, and our location on the <a href="index.html#contact">Contact Section</a>.';
        } else if (message.includes("thank")) {
            response = "You're welcome! Is there anything else I can help you with?";
        }

        const botMessage = createChatMessage(response, "bot");
        chatLog.appendChild(botMessage);
        chatLog.scrollTo(0, chatLog.scrollHeight);
    }

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatInput.value = "";
        chatLog.appendChild(createChatMessage(userMessage, "user"));
        chatLog.scrollTo(0, chatLog.scrollHeight);

        setTimeout(() => {
            generateResponse(userMessage);
        }, 600);
    }

    if (chatbotToggler) {
        sendChatBtn.addEventListener("click", handleChat);
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleChat();
            }
        });
        chatbotToggler.addEventListener("click", () => chatContainer.classList.toggle("active"));
        closeBtn.addEventListener("click", () => chatContainer.classList.remove("active"));
    }

    // --- 10. General Event Listeners (like closing modals) ---
    window.addEventListener('click', (e) => {
        const bookingModal = document.getElementById('booking-modal');
        const lightboxModal = document.getElementById('lightbox-modal');
        const destinationModal = document.getElementById('destination-modal');

        if (bookingModal && e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (lightboxModal && e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
        if (destinationModal && e.target === destinationModal) {
            destinationModal.style.display = 'none';
        }
    });
});
