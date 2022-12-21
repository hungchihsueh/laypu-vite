import gsap from "gsap";

// 滑鼠效果
const parallax = (e) => {
  let groups = document.querySelectorAll(".section-group");
  groups.forEach((group) => {
    const speed = Number(group.getAttribute("data-speed"));
    // console.log(speed, window.innerHeight, window.innerWidth);
    const x = (window.innerWidth - e.pageX) * speed;
    const y = (window.innerHeight - e.pageY) * speed;
    group.style.transform = `translate(${x}px,${y}px)`;
  });
};

const clickSectionEvent = () => {
  let groups = document.querySelectorAll(".section-group");
  groups.forEach((section) => {
    section.addEventListener("click", () => {
      document.removeEventListener("mousemove", parallax);
      gsap.to("#progress", { bottom: "0%", zIndex: 21, duration: 1, delay: 2 });
    });
  });
};

const wheelChair = document.getElementById("wheel-chair");
const prepare = document.getElementById("prepare");
const response = document.getElementById("response");
const doc = document.getElementById("document");
const help = document.getElementById("help");
const recover = document.getElementById("recover");
const tabGroup = document.querySelector(".section-tabs.normal");
const tabs = document.querySelectorAll(".section-tabs.normal .tab");

const main_0 = document.querySelector(".main-0");
const main_1 = document.querySelector(".main-1");
const main_2 = document.querySelector(".main-2");
const main_3 = document.querySelector(".main-3");
const main_4 = document.querySelector(".main-4");
const main_5 = document.querySelector(".main-5");
const progress = document.querySelector("#progress");
const state = {
  isStopScroll: true,
  preStep: -1,
  step: 0,
  activeTab: -1,
  tabName: ["災前準備", "災時應變", "災後復原", "協助肢障者", "文件下載"],
  sectionsTitle: [
    [
      "建立個人緊急聯絡網",
      "共同討論緊急應變計畫",
      "儲備家中物資",
      "緊急避難包",
      "輔助設備",
      "醫療器材與藥物整備",
      "輔助動物的緊急避難包",
      "住家災害風險檢視",
      "疏散撤離規劃",
      "收容規劃",
      "颱風豪雨居家準備",
      "地震居家準備",
    ],
    [
      "災害即時資訊取得",
      "地震發生時",
      "停電怎麼辦",
      "疏散避難",
      "平安通報",
      "災時電話使用",
    ],
    ["震後居家檢查", "尋求協助"],
    ["關懷並確認需求", "協助使用輪椅或拐杖者", "避免肢體障礙者與輔具分開"],
  ],
  main: [main_1, main_2, main_3, main_4, main_5],
};
let tabclicked = false;
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

// sidebar item template
let sideBar = document.getElementById("sidebar");
let sidebarList = document.querySelector("#sidebar .list");
let sidebarTemplate = sidebarList.innerHTML;
sidebarList.innerHTML = "";
// sidebar event
let sidebarRightBtn = sideBar.querySelector(".right-btn");
sidebarRightBtn.addEventListener("click", (e) => {
  let sections = sidebarList.querySelectorAll(".list>button");
  Array.prototype.forEach.call(sections, (section, i) => {
    section.setAttribute("tabindex","0")
  })
  console.log(sidebarRightBtn.classList.contains("active"));
  sideBar.classList.contains("active")
    ? sideBar.classList.remove("active")
    : sideBar.classList.add("active");
});
// sidebar event
// hover 切換src
let imgArr = [
  "prepare.svg",
  "response.svg",
  "document-download.svg",
  "help.svg",
  "recover.svg",
];
let gifArr = [
  "prepare.webp",
  "response.webp",
  "document.webp",
  "help.svg",
  "recover.webp",
];
let imgs = document.querySelectorAll(".main-0 button img");
imgs.forEach((img, i) => {
  img.addEventListener("mouseenter", () => {
    img.src = `/static/img/handicapped/${gifArr[i]}`;
  });
  img.addEventListener("mouseleave", () => {
    img.src = `/static/img/handicapped/${imgArr[i]}`;
  });
});

