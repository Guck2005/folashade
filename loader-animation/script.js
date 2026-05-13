gsap.from(".block", {
  duration: 0.8,
  width: "0%",
  ease: Power1.easeIn,
  delay: 2,
  stagger: 0.04,
});

gsap.to(".loader", {
  duration: 1,
  opacity: 0,
  ease: Expo.easeInOut,
  delay: 1.5,
});

gsap.from(".nav > a, .about p, .sub-header > a", {
  duration: 2,
  opacity: 0,
  y: 30,
  ease: Expo.easeInOut,
  delay: 3,
  stagger: 0.06,
});

gsap.to(".box", {
  duration: 0.2,
  opacity: 1,
  ease: Expo.easeInOut,
  delay: 3.8,
});

gsap.to(".img", {
  duration: 0.2,
  opacity: 1,
  ease: Expo.easeInOut,
  delay: 4,
});

gsap.to(".box", {
  duration: 2.4,
  y: "-100%",
  ease: Expo.easeInOut,
  delay: 4,
});
