var heroSection = document.getElementById("heroSection");
var aboutSection = document.getElementById("aboutSection");
var portfolioSection = document.getElementById("portfolioSection");
var experienceSection = document.getElementById("experienceSection");
var testimonialsSection = document.getElementById("testimonialsSection");
var contactSection = document.getElementById("contactSection");
var navLinks = Array.from(document.querySelectorAll(".nav-links > a"));
var scrollToTop = document.getElementById("scroll-to-top");
var toggleButton = document.getElementById("theme-toggle-button");
// ======= side bar ========
var settingsToggleButton = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettingsBtn = document.getElementById("close-settings");
var tajawalFontBtn = document.getElementById("tajawalFontBtn");
var fontButtonsArr = Array.from(document.querySelectorAll(".font-option"));
var colorButtonsArr = Array.from(document.querySelectorAll(".color-option"));
var resetSettingsBtn = document.getElementById("reset-settings");
// =============== Filtering =========
var filterButtons = Array.from(document.querySelectorAll(".portfolio-filter"));
var portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
// ============== carousel ========
var testimonialsCards = Array.from(
  document.querySelectorAll("#testimonials-carousel > div"),
);
// the container of cards that will be translated to the left or right
var testimonialsContainer = document.getElementById("testimonials-carousel");
var nextSliderBtn = document.getElementById("next-testimonial");
var prevSliderBtn = document.getElementById("prev-testimonial");
// the index of the current card that is being displayed in the carousel
var currentSliderIndex = 0;
var carouselIndicators = Array.from(
  document.querySelectorAll(".carousel-indicator"),
);

// default themes object first
var themes = {
  color: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#7c3aed",
  },
  font: "Tajawal",
  mode: "dark",
  activeNavLinkIndex: null,
};

if (sessionStorage.getItem("themes")) {
  themes = JSON.parse(sessionStorage.getItem("themes")) || themes;
}

// apply the loaded themes to the page
applyTheme();
// like display function
function applyTheme() {
  //links
  if (
    themes.activeNavLinkIndex !== null &&
    navLinks[themes.activeNavLinkIndex]
  ) {
    removeActiveClassFromNavLinks();
    navLinks[themes.activeNavLinkIndex].classList.add("active");
  }
  // mode
  if (themes.mode === "dark") {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }

  // font
  document.querySelector("body").style.fontFamily = themes.font;

  // colors (css variables)
  document.documentElement.style.cssText = `--color-primary: ${themes.color.primary}; --color-secondary: ${themes.color.secondary}; --color-accent: ${themes.color.accent};`;
  for (let i = 0; i < fontButtonsArr.length; i++) {
    if (fontButtonsArr[i].getAttribute("data-font") === themes.font) {
      fontButtonsArr[i].classList.add("active");
      fontButtonsArr[i].style.cssText = `
        border-width: 2px;
        border-color: #6366f1;
        background-color : #1D293D;
      `;
    } else {
      fontButtonsArr[i].classList.remove("active");
      fontButtonsArr[i].style.cssText = ``;
    }
  }
}
function removeActiveClassFromNavLinks() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
}
// active links function
function activeLinks() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function (e) {
      removeActiveClassFromNavLinks();
      e.target.classList.add("active");
      themes.activeNavLinkIndex = i;
      sessionStorage.setItem("themes", JSON.stringify(themes));
    });
  }
}
activeLinks();

/* //  handle the activity with scrolling
document.addEventListener("scroll", function () {
  if (scrollY >= 0 && scrollY < 1000) {
    removeActiveClassFromNavLinks();
    navLinks[0].classList.add("active");
  } else if (scrollY >= 1000 && scrollY < 3140.8) {
    removeActiveClassFromNavLinks();
    navLinks[1].classList.add("active");
  } else if (scrollY >= 3140.8 && scrollY < 5363.2) {
    removeActiveClassFromNavLinks();
    navLinks[2].classList.add("active");
  } else if (scrollY >= 5363.2 && scrollY < 7440) {
    removeActiveClassFromNavLinks();
    navLinks[3].classList.add("active");
  } else if (scrollY >= 7440 && scrollY < 9000) {
    removeActiveClassFromNavLinks();
    navLinks[4].classList.add("active");
  } else if (scrollY >= 9000) {
    removeActiveClassFromNavLinks();
    navLinks[5].classList.add("active");
  }
});
 */
/// Scroll function
function scrollEvent() {
  if (scrollY > 500) {
    scrollToTop.classList.remove("opacity-0", "pointer-events-none");
    scrollToTop.classList.add("opacity-100");
  } else {
    scrollToTop.classList.remove("opacity-100");
    scrollToTop.classList.add("opacity-0", "pointer-events-none");
  }
}
document.addEventListener("scroll", function () {
  scrollEvent();
});

//toTopButton function
function toTopButton() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTop.addEventListener("click", function () {
  toTopButton();
});

// toggleMode function
function toggleMode() {
  document.querySelector("html").classList.toggle("dark");

  themes.mode = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

  sessionStorage.setItem("themes", JSON.stringify(themes));
}
toggleButton.addEventListener("click", function (e) {
  toggleMode();
});

// settingsSidebar
function settingsToggle() {
  settingsSidebar.classList.toggle("translate-x-full");
}

settingsToggleButton.addEventListener("click", function (e) {
  e.stopPropagation();
  settingsToggle();
});

settingsSidebar.addEventListener("click", function (e) {
  e.stopPropagation();
});

document.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
});

closeSettingsBtn.addEventListener("click", function () {
  settingsSidebar.classList.add("translate-x-full");
});