// 點擊動畫
prepare.addEventListener("click", async () => {
  // tabindex
  // console.log("hi");
  // document.querySelector(".progress-next").setAttribute("tabindex", "2");
  // document.querySelector(".progress-prev").setAttribute("tabindex", "2");
  // document.querySelector("#go-to-main").setAttribute("tabindex", "-1");
  // document.querySelector("#main-content").setAttribute("tabindex", "-1");
  document.querySelectorAll(".main-0 button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });
  if (window.innerWidth <= 1200) {
    console.log("burger");
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
    });
  } else {
    console.log("normal");
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "-1");
    });
  }
  window.addEventListener("resize", async () => {
    let topDistence = await state.main[state.activeTab].getBoundingClientRect()
      .top;
    console.log(window.innerHeight, topDistence);
    let sidbarHeight =
      (await state.main[state.activeTab]
        .querySelector(".main>div")
        .getBoundingClientRect().bottom) -
      state.main[state.activeTab].getBoundingClientRect().top;
    sideBar.style.height = `${sidbarHeight}px`;
    sideBar.style.top = `${topDistence}px`;
    if (window.innerWidth <= 1200) {
      console.log("burger");
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "-1");
      });
    } else {
      console.log("normal");
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "-1");
      });
    }
  });
  // tabindex
  state.activeTab = 0;
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  progress.style.display = "flex";
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%" });
    } else if (state.main.indexOf(main) > state.activeTab) {
      gsap.to(main, { left: "-100%" });
    }
  });
  let tl = gsap.timeline();
  tl.to(wheelChair, {
    duration: 1.5,
    left: "-50%",
  });
  tl.to(
    prepare,
    {
      left: "40%",
      top: "60%",
      transform: `translate(-50%,-50%)`,
      duration: 0.8,
    },
    "-=1.5"
  );
  tl.to(response, { duration: 1, opacity: 0 }, "-=1");
  tl.to(doc, { duration: 1, opacity: 0 }, "-=1");
  tl.to(help, { duration: 1, opacity: 0 }, "-=1");
  tl.to(recover, { duration: 1, opacity: 0 }, "-=1");
  tl.to(main_0, { left: "-100%", opacity: 0, duration: 0.8 });

  tl.to("main", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  tl.to(".navbar", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  tl.to("footer", { left: "100%", opacity: 0, duration: 0.8 }, "-=.8");
  await tl.to(
    main_1,
    {
      left: "0%",
      backgroundColor: "#F1EAA8",
      display: "flex",
      opacity: 1,
      duration: 0.8,
    },
    "-=.8"
  );
  tl.to(tabGroup, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(burger, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(
    tabs,
    { backgroundColor: "#F1EAA8", color: "#1e6e67", duration: 0.5 },
    "-=1"
  );
  tl.to(
    tabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  tl.to(
    burgerTabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  // sidebar
  sideBar.style.display = "block";
  let topDistence = await state.main[state.activeTab].getBoundingClientRect()
    .top;
  console.log(window.innerHeight, topDistence);
  let sidbarHeight =
    (await state.main[state.activeTab]
      .querySelector(".main>div")
      .getBoundingClientRect().bottom) -
    state.main[state.activeTab].getBoundingClientRect().top;
  sideBar.style.height = `${sidbarHeight}px`;
  sideBar.style.top = `${topDistence}px`;
  sidebarList.innerHTML = "";
  let newList = "";
  state.sectionsTitle[0].forEach((title, i) => {
    let new_template = sidebarTemplate;
    new_template = new_template.replace("{title}", title);
    newList += new_template;
  });
  sidebarList.innerHTML = newList;
  let sections = sidebarList.querySelectorAll(".list>button");
  sections[state.step].querySelector(".dot").classList.add("active");
  Array.prototype.forEach.call(sections, (section, i) => {
    section.addEventListener("click", () => {
      Array.prototype.forEach.call(sections, (section, i) => {
        section.setAttribute("tabindex","-1")
      })
      Array.prototype.forEach.call(sections, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sideBar.classList.remove("active");
      console.log(i, state.step);
      state.step = i;
      console.log(i, state.step);
      section.querySelector(".dot").classList.add("active");
      let activeMain = state.main[state.activeTab];
      let activeSection = activeMain.querySelectorAll(".main>div")[i];
      console.log(activeSection.getBoundingClientRect().left);
      gsap.to(activeMain, {
        scrollLeft: (activeMain.scrollLeft +=
          activeSection.getBoundingClientRect().left - 50),
        duration: 1,
      });
    });
  });
  // sidebar
  document.querySelector(".progress-prev").classList.add("disable");
});

response.addEventListener("click", async () => {
  // tabindex
  console.log("hi");
  // document.querySelector(".progress-next").setAttribute("tabindex", "2");
  // document.querySelector(".progress-prev").setAttribute("tabindex", "2");
  // document.querySelector("#go-to-main").setAttribute("tabindex", "-1");
  // document.querySelector("#main-content").setAttribute("tabindex", "-1");
  document.querySelectorAll(".main-0 button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });
  if (window.innerWidth <= 1200) {
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  } else {
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  }
  window.addEventListener("resize", async () => {
    let topDistence = await state.main[state.activeTab].getBoundingClientRect()
      .top;
    console.log(window.innerHeight, topDistence);
    let sidbarHeight =
      (await state.main[state.activeTab]
        .querySelector(".main>div")
        .getBoundingClientRect().bottom) -
      state.main[state.activeTab].getBoundingClientRect().top;
    sideBar.style.height = `${sidbarHeight}px`;
    sideBar.style.top = `${topDistence}px`;
    if (window.innerWidth <= 1200) {
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    } else {
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    }
  });
  // tabindex
  progress.style.display = "flex";
  state.activeTab = 1;
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%" });
    } else if (state.main.indexOf(main) > state.activeTab) {
      gsap.to(main, { left: "100%" });
    }
  });
  let tl = gsap.timeline();
  tl.to(wheelChair, {
    duration: 1.5,
    left: "-50%",
  });
  tl.to(
    response,
    {
      left: "40%",
      top: "30%",
      transform: `translate(-50%,-50%)`,
      duration: 0.8,
    },
    "-=1.5"
  );
  tl.to(prepare, { duration: 1, opacity: 0 }, "-=1");
  tl.to(doc, { duration: 1, opacity: 0 }, "-=1");
  tl.to(help, { duration: 1, opacity: 0 }, "-=1");
  tl.to(recover, { duration: 1, opacity: 0 }, "-=1");
  tl.to(main_0, { left: "-100%", opacity: 0, duration: 0.8 });
  tl.to(".navbar", { backgroundColor: "#D9F4F1", duration: 0.8 }, "-=.8");
  // tl.to("#progress", { backgroundColor: "#D9F4F1", duration: 0.8 }, "-=.8");
  await tl.to(
    main_2,
    {
      left: "0%",
      opacity: 1,
      backgroundColor: "#D9F4F1",
      display: "flex",
      duration: 0.8,
    },
    "-=.8"
  );
  tl.to(tabGroup, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(burger, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(
    tabs,
    { backgroundColor: "#D9F4F1", color: "#1e6e67", duration: 0.5 },
    "-=1"
  );
  tl.to(
    tabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  tl.to(
    burgerTabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  // sidebar
  sideBar.style.display = "block";
  let topDistence = await state.main[state.activeTab].getBoundingClientRect()
    .top;
  console.log(window.innerHeight, topDistence);
  let sidbarHeight =
    (await state.main[state.activeTab]
      .querySelector(".main>div")
      .getBoundingClientRect().bottom) -
    state.main[state.activeTab].getBoundingClientRect().top;
  sideBar.style.height = `${sidbarHeight}px`;
  sideBar.style.top = `${topDistence}px`;
  sidebarList.innerHTML = "";
  let newList = "";
  state.sectionsTitle[0].forEach((title, i) => {
    let new_template = sidebarTemplate;
    new_template = new_template.replace("{title}", title);
    newList += new_template;
  });
  sidebarList.innerHTML = newList;
  let sections = sidebarList.querySelectorAll(".list>button");
  sections[state.step].querySelector(".dot").classList.add("active");
  Array.prototype.forEach.call(sections, (section, i) => {
    section.addEventListener("click", () => {
      Array.prototype.forEach.call(sections, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sideBar.classList.remove("active");
      console.log(i, state.step);
      state.step = i;
      console.log(i, state.step);
      section.querySelector(".dot").classList.add("active");
      let activeMain = state.main[state.activeTab];
      let activeSection = activeMain.querySelectorAll(".main>div")[i];
      console.log(activeSection.getBoundingClientRect().left);
      gsap.to(activeMain, {
        scrollLeft: (activeMain.scrollLeft +=
          activeSection.getBoundingClientRect().left - 50),
        duration: 1,
      });
    });
  });
  // sidebar
});

recover.addEventListener("click", async () => {
  // tabindex
  console.log("hi");
  // document.querySelector(".progress-next").setAttribute("tabindex", "2");
  // document.querySelector(".progress-prev").setAttribute("tabindex", "2");
  // document.querySelector("#go-to-main").setAttribute("tabindex", "-1");
  // document.querySelector("#main-content").setAttribute("tabindex", "-1");
  document.querySelectorAll(".main-0 button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });
  if (window.innerWidth <= 1200) {
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  } else {
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  }
  window.addEventListener("resize", async () => {
    let topDistence = await state.main[state.activeTab].getBoundingClientRect()
      .top;
    console.log(window.innerHeight, topDistence);
    let sidbarHeight =
      (await state.main[state.activeTab]
        .querySelector(".main>div")
        .getBoundingClientRect().bottom) -
      state.main[state.activeTab].getBoundingClientRect().top;
    sideBar.style.height = `${sidbarHeight}px`;
    sideBar.style.top = `${topDistence}px`;
    if (window.innerWidth <= 1200) {
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    } else {
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    }
  });
  // tabindex
  progress.style.display = "flex";
  state.activeTab = 2;
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%" });
    } else if (state.main.indexOf(main) > state.activeTab) {
      gsap.to(main, { left: "100%" });
    }
  });
  let tl = gsap.timeline();
  tl.to(wheelChair, {
    duration: 1.5,
    left: "-50%",
  });
  tl.to(
    recover,
    {
      left: "40%",
      top: "60%",
      transform: `translate(-50%,-50%)`,
      duration: 0.8,
    },
    "-=1.5"
  );
  tl.to(doc, { duration: 1, opacity: 0 }, "-=1");
  tl.to(prepare, { duration: 1, opacity: 0 }, "-=1");
  tl.to(response, { duration: 1, opacity: 0 }, "-=1");
  tl.to(help, { duration: 1, opacity: 0 }, "-=1");
  tl.to(main_0, { left: "-100%", opacity: 0, duration: 0.8 });
  tl.to("main", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  tl.to(".navbar", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  // tl.to("#progress", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  await tl.to(
    main_3,
    {
      left: "0%",
      backgroundColor: "#F1EAA8",
      opacity: 1,
      display: "flex",
      duration: 0.8,
    },
    "-=.8"
  );
  tl.to(tabGroup, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(burger, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(
    tabs,
    { backgroundColor: "#F1EAA8", color: "#1e6e67", duration: 0.5 },
    "-=1"
  );
  tl.to(
    tabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  tl.to(
    burgerTabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  // sidebar
  sideBar.style.display = "block";
  let topDistence = await state.main[state.activeTab].getBoundingClientRect()
    .top;
  console.log(window.innerHeight, topDistence);
  let sidbarHeight =
    (await state.main[state.activeTab]
      .querySelector(".main>div")
      .getBoundingClientRect().bottom) -
    state.main[state.activeTab].getBoundingClientRect().top;
  sideBar.style.height = `${sidbarHeight}px`;
  sideBar.style.top = `${topDistence}px`;
  sidebarList.innerHTML = "";
  let newList = "";
  state.sectionsTitle[0].forEach((title, i) => {
    let new_template = sidebarTemplate;
    new_template = new_template.replace("{title}", title);
    newList += new_template;
  });
  sidebarList.innerHTML = newList;
  let sections = sidebarList.querySelectorAll(".list>button");
  sections[state.step].querySelector(".dot").classList.add("active");
  Array.prototype.forEach.call(sections, (section, i) => {
    section.addEventListener("click", () => {
      Array.prototype.forEach.call(sections, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sideBar.classList.remove("active");
      console.log(i, state.step);
      state.step = i;
      console.log(i, state.step);
      section.querySelector(".dot").classList.add("active");
      let activeMain = state.main[state.activeTab];
      let activeSection = activeMain.querySelectorAll(".main>div")[i];
      console.log(activeSection.getBoundingClientRect().left);
      gsap.to(activeMain, {
        scrollLeft: (activeMain.scrollLeft +=
          activeSection.getBoundingClientRect().left - 50),
        duration: 1,
      });
    });
  });
  // sidebar
});

help.addEventListener("click", async () => {
  // tabindex
  console.log("hi");
  // document.querySelector(".progress-next").setAttribute("tabindex", "2");
  // document.querySelector(".progress-prev").setAttribute("tabindex", "2");
  // document.querySelector("#go-to-main").setAttribute("tabindex", "-1");
  // document.querySelector("#main-content").setAttribute("tabindex", "-1");
  document.querySelectorAll(".main-0 button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });
  if (window.innerWidth <= 1200) {
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  } else {
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  }
  window.addEventListener("resize", async () => {
    let topDistence = await state.main[state.activeTab].getBoundingClientRect()
      .top;
    console.log(window.innerHeight, topDistence);
    let sidbarHeight =
      (await state.main[state.activeTab]
        .querySelector(".main>div")
        .getBoundingClientRect().bottom) -
      state.main[state.activeTab].getBoundingClientRect().top;
    sideBar.style.height = `${sidbarHeight}px`;
    sideBar.style.top = `${topDistence}px`;
    if (window.innerWidth <= 1200) {
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    } else {
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    }
  });
  // tabindex
  progress.style.display = "flex";
  state.activeTab = 3;
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%" });
    } else if (state.main.indexOf(main) > state.activeTab) {
      gsap.to(main, { left: "100%" });
    }
  });
  let tl = gsap.timeline();
  tl.to(wheelChair, {
    duration: 1.5,
    left: "-50%",
  });
  tl.to(
    help,
    {
      left: "40%",
      top: "60%",
      transform: `translate(-50%,-50%)`,
      duration: 0.8,
    },
    "-=1.5"
  );
  tl.to(prepare, { duration: 1, opacity: 0 }, "-=1");
  tl.to(doc, { duration: 1, opacity: 0 }, "-=1");
  tl.to(response, { duration: 1, opacity: 0 }, "-=1");
  tl.to(recover, { duration: 1, opacity: 0 }, "-=1");
  tl.to(main_0, { left: "-100%", opacity: 0, duration: 0.8 });
  tl.to("main", { backgroundColor: "#D9F4F1", duration: 0.8 }, "-=.8");
  tl.to(".navbar", { backgroundColor: "#D9F4F1", duration: 0.8 }, "-=.8");
  // tl.to("#progress", { backgroundColor: "#D9F4F1", duration: 0.8 }, "-=.8");
  await tl.to(
    main_4,
    {
      left: "0%",
      opacity: 1,
      duration: 0.8,
      display: "flex",
      backgroundColor: "#D9F4F1",
    },
    "-=.8"
  );
  tl.to(tabGroup, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(burger, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(
    tabs,
    { backgroundColor: "#D9F4F1", color: "#1e6e67", duration: 0.5 },
    "-=1"
  );
  tl.to(
    tabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  tl.to(
    burgerTabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  // sidebar
  sideBar.style.display = "block";
  let topDistence = await state.main[state.activeTab].getBoundingClientRect()
    .top;
  console.log(window.innerHeight, topDistence);
  let sidbarHeight =
    (await state.main[state.activeTab]
      .querySelector(".main>div")
      .getBoundingClientRect().bottom) -
    state.main[state.activeTab].getBoundingClientRect().top;
  sideBar.style.height = `${sidbarHeight}px`;
  sideBar.style.top = `${topDistence}px`;
  sidebarList.innerHTML = "";
  let newList = "";
  state.sectionsTitle[0].forEach((title, i) => {
    let new_template = sidebarTemplate;
    new_template = new_template.replace("{title}", title);
    newList += new_template;
  });
  sidebarList.innerHTML = newList;
  let sections = sidebarList.querySelectorAll(".list>button");
  sections[state.step].querySelector(".dot").classList.add("active");
  Array.prototype.forEach.call(sections, (section, i) => {
    section.addEventListener("click", () => {
      Array.prototype.forEach.call(sections, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sideBar.classList.remove("active");
      console.log(i, state.step);
      state.step = i;
      console.log(i, state.step);
      section.querySelector(".dot").classList.add("active");
      let activeMain = state.main[state.activeTab];
      let activeSection = activeMain.querySelectorAll(".main>div")[i];
      console.log(activeSection.getBoundingClientRect().left);
      gsap.to(activeMain, {
        scrollLeft: (activeMain.scrollLeft +=
          activeSection.getBoundingClientRect().left - 50),
        duration: 1,
      });
    });
  });
  // sidebar
});

doc.addEventListener("click", async () => {
  // tabindex
  console.log("hi");
  // document.querySelector(".progress-next").setAttribute("tabindex", "2");
  // document.querySelector(".progress-prev").setAttribute("tabindex", "2");
  // document.querySelector("#go-to-main").setAttribute("tabindex", "-1");
  // document.querySelector("#main-content").setAttribute("tabindex", "-1");
  document.querySelectorAll(".main-0 button").forEach((btn) => {
    btn.setAttribute("tabindex", "-1");
  });
  if (window.innerWidth <= 1200) {
    document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  } else {
    document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
      tab.setAttribute("tabindex", "0");
    });
  }
  window.addEventListener("resize", async () => {
    let topDistence = await state.main[state.activeTab].getBoundingClientRect()
      .top;
    console.log(window.innerHeight, topDistence);
    let sidbarHeight =
      (await state.main[state.activeTab]
        .querySelector(".main>div")
        .getBoundingClientRect().bottom) -
      state.main[state.activeTab].getBoundingClientRect().top;
    sideBar.style.height = `${sidbarHeight}px`;
    sideBar.style.top = `${topDistence}px`;
    if (window.innerWidth <= 1200) {
      document.querySelectorAll(".section-tabs.burger  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    } else {
      document.querySelectorAll(".section-tabs.normal  .tab").forEach((tab) => {
        tab.setAttribute("tabindex", "0");
      });
    }
  });
  // tabindex
  progress.style.display = "none";
  state.activeTab = 4;
  // sidebar
  sideBar.style.display = "none";
  // sidebar
  document.querySelector(".burger .selector .text").innerHTML =
    state.tabName[state.activeTab];
  state.main.forEach((main) => {
    if (state.main.indexOf(main) < state.activeTab) {
      gsap.to(main, { left: "-100%" });
    }
  });
  let tl = gsap.timeline();
  tl.to(wheelChair, {
    duration: 1.5,
    left: "-50%",
  });
  tl.to(
    doc,
    {
      left: "40%",
      top: "60%",
      transform: `translate(-50%,-50%)`,
      duration: 0.8,
    },
    "-=1.5"
  );
  tl.to(prepare, { duration: 1, opacity: 0 }, "-=1");
  tl.to(help, { duration: 1, opacity: 0 }, "-=1");
  tl.to(response, { duration: 1, opacity: 0 }, "-=1");
  tl.to(recover, { duration: 1, opacity: 0 }, "-=1");
  tl.to(main_0, { left: "-100%", opacity: 0, duration: 0.8 });
  tl.to("main", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  tl.to(".navbar", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  // tl.to("#progress", { backgroundColor: "#F1EAA8", duration: 0.8 }, "-=.8");
  tl.to(
    main_5,
    {
      left: "0%",
      backgroundColor: "#F1EAA8",
      opacity: 1,
      duration: 0.8,
      display: "flex",
    },
    "-=.8"
  );
  tl.to(tabGroup, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(burger, { display: "flex", opacity: 1, duration: 0.5 });
  tl.to(
    tabs,
    { backgroundColor: "#F1EAA8", color: "#1e6e67", duration: 0.5 },
    "-=1"
  );
  tl.to(
    tabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
  tl.to(
    burgerTabs[state.activeTab],
    { backgroundColor: "#1e6e67", color: "#fff", duration: 0.5 },
    "-=1"
  );
});

// 切換tab
let clickedRecent = false;

tabs.forEach((tab, i) =>
  tab.addEventListener("click", (e) => {
    tabclicked = true;
    if (clickedRecent) {
      return;
    } else {
      state.step = 0;
      clickedRecent = true;
      let beforeIndex = state.activeTab;
      if (i != tabs.length - 1) {
        document.querySelectorAll(".main-5 a").forEach((download, i) => {
          download.setAttribute("tabindex", "-1");
        });
      } else {
        document.querySelectorAll(".main-5 a").forEach((download, i) => {
          download.setAttribute("tabindex", "0");
        });
      }
      let tl = gsap.timeline();
      state.activeTab = [].indexOf.call(tabs, tab);
      if (state.activeTab == 0) {
        document.querySelector(".progress-prev").classList.add("disable");
      } else {
        document.querySelector(".progress-prev").classList.remove("disable");
      }
      if (state.activeTab == tabs.length - 1) {
        gsap.to("#progress", {
          bottom: "-100%",
          opacity: 0,
          display: "none",
          duration: 0.3,
        });
      } else {
        // document.querySelector(".progress-prev").classList.add("disable");
        document.querySelector(".progress-next").classList.remove("disable");
        gsap.to("#progress", {
          bottom: "0%",
          opacity: 1,
          display: "flex",
          duration: 0.3,
        });
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
      tl.to("#progress", {
        // backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
        left: "0%",
        duration: 0.5,
      });
      tl.to(
        tabs,
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5"
      );
      tl.to(
        burgerTabs,
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5"
      );
      tl.to(
        tabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4"
      );
      tl.to(
        burgerTabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4"
      );
      tl.to(
        "main",
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          duration: 0.5,
        },
        "-=0.75"
      );
      tl.to(
        ".navbar",
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          duration: 0.5,
        },
        "-=0.75"
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
            duration: 0.5,
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1"
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9"
          );

          document.querySelector("#progress .bar .percent").style.width = "0%";
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
              backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1"
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9"
          );
          document.querySelector("#progress .bar .percent").style.width = "0%";
          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
      }
    }
    // sidebar
    sideBar.style.display = "block";
    sidebarList.innerHTML = "";
    let newList = "";
    console.log(state.sectionsTitle[state.activeTab], state.activeTab);
    if (state.activeTab == 4) {
      sideBar.style.display = "none";
    } else {
      state.sectionsTitle[state.activeTab].forEach((title, i) => {
        let new_template = sidebarTemplate;
        new_template = new_template.replace("{title}", title);
        newList += new_template;
      });
      sidebarList.innerHTML = newList;
      console.log(sidebarList);
      let sections = sidebarList.querySelectorAll(".list>button");
      console.log(sections);
      sections[state.step].querySelector(".dot").classList.add("active");

      Array.prototype.forEach.call(sections, (section, i) => {
        section.addEventListener("click", () => {
          Array.prototype.forEach.call(sections, (section, i) => {
            section.querySelector(".dot").classList.remove("active");
          });
          sideBar.classList.remove("active");
          state.step = i;
          section.querySelector(".dot").classList.add("active");
          let activeMain = state.main[state.activeTab];
          let activeSection = activeMain.querySelectorAll(".main>div")[i];
          gsap.to(activeMain, {
            scrollLeft: (activeMain.scrollLeft +=
              activeSection.getBoundingClientRect().left - 50),
            duration: 1,
          });
        });
      });
      // sidebar
    }

    setTimeout(() => {
      clickedRecent = false;
    }, 400);
  })
);
burgerTabs.forEach((tab, i) =>
  tab.addEventListener("click", (e) => {
    tabclicked = true;
    if (clickedRecent) {
      return;
    } else {
      document.querySelector(".burger.section-tabs").classList.remove("active");
      state.step = 0;
      if (state.activeTab == 0) {
        document.querySelector(".progress-prev").classList.add("disable");
      } else {
        document.querySelector(".progress-prev").classList.remove("disable");
      }
      clickedRecent = true;
      let beforeIndex = state.activeTab;
      let tl = gsap.timeline();
      state.activeTab = [].indexOf.call(burgerTabs, tab);
      if (state.activeTab == 0) {
        document.querySelector(".progress-prev").classList.add("disable");
      } else {
        document.querySelector(".progress-prev").classList.remove("disable");
      }
      if (state.activeTab == tabs.length - 1) {
        gsap.to("#progress", {
          bottom: "-100%",
          opacity: 0,
          display: "none",
          duration: 0.3,
        });
      } else {
        // document.querySelector(".progress-prev").classList.add("disable");
        document.querySelector(".progress-next").classList.remove("disable");
        gsap.to("#progress", {
          bottom: "0%",
          opacity: 1,
          display: "flex",
          duration: 0.3,
        });
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
      console.log(beforeIndex, state.activeTab);
      tl.to("#progress", {
        // backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
        left: "0%",
        duration: 0.5,
      });
      tl.to(
        burgerTabs,
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5"
      );
      tl.to(
        tabs,
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          color: "#1e6e67",
          duration: 0.05,
        },
        "-=.5"
      );
      tl.to(
        burgerTabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4"
      );
      tl.to(
        tabs[state.activeTab],
        {
          backgroundColor: "#1e6e67",
          color: "#fff",
          duration: 0.2,
        },
        "-=.4"
      );
      tl.to(
        "main",
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          duration: 0.5,
        },
        "-=0.75"
      );
      tl.to(
        ".navbar",
        {
          backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
          duration: 0.5,
        },
        "-=0.75"
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
            duration: 0.5,
            display: "none",
          });
          state.main[state.activeTab].scrollLeft = "0%";
          tl.to(
            state.main[state.activeTab],
            {
              left: "0%",
              backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1.2"
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9"
          );
          // state.main[state.activeTab].scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior:"auto",
          // });

          document.querySelector("#progress .bar .percent").style.width = "0%";
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
              backgroundColor: state.activeTab % 2 == 1 ? "#D9F4F1" : "#F1EAA8",
              zIndex: 20,
              opacity: 1,
              duration: 0.5,
              display: "flex",
            },
            "-=1.2"
          );
          tl.to(
            state.main[state.activeTab],
            { scrollLeft: 0, duration: 0 },
            "-=.9"
          );
          document.querySelector("#progress .bar .percent").style.width = "0%";
          // document.getElementById("progress-wheelchair").style.left = "0%";
          break;
      }
    }
    // 切換tab
    // sidebar
    sideBar.style.display = "block";
    sidebarList.innerHTML = "";
    let newList = "";
    console.log(state.sectionsTitle[state.activeTab], state.activeTab);
    if (state.activeTab == 4) {
      sideBar.style.display = "none";
    } else {
      state.sectionsTitle[state.activeTab].forEach((title, i) => {
        let new_template = sidebarTemplate;
        new_template = new_template.replace("{title}", title);
        newList += new_template;

        sidebarList.innerHTML = newList;
        let sections = sidebarList.querySelectorAll(".list>button");
        console.log(sections);
        sections[state.step].querySelector(".dot").classList.add("active");
        Array.prototype.forEach.call(sections, (section, i) => {
          section.addEventListener("click", () => {
            Array.prototype.forEach.call(sections, (section, i) => {
              section.querySelector(".dot").classList.remove("active");
            });
            console.log(i);
            state.step = i;
            section.querySelector(".dot").classList.add("active");
            let activeMain = state.main[state.activeTab];
            let activeSection = activeMain.querySelectorAll(".main>div")[i];
            gsap.to(activeMain, {
              scrollLeft: (activeMain.scrollLeft +=
                activeSection.getBoundingClientRect().left - 50),
              duration: 1,
            });
          });
        });
      });
    }
    // sidebar

    setTimeout(() => {
      clickedRecent = false;
    }, 400);
  })
);
// mouse on side activate scroll
let mouseX;
let animationCalledArr = [];
setInterval(() => {
  let divs =
    state.activeTab != -1 &&
    state.main[state.activeTab].querySelectorAll(".main>div");
  Array.prototype.forEach.call(divs, (div, i) => {
    // console.log(animationCalledArr.includes(div));
    if (
      div.getBoundingClientRect().left > 0 &&
      div.getBoundingClientRect().left < window.innerWidth * 0.8 &&
      !animationCalledArr.includes(div)
    ) {
      animationCalledArr.push(div);
      console.log(animationCalledArr);
      let title = div.querySelector(".title");
      let subTitle = div.querySelector(".sub-title");
      let content = div.querySelector(".content");
      let tl = gsap.timeline();
      tl.to(title, { translateY: 50, duration: 0 });
      tl.to(content, { translateY: 100, opacity: 0, duration: 0 });
      tl.to(subTitle, { translateY: 50, duration: 0 });
      tl.to(title, { translateY: 0, opacity: 1, duration: 0.5 });
      tl.to(subTitle, { translateY: 0, opacity: 1, duration: 0.8 }, "-=.3");
      tl.to(content, { opacity: 1, duration: 0.8 }, "-=.5");
      tl.to(content, { translateY: 0, duration: 0.8 }, "-=1");
      state.step = i;
    }
  });
}, 100);

state.main.forEach((main) => {
  main.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    // console.log(mouseX);
  });
  main.addEventListener("mouseleave", () => {
    mouseX = window.innerWidth / 2;
  });
});
var detectStopWheel = null;
let isStopScroll = true;
const scrollSnap = (target, val) => {
  clearTimeout(detectStopWheel);
  detectStopWheel = setTimeout(() => {
    target.scrollTo({ left: val, behavior: "smooth" });
  }, 200);
};
// progress button
const pPrev = document.querySelectorAll(".progress-prev");
const pNext = document.querySelectorAll(".progress-next");
const ProgressEvent = () => {
  const progress = document.querySelector("#progress .bar .percent");
  const chairMan = document.getElementById("progress-wheelchair");
  console.log(pPrev, pNext);
  let touchPosition = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    deltaX: 0,
    deltaY: 0,
  };
  state.main.forEach((main, i) => {
    // main.addEventListener(
    //   "touchstart",
    //   (e) => {
    //     // e.preventDefault();
    //     touchPosition.x1 = e.touches[0].clientX;
    //     touchPosition.y1 = e.touches[0].clientY;
    //   },
    //   false
    // );
    // main.addEventListener(
    //   "touchend",
    //   (e) => {
    //     touchPosition.x2 = e.changedTouches[0].clientX;
    //     touchPosition.y2 = e.changedTouches[0].clientY;
    //     touchPosition.deltaX = touchPosition.x2 - touchPosition.x1;
    //     touchPosition.deltaY = touchPosition.y2 - touchPosition.y1;
    //     if (!isStopScroll) {
    //       return;
    //     } else {
    //       if (touchPosition.deltaX != 0) {
    //         if (touchPosition.deltaX > 0) {
    //           gsap.quickTo(main, {
    //             scrollTo: (main.scrollLeft += touchPosition.deltaX),
    //             duration: 0.8,
    //           });
    //           isStopScroll = false;
    //           clearTimeout(detectStopWheel);
    //           detectStopWheel = setTimeout(() => {
    //             isStopScroll = true;
    //           }, 1000);
    //           // gsap.to(main,{scrollLeft:  main.scrollLeft += e.deltaX * 1.8,duration:0.2})
    //         } else if (touchPosition.deltaX < 0) {
    //           isStopScroll = false;
    //           gsap.quickTo(main, {
    //             scrollTo: (main.scrollLeft += touchPosition.deltaX),
    //             duration: 0.8,
    //           });
    //           // pNext[0].click();
    //           clearTimeout(detectStopWheel);
    //           detectStopWheel = setTimeout(() => {
    //             isStopScroll = true;
    //           }, 1000);
    //         }
    //       } else {
    //         if (touchPosition.deltaY > 0 ) {
    //           isStopScroll = false;
    //           gsap.quickTo(main, {
    //             scrollTo: (main.scrollLeft += touchPosition.deltaY),
    //             duration: 0.8,
    //           });
    //           clearTimeout(detectStopWheel);
    //           detectStopWheel = setTimeout(() => {
    //             isStopScroll = true;
    //           }, 1000);
    //           // gsap.to(main,{scrollLeft:  main.scrollLeft += e.deltaY * 1.8,duration:0.2})
    //         } else if (touchPosition.deltaY > 0) {
    //           isStopScroll = false;
    //           gsap.quickTo(main, {
    //             scrollTo: (main.scrollLeft += touchPosition.deltaY),
    //             duration: 0.8,
    //           });
    //           clearTimeout(detectStopWheel);
    //           detectStopWheel = setTimeout(() => {
    //             isStopScroll = true;
    //           }, 1000);
    //           // gsap.to(main,{scrollLeft:  main.scrollLeft += e.deltaY * 1.5,duration:0.2})
    //         }
    //       }
    //     }
    //   },
    //   false
    // );
    let isScrolling;
    let hitEnd = false;
    let hitStart = false;
    let endTimer;
    let startTimer;
    main.addEventListener("wheel", async (e) => {
      e.preventDefault();
      // if (hitEnd || hitStart) {
      //   return;
      // } else {
      if (e.deltaX != 0) {
        if (e.deltaX < 0) {
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaX),
            duration: 0.8,
          });
          // pPrev[0].click();
          // isStopScroll = false;
          // clearTimeout(detectStopWheel);
          // detectStopWheel = setTimeout(() => {
          //   isStopScroll = true;
          // }, 1000);
          // gsap.to(main,{scrollLeft:  main.scrollLeft += e.deltaX * 1.8,duration:0.2})
        } else if (e.deltaX > 0) {
          // isStopScroll = false;
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaX),
            duration: 0.8,
          });

          // pNext[0].click();
          // clearTimeout(detectStopWheel);
          // detectStopWheel = setTimeout(() => {
          //   isStopScroll = true;
          // }, 1000);
        }
      } else {
        if (e.deltaY < 0) {
          // isStopScroll = false;
          // pPrev[0].click();
          // clearTimeout(detectStopWheel);
          // detectStopWheel = setTimeout(() => {
          //   isStopScroll = true;
          // }, 1000);
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaY),
            duration: 0.8,
          });
        } else if (e.deltaY > 0) {
          // isStopScroll = false;
          // pNext[0].click();
          // clearTimeout(detectStopWheel);
          // detectStopWheel = setTimeout(() => {
          //   isStopScroll = true;
          // }, 1000);
          gsap.quickTo(main, {
            scrollTo: (main.scrollLeft += e.deltaY),
            duration: 0.8,
          });
        }
      }
      // }

      let units = main.querySelectorAll(".main>div");
      Array.prototype.forEach.call(units, (unit, i) => {
        // if (
        //   main.getBoundingClientRect().left + window.innerWidth * 1 >
        //   unit.getBoundingClientRect().left && unit.getBoundingClientRect().left  > window.innerWidth * 0.4
        // ) {
        //   state.step = i;
        //   console.log(
        //     document.querySelectorAll(`.main-${state.activeTab + 1}>div`).length
        //   );
        //   if (
        //     state.step + 1 >=
        //     document.querySelectorAll(`.main-${state.activeTab + 1}>div`).length
        //   ) {
        //     document.querySelector(".progress-next").classList.add("disable");
        //     document
        //       .querySelector(".progress-prev")
        //       .classList.remove("disable");
        //   } else {
        //     document
        //       .querySelector(".progress-next")
        //       .classList.remove("disable");
        //   }
        //   if (state.step <= 0) {
        //     document
        //       .querySelector(".progress-next")
        //       .classList.remove("disable");
        //     document.querySelector(".progress-prev").classList.add("disable");
        //   } else {
        //     document
        //       .querySelector(".progress-prev")
        //       .classList.remove("disable");
        //   }
        //   if (window.innerWidth > 1400) {
        //     let leftAmount =
        //     main.scrollLeft +
        //     unit.getBoundingClientRect().left -
        //     window.innerWidth * 0.03;
        //     scrollSnap(main,leftAmount)
        //   }
        // } else if (
        //   units[i-1]&&
        //   main.getBoundingClientRect().left + window.innerWidth * 0.5>
        //   units[i-1].getBoundingClientRect().left + unit.offsetWidth * 1&&units[i-1].getBoundingClientRect().left + units[i-1].offsetWidth * 1>main.getBoundingClientRect().left + window.innerWidth * 0.1
        // ) {
        //   console.log("gobsck!", units[i-1].getBoundingClientRect().left + units[i-1].offsetWidth * 0.9)
        //   state.step = i-1;
        //   if (
        //     state.step + 1 >=
        //     document.querySelectorAll(`.main-${state.activeTab + 1}>div`).length
        //   ) {
        //     document.querySelector(".progress-next").classList.add("disable");
        //     document
        //       .querySelector(".progress-prev")
        //       .classList.remove("disable");
        //   } else {
        //     document
        //       .querySelector(".progress-next")
        //       .classList.remove("disable");
        //   }
        //   if (state.step <= 0) {
        //     document
        //       .querySelector(".progress-next")
        //       .classList.remove("disable");
        //     document.querySelector(".progress-prev").classList.add("disable");
        //   } else {
        //     document
        //       .querySelector(".progress-prev")
        //       .classList.remove("disable");
        //   }
        //   if (window.innerWidth > 1400) {
        //     let leftAmount =
        //     main.scrollLeft +
        //     units[i-1].getBoundingClientRect().left -
        //     window.innerWidth * 0.03;
        //     scrollSnap(main,leftAmount)
        //   }
        // }
      });
    });

    main.addEventListener("scroll", () => {
      // state.isStopScroll = false;
      // clearTimeout(isScrolling)
      // isScrolling=setTimeout(() => {
      //   state.isStopScroll=true
      // }, 69);
      // if (tabclicked) {
      //   setTimeout(() => {
      //     tabclicked=false
      //   }, 300);
      //   return
      // }
      // state.isScroll = true;
      if (i == state.activeTab) {
        progress.style.width = `${
          (main.scrollLeft / (main.scrollWidth - main.clientWidth)) * 100
        }%`;
        // console.log(state.main[i].querySelectorAll(".content"))
        let sections =
          state.main[state.activeTab].querySelectorAll(".main>div");
        if (state.step + 1 == sections.length) {
          // chairMan.style.left = `95%`;
          progress.style.width = "100%";
        } else if (state.step == 0) {
          progress.style.width = "0%";
        } else {
          // chairMan.style.left = `${
          //   (main.scrollLeft / (main.scrollWidth - main.clientWidth)) * 100
          // }%`;
        }
      }
      let sections = main.querySelectorAll(".main>div");
      Array.prototype.forEach.call(sections, (section, i) => {
        let sectionToLeft = section.getBoundingClientRect().left;
        if (
          main.scrollLeft > sectionToLeft &&
          sectionToLeft > 0 &&
          sectionToLeft < window.innerWidth / 2
        ) {
          state.step = i;
          if (state.activeTab == 0 && state.step <= 0) {
            document.querySelector(".progress-prev").classList.add("disable");
          } else {
            document
              .querySelector(".progress-prev")
              .classList.remove("disable");
          }
        }
      });
      if (main.scrollLeft + window.innerWidth >= main.scrollWidth - 0.5) {
        pNext[0].click();
        // if (hitEnd) {
        //   pNext[0].click();
        //   clearTimeout(endTimer);
        //   endTimer = setTimeout(() => {
        //     hitEnd = false;
        //   }, 100);
        // } else {
        //   clearTimeout(endTimer);
        //   endTimer = setTimeout(() => {
        //     hitEnd = true;
        //   }, 100);
        // }
      } else if (main.scrollLeft == 0) {
        pPrev[0].click();
        // if (hitStart) {
        //   pPrev[0].click();
        //   clearTimeout(startTimer);
        //   startTimer = setTimeout(() => {
        //     hitStart = false;
        //   }, 100);
        // } else {
        //   clearTimeout(startTimer);
        //   startTimer = setTimeout(() => {
        //     hitStart = true;
        //   }, 100);
        // }
      }
    });
  });
  pPrev.forEach((p) => {
    p.addEventListener("click", () => {
      console.log(state.step);
      let sections = document.querySelectorAll(
        `.main-${state.activeTab + 1}>div`
      );
      if (state.step < 0) {
        if (state.activeTab == 0) {
          document.querySelector(".progress-prev").classList.add("disable");
        } else {
          let units = document.querySelectorAll(`.main-${state.activeTab}>div`);
          let uCount = units.length;
          console.log(uCount);
          state.step = 0;
          let sidebarItems = sidebarList.querySelectorAll(".list>button");
          Array.prototype.forEach.call(sidebarItems, (item, i) => {
            item.querySelector(".dot").classList.remove("active");
          });
          sidebarItems[state.step]
            .querySelector(".dot")
            .classList.add("active");
          gsap.to("#progress .bar .percent", {
            width: "0%",
            duration: 0,
          });
          tabs[state.activeTab - 1].click();
          setTimeout(() => {
            gsap.to("#progress .bar .percent", {
              width: "0%",
              duration: 0,
            });
          }, 10);
        }
      } else {
        state.step--;
        let sidebarItems = sidebarList.querySelectorAll(".list>button");
        Array.prototype.forEach.call(sidebarItems, (item, i) => {
          item.querySelector(".dot").classList.remove("active");
        });
        sidebarItems[state.step] &&
          sidebarItems[state.step]
            .querySelector(".dot")
            .classList.add("active");
        if (state.step < 0) {
          if (state.activeTab == 0) {
            document.querySelector(".progress-prev").classList.add("disable");
          } else {
            let units = document.querySelectorAll(
              `.main-${state.activeTab}>div`
            );
            let uCount = units.length;
            console.log(uCount);
            state.step = 0;
            gsap.to("#progress .bar .percent", {
              width: "0%",
              duration: 0,
            });
            tabs[state.activeTab - 1].click();
            setTimeout(() => {
              gsap.to("#progress .bar .percent", {
                width: "0%",
                duration: 0,
              });
            }, 10);
          }
        }
        document.querySelector(".progress-next").classList.remove("disable");
        console.log(sections[state.step].getBoundingClientRect().left);
        state.main[state.activeTab].scrollTo({
          top: 0,
          left: sections[state.step].offsetLeft - window.innerWidth * 0.05,
          behavior: "smooth",
        });
        progress.style.width = `${((state.step + 1) / sections.length) * 100}%`;
        // chairMan.style.left = `${
        //   ((state.step + 1) / sections.length) * 100 * 0.97
        // }%`;
      }

      Array.prototype.forEach.call(sections, (unit, i) => {
        if (
          state.main[state.activeTab].getBoundingClientRect().left +
            window.innerWidth * 0.6 >
            unit.getBoundingClientRect().left - 100 &&
          unit.getBoundingClientRect().left > 0
        ) {
          // state.step=i
          // console.warn(unit.getAttribute("class"));
          // console.log(main.scrollLeft, unit.getBoundingClientRect().left);
          let leftAmount =
            state.main[state.activeTab].scrollLeft +
            unit.getBoundingClientRect().left -
            window.innerWidth * 0.07;
          console.log(leftAmount);
          main.scrollTo({ left: leftAmount, behavior: "smooth" });
        } else if (
          main.getBoundingClientRect().left + window.innerWidth * 0.6 >
          unit.getBoundingClientRect().left + unit.offsetWidth * 0.5
        ) {
          // state.step=i
          let leftAmount =
            main.scrollLeft +
            unit.getBoundingClientRect().left -
            window.innerWidth * 0.07;
          console.log(leftAmount);
          main.scrollTo({ left: leftAmount, behavior: "smooth" });
        }
      });
      // sidebar
      let sectionss = sidebarList.querySelectorAll(".list>button");
      Array.prototype.forEach.call(sectionss, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sectionss[state.step].querySelector(".dot").classList.add("active");
      // sidebar
    });
  });
  pNext.forEach((p) => {
    p.addEventListener("click", () => {
      console.log(state.step);
      let sections = document.querySelectorAll(
        `.main-${state.activeTab + 1}>div`
      );
      console.log(sections);
      console.log(state.step);
      if (state.step + 1 > sections.length) {
        if (state.activeTab < 4) {
          tabs[state.activeTab + 1].click();
          setTimeout(() => {
            gsap.to("#progress .bar .percent", {
              width: "0%",
              duration: 0,
            });
          }, 10);
        }

        // state.step = 0;
        // console.log(sections[state.step].getBoundingClientRect().left);
        // state.main[state.activeTab].scrollTo({
        //   top: 0,
        //   left: sections[state.step].offsetLeft-40,
        //   behavior: "smooth",
        // });
        // progress.style.width = `${((state.step + 1) / sections.length) * 100}%`;
        // chairMan.style.left = `5%`;
      } else {
        state.step++;
        let sidebarItems = sidebarList.querySelectorAll(".list>button");
        Array.prototype.forEach.call(sidebarItems, (item, i) => {
          item.querySelector(".dot").classList.remove("active");
        });
        sidebarItems[state.step] &&
          sidebarItems[state.step]
            .querySelector(".dot")
            .classList.add("active");
        if (state.step + 1 > sections.length) {
          if (state.activeTab < 4) {
            tabs[state.activeTab + 1].click();
            setTimeout(() => {
              gsap.to("#progress .bar .percent", {
                width: "0%",
                duration: 0,
              });
            }, 10);
          }
        }
        document.querySelector(".progress-prev").classList.remove("disable");
        console.log(sections[state.step].getBoundingClientRect().left);
        state.main[state.activeTab].scrollTo({
          top: 0,
          left: sections[state.step].offsetLeft - window.innerWidth * 0.07,
          behavior: "smooth",
        });
        progress.style.width = `${((state.step + 1) / sections.length) * 100}%`;
        // chairMan.style.left = `${
        //   ((state.step + 1) / sections.length) * 100 * 0.97
        // }%`;
      }
      Array.prototype.forEach.call(sections, (unit, i) => {
        if (
          state.main[state.activeTab].getBoundingClientRect().left +
            window.innerWidth * 0.6 >
            unit.getBoundingClientRect().left - 100 &&
          unit.getBoundingClientRect().left > 0
        ) {
          // state.step=i
          // console.warn(unit.getAttribute("class"));
          // console.log(main.scrollLeft, unit.getBoundingClientRect().left);
          let leftAmount =
            main.scrollLeft +
            unit.getBoundingClientRect().left -
            window.innerWidth * 0.07;
          console.log(leftAmount);
          main.scrollTo({ left: leftAmount, behavior: "smooth" });
        } else if (
          main.getBoundingClientRect().left + window.innerWidth * 0.6 >
          unit.getBoundingClientRect().left + unit.offsetWidth * 0.5
        ) {
          // state.step=i
          let leftAmount =
            main.scrollLeft +
            unit.getBoundingClientRect().left -
            window.innerWidth * 0.07;
          console.log(leftAmount);
          main.scrollTo({ left: leftAmount, behavior: "smooth" });
        }
      });
      // sidebar
      let sectionss = sidebarList.querySelectorAll(".list>button");
      Array.prototype.forEach.call(sectionss, (section, i) => {
        section.querySelector(".dot").classList.remove("active");
      });
      sectionss[state.step].querySelector(".dot").classList.add("active");
      // sidebar
    });
  });
};

