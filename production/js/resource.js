import gsap from "gsap";
function query (data) {
  return Object.keys(data).length;
}
$.getJSON("./js/resource.json", function(data) {
var mainlength= query(data);
for(var i=0;i<mainlength;i++)
{
var maincontent=$(".main-"+(i+1)).children();
var documentFragment = $(document.createDocumentFragment());
var ListData=data['main'+(i+1)];
for(var j=0;j<ListData.length;j++){
var a=$("<a href='./static/download/"+ListData[j]['fileName']+"' class='disability_d' title='"+ListData[j]['fileName']+"' download trackdownload></a>");
var imag=$("<div class='img-group'> <img src='./static/img/resource/"+ListData[j]['Image']+"' alt=''></div>");
var content=ListData[j]['content'];
a.append(imag);
a.append(content);
documentFragment.append(a)
}
maincontent.append(documentFragment)
}
});
const main_1 = document.querySelector(".main-1");
const main_2 = document.querySelector(".main-2");
const main_3 = document.querySelector(".main-3");
const main_4 = document.querySelector(".main-4");
const state = {
  activeTab: 0,
  tabName: ["地震", "颱風豪雨", "核子事故", "綜合"],
  main: [main_1, main_2, main_3, main_4],
};
// burger tabs event
const burger = document.querySelector(".section-tabs.burger");
const burgerTabs = document.querySelectorAll(".section-tabs.burger .tab");
const burgerSelector = burger.querySelector(".selector");
burgerSelector.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
  } else {
    burger.classList.add("active");
  }
});
// burger tabs event

const tabGroup = document.querySelector(".section-tabs.normal");
const tabs = document.querySelectorAll(".section-tabs.normal .tab");

// 切換tab
let tabclicked = false;
let clickedRecent = false;

