const carousel = document.querySelector(".carousel");

const nextButton = document.querySelector(".right-btn");

const previousButton = document.querySelector(".left-btn");

const nav = document.querySelector(".nav");

const dots = [...nav.children];

const slides = [...carousel.children];

let slideWidth = slides[0].getBoundingClientRect().width;

function positionSlides(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + "px";
    }
}

positionSlides(slides);

// ON RIGHT BUTTON CLICK, THE CAROUSEL goes TO THE LEFT
nextButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
});

// ON LEFT BUTTON CLICK, THE CAROUSEL goes TO THE RIGHT
previousButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;

    moveToSlide(carousel, currentSlide, previousSlide);
    hideButton(previousSlide, slides);
    moveToDot(previousSlide, slides, nav, dots);
});

// ON DOT CLICK
nav.addEventListener("click", function(e){

    // if we didn't click on a dot, we exit
    if(e.target === nav) return;

    // SELECT THE CLICKED DOT
    const targetDot = e.target;

    // SELECT THE CURRENT DOT
    const currentDot = nav.querySelector(".active");

    // SELECT THE CURRENT SLIDE
    const currentSlide = carousel.querySelector(".active");

    // find the index of the dot, so we can target the right slide
    let targetDotIndex = findIndex(targetDot, dots);

    // SELECT THE TARGET SLIDE
    const targetSlide = slides[targetDotIndex];

    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides);
})

// MOVE TO DOT
function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}
// MOVE TO SLIDE
function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide);
}

// Toggle ACTIVE CLASS
function toggleActive(current, target){
    current.classList.remove("active");
    target.classList.add("active");
}

// HIDE BUTTON
function hideButton(targetSlide, slides){

    if(targetSlide === slides[0]){
        previousButton.classList.add("hide");
        nextButton.classList.remove("hide");
    }else if(targetSlide === slides[slides.length - 1]){

        nextButton.classList.add("hide");
        previousButton.classList.remove("hide");
    }else{

        previousButton.classList.remove("hide");
        nextButton.classList.remove("hide");
    }
}

function findIndex(item, items){
    for(let index = 0; index < items.length; index++){
        if(item === items[index]){
            return index;
        }
    }
}
