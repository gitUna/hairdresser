"use strict";
const map = L.map("map").setView([51.05421481772432, 16.965332333963264], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.05421481772432, 16.965332333963264])
  .addTo(map)
  .bindPopup("Justyna Pawlowska Hair Salon")
  .openPopup();

let arrayN = [];
let sum = 0;

const sumBox = document.querySelector(".sum");
const currentOrder = document.querySelector(".chosenServices");

const hairLength = document.querySelectorAll(".length");
const chosen = document.querySelector(".chosenServices");

const impFunction = function () {
  for (let x = 1; x < 6; x++) {
    const currentService = document.querySelector(`#service${x}`);
    const currentPrice = document.querySelector(`#price${x}`);
    const currentDiv = document.querySelector(`#div${x}`);

    if (currentService.checked) {
      currentService.checked = false;
    }

    currentService.addEventListener("change", function () {
      if (currentService.checked) {
        sum = sum + parseFloat(currentPrice.textContent.slice(0, -1));

        //Display total price
        sumBox.innerHTML = `<h2>Price: ${sum.toFixed(2)}$</h2>`;

        //Display chosen services
        arrayN.push(`${currentDiv.textContent}`);
      } else if (!currentService.checked) {
        sum = sum - parseFloat(currentPrice.textContent.slice(0, -1));
        sumBox.innerHTML = `<h2>Price: ${sum.toFixed(2)}$</h2>`;

        //Hide chosen services
        if (arrayN.includes(`${currentDiv.textContent}`)) {
          arrayN.splice(arrayN.indexOf(`${currentDiv.textContent}`), 1);
        }
      }
      let elem = "";
      const aaa = function (arr) {
        for (let x = 0; x < arr.length; x++) {
          elem += `${arr[x]}<br>`;
        }
      };
      aaa(arrayN);
      currentOrder.innerHTML = `${elem}`;
      if (elem !== "") {
        chosen.style.backgroundColor = "#fff";
      } else chosen.style.backgroundColor = "";
    });
  }
};

impFunction();

///// Remove default text from textarea
const remarks = document.querySelectorAll(".remarks");

const checkIfActive = function () {
  remarks.forEach((t) => {
    if (t === document.activeElement) {
      t.value = "";
    } else {
      t.value = "Additional remarks";
      t.style.color = "#6d6c69";
    }
  });
};

const removeDefText = function () {
  remarks.forEach((r) =>
    r.addEventListener("click", function () {
      r.value = "";
      r.style.color = "#000";

      checkIfActive();
    })
  );
};
removeDefText();
//Section menu

const menu = document.querySelector(".menu");
const sticky = document.querySelector(".sticky");
const stickyBtn = document.querySelector(".sticky__button");
const header = document.querySelector(".header");
const gallery = document.querySelector(".gallery");
const service = document.querySelector(".service");
const form = document.querySelector(".form");
const contact = document.querySelector(".contact");

//Sticky nav
const sectionObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (window.innerWidth <= 1380) {
      sticky.classList.remove("hidden");
      sticky.style.display = "flex";
    } else {
      if (entry.isIntersecting) {
        sticky.classList.add("hidden");
        sticky.style.display = "none";
      } else {
        sticky.classList.remove("hidden");
        sticky.style.display = "flex";
      }
    }
  },
  {
    root: null,
    threshold: 0.3,
  }
);
sectionObserver.observe(header);
const nav = document.querySelector(".nav");
const scissors = document.querySelector(".additionalScissors");

if (window.innerWidth <= 1000) {
  nav.style.display = "none";
}
const footer = document.querySelector("footer");

const menuCopy = menu.cloneNode(true);
const menuCopy1 = menu.cloneNode(true);
menuCopy1.classList.add('menuCopy1');

menuCopy.classList.add("menuCopy");
menuCopy.classList.add("hidden");

menuCopy.classList.remove("menu");
sticky.prepend(menuCopy);
footer.prepend(menuCopy1);

stickyBtn.addEventListener("click", function () {
  menuCopy.classList.toggle("hidden");
});

//Behaviour after click --> scroll into view
const menuItem1 = document.querySelectorAll(".menu--item1");
const menuItem2 = document.querySelectorAll(".menu--item2");
const menuItem3 = document.querySelectorAll(".menu--item3");
const menuItem4 = document.querySelectorAll(".menu--item4");
const menuItem5 = document.querySelectorAll(".menu--item5");

menuItem1.forEach((i) =>
  i.addEventListener("click", function () {
    header.scrollIntoView({ behavior: "smooth" });
  })
);
menuItem2.forEach((i) =>
  i.addEventListener("click", function () {
    gallery.scrollIntoView({ behavior: "smooth" });
  })
);
menuItem3.forEach((i) =>
  i.addEventListener("click", function () {
    service.scrollIntoView({ behavior: "smooth" });
  })
);
menuItem4.forEach((i) =>
  i.addEventListener("click", function () {
    form.scrollIntoView({ behavior: "smooth" });
  })
);
menuItem5.forEach((i) =>
  i.addEventListener("click", function () {
    contact.scrollIntoView({ behavior: "smooth" });
  })
);

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".gallery__btn--left");
const btnRight = document.querySelector(".gallery__btn--right");

let currentSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//////////

length2.classList.add("backgroundColorgrey");
length2.classList.remove("length");

//Remove the 'hidden' class from list of services (and other staff :p)
hairLength.forEach((h) =>
  h.addEventListener("click", function () {
    hairLength.forEach((hL) => {
      hL.classList.remove("active-button");
      hL.classList.add("length");
      sum = 0;
      sumBox.innerHTML = `<h2>Price: ${sum.toFixed(2)}$</h2>`;
      checkIfActive();
      arrayN = [];
      chosen.textContent = "";

      for (let x = 1; x < 6; x++) {
        const currentService = document.querySelector(`#service${x}`);

        if (currentService.checked) {
          currentService.checked = false;
        }
      }
    });

    h.classList.add("active-button");
    h.classList.remove("length");
    if (length2.style.backgroundColor === "#af3c0f") {
      length2.style.backgroundColor = "#372e25";
    }

    for (let x = 1; x < 6; x++) {
      let actPrice = document.querySelector(`#price${x}`);

      document.querySelector(`#price${x}`).textContent = `${parseFloat(
        actPrice.dataset.indexNumber
      ).toFixed(2)}$`;
    }
  })
);

document.querySelector("#length1").addEventListener("click", function () {
  for (let x = 1; x < 6; x++) {
    let actPrice = document.querySelector(`#price${x}`);

    document.querySelector(`#price${x}`).textContent = `${(
      parseFloat(actPrice.dataset.indexNumber) * 1.34
    ).toFixed(2)}$`;
  }
});
document.querySelector("#length3").addEventListener("click", function () {
  for (let x = 1; x < 6; x++) {
    let actPrice = document.querySelector(`#price${x}`);

    document.querySelector(`#price${x}`).textContent = `${(
      parseFloat(actPrice.dataset.indexNumber) * 0.82
    ).toFixed(2)}$`;
  }
});

///// Icons for services section
const iconImages = document.querySelectorAll(".services__box--img");

iconImages.forEach(
  (i, index) => (i.style.backgroundImage = `url(img/s${index + 1}.png)`)
);

///// Resize for smaller divices
const section = document.querySelectorAll(".every-section");

if (window.innerWidth < 1024) {
  section.forEach((s) => {
    s.style.height = "auto";
  });
}
