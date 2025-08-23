 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,ScrollSmoother)
  // gsap code here!
 

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effcts:true,
    smoothTouch:0.1,
  });

  const cards = gsap.utils.toArray('.card');

  cards.forEach((card, i) => {
    gsap.to(card,{
        scale: 0.8 + 0.2 * (i /(cards.length -1)),
        ease:"none",
        scrollTrigger:{
          trigger:card,
          start:"top" + (15 +35 * i),
          end:"bottom bottom",
          endTrigger:".container",
          scrub:true,
          pin:card,
          pinSpacing:false,
          invalidateOnRefresh:true
        }
    })
  });




});