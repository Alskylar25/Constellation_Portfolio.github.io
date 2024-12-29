//Typing Effect
const typingText = document.querySelector(".typing-text");
const words = ["UI/UX Designer", "Creative Thinker", "Web Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    let displayText = currentWord.substring(0, charIndex);

    typingText.textContent = displayText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1000);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Select Elements
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active"); // Toggle menu visibility
    hamburger.classList.toggle("active"); // Animate hamburger to "X"
});

// Close menu when a navigation link is clicked
navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active"); // Hide menu
        hamburger.classList.remove("active"); // Reset hamburger icon
    });
});

const cosmicContainer = document.querySelector(".cosmic-background");

// Generate stars and particles
function generateCosmicElements(numberOfStars, numberOfParticles) {
    // Generate stars
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        // Randomize size, position, and animation duration
        const size = Math.random() * 2.5 + 0.5; // Sizes between 0.5px and 3px
        const duration = Math.random() * 5 + 3; // Animation duration between 3s and 8s
        const delay = Math.random() * 5; // Random delay

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s`;

        cosmicContainer.appendChild(star);
    }

    // Generate particles
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Randomize size, position, and animation duration
        const size = Math.random() * 4 + 2; // Sizes between 2px and 6px
        const duration = Math.random() * 10 + 5; // Animation duration between 5s and 15s
        const delay = Math.random() * 5; // Random delay

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animation = `drift ${duration}s infinite ${delay}s`;

        cosmicContainer.appendChild(particle);
    }
}

// Generate 30 stars and 10 particles
generateCosmicElements(30, 10);

// Spider Web Effect with Flickering Dots, and Glowing Lines
const banner = document.querySelector("header");
const canvas = document.getElementById("dotsCanvas");
const ctx = canvas.getContext("2d");

let dots = [];
const arrayColors = ["#00bcd4", "#03e9f4", "#00ffff", "#00d1b2", "#00a5b5"]; // Glowing colors
let mouseX = null, mouseY = null; // Store cursor position

// Set canvas size
function resizeCanvas() {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
}
resizeCanvas();

// Generate dots
function generateDots() {
    dots = [];
    for (let i = 0; i < 50; i++) { // Number of dots
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseSize: Math.random() * 3 + 2, // Base size
            flickerSpeed: Math.random() * 0.005 + 0.001, // Slow flicker speed
            flickerPhase: Math.random() * Math.PI * 2, // Random starting phase
            color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        });
    }
}
generateDots();

// Draw the dots with flicker effect and glow
function drawDots() {
    dots.forEach((dot) => {
        const flicker = Math.sin(Date.now() * dot.flickerSpeed + dot.flickerPhase) * 1; 
        const size = dot.baseSize + flicker;

        // Apply glow effect
        ctx.shadowBlur = 10; // Glow intensity
        ctx.shadowColor = dot.color;

        // Draw the dot
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Draw glowing lines to the cursor or touch position
function drawLines() {
    if (mouseX === null || mouseY === null) return; // Skip if no cursor/touch position

    dots.forEach((dot) => {
        const distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);

        if (distance < 200) { // Threshold for drawing lines
            ctx.lineWidth = 1.5; // Line thickness
            ctx.strokeStyle = dot.color;

            // Apply glow effect to the lines
            ctx.shadowBlur = 10;
            ctx.shadowColor = dot.color;

            // Draw the line
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
    });
}

// Animation loop: combine dots and lines
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.shadowBlur = 0; // Reset glow
    drawDots(); // Draw glowing, flickering dots
    drawLines(); // Draw glowing lines to the cursor or touch position
    requestAnimationFrame(animate); // Loop the animation
}

// Update mouse position
banner.addEventListener("mousemove", (event) => {
    mouseX = event.pageX - banner.getBoundingClientRect().left;
    mouseY = event.pageY - banner.getBoundingClientRect().top;
});

// Clear mouse position when cursor leaves the canvas
banner.addEventListener("mouseout", () => {
    mouseX = null;
    mouseY = null;
});

// Update touch position for mobile devices
banner.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    mouseX = touch.pageX - banner.getBoundingClientRect().left;
    mouseY = touch.pageY - banner.getBoundingClientRect().top;
});

// Clear touch position when the touch ends
banner.addEventListener("touchend", () => {
    mouseX = null;
    mouseY = null;
});

// Resize canvas and regenerate dots on window resize
window.addEventListener("resize", () => {
    resizeCanvas();
    generateDots();
});

// Start the animation
animate();

// Select both pupils
const pupils = document.querySelectorAll(".pupil");

// Function to move pupils randomly
function movePupils() {
    const maxMovement = 10; // Limit movement range (in percent)

    // Calculate random position within the range
    const randomTop = Math.random() * maxMovement - (maxMovement / 2); // -5% to 5%
    const randomLeft = Math.random() * maxMovement - (maxMovement / 2); // -5% to 5%

    // Apply movement to both pupils
    pupils.forEach(pupil => {
        pupil.style.top = `calc(50% + ${randomTop}%)`;
        pupil.style.left = `calc(50% + ${randomLeft}%)`;
    });
}

// Function to blink both pupils
function blinkPupils() {
    pupils.forEach(pupil => {
        pupil.parentElement.classList.add("blink");
        setTimeout(() => {
            pupil.parentElement.classList.remove("blink");
        }, 200); // Blink duration
    });
}

// Animate pupils: move and blink
function animateEyes() {
    movePupils(); // Move pupils
    if (Math.random() < 0.3) { // 30% chance to blink
        blinkPupils();
    }
}

// Run the animation every second
setInterval(animateEyes, 1000);


// Scroll Reveal Effect (Repeats on Scroll)
document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Stop observing once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 50% of the element is visible
        rootMargin: "0px 0px -10px 0px" // Add a small buffer at the bottom
    });

    hiddenElements.forEach((element) => observer.observe(element));
});

// Scroll Reveal Effect for Timeline Items
document.addEventListener("DOMContentLoaded", () => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    // We’ll keep the debounce-like delay, but remove the else part.
    let timeoutId;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Stop observing once it's visible
                    observer.unobserve(entry.target);
                }
            }, 100); // Delay class changes by 100ms to prevent flickering
        });
    }, {
        threshold: 0.3, // Trigger when 50% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Add a buffer zone to the bottom
    });

    timelineItems.forEach((item) => observer.observe(item));
});

// Select all elements with the class "autoBLur"
const blurElements = document.querySelectorAll('.autoBLur');

// Function to handle the blur-clear-blur effect on scroll
const handleScroll = () => {
    const viewportHeight = window.innerHeight; // Get the height of the viewport
    const centerY = viewportHeight / 2; // Calculate the vertical center of the viewport

    blurElements.forEach((element) => {
        const rect = element.getBoundingClientRect(); // Get the position of the element
        const elementCenterY = rect.top + rect.height / 2; // Calculate the center of the element

        // Calculate the distance between the element's center and the viewport's center
        const distanceFromCenter = Math.abs(centerY - elementCenterY);

        // If the element is close to the center, focus it
        if (distanceFromCenter < 100) {
            element.classList.add('focused');
        } else {
            element.classList.remove('focused');
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".background-shapes");
    const shapeTypes = ["circle", "square", "triangle"];
    const numberOfShapes = window.innerWidth < 768 ? 20 : 40; // Fewer shapes on mobile

    // Function to generate a random number within a range
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to create a shape element
    function createShape(container) {
        const shape = document.createElement("div");
        shape.classList.add("shape", shapeTypes[Math.floor(Math.random() * shapeTypes.length)]);

        // Random size for large and small shapes
        const size = Math.random() > 0.5 ? random(100, 200) : random(20, 50); // Large (100-200px) or small (20-50px)
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // Random position
        shape.style.top = `${random(0, 100)}%`;
        shape.style.left = `${random(0, 100)}%`;

        // Random animation duration
        const duration = random(15, 30); // Animation duration between 15s and 30s
        shape.style.animationDuration = `${duration}s`;

        // Random greyscale color
        const greyShade = Math.floor(random(50, 200)); // Shades between 50 and 200
        shape.style.backgroundColor = `rgb(${greyShade}, ${greyShade}, ${greyShade})`;

        container.appendChild(shape);
    }

    // Populate each background-shapes container
    containers.forEach(container => {
        for (let i = 0; i < numberOfShapes; i++) {
            createShape(container);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const meteorContainer = document.querySelector(".meteor-container");
    const starContainer = document.querySelector(".stars");

    // Function to create a single meteor
    function createMeteor() {
        const meteor = document.createElement("div");
        meteor.classList.add("meteor");

        // Set random starting position and animation duration
        meteor.style.left = Math.random() * 100 + "vw"; // Random horizontal position
        meteor.style.animationDuration = Math.random() * 2 + 2 + "s"; // Random duration between 2s and 4s

        // Append meteor to container
        meteorContainer.appendChild(meteor);

        // Remove meteor after animation ends
        setTimeout(() => {
            meteor.remove();
        }, 4000);
    }

    // Function to create twinkling stars
    function createStars() {
        for (let i = 0; i < 100; i++) { // Number of stars
            const star = document.createElement("div");
            star.classList.add("star");

            // Random position
            star.style.left = Math.random() * 100 + "vw";
            star.style.top = Math.random() * 100 + "vh";

            // Random animation duration
            star.style.animationDuration = Math.random() * 3 + 2 + "s";

            starContainer.appendChild(star);
        }
    }

    // Generate meteors at intervals
    setInterval(createMeteor, 300); // Create a meteor every 300ms

    // Generate stars once
    createStars();
});

// Attach the scroll event listener to the window
window.addEventListener('scroll', handleScroll);

// Back to Top Button Logic
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { // Show after scrolling 300px
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Smooth scroll to the top when the button is clicked
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Smooth scrolling
        });
    });
});

document.addEventListener("scroll", function () {
    const reveals = document.querySelectorAll(".quadrant.reveal");

    for (const reveal of reveals) {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150; // Adjust trigger point if needed

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    }
});

let lastTime = 0;

document.addEventListener("mousemove", function (e) {
    const now = Date.now();
    if (now - lastTime > 150) { // Limit to one ripple every 50ms
        lastTime = now;

        const ripple = document.createElement("div");
        ripple.classList.add("ripple");
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;

        document.body.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const softSkills = [
        "Time Management",
        "Critical Thinking",
        "Problem Solving",
        "Communication",
        "Teamwork",
        "Adaptability",
        "Creativity",
        "Attention to Details",
        "Willingness to Learn"
    ];

    const wordTrack = document.getElementById("word-track");

    // Function to create words with separators
    const createWords = (skills) => {
        skills.forEach((skill) => {
            const word = document.createElement("div");
            word.classList.add("word");
            word.textContent = skill; // Add the soft skill text
            wordTrack.appendChild(word);
        });
    };

    // Populate the slider with duplicated soft skills for infinite effect
    createWords(softSkills); // First set of words
    createWords(softSkills); // Duplicate set to ensure seamless looping
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    const modal = document.getElementById('carouselModal');
    const modalImage = document.getElementById('carouselModalImage');
    const modalTitle = document.getElementById('carouselModalTitle');
    const modalDescription = document.getElementById('carouselModalDescription');
    const modalStyle = document.getElementById('carouselModalStyle');
    const closeModal = document.querySelector('.carousel-modal-close');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideIntervalTime = 3000;
    let autoSlideInterval;
    let isThrottled = false;

    // Function to update the carousel position
    function updateCarousel() {
        const slideWidth = slides[0].clientWidth; // Dynamic width
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Function to go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    // Function to go to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Start automatic sliding (clear any existing intervals first)
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
        console.log('Auto-slide started'); // Debugging line
    }

    // Stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        console.log('Auto-slide stopped'); // Debugging line
    }

    // Throttle function to prevent rapid clicks
    function throttle(func, delay) {
        if (isThrottled) return;
        isThrottled = true;
        func();
        setTimeout(() => isThrottled = false, delay);
    }

    // Event listeners for carousel navigation buttons
    nextBtn.addEventListener('click', () => {
        throttle(() => {
            nextSlide();
            startAutoSlide(); // Restart auto-slide
        }, 500);
    });

    prevBtn.addEventListener('click', () => {
        throttle(() => {
            prevSlide();
            startAutoSlide(); // Restart auto-slide
        }, 500);
    });

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Open modal when a slide is clicked
    slides.forEach((slide) => {
        slide.addEventListener('click', () => {
            const imgSrc = slide.querySelector('img').getAttribute('src');
            const title = slide.querySelector('h3').innerText;
            const description = slide.querySelector('p:first-of-type').innerText;
            const style = slide.querySelector('.italize').innerText;

            // Set modal content
            modalImage.setAttribute('src', imgSrc);
            modalTitle.innerText = title;
            modalDescription.innerText = description;
            modalStyle.innerText = style;

            // Show modal
            modal.style.display = 'flex';
            stopAutoSlide(); // Stop auto-slide when modal is open
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        startAutoSlide(); // Resume auto-slide when modal is closed
    });

    // Close modal if clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            startAutoSlide();
        }
    });

    // Initialize carousel
    startAutoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("caseStudyModal");
    const modalBody = document.getElementById("caseStudyBody");
    const caseImage = document.getElementById("caseStudyImage");

    let currentImages = [];
    let currentIndex = 0;

    // Content for each case study
    const caseStudyContent = {
        case1: {
            text: `
                <h3>NPK Monitoring System For Hydroponics Farming</h3>
                <p>The study focuses on designing and implementing an IoT-based plant health monitoring system for hydroponics farming that integrates smart sensors for collecting environmental and plant health data then send it to the django database.</p>
                <br>
                <p>-------------------------</p>
                <p>The system's core functionalities include real-time monitoring of plant leaf color using an OV2460 camera sensor for object detection and surveillance. It measures the nutrient level using the EC sensor or TDS sensor, and pH sensor.</p>
                `,
            images: [
                "assets/images/case1-1.jpg",
                "assets/images/case1-2.jpg",
                "assets/images/case1-3.jpg",
            ],
        },
        case2: {
            text: `
                <h3>Fatima Clinic Web Design</h3>
                <p>The websystem design was made as a proposal for the Tacloban 2024 September exhibit.</p>
                <p>-------------------------</p>
                <p>The design is a modern, user-centric web solution crafted specifically to showcase the innovative healthcare services of Fatima Clinic. This web system was conceptualized and developed as a proposal for the highly anticipated Tacloban 2024 September Exhibit, highlighting the intersection of technology and healthcare in a post-pandemic world.</p>
                `,
            images: [
                "assets/images/case2-1.png",
                "assets/images/case2-2.png",
                "assets/images/case2-3.png",
            ],
        },
    };

    // Open Modal
    window.openCaseStudyModal = (caseID) => {
        const content = caseStudyContent[caseID];
        modalBody.innerHTML = content.text;
        currentImages = content.images;
        currentIndex = 0;
        updateCaseStudyImage();
        modal.classList.add("show");
    };

    // Update Image
    function updateCaseStudyImage() {
        caseImage.src = currentImages[currentIndex];
    }

    // Previous Image
    window.caseStudyPrevImage = () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateCaseStudyImage();
    };

    // Next Image
    window.caseStudyNextImage = () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateCaseStudyImage();
    };

    // Close Modal
    window.closeCaseStudyModal = () => {
        modal.classList.remove("show");
        currentImages = [];
        caseImage.src = "";
    };
    // Close modal when clicking outside the content
    caseStudyModal.addEventListener("click", (e) => {
        if (e.target === caseStudyModal) {
            closeCaseStudyModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const galleryModal = document.getElementById("galleryModal");
    const galleryImage = document.getElementById("galleryImage");

    let currentImages = []; // Holds the images for the current category
    let currentIndex = 0; // Tracks the current image index

    // Image sets for each category
    const galleries = {
        magazine: ["assets/images/magazine1.png", "assets/images/magazine2.png", "assets/images/magazine3.png"],
        book: ["assets/images/book1.png", "assets/images/book2.png", "assets/images/book3.png", "assets/images/book4.png"],
        logos: ["assets/images/logo1.png", "assets/images/logo.png", "assets/images/logo4.png", "assets/images/logo5.png"],
        brochures: ["assets/images/brochure1.png", "assets/images/brochure2.png", "assets/images/brochure3.png"],
    };

    // Open the gallery modal
    window.openGallery = (category) => {
        // Reset the currentImages array and index
        currentImages = galleries[category];
        currentIndex = 0;

        // Clear the image source briefly to prevent flashing
        galleryImage.src = "";
        galleryImage.style.opacity = 0;

        // Delay setting the new image source to allow for a smooth transition
        setTimeout(() => {
            updateGalleryImage(true);
            galleryModal.classList.add("show");
        }, 100); // Small delay to clear out the previous image
    };

    // Update the current gallery image
    function updateGalleryImage(initial = false) {
        if (!initial) {
            galleryImage.style.opacity = 0; // Start with the image hidden
        }

        setTimeout(() => {
            galleryImage.src = currentImages[currentIndex];
            galleryImage.style.opacity = 1; // Fade the image back in
        }, 300); // Delay for smooth fade-in
    }

    // Navigate to the previous image
    window.prevImage = () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateGalleryImage();
    };

    // Navigate to the next image
    window.nextImage = () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateGalleryImage();
    };

    // Close the gallery modal
    window.closeGallery = () => {
        galleryModal.classList.remove("show");

        // Clear the image source to prevent flash on reopening
        galleryImage.src = "";
        galleryImage.style.opacity = 0;
    };

    // Close modal when clicking outside the content
    galleryModal.addEventListener("click", (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });
});