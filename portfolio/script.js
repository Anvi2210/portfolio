// Intro Screen

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.intro-logo');

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx+1)*150)
        });

        setTimeout(()=>{
            logoSpan.forEach((span,idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx+1)*50)
            })
        },2000)

        setTimeout(()=>{
            intro.style.top='-100vh';
        },2300)
    })
})

// Scroll to top upon reload

window.onload = function() {
    window.scrollTo(0, 0);
};

// Hamburger navbar

function togglemenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

    // If the menu is open, add a click event listener to the document
    if (menu.classList.contains("open")) {
        document.addEventListener("click", closeMenuOnClickOutside);
    } else {
        document.removeEventListener("click", closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Check if the click is outside the menu and the hamburger icon
    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.classList.remove("open");
        icon.classList.remove("open");
        
        // Remove the event listener after closing the menu
        document.removeEventListener("click", closeMenuOnClickOutside);
    }
}


// Into fade-blur transition

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } 
    });
});

const hiddenElements = document.querySelectorAll('.section__text');
hiddenElements.forEach((el)=>observer.observe(el));

// Navbar turns black on scroll

// function changeBG() {
//     var navbar = document.getElementById('desktop-nav');
//     var scrollValue = window.scrollY;
//     if(scrollValue < 25) {
//         navbar.classList.remove('bgcolor')
//     } else {
//         navbar.classList.add('bgcolor')
//     }
// }

// window.addEventListener('scroll', changeBG)

// ===== FILTERABLE PROJECT GALLERY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const works = document.querySelectorAll('.work');
const projectSection = document.querySelector('#all-projects');
const workList = document.querySelector('.work-list');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    works.forEach(work => {
      if (filter === 'all' || work.classList.contains(filter)) {
        work.classList.remove('hide');
      } else {
        work.classList.add('hide');
      }
    });

    // 🧭 Smooth scroll to top of gallery
    projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 🩹 Force reflow for layout fix
    void workList.offsetHeight;
  });
});

// ===== LIGHTBOX FUNCTIONALITY WITH CAROUSEL SUPPORT =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentCarousel = [];
let currentIndex = 0;

// When any image is clicked
document.querySelectorAll('.work img').forEach(img => {
  img.addEventListener('click', (e) => {
    if (img.closest('a')) return; // Skip PDFs
    e.preventDefault();

    // Find all images in the same carousel group
    const group = img.closest('.work').dataset.carousel;
    if (group) {
      currentCarousel = Array.from(document.querySelectorAll(`.work[data-carousel="${group}"] img`));
    } else {
      currentCarousel = [img];
    }

    currentIndex = currentCarousel.indexOf(img);
    showLightboxImage(currentCarousel[currentIndex]);
    lightbox.classList.add('show');
  });
});

// Function to display the image
function showLightboxImage(img) {
  lightboxImg.src = img.src;
  const captionEl = img.nextElementSibling?.querySelector('h3');
  lightboxCaption.textContent = captionEl ? captionEl.textContent : img.alt;
}

// Navigation
lightboxPrev.addEventListener('click', () => {
  if (currentCarousel.length > 1) {
    currentIndex = (currentIndex - 1 + currentCarousel.length) % currentCarousel.length;
    showLightboxImage(currentCarousel[currentIndex]);
  }
});

lightboxNext.addEventListener('click', () => {
  if (currentCarousel.length > 1) {
    currentIndex = (currentIndex + 1) % currentCarousel.length;
    showLightboxImage(currentCarousel[currentIndex]);
  }
});

// Close on click outside or X
lightboxClose.addEventListener('click', () => lightbox.classList.remove('show'));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('show');
});