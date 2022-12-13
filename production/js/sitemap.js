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
     burgerBtn.setAttribute("aria-expended", "true");
  } else {
    let tl = gsap.timeline();
    tl.to(theNav, { opacity: 0, duration: 0.1 });
    tl.to(theNav, { display: "none", duration: 0 });
     burgerBtn.setAttribute("aria-expended", "false");
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
document.addEventListener(
  "focusin",
  function () {
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
    console.log("focused: ", document.activeElement);
  },
  true,
);
