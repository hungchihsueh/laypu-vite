import gsap from "gsap";
// navbar漢堡
let theNavOpen = false;

let burgerBtn = document.getElementById("main-nav");
let theNav = document.getElementById("the-nav");

burgerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("clicked");
  if (theNav.style.display != "block") {
    let tl = gsap.timeline();
    tl.to(theNav, { display: "block", opacity: 0, duration: 0 });
    tl.to(theNav, { opacity: 1, duration: 0.1 });
  } else {
    let tl = gsap.timeline();
    tl.to(theNav, { opacity: 0, duration: 0.1 });
    tl.to(theNav, { display: "none", duration: 0 });
  }
  theNavOpen = true;
});

window.addEventListener("click", (e) => {
  if (theNavOpen && theNav.style.display == "block" && e.target != burgerBtn) {
    theNavOpen = false;
    let tl = gsap.timeline();
    tl.to(theNav, { opacity: 0, duration: 0.1 });
    tl.to(theNav, { display: "none", duration: 0 });
    // theNav.style.display = "none";
  }
});

let navItems = theNav.querySelectorAll("a");
setInterval(() => {
  // console.log(document.activeElement,navItems[0],navItems[1],navItems[2])
  if (
    theNavOpen &&
    theNav.style.display == "block" &&
    document.activeElement != burgerBtn &&
    document.activeElement != navItems[0] &&
    document.activeElement != navItems[1] &&
    document.activeElement != navItems[2]
  ) {
    theNavOpen = false;
    let tl = gsap.timeline();
    tl.to(theNav, { opacity: 0, duration: 0.1 });
    tl.to(theNav, { display: "none", duration: 0 });
  }
}, 0);
