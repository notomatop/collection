const header = document.querySelector("[data-header]");
const nav = document.querySelector(".site-nav");
const menuButton = document.querySelector(".menu-toggle");
const showcase = document.querySelector("[data-showcase]");
const deviceScreen = document.querySelector("[data-device-screen]");
const sideLeft = document.querySelector("[data-side-left]");
const sideRight = document.querySelector("[data-side-right]");
const slideCount = document.querySelector("[data-slide-count]");
const slideTitle = document.querySelector("[data-slide-title]");
const slideKicker = document.querySelector("[data-slide-kicker]");
const slideLine = document.querySelector("[data-slide-line]");
const storyIndex = document.querySelector("[data-story-index]");
const storyTitle = document.querySelector("[data-story-title]");
const storyBody = document.querySelector("[data-story-body]");
const storyMetric = document.querySelector("[data-story-metric]");
const storyLabel = document.querySelector("[data-story-label]");
const storyTime = document.querySelector("[data-story-time]");
const storyScreen = document.querySelector("[data-story-screen]");
const pageButtons = [...document.querySelectorAll("[data-page]")];
const nextButton = document.querySelector("[data-next]");
const prevButton = document.querySelector("[data-prev]");

const slides = [
  {
    count: "01 / 03",
    page: "Page 01",
    title: "碳迹 · 碳管理平台",
    kicker: "从数据进入决策",
    line: "企业碳排数据的清晰可视化路径。",
    body:
      "面向企业的碳排管理平台，将数据录入、趋势分析、异常预警和行动建议收束到一条清晰路径。",
    metric: "4",
    label: "角色协作路径",
    time: "12 周",
    accent: "#0066cc",
    position: "2%"
  },
  {
    count: "02 / 03",
    page: "Page 02",
    title: "Wayfinding 导视系统",
    kicker: "从空间进入秩序",
    line: "把访客动线翻译成可读的空间语言。",
    body:
      "为文化艺术中心搭建导视系统，从信息层级、材料质感到地图逻辑，减少复杂空间里的迟疑。",
    metric: "7",
    label: "核心触点",
    time: "9 周",
    accent: "#bf5a45",
    position: "50%"
  },
  {
    count: "03 / 03",
    page: "Page 03",
    title: "Flowo · 专注计时器",
    kicker: "从习惯进入反馈",
    line: "轻量、克制、可以持续使用的移动工具。",
    body:
      "用阶段计时、复盘卡片和趋势反馈支撑专注习惯，让移动端效率工具保持安静而有效。",
    metric: "3",
    label: "核心状态",
    time: "6 周",
    accent: "#1f9f88",
    position: "98%"
  }
];

let activeIndex = 0;
let autoAdvance = window.setInterval(() => goToSlide(activeIndex + 1), 6500);

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("is-menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
}

function wrapIndex(index) {
  return (index + slides.length) % slides.length;
}

function paintScreens(slide, previous, next) {
  document.documentElement.style.setProperty("--accent", slide.accent);
  deviceScreen.style.setProperty("--shot-position", slide.position);
  storyScreen.style.setProperty("--shot-position", slide.position);
  sideLeft.style.setProperty("--shot-position", previous.position);
  sideRight.style.setProperty("--shot-position", next.position);
}

function goToSlide(index) {
  activeIndex = wrapIndex(index);
  const slide = slides[activeIndex];
  const previous = slides[wrapIndex(activeIndex - 1)];
  const next = slides[wrapIndex(activeIndex + 1)];

  showcase.classList.remove("is-switching");
  void showcase.offsetWidth;
  showcase.classList.add("is-switching");

  slideCount.textContent = slide.count;
  slideTitle.textContent = slide.title;
  slideKicker.textContent = slide.kicker;
  slideLine.textContent = slide.line;
  storyIndex.textContent = slide.page;
  storyTitle.textContent = slide.title;
  storyBody.textContent = slide.body;
  storyMetric.textContent = slide.metric;
  storyLabel.textContent = slide.label;
  storyTime.textContent = slide.time;
  paintScreens(slide, previous, next);

  pageButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === activeIndex;
    button.setAttribute("aria-selected", String(selected));
  });
}

function restartAutoAdvance() {
  window.clearInterval(autoAdvance);
  autoAdvance = window.setInterval(() => goToSlide(activeIndex + 1), 6500);
}

menuButton.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) setMenu(false);
});

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToSlide(Number(button.dataset.page));
    restartAutoAdvance();
  });
});

nextButton.addEventListener("click", () => {
  goToSlide(activeIndex + 1);
  restartAutoAdvance();
});

prevButton.addEventListener("click", () => {
  goToSlide(activeIndex - 1);
  restartAutoAdvance();
});

showcase.addEventListener("mouseenter", () => window.clearInterval(autoAdvance));
showcase.addEventListener("mouseleave", restartAutoAdvance);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
  if (event.key === "ArrowRight") {
    goToSlide(activeIndex + 1);
    restartAutoAdvance();
  }
  if (event.key === "ArrowLeft") {
    goToSlide(activeIndex - 1);
    restartAutoAdvance();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

goToSlide(0);
