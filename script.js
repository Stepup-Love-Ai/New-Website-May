const canvas = document.querySelector("#softMotion");
const ctx = canvas.getContext("2d");
const particles = [];
let width = 0;
let height = 0;
let pixelRatio = 1;
let pointerX = 0;
let pointerY = 0;
const glowColors = [
  "224, 112, 142",
  "236, 154, 171",
  "242, 199, 207",
  "206, 213, 220",
];

function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createParticles() {
  particles.length = 0;
  const count = Math.min(34, Math.max(18, Math.floor(width / 48)));
  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 4 + Math.random() * 14,
      speed: 0.12 + Math.random() * 0.32,
      drift: -0.12 + Math.random() * 0.24,
      alpha: 0.075 + Math.random() * 0.13,
      shape: Math.random() > 0.82 ? "heart" : "circle",
      color: glowColors[Math.floor(Math.random() * glowColors.length)],
    });
  }
}

function drawHeart(x, y, size, alpha, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-13, -3, -9, -15, 0, -8);
  ctx.bezierCurveTo(9, -15, 13, -3, 0, 6);
  ctx.fillStyle = `rgba(${color}, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle) => {
    particle.y -= particle.speed;
    particle.x += particle.drift + pointerX * 0.001;
    if (particle.y < -30) {
      particle.y = height + 30;
      particle.x = Math.random() * width;
    }
    if (particle.x < -30) particle.x = width + 30;
    if (particle.x > width + 30) particle.x = -30;

    if (particle.shape === "heart") {
      drawHeart(particle.x, particle.y, particle.size, particle.alpha, particle.color);
      return;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.16 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const translations = {
  en: {
    "nav.company": "company",
    "nav.product": "Luvluvdaily",
    "nav.experience": "experience",
    "nav.contact": "contact",
    "hero.eyebrow": "About us",
    "hero.title": "Build your AI companion. Live your story in real life.",
    "hero.body":
      "Qkinteq builds AI-driven interactive experiences where planning, emotional connection, and character storytelling become part of everyday life.",
    "hero.primary": "Meet Luvluvdaily",
    "hero.secondary": "See the experience",
    "hero.logo": "Luvluv Daily",
    "studio.eyebrow": "qkinteq AI",
    "studio.title": "We bridge productivity and emotional engagement.",
    "studio.body":
      "Our work combines artificial intelligence, behavioral design, and immersive storytelling to create products that integrate softly into daily life.",
    "studio.orbit1": "AI conversation",
    "studio.orbit2": "behavior loops",
    "studio.orbit3": "character worlds",
    "studio.orbit4": "adaptive planning",
    "product.eyebrow": "Luvluvdaily app",
    "product.title": "An AI-powered companion and planning app with emotional rhythm.",
    "product.card1.title": "Design your companion",
    "product.card1.body":
      "Users create an AI companion with personality, appearance, and voice, making the planner feel personal from the first interaction.",
    "product.card2.title": "Plan through dialogue",
    "product.card2.body":
      "Daily tasks become conversations, check-ins, encouragement, and small moments of companionship instead of a flat checklist.",
    "product.card3.title": "Unlock story progress",
    "product.card3.body":
      "Completing real-life activities opens interactions, rewards, and narrative beats that make routines feel meaningful.",
    "experience.eyebrow": "experience",
    "experience.title": "Soft visuals, living interfaces, and emotional feedback.",
    "experience.row1.eyebrow": "personal companion",
    "experience.row1.title": "Customize your AI Character.",
    "experience.row1.body":
      "Users shape the companion's look, style, and presence before the relationship begins, making productivity feel personal from the first interaction.",
    "experience.row2.eyebrow": "daily rhythm",
    "experience.row2.title": "Planning turns into dialogue.",
    "experience.row2.body":
      "Conversations, focus sessions, and gentle check-ins work together so tasks feel supported instead of isolated.",
    "experience.row3.eyebrow": "story progress",
    "experience.row3.title": "Real routines unlock narrative.",
    "experience.row3.body":
      "Your life is the main storyline. Completing daily activities opens new story beats, rewards, and companion moments, giving everyday goals a sense of emotional progress.",
    "contact.eyebrow": "next generation companionship",
    "contact.title": "We'd love to hear from you",
    "contact.note":
      "Whether you're a user, collaborator, or just curious about what we're building at Qkinteq.",
  },
  zh: {
    "nav.company": "公司",
    "nav.product": "恋恋日程",
    "nav.experience": "体验",
    "nav.contact": "联系",
    "hero.eyebrow": "关于我们",
    "hero.title": "创造你的 AI 陪伴，让真实生活成为故事。",
    "hero.body":
      "Qkinteq 打造由 AI 驱动的互动体验，让计划、情感连接与角色叙事自然融入日常生活。",
    "hero.primary": "了解恋恋日程",
    "hero.secondary": "查看体验",
    "hero.logo": "恋恋日程",
    "studio.eyebrow": "qkinteq AI",
    "studio.title": "我们连接效率与情感体验。",
    "studio.body":
      "我们的工作融合人工智能、行为设计与沉浸式叙事，创造能够柔和融入日常生活的产品。",
    "studio.orbit1": "AI 对话",
    "studio.orbit2": "行为循环",
    "studio.orbit3": "角色世界",
    "studio.orbit4": "自适应计划",
    "product.eyebrow": "恋恋日程应用",
    "product.title": "一款带有情感节奏的 AI 陪伴与计划应用。",
    "product.card1.title": "设计你的AI陪伴角色",
    "product.card1.body": "用户可以创建拥有个性、外观与声音的 AI 陪伴，让计划从第一次互动开始就更私人化。",
    "product.card2.title": "通过对话进行计划",
    "product.card2.body": "每日任务会变成对话、提醒、鼓励与陪伴时刻，而不是一张平面的清单。",
    "product.card3.title": "解锁故事进度",
    "product.card3.body": "完成真实生活中的活动会开启互动、奖励与叙事片段，让日常更有意义。",
    "experience.eyebrow": "体验",
    "experience.title": "柔和视觉、动态界面与情感反馈。",
    "experience.row1.eyebrow": "个性陪伴",
    "experience.row1.title": "定制你的 AI 角色。",
    "experience.row1.body": "用户可以塑造陪伴角色的外观、风格与存在感，让关系在开始前就充满选择感。",
    "experience.row2.eyebrow": "每日节奏",
    "experience.row2.title": "AI角色陪伴你完成计划",
    "experience.row2.body": "对话、专注时段与温柔提醒共同协作，让任务被支持，而不是孤立存在。",
    "experience.row3.eyebrow": "故事进度",
    "experience.row3.title": "完成计划解锁浪漫剧情",
    "experience.row3.body": "你的生活就是主线剧情。完成每日活动会开启新的故事、奖励与陪伴时刻，让目标拥有情感进度。",
    "contact.eyebrow": "下一代陪伴体验",
    "contact.title": "期待听到你的声音",
    "contact.note": "无论你是用户、合作伙伴，还是只是对 Qkinteq 正在创造的东西感到好奇。",
  },
};

let currentLanguage = "en";
const languageToggle = document.querySelector(".language-toggle");
const languageCode = document.querySelector(".language-code");

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key] || translations.en[key] || element.textContent;
  });
  if (languageCode) languageCode.textContent = language === "zh" ? "中" : "EN";
  if (languageToggle) {
    languageToggle.setAttribute("aria-pressed", String(language === "zh"));
    languageToggle.setAttribute(
      "aria-label",
      language === "zh" ? "Switch to English" : "切换到中文",
    );
  }
}

languageToggle?.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "zh" : "en");
});

document.addEventListener("pointermove", (event) => {
  pointerX = event.clientX - width / 2;
  pointerY = event.clientY - height / 2;
  document.querySelectorAll(".phone-shot").forEach((shot, index) => {
    const depth = (index + 1) * 0.006;
    shot.style.setProperty("--tilt-x", `${pointerY * depth}deg`);
    shot.style.setProperty("--tilt-y", `${pointerX * -depth}deg`);
  });
});

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