// drag to scroll
let pos = { left: 0, x: 0 };
let isMouseDown = false;
const dragEvent = () => {
  state.main.forEach((main, i) => {
    main.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      pos = {
        left: main.scrollLeft,
        x: e.clientX,
      };
      mainMove = main.addEventListener("mousemove", (e) => {
        // console.log(e, e.clientX);
        if (isMouseDown) {
          main.scrollTo({
            top: 0,
            left: main.scrollLeft - (e.clientX - pos.x) * 1,
          });
        }
        pos.x = e.clientX;
      });
      main.addEventListener("mouseup", () => {
        isMouseDown = false;
      });
    });
  });
};

// 取消右鍵功能
document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

// navbar漢堡
let theNavOpen = false;
let burgerBtn = document.getElementById("main-nav");
let theNav = document.getElementById("the-nav");
let navLinks = theNav.querySelectorAll("a");
const mainBurgerEvent = () => {
  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("clicked");   
    // Array.prototype.forEach.call(navLinks, (link,i) => {
    //   link.setAttribute("tabindex","1")
    // })
    navLinks[0].focus();
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
  if (e.target != sidebarRightBtn) {
    sideBar.classList.remove("active");
  }
});
// cursor move animation
const cursorAnimation = () => {
  let checkCursor;
  checkCursor = setInterval(() => {
    if (state.activeTab != -1 && state.activeTab != 4 && state.step <= 0) {
      gsap.to(".cursor", { opacity: 1, display: "flex" });
    } else {
      gsap.to(".cursor", { opacity: 0, display: "none" });
    }
  }, 100);
  // document.addEventListener("mousemove", (e) => {
  //   gsap.to("#cursor", 0.3, {
  //     x: e.clientX + 10,
  //     y: e.clientY + 10,
  //     stagger: 0.3,
  //     ease: "none",
  //   });
  // });
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
      setTimeout(() => {
        let lodingTl = gsap.timeline();
        lodingTl.to("#loading", { opacity: 0, duration: 0.3 });
        lodingTl.to("#loading", { display: "none" });
      }, 4000);
      clickSectionEvent();
      ProgressEvent();
      mainBurgerEvent();
      cursorAnimation();
      window.addEventListener("resize", documentHeight);
      documentHeight();
    })
  );
} else {
  // `DOMContentLoaded` has already fired
  setTimeout(() => {
    let lodingTl = gsap.timeline();
    lodingTl.to("#loading", { opacity: 0, duration: 0.3 });
    lodingTl.to("#loading", { display: "none" });
  }, 4000);
  clickSectionEvent();
  ProgressEvent();
  mainBurgerEvent();
  cursorAnimation();
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