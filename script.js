document.addEventListener('DOMContentLoaded', function() {



    // === Mobile Navbar (Hamburger Menu) ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link'); // Get all nav links

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('nav-active');
            // Toggle body scroll
            document.body.classList.toggle('no-scroll', navMenu.classList.contains('nav-active'));
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('nav-active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // === Sticky Navbar Background Change on Scroll (Optional) ===
    // (এই কোডটি আগের উত্তরে ছিল, যদি ফিক্সড Navbar এর সাথে স্ক্রলে ব্যাকগ্রাউন্ড পরিবর্তন করতে চান)
    const header = document.querySelector('.header');
    if (header && header.classList.contains('fixed-navbar')) { // শুধুমাত্র ফিক্সড Navbar এর জন্য
        function changeNavOnScroll() {
            if (window.scrollY > 30) { // অল্প স্ক্রল করলেই পরিবর্তন
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', changeNavOnScroll);
        changeNavOnScroll(); // Initial check
    }


    // === Optional: Navbar background change on scroll (if fixed) ===
    const siteHeader = document.querySelector('.site-header.fixed-navbar');
    if (siteHeader) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;
        window.addEventListener('scroll', () => {
            if (window.scrollY > navHeight / 2) { // Change when scrolled more than half of navbar height
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }


    // আপনার অন্যান্য JavaScript কোড এখানে আসবে (Hero slider, gallery, etc.)



    // === Hero Section Slider ===
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    const heroDotsContainer = document.querySelector('.hero-section .hero-dots-container');
    let currentHeroSlideIndex = 0;
    const heroSlideIntervalTime = 5000; // স্লাইড পরিবর্তনের সময় (5 seconds)
    let heroAutoSlideInterval;

    if (heroSlides.length > 0 && heroDotsContainer) {
        // Create dots
        heroSlides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToHeroSlide(index);
                resetHeroAutoSlide(); // Reset timer on manual navigation
            });
            heroDotsContainer.appendChild(dot);
        });

        const heroDots = heroDotsContainer.querySelectorAll('.hero-dot');

        function goToHeroSlide(slideNumber) {
            if (slideNumber === currentHeroSlideIndex && heroSlides[slideNumber].classList.contains('active')) {
                return; // Do nothing if already on the active slide
            }

            heroSlides[currentHeroSlideIndex].classList.remove('active');
            heroDots[currentHeroSlideIndex].classList.remove('active');

            currentHeroSlideIndex = slideNumber;

            heroSlides[currentHeroSlideIndex].classList.add('active');
            heroDots[currentHeroSlideIndex].classList.add('active');
        }

        function nextHeroSlide() {
            let nextIndex = (currentHeroSlideIndex + 1) % heroSlides.length;
            goToHeroSlide(nextIndex);
        }

        function startHeroAutoSlide() {
            // Clear any existing interval before starting a new one
            clearInterval(heroAutoSlideInterval);
            if (heroSlides.length > 1) { // Only auto-slide if there's more than one slide
                 heroAutoSlideInterval = setInterval(nextHeroSlide, heroSlideIntervalTime);
            }
        }

        function resetHeroAutoSlide() {
            startHeroAutoSlide();
        }

        // Show the first slide initially
        goToHeroSlide(0);
        // Start auto-sliding
        startHeroAutoSlide();

    } else {
        if (heroSlides.length === 0) console.warn('Hero slides not found.');
        if (!heroDotsContainer) console.warn('Hero dots container not found.');
    }

    // === Gallery Slider ===
    const galleryWrapper = document.querySelector('.gallery-slider-wrapper');
    if (galleryWrapper) {
        const slidesContainer = galleryWrapper.querySelector('.gallery-slides-container');
        const slideItems = galleryWrapper.querySelectorAll('.gallery-slide-item');
        const prevBtn = galleryWrapper.querySelector('.prev-btn');
        const nextBtn = galleryWrapper.querySelector('.next-btn');
        const dotsNavContainer = galleryWrapper.querySelector('.gallery-dots-nav');

        let currentGallerySlideIndex = 0;
        const totalGallerySlides = slideItems.length;

        function updateGallerySlider() {
            slidesContainer.style.transform = `translateX(-${currentGallerySlideIndex * 100}%)`;
        }

        function goToGallerySlide(index) {
            if (index < 0) {
                currentGallerySlideIndex = totalGallerySlides - 1;
            } else if (index >= totalGallerySlides) {
                currentGallerySlideIndex = 0;
            } else {
                currentGallerySlideIndex = index;
            }
            updateGallerySlider();
        }

        // Create Dots
        if (dotsNavContainer && totalGallerySlides > 0) {
            for (let i = 0; i < totalGallerySlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('gallery-dot-indicator');
                dot.addEventListener('click', () => {
                    goToGallerySlide(i);
                });
                dotsNavContainer.appendChild(dot);
            }
        }

        // Event Listeners for Nav Buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToGallerySlide(currentGallerySlideIndex - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToGallerySlide(currentGallerySlideIndex + 1);
            });
        }

        // Initialize slider
        if (totalGallerySlides > 0) {
            slideItems[0].classList.add('visible'); // Make first slide visible (if using opacity/visibility based slider)
                                                  // For translateX based, this might not be needed.
            updateGallerySlider(); // Set initial position and active dot
        } else {
            // Hide controls if no slides
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            if(dotsNavContainer) dotsNavContainer.style.display = 'none';
        }
    } else {
        // console.warn('Gallery slider wrapper not found.');
    }



   // === Contact Form Submission (Basic Client-Side Handling) ===
    const contactForm = document.getElementById('mainContactForm');
    const formStatusMessage = document.getElementById('form-status-message');

    if (contactForm && formStatusMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission for this demo

            // Basic validation (HTML5 'required' attribute already handles this)
            // You can add more complex validation here if needed

            // Simulate form submission
            formStatusMessage.textContent = 'বার্তা পাঠানো হচ্ছে...';
            formStatusMessage.className = 'form-status'; // Reset classes
            formStatusMessage.style.display = 'block';


            // Simulate a delay for "sending"
            setTimeout(() => {
                // Simulate success or error randomly for demo
                const isSuccess = Math.random() > 0.3; // 70% chance of success

                if (isSuccess) {
                    formStatusMessage.textContent = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।';
                    formStatusMessage.classList.add('success');
                    contactForm.reset(); // Clear the form fields
                } else {
                    formStatusMessage.textContent = 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা সরাসরি আমাদের ইমেইল করুন।';
                    formStatusMessage.classList.add('error');
                }

                 // Hide status message after a few seconds
                setTimeout(() => {
                    formStatusMessage.style.display = 'none';
                    formStatusMessage.className = 'form-status'; // Reset classes
                }, 7000);


            }, 1500); // 1.5 seconds delay
        });
    }




    // === Footer Current Year ===
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    
    // === Teacher Detail Modal Logic ===
    const teacherProfileCards = document.querySelectorAll('.teacher-profile-card');
    const modalOverlay = document.getElementById('teacherDetailModalOverlay');
    const modalContainer = document.getElementById('teacherDetailModalContainer');
    const modalCloseButton = document.getElementById('teacherModalCloseBtn');
    
    // Modal Content Elements
    const modalImage = document.getElementById('modalProfileImage');
    const modalName = document.getElementById('modalProfileName');
    const modalDesignation = document.getElementById('modalProfileDesignation');
    const modalQualification = document.getElementById('modalProfileQualification');
    const modalJoining = document.getElementById('modalProfileJoining');
    const modalSubjects = document.getElementById('modalProfileSubjects');
    const modalExperience = document.getElementById('modalProfileExperience');
    const modalBio = document.getElementById('modalProfileBio');
    
    const modalEmailWrapper = document.getElementById('modalContactEmailWrapper');
    const modalEmailLink = document.getElementById('modalContactEmailLink');
    const modalPhoneWrapper = document.getElementById('modalContactPhoneWrapper');
    const modalPhone = document.getElementById('modalContactPhone');
    const modalLinkedInWrapper = document.getElementById('modalContactLinkedInWrapper');
    const modalLinkedInLink = document.getElementById('modalContactLinkedInLink');

    if (teacherProfileCards.length > 0 && modalOverlay && modalCloseButton) {
        teacherProfileCards.forEach(card => {
            card.addEventListener('click', function() {
                // Populate modal with data from the clicked card's data attributes
                modalImage.src = this.dataset.image || 'images/default-teacher.png';
                modalImage.alt = this.dataset.name || 'শিক্ষকের ছবি';
                
                modalName.textContent = this.dataset.name || 'N/A';
                modalDesignation.textContent = this.dataset.designation || 'N/A';
                modalQualification.textContent = this.dataset.qualification || 'N/A';
                
                modalJoining.textContent = this.dataset.joining || 'N/A';
                modalSubjects.textContent = this.dataset.subjects || 'N/A';
                modalExperience.textContent = this.dataset.experience || 'N/A';
                modalBio.innerHTML = this.dataset.bio ? this.dataset.bio.replace(/\n/g, '<br>') : 'কোনো তথ্য পাওয়া যায়নি।'; // Handle newlines in bio

                // Email
                const email = this.dataset.email;
                if (email) {
                    modalEmailLink.href = `mailto:${email}`;
                    modalEmailLink.textContent = email;
                    modalEmailWrapper.style.display = 'block';
                } else {
                    modalEmailWrapper.style.display = 'none';
                }

                // Phone
                const phone = this.dataset.phone;
                if (phone) {
                    modalPhone.textContent = phone;
                    modalPhoneWrapper.style.display = 'block';
                } else {
                    modalPhoneWrapper.style.display = 'none';
                }

                // LinkedIn
                const linkedin = this.dataset.linkedin;
                if (linkedin && linkedin !== '#') {
                    modalLinkedInLink.href = linkedin;
                    modalLinkedInWrapper.style.display = 'block';
                } else {
                    modalLinkedInWrapper.style.display = 'none';
                }
                
                openTeacherModal();
            });
        });

        function openTeacherModal() {
            modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }

        function closeTeacherModal() {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }

        modalCloseButton.addEventListener('click', closeTeacherModal);

        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) { // Click on overlay itself
                closeTeacherModal();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeTeacherModal();
            }
        });
    }
});


