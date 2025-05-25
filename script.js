document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      }
    });
  });

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Services Carousel
  const servicesList = document.getElementById('servicesList');
  const dotsContainer = document.getElementById('dotsContainer');
  const scrollLeftBtn = document.querySelector('.scroll-btn.left');
  const scrollRightBtn = document.querySelector('.scroll-btn.right');
  
  // Sample services data - replace with your actual services
  const services = [
    {
      title: "Job Placement",
      description: "We connect qualified candidates with top employers across Punjab.",
      icon: "fas fa-briefcase"
    },
    {
      title: "Career Counseling",
      description: "Personalized guidance to help you make informed career decisions.",
      icon: "fas fa-user-tie"
    },
    {
      title: "Resume Writing",
      description: "Professionally crafted resumes that get you noticed by employers.",
      icon: "fas fa-file-alt"
    },
    {
      title: "Interview Preparation",
      description: "Mock interviews and coaching to boost your confidence.",
      icon: "fas fa-comments"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive online marketing solutions for businesses.",
      icon: "fas fa-chart-line"
    },
    {
      title: "Web Design",
      description: "Custom website development to establish your online presence.",
      icon: "fas fa-laptop-code"
    }
  ];

  // Generate service cards
  services.forEach((service, index) => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card fade-in';
    serviceCard.innerHTML = `
      <div class="service-content">
        <div class="service-icon"><i class="${service.icon}"></i></div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    `;
    servicesList.appendChild(serviceCard);

    // Create dots for navigation
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  // Initialize dots
  const dots = document.querySelectorAll('.dot');
  if (dots.length > 0) {
    dots[0].classList.add('active');
  }

  // Scroll functionality
  let currentIndex = 0;
  const serviceCardWidth = 300 + 30; // width + gap
  const maxIndex = services.length - 1;

  function updateCarousel(index) {
    currentIndex = index;
    servicesList.scrollTo({
      left: index * serviceCardWidth,
      behavior: 'smooth'
    });
    
    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      updateCarousel(index);
    });
  });

  // Scroll buttons
  scrollLeftBtn.addEventListener('click', () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    updateCarousel(newIndex);
  });

  scrollRightBtn.addEventListener('click', () => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
    updateCarousel(newIndex);
  });

  // Auto-scroll for demonstration (optional)
  let autoScroll = setInterval(() => {
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateCarousel(newIndex);
  }, 5000);

  // Pause auto-scroll on hover
  servicesList.addEventListener('mouseenter', () => {
    clearInterval(autoScroll);
  });

  servicesList.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateCarousel(newIndex);
    }, 5000);
  });

  // Scroll reveal animation
  function scrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', scrollReveal);
  scrollReveal(); // Initialize on load

  // Header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
      header.classList.add('fixed-header');
    } else {
      header.classList.remove('fixed-header');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});







document.addEventListener("DOMContentLoaded", function () {
    const serviceList = document.getElementById("servicesList");
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");
    const dotsContainer = document.getElementById("dotsContainer");
    const cards = serviceList.querySelectorAll(".service-card");
    const visibleCards = 3;
    const cardWidth = cards[0].offsetWidth + 20; // 20px gap
    let currentIndex = 0;

    const updateDots = () => {
        dotsContainer.innerHTML = "";
        const totalDots = Math.ceil(cards.length / visibleCards);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = i;
                serviceList.scrollTo({
                    left: currentIndex * cardWidth * visibleCards,
                    behavior: "smooth"
                });
                updateDots();
            });
            dotsContainer.appendChild(dot);
        }
    };

    leftBtn.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        serviceList.scrollTo({
            left: currentIndex * cardWidth * visibleCards,
            behavior: "smooth"
        });
        updateDots();
    });

    rightBtn.addEventListener("click", () => {
        const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        serviceList.scrollTo({
            left: currentIndex * cardWidth * visibleCards,
            behavior: "smooth"
        });
        updateDots();
    });

    window.addEventListener("resize", () => {
        updateDots();
    });

    updateDots();
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => observer.observe(card));
});







document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Simulate successful submission
        alert("Thank you for contacting us, " + name + "! We'll get back to you shortly.");

        // Optionally reset the form
        contactForm.reset();
    });
});
