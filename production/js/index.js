import gsap from "gsap";

// window.addEventListener("load", () => {
//   setMainHeight();
//   setVideoOverlaycolor();
//   dynamicVideoWidth();

// });
// navbar漢堡
let theNavOpen = false;

let burgerBtn = document.getElementById("main-nav");
let theNav = document.getElementById("the-nav");
const mainBurgerEvent = () => {
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
};
window.addEventListener("click", (e) => {
  if (theNavOpen && theNav.style.display == "block" && e.target != burgerBtn) {
    theNavOpen = false;
    let tl = gsap.timeline();
    tl.to(theNav, { opacity: 0, duration: 0.1 });
    tl.to(theNav, { display: "none", duration: 0 });
    // theNav.style.display = "none";
  }
});
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
const setMainHeight = () => {
  let main = document.querySelector("main");
  let nav = document.querySelector(".navbar");
  let footer = document.querySelector("footer");
  let video = document.querySelector(".video-group");
  // console.log(window.innerHeight, nav.offsetHeight)
  // main.style.height = `${window.innerHeight - nav.offsetHeight}px`;
  setInterval(() => {
    video.style.height = `${
      ((window.innerHeight - nav.offsetHeight - footer.offsetHeight) /
        window.innerHeight) *
      100
    }%`;
  }, 0.1);
};
const setVideoOverlaycolor = () => {
  document.querySelector(".tab-group").addEventListener("mouseenter", () => {
    console.log(window.innerWidth);
    document.querySelector("video").style.width = "100vw";
    document.getElementById("overlay").style.background = "rgba(0, 0, 0, 0.5)";
    document.getElementById("overlay").style.opacity = "1";
    if (window.innerWidth > 900) {
      // document.querySelector("footer .copy-right").style.color="#fff"
      document.querySelector("#main-content").style.color = "#fff";
    }
  });
  document.querySelector(".tab-group").addEventListener("mouseleave", () => {
    document.querySelector("video").style = "100%";
    document.getElementById("overlay").style.background = "rgba(0, 0, 0, 0)";
    document.getElementById("overlay").style.opacity = "0";
    if (window.innerWidth > 900) {
      // document.querySelector("footer .copy-right").style.color = "#1E6E67"
      document.querySelector("#main-content").style.color = "#1E6E67";
    }
  });
};
const dynamicVideoWidth = () => {
  let videoGroup = document.querySelector(".video-group");
  let tabGroup = document.querySelector(".tab-group");
  let main = document.querySelector("main");
  
    main.style.width = window.innerWidth;
    let tabsLeft = document
      .getElementById("physically-handicapped")
      .getBoundingClientRect().left;
    // console.log(tabsLeft,window.innerWidth)
    tabGroup.style.width = `${
      ((window.innerWidth - tabsLeft) / window.innerWidth) * 100
    }%`;
    videoGroup.style.width = `${(tabsLeft / window.innerWidth) * 100}%`;
  
};
// mobile height
const dynamicMobileHeight = () => {
  let nav = document.querySelector(".navbar");
  let footer = document.querySelector("footer");
  let video = document.querySelector(".video-group");
  
    document.querySelector(".mobile-tabs").style.height = `${
      ((window.innerHeight -
        nav.clientHeight -
        footer.clientHeight -
        video.clientHeight) /
        window.innerHeight) *
      100
    }%`;
};
window.addEventListener("resize", () => {
  dynamicMobileHeight();
  dynamicVideoWidth();
})
// mobile height
// 載入
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener(
    "DOMContentLoaded",
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        // let lodingTl = gsap.timeline();
        // lodingTl.to("#loading", { opacity: 0, duration: 0.3 });
        // lodingTl.to("#loading", { display: "none" });
      }, 3000);
      window.addEventListener("resize", documentHeight);
      documentHeight();
      setMainHeight();
      setVideoOverlaycolor();
      dynamicVideoWidth();
      dynamicMobileHeight();
      mainBurgerEvent();
    }),
  );
} else {
  window.addEventListener("resize", documentHeight);
  documentHeight();
  setMainHeight();
  setVideoOverlaycolor();
  dynamicVideoWidth();
  dynamicMobileHeight();
  mainBurgerEvent();
}
documentHeight();

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
