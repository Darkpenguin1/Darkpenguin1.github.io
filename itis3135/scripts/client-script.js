let slideIndex = 1;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        let numberText = slides[i].querySelector(".numbertext");
        
        if (numberText) {
            numberText.textContent = `${i + 1} / ${slides.length}`;
        }   
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}


function toggleLanguage() {
    const english = document.getElementById("english");
    const spanish = document.getElementById("spanish");

    if (english.style.display === "none") {
        english.style.display = "block";
        spanish.style.display = "none";
    } else {
        english.style.display = "none";
        spanish.style.display = "block";
    }
}
  