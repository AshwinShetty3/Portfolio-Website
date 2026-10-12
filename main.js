'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Select all navbar links
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // Select all pages/articles
    const pages = document.querySelectorAll('article[data-page]');

    // Add click event to each navbar link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Get the page to show from data-nav-link attribute
            const pageToShow = this.getAttribute('data-nav-link');

            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Remove active class from all pages
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Find and show the corresponding page
            const targetPage = document.querySelector(`article[data-page="${pageToShow}"]`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });

    // Optional: Activate first page by default
    const firstLink = navLinks[0];
    const firstPage = pages[0];
    if (firstLink && firstPage) {
        firstLink.classList.add('active');
        firstPage.classList.add('active');
    }
});

// todo: send mail integration
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const messageDiv = document.getElementById('form-message');
    
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        messageDiv.textContent = 'Thank you for your message!';
        messageDiv.className = 'form-message success';
        form.reset();
      } else {
        messageDiv.textContent = 'Oops! There was a problem submitting your form';
        messageDiv.className = 'form-message error';
      }
      setTimeout(() => {
        messageDiv.textContent = ''; // Clear the message after 2 seconds
      }, 4000);
    }).catch(error => {
      messageDiv.textContent = 'Oops! There was a problem submitting your form';
      messageDiv.className = 'form-message error';
      setTimeout(() => {
        messageDiv.textContent = ''; // Clear the message after 3 seconds
      }, 2500);
    });
  });

// -------------------------------------------------------------
// 3D INTERACTIVE GALAXY & TECH MESH (THREE.JS)
// -------------------------------------------------------------
function initThreeGalaxy() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle universe
    const count = 2200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Futuristic Cloud & DevOps Blue color palette
    const colorChoices = [
        new THREE.Color(0x00d2ff), // Neon Cyan
        new THREE.Color(0x00f5d4), // Neon Emerald
        new THREE.Color(0x38bdf8), // Sky Blue
        new THREE.Color(0x3b82f6), // Electric Azure
        new THREE.Color(0xe0f2fe)  // Starlight White
    ];

    for (let i = 0; i < count; i++) {
        const radius = Math.random() * 320 + 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Radial gradient particle dot
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 210, 255, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
        size: 3.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Glowing Holographic Tech Orbit Ring
    const ringGeo = new THREE.TorusGeometry(130, 0.8, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const techRing = new THREE.Mesh(ringGeo, ringMat);
    techRing.rotation.x = Math.PI / 3;
    techRing.rotation.y = Math.PI / 6;
    scene.add(techRing);

    // Second counter-rotating orbital ring in emerald
    const ringGeo2 = new THREE.TorusGeometry(95, 0.6, 12, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const techRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    techRing2.rotation.x = -Math.PI / 4;
    scene.add(techRing2);

    // Mouse movement parallax
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - windowHalfX) * 0.07;
        targetY = (e.clientY - windowHalfY) * 0.07;
    });

    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0002;
        techRing.rotation.z += 0.0012;
        techRing2.rotation.z -= 0.0009;

        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (-targetY - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();
}

// -------------------------------------------------------------
// 3D TILT EFFECT ON CARDS & TECH BADGES
// -------------------------------------------------------------
function init3DTiltEffects() {
    const cards = document.querySelectorAll('.tech-badge-card, .project-item a, .service-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize when window is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initThreeGalaxy();
        init3DTiltEffects();
    });
} else {
    initThreeGalaxy();
    init3DTiltEffects();
}