tabs.forEach((tab, i) =>
  tab.addEventListener("click", (e) => {
    tabclicked = true;
    if (clickedRecent) {
      return;
    } else {
      clickedRecent = true;
      let beforeIndex = state.activeTab;
      let tl = gsap.timeline();
      state.activeTab = [].indexOf.call(tabs, tab);
      if (state.activeTab == 0) {
        // document.querySelector(".progress-prev").classList.add("disable");
      } else {
        // document.querySelector(".progress-prev").classList.remove("disable");
      }
      if (state.activeTab == tabs.length - 1) {
        // gsap.to("#progress", {
        //   bottom: "-100%",
        //   opacity: 0,
        //   display: "none",
        //   duration: 0.3,
        // });
      } else {
        // document.querySelector(".progress-prev").classList.add("disable");
        // document.querySelector(".progress-next").classList.remove("disable");
        // gsap.to("#progress", {
        //   bottom: "0%",
        //   opacity: 1,
        //   display: "flex",
        //   duration: 0.3,
        // });
      }
      document.querySelector(".burger .selector .text").innerHTML =
        state.tabName[state.activeTab];
      state.main.forEach((main, i) => {
        if (state.main.indexOf(main) < state.activeTab) {
          gsap.to(main, { left: "-100%", display: "none", duration: 0 });
        } else if (state.main.indexOf(main) > state.activeTab) {
          gsap.to(main, { left: "100%", display: "none", duration: 0 });
        }
      });
      console.log(beforeIndex, state.activeTab);
      tl.to(
        tabs,
        {
          backgroundColor: "#fff",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5",
      );
      tl.to(
        burgerTabs,
        { backgroundColor: "#fff", color: "#1e6e67", duration: 0.05 },
        "-=.5",
      );
      tl.to(
        tabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4",
      );
      tl.to(
        burgerTabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4",
      );
      // tl.to(main_1,{backgroundColor:state.activeTab%2==1?"#D9F4F1": "#F1EAA8",duration:.2},"-=0.25")
      switch (true) {
        case state.activeTab === beforeIndex:
          console.log("nah");
          break;
        case state.activeTab < beforeIndex:
          console.log("<");
          state.main[beforeIndex].scrollLeft = "0%";
          tl.to(state.main[beforeIndex], {
            left: "100%",
            opacity: 0,
            duration: 1,
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1",
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9",
          );

          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
        case state.activeTab > beforeIndex:
          console.log(">");
          state.main[beforeIndex].scrollLeft = "0%";
          tl.to(state.main[beforeIndex], {
            left: "-100%",
            opacity: 0,
            duration: 0.5,
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              zIndex: 20,
              opacity: 1,
              duration: 1,
              display: "flex",
            },
            "-=1",
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9",
          );
          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
      }
    }

    setTimeout(() => {
      clickedRecent = false;
    }, 400);
  }),
);
burgerTabs.forEach((tab, i) =>
  tab.addEventListener("click", (e) => {
    tabclicked = true;
    if (clickedRecent) {
      return;
    } else {
      document.querySelector(".burger.section-tabs").classList.remove("active");
      state.step = 0;
      //   if (state.activeTab == 0) {
      //     document.querySelector(".progress-prev").classList.add("disable");
      //   } else {
      //     document.querySelector(".progress-prev").classList.remove("disable");
      //   }
      clickedRecent = true;
      let beforeIndex = state.activeTab;
      let tl = gsap.timeline();
      state.activeTab = [].indexOf.call(burgerTabs, tab);
      if (state.activeTab == 0) {
        // document.querySelector(".progress-prev").classList.add("disable");
      } else {
        // document.querySelector(".progress-prev").classList.remove("disable");
      }
      if (state.activeTab == tabs.length - 1) {
        // gsap.to("#progress", {
        //   bottom: "-100%",
        //   opacity: 0,
        //   display: "none",
        //   duration: 0.3,
        // });
      } else {
        // document.querySelector(".progress-prev").classList.add("disable");
        // document.querySelector(".progress-next").classList.remove("disable");
        // gsap.to("#progress", {
        //   bottom: "0%",
        //   opacity: 1,
        //   display: "flex",
        //   duration: 0.3,
        // });
      }
      document.querySelector(".burger .selector .text").innerHTML =
        state.tabName[state.activeTab];
      state.main.forEach((main) => {
        if (state.main.indexOf(main) < state.activeTab) {
          gsap.to(main, { left: "-100%" });
        } else if (state.main.indexOf(main) > state.activeTab) {
          gsap.to(main, { left: "100%" });
        }
      });

      //   tl.to("#progress", {
      //     // backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
      //     left: "0%",
      //     duration: 0.5,
      //   });
      tl.to(
        burgerTabs,
        {
          backgroundColor: "#fff",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5",
      );
      tl.to(
        tabs,
        {
          backgroundColor: "#fff",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5",
      );
      tl.to(
        burgerTabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4",
      );
      tl.to(
        tabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4",
      );
      //   tl.to(
      //     "main",
      //     {
      //       backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
      //       duration: 0.5,
      //     },
      //     "-=0.75"
      //   );
      //   tl.to(
      //     ".navbar",
      //     {
      //       backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
      //       duration: 0.5,
      //     },
      //     "-=0.75"
      //   );
      // tl.to(main_1,{backgroundColor:state.activeTab%2==1?"#D9F4F1": "#F1EAA8",duration:.2},"-=0.25")
      switch (true) {
        case state.activeTab === beforeIndex:
          console.log("nah");
          break;
        case state.activeTab < beforeIndex:
          console.log("<");
          state.main[beforeIndex].scrollLeft = "0%";
          tl.to(state.main[beforeIndex], {
            left: "100%",
            opacity: 0,
            duration: 0.5,
            display: "none",
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              //   backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1.2",
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9",
          );
          // state.main[state.activeTab].scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior:"auto",
          // });

          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
        case state.activeTab > beforeIndex:
          console.log(">");
          tl.to(state.main[beforeIndex], {
            left: "-100%",
            opacity: 0,
            duration: 0.5,

            display: "none",
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              //   backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 1,
              display: "flex",
            },
            "-=1.2",
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9",
          );

          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
      }
    }
    // 切換tab
    setTimeout(() => {
      clickedRecent = false;
    }, 400);
  }),
);
// 切換tab

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
  if (e.target != burgerSelector) {
    burger.classList.contains("active") && burger.classList.remove("active");
  }
});

const start = () => {
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%", duration: 0 });
    } else if (state.main.indexOf(main) > state.activeTab) {
      gsap.to(main, { left: "100%", duration: 0 });
    }
  });
  gsap.to(
    tabs,
    {
      backgroundColor: "#fff",
      color: "#1e6e67",
      duration: 0.05,
    },
    "-=.5",
  );
  gsap.to(
    burgerTabs[state.activeTab],
    {
      backgroundColor: "#1e6e67",
      color: "#fff",
      duration: 0.2,
    },
    "-=.4",
  );
  gsap.to(
    tabs[state.activeTab],
    {
      backgroundColor: "#1e6e67",
      color: "#fff",
      duration: 0.2,
    },
    "-=.4",
  );
  gsap.to(
    main_1,
    {
      left: "0%",
      display: "flex",
      opacity: 1,
      duration: 0,
    },
    "-=.8",
  );

  // horizontal scroll
  state.main.forEach((main, i) => {
    main.addEventListener("wheel", async (e) => {
      e.preventDefault();
      if (e.deltaX != 0) {
        if (e.deltaX < 0) {
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaX),
            duration: 0.8,
          });
        } else if (e.deltaX > 0) {
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaX),
            duration: 0.8,
          });
        }
      } else {
        if (e.deltaY < 0) {
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaY),
            duration: 0.8,
          });
        } else if (e.deltaY > 0) {
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaY),
            duration: 0.8,
          });
        }
      }
    });
  });
};

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
// 載入
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener(
    "DOMContentLoaded",
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("resize", documentHeight);
      documentHeight();
    }),
  );
  start();
  mainBurgerEvent();
} else {
  // `DOMContentLoaded` has already fired
  start();
  mainBurgerEvent();
  window.addEventListener("resize", documentHeight);
  documentHeight();
}
documentHeight();

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