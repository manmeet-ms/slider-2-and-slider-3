gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
// Dynamic moving block items
const carouselItems = [{ title: "" }, { title: "" }, { title: "" }];
renderCarouselItems();

// ✅✅✅ GSAP Code ✅✅✅
gsap.set(".rolling-carousel__item", {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "50% 50%"
});

const initialAnimation = getRollingAnimation(true);

ScrollTrigger.create({
  trigger: ".rolling-carousel",
  start: "top 10%",
  end: "+=2000",
  pin: true,
  scrub: true,
  animation: getRollingAnimation(),
  onEnter() {
    // Pause the initial animation on scrolltrigger enter
    initialAnimation.pause();
    // Rotate the circle svg initialAnimation progress to change path starting point coordinate
    gsap.set("#layout-circle-svg", {
      rotate: initialAnimation.progress() * 360
    });
  },
  onLeaveBack() {
    // Reset the svg rotation
    gsap.set("#layout-circle-svg", {
      rotate: 0
    });
    // start playing the initialAnimation again
    initialAnimation.play();
  }
});

// Returns gsap motion path animation for the moving blocks
function getRollingAnimation(withRepeat = false) {
  const itemsPlacementGap = 1 / carouselItems.length;

  return gsap.to(".rolling-carousel__item", {
    motionPath: {
      path: "#layout-circle-path",
      align: "#layout-circle-path",
      start: (index) => index * itemsPlacementGap,
      end: (index) => index * itemsPlacementGap + 1
    },
    ...(withRepeat ? { duration: 10, repeat: -1 } : {}),
    ease: "none",
    runBackwards: true
  });
}

// Renders the moving blocks
function renderCarouselItems() {
  const fragment = document.createDocumentFragment();

  carouselItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("rolling-carousel__item");
    div.innerHTML = index;
    fragment.appendChild(div);
  });
  document.querySelector(".rolling-carousel").appendChild(fragment);
}