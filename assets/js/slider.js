const Curtain = document.querySelector(".curtain")
const Slides = document.querySelectorAll(".slider-slide")
const Dots = document.querySelectorAll(".slider-dot")
const Description = document.querySelectorAll(".slider-text-container")
const ButtonWrapper = document.querySelector(".slider-button-wrapper")
const SlideTimeDuration = 5       //Time slide live in sec    (Value to change)
const SlideTimeSwipe = 0.2        //Time slide change in sec  (Value to change)

var SlideActive = 0

function ChangeToNextSlide() {

    let TimeLine = gsap.timeline();

    if(SlideActive == Slides.length-1) {    //If active sllide is last slide
        
        TimeLine
        .set(Slides[0], {display: "block", opacity: 1, zIndex: 0, onComplete: PositionTheButtonWrapper})
        .to(Slides[SlideActive], SlideTimeSwipe, {opacity: 0, ease: "none", delay: 0.5})
        .addLabel('ChangeDots')
        .to(Dots[SlideActive], SlideTimeSwipe, {opacity: 0.15, scale: 1}, "ChangeDots")
        .to(Dots[0], SlideTimeSwipe, {opacity: 1, scale: 1.15}, "ChangeDots")
        .set(Slides[0], {zIndex: 1})
        .set(Slides[SlideActive], {display: "none"})
        SlideActive = 0
    }
    else {
        TimeLine
        .set(Slides[SlideActive+1], {display: "block", opacity: 1, zIndex: 0, onComplete: PositionTheButtonWrapper})
        .to(Slides[SlideActive], SlideTimeSwipe, {opacity: 0, ease: "none", delay: 0.5})
        .addLabel('ChangeDots')
        .to(Dots[SlideActive], SlideTimeSwipe, {opacity: 0.15, scale: 1}, "ChangeDots")
        .to(Dots[SlideActive+1], SlideTimeSwipe, {opacity: 1, scale: 1.15}, "ChangeDots")
        .set(Slides[SlideActive+1], {zIndex: 1})
        .set(Slides[SlideActive++], {display: "none"})
    }
}

function PositionTheButtonWrapper() {
    let DesPosition = Description[SlideActive].getBoundingClientRect()

    ButtonWrapper.style.top = 
        DesPosition.bottom
        -window.innerHeight*0.1
        +window.pageYOffset
        +ButtonWrapper.style.marginTop
        +"px"
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Onload
window.addEventListener("load", ()=>{

    gsap.to(Curtain, 0.5, {
        delay: 0.8, 
        opacity: 0, 
        onComplete: ()=> {Curtain.style.display = "none"
    }})

    PositionTheButtonWrapper()

    gsap.set(Dots[SlideActive], {opacity: 1, scale: 1.15})

    //Prefix for slides progress bar
    let ProgressBars = document.querySelectorAll(".slider-progress-bar-green");
    ProgressBars.forEach((x)=> {
        x.style.animationName = "StretchBar"
        x.style.animationDuration = (SlideTimeDuration-0.5)+"s"
        x.style.animationDelay = (SlideTimeSwipe+0.5)+"s"
        x.style.animationFillMode = "both"
    })

    //Slider changing function in interval
    setInterval(ChangeToNextSlide, SlideTimeDuration*1000)
})