// fonts function
function bindFontButtons() {
  for (let i = 0; i < fontButtonsArr.length; i++) {
    fontButtonsArr[i].addEventListener("click", function (e) {
      themes.font = this.getAttribute("data-font");
      document.querySelector("body").style.fontFamily = themes.font;

      for (let j = 0; j < fontButtonsArr.length; j++) {
        fontButtonsArr[j].classList.remove("active");
        fontButtonsArr[j].style.cssText = ``;
      }

      this.classList.add("active");
      this.style.cssText = `
        border-width: 2px;
        border-color: #6366f1;
        background-color : #1D293D;
      `;
      // save after every click, not once outside the loop
      sessionStorage.setItem("themes", JSON.stringify(themes));
    });
  }
}
bindFontButtons();

// color function
function bindColorButtons() {
  for (let i = 0; i < colorButtonsArr.length; i++) {
    colorButtonsArr[i].addEventListener("click", function (e) {
      themes.color.primary = this.getAttribute("data-color");
      themes.color.secondary = this.getAttribute("data-secondary-color");
      themes.color.accent = this.getAttribute("data-accent-color");
      document.documentElement.style.cssText = `--color-primary: ${themes.color.primary}; --color-secondary: ${themes.color.secondary}; --color-accent: ${themes.color.accent};`;
      // save after every click, not once outside the loop
      sessionStorage.setItem("themes", JSON.stringify(themes));
    });
  }
}
bindColorButtons();

// reset button
resetSettingsBtn.addEventListener("click", function () {
  themes = {
    color: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#7c3aed",
    },
    font: "Tajawal",
    mode: "dark",
  };
  applyTheme();
  sessionStorage.setItem("themes", JSON.stringify(themes));
  settingsToggle();
});
// ===================== filter section ========================

function buttonsStates(e) {
  // Remove active class from the current active button
  document.querySelector(".portfolio-filter.active").classList.remove("active");
  filterButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  // Add active class to the clicked button
  e.target.classList.add("active");

  // Hide all cards first
  portfolioItems.forEach(function (card) {
    card.classList.add("hidden");

    // Show matching cards
    if (
      e.target.dataset.filter === card.dataset.category ||
      e.target.dataset.filter === "all"
    ) {
      card.classList.remove("hidden");
    }
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", buttonsStates);
});
// ===========================================================================
// carousel function (testimonials section)(slider section)
function updateCarouselIndicators() {
  for (let i = 0; i < carouselIndicators.length; i++) {
    //  i === currentSliderIndex; ==>  return a value from (true, false) and assign it in isActive
    var isActive = i === currentSliderIndex; // currentSliderIndex increases in changeSlider function by the steps
    // classList.toggle("class-name", condition);
    carouselIndicators[i].classList.toggle("bg-accent", isActive);
    carouselIndicators[i].classList.toggle("bg-slate-400", !isActive);
    carouselIndicators[i].classList.toggle("dark:bg-slate-600", !isActive);
    carouselIndicators[i].setAttribute("aria-selected", isActive);
  }
}

function changeSlider(step) {
  currentSliderIndex += step;
  // testimonialsCards.length - 3 ==> because the appearence cards are three
  if (currentSliderIndex > testimonialsCards.length - 3) {
    currentSliderIndex = 0;
  } else if (currentSliderIndex < 0) {
    currentSliderIndex = testimonialsCards.length - 3;
  }
  // the idea here is to move the container to the left by 33.333% for each card, so if the currentSliderIndex is 1,
  //  it will move to the left by 33.333%, if it's 2, it will move by 66.666%, and so on.
  testimonialsContainer.style.transform = `translateX(${currentSliderIndex * 33.333}%)`;
  // update the states of indicators
  updateCarouselIndicators();
}
nextSliderBtn.addEventListener("click", function () {
  changeSlider(1);
});
prevSliderBtn.addEventListener("click", function () {
  changeSlider(-1);
});

// Carousel Indicators

for (let i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener("click", function () {
    // currentSliderIndex = Number(this.getAttribute("data-index"));
    // dataset return the attribute starts with data-
    // and the (index) to define the type of data
    currentSliderIndex = Number(this.dataset.index);
    // if the currentSliderIndex is 2 ==>  66.6667% if i click on the 0 (first) i tell him to return to the origin
    testimonialsContainer.style.transform = `translateX(${currentSliderIndex * 33.333}%)`;
    updateCarouselIndicators();
  });
}

updateCarouselIndicators();

/*
// Keep the navigation link in sync with the section currently being viewed.
var sectionLinks = navLinks
  .map(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    return section ? { link: link, section: section } : null;
  })
  .filter(Boolean);

function updateActiveNavLink() {
  // The extra offset accounts for the fixed header and activates a section as
  // soon as its heading passes just below the header.
  var scrollMarker = window.scrollY + 120;
  var activeItem = sectionLinks[0];

  for (let i = 0; i < sectionLinks.length; i++) {
    if (sectionLinks[i].section.offsetTop <= scrollMarker) {
      activeItem = sectionLinks[i];
    }
  }

  // The contact section may be shorter than the viewport, so explicitly make
  // it active when the user reaches the bottom of the document.
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2
  ) {
    activeItem = sectionLinks[sectionLinks.length - 1];
  }

  for (let i = 0; i < sectionLinks.length; i++) {
    sectionLinks[i].link.classList.toggle(
      "active",
      sectionLinks[i] === activeItem,
    );
  }
}

document.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
updateActiveNavLink(); 
 */
