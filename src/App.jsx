import { useEffect, useRef, useState } from "react";

const projects = [
  { index: "01", name: "LINGO / GROWTH", type: "Product design · live", year: "LIVE", tone: "dark", role: "独立产品设计 / 全栈开发", stack: "React · Next.js · Supabase · EdgeOne", summary: "把机会发现、课程学习、社区组队与个人空间整合为统一的大学生成长平台。" },
  { index: "02", name: "TAP / DIGITAL CARD", type: "Bilingual web experience", year: "LIVE", tone: "coral", role: "产品设计 / 交互开发", stack: "React · TypeScript · Motion", summary: "围绕数学建模协会活动，把实体卡片、数字名片和报名流程连接成一个双语体验。" },
  { index: "03", name: "CREDIT / EXPLAINED", type: "Risk system · research", year: "R&D", tone: "blue", role: "项目负责人 / 数据与产品架构", stack: "Python · LightGBM · SHAP · Streamlit", summary: "比较逻辑回归、WOE 评分卡和 LightGBM，并把评分、解释与复现流程组织成可核验系统。" },
  { index: "04", name: "PACT / BANK AGENT", type: "Agent product · prototype", year: "R&D", tone: "paper", role: "产品定义 / Agent 协作 / 集成交付", stack: "FastAPI · React · SQLite · SQLAlchemy", summary: "为智能转账、账单分析和订阅管理设计可组合的银行智能体流程与合成账户沙箱。" },
  { index: "05", name: "COOKIDEA", type: "AI workspace · prototype", year: "LAB", tone: "dark", role: "产品需求 / 前端原型", stack: "React · TypeScript · Three.js · dnd-kit", summary: "用“食材—创意锅—菜谱”的烹饪隐喻组织技能、资源、痛点和目标，探索 AI 创意工作空间。" },
  { index: "06", name: "FASTYLE NAILBOT", type: "Hardware concept · venture", year: "LAB", tone: "coral", role: "联合发起 / 用户研究 / 产品设计", stack: "需求访谈 · 商业模式 · 产品路线", summary: "围绕个性化、甲型适配、操作效率和安全性，探索智能美甲设备的真实使用场景。" },
];

const steps = [
  { number: "01", title: "QUESTION", body: "从用户、数据和真实场景出发，把模糊问题变成可以验证的产品命题。" },
  { number: "02", title: "MODEL", body: "用研究、信息架构和技术路线把复杂系统拆开，找到能被团队共同理解的结构。" },
  { number: "03", title: "PROTOTYPE", body: "把界面、交互、AI 行为和工程实现放在同一张桌上，快速验证关键假设。" },
  { number: "04", title: "SHIP", body: "测试、复盘、部署，再把结果写成下一轮迭代可以继续使用的产品资产。" },
];

function OrbCanvas({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let raf = 0;
    let pointer = { x: 0.5, y: 0.5 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const box = canvas.getBoundingClientRect();
      canvas.width = box.width * ratio;
      canvas.height = box.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointer = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.height };
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const time = reduceMotion ? 0.6 : frame * 0.009;
      ctx.clearRect(0, 0, width, height);
      const cx = width * (0.5 + (pointer.x - 0.5) * 0.08);
      const cy = height * (0.5 + (pointer.y - 0.5) * 0.06);
      const radius = Math.min(width, height) * 0.31;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.18);
      ctx.strokeStyle = "rgba(255,255,255,.46)";
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 9; ring += 1) {
        const r = radius * (0.2 + ring * 0.1);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * (0.38 + Math.abs(Math.sin(time + ring)) * 0.56), time * 0.5 + ring * 0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let meridian = 0; meridian < 12; meridian += 1) {
        const angle = (meridian / 12) * Math.PI * 2 + time * 0.16;
        const x = Math.cos(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(x, -radius * 0.98);
        ctx.quadraticCurveTo(x * 0.1, 0, x, radius * 0.98);
        ctx.stroke();
      }
      ctx.fillStyle = "#e55139";
      ctx.beginPath();
      ctx.arc(Math.cos(time) * radius * 0.54, Math.sin(time * 1.4) * radius * 0.52, 10 + Math.sin(time) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,.55)";
      for (let star = 0; star < 38; star += 1) {
        const sx = (Math.sin(star * 17.13) * 0.5 + 0.5) * width;
        const sy = (Math.cos(star * 9.71) * 0.5 + 0.5) * height;
        const size = star % 7 === 0 ? 2 : 1;
        ctx.fillRect(sx, sy, size, size);
      }

      if (!reduceMotion) {
        frame += 1;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function MagneticLink({ children, href = "#contact", className = "" }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  const onMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    node.style.setProperty("--mx", `${x * 0.16}px`);
    node.style.setProperty("--my", `${y * 0.16}px`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0px");
    ref.current?.style.setProperty("--my", "0px");
  };

  const onClick = async (event) => {
    if (!href.startsWith("mailto:")) return;
    event.preventDefault();
    const email = href.replace("mailto:", "");
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = href;
    }
  };

  return <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={`magnetic ${className}`}><span>{copied ? "COPIED / 已复制" : children}</span></a>;
}

function App() {
  const [active, setActive] = useState("intro");
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.querySelector(".site-header nav a.active")?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    const revealItems = [...document.querySelectorAll(".reveal-block")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = [...document.querySelectorAll("[data-tilt]")];
    const handlers = cards.map((card) => {
      const move = (event) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        card.style.setProperty("--rx", `${y * -5}deg`);
        card.style.setProperty("--ry", `${x * 6}deg`);
        card.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
      };
      const leave = () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return { card, move, leave };
    });
    return () => handlers.forEach(({ card, move, leave }) => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    });
  }, []);

  const navItems = ["intro", "work", "about", "process", "contact"];

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className={`page-loader ${loading ? "" : "is-done"}`} aria-hidden="true"><div className="loader-mark">ZF</div><div className="loader-lines"><i /><i /><i /><i /><i /><i /><i /><i /></div><span>LOADING / MOFARIGANO 01</span></div>
      <div className="scroll-progress" style={{ "--progress": `${scrollProgress}%` }} aria-hidden="true" />
      <header className="site-header">
        <a className="brand-mark" href="#intro" aria-label="Back to intro">ZF<span>mofarigano</span></a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <a className={active === item ? "active" : ""} href={`#${item}`} key={item}>{item}</a>)}
        </nav>
        <span className="header-index">2026 / 01</span>
      </header>

      <main>
        <section className="hero section" id="intro">
          <div className="hero-copy">
            <p className="eyebrow reveal">PRODUCT THINKER + CREATIVE DEVELOPER</p>
            <h1 className="hero-title"><span className="split-line">I TURN</span><span className="split-line accent-line">COMPLEX</span><span className="split-line">IDEAS INTO PRODUCTS.</span></h1>
            <p className="hero-intro reveal-delay">在数学、AI、产品和工程之间工作，让复杂想法变成能被使用的体验。</p>
            <div className="hero-actions reveal-delay"><a className="text-link" href="#work">VIEW SELECTED WORK <span>↘</span></a><span className="hero-note">SHENZHEN / WORKING ACROSS AI, FINANCE & PRODUCT</span></div>
          </div>
          <div className="hero-stage" aria-hidden="true"><div className="stage-label">INTERACTIVE 3D HERO / 01</div><OrbCanvas className="orb-canvas" /><div className="orb-caption">A SMALL ORBIT<br />FOR BIG IDEAS</div></div>
          <div className="hero-marquee" aria-hidden="true"><span>DESIGN / MOTION / CODE / DESIGN / MOTION / CODE / </span></div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading work-heading reveal-block"><p className="eyebrow">SELECTED WORK / LIVE + LAB</p><h2>MAKE IT<br /><em>USEFUL.</em></h2><p className="section-copy">从大学生成长平台到银行智能体，我把研究、产品设计和工程实现放在同一个连续过程中。</p></div>
          <div className="work-grid">{projects.map((project) => <article
            className={`work-card tone-${project.tone} reveal-block`}
            data-tilt
            key={project.name}
            role="button"
            tabIndex="0"
            aria-label={`Open details for ${project.name}`}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedProject(project); } }}
          ><div className="card-spotlight" /><div className="project-meta"><span>{project.index}</span><span>{project.year}</span></div><div className="project-art" aria-hidden="true"><div className="art-orbit" /><div className="art-block" /><div className="art-line" /></div><div className="project-info"><span>{project.type}</span><h3>{project.name}</h3><span className="project-arrow">↗</span></div><span className="project-open">OPEN DETAILS / 查看详情</span></article>)}</div>
          <div className="work-footer"><span>06 / 12 PROJECTS</span><a className="text-link" href="#contact">START A CONVERSATION <span>↗</span></a></div>
        </section>

        <section className="about section" id="about">
          <div className="about-topline"><span>ABOUT THE PRACTICE</span><span>(01—04)</span></div>
          <div className="about-layout reveal-block"><div><p className="eyebrow">A LITTLE ABOUT ME</p><h2>NO FIXED<br /><em>LANE.</em></h2></div><div className="about-copy"><p>我也担任清华大学深圳国际研究生院经济管理方向导师团队的导师助理，曾在 Two Sigma 参与量化研究实习，并在阿里巴巴国际部 HR 部门实习。我的工作横跨量化研究、AI 应用、全栈产品、用户研究和创新创业。</p><div className="capabilities"><span>01 / PRODUCT</span><span>02 / RESEARCH</span><span>03 / BUILD</span></div></div></div>
          <div className="about-bento reveal-block"><div className="bento-tile tile-wide"><span>01</span><strong>MAKE THE COMPLEX<br />FEEL SIMPLE.</strong></div><div className="bento-tile tile-tall"><span>02</span><strong>MOVE<br />WITH<br />PURPOSE.</strong></div><div className="bento-tile tile-square"><span>03</span><strong>KEEP<br />THE<br />WEIRD.</strong></div></div>
        </section>

        <section className="manifesto section" aria-label="Design manifesto"><div className="manifesto-grid"><span>GOOD DESIGN</span><span>SHOULD MOVE</span><span>PEOPLE.</span></div><div className="manifesto-marquee"><span>SCROLL REVEAL / STICKY SCROLLYTELLING / MAGNETIC BUTTONS / 3D TILT HOVER / </span></div></section>

        <section className="process section" id="process"><div className="process-intro reveal-block"><p className="eyebrow">THE WAY I WORK</p><h2>FROM<br /><em>STATIC</em><br />TO ALIVE.</h2><p>一套简单、透明、能让好想法继续前进的流程。</p></div><div className="process-steps">{steps.map((step, index) => <article className="process-step reveal-block" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><span className="step-progress">0{index + 1} / 04</span></article>)}</div></section>

        <section className="contact section" id="contact"><div className="contact-topline"><span>LAST THING / LET'S TALK</span><span>EMAIL / 2389380094@QQ.COM</span></div><div className="contact-visual"><OrbCanvas className="contact-canvas" /><div className="contact-ring">MAKE / TEST / SHIP / MAKE / TEST / SHIP /</div></div><div className="contact-copy reveal-block"><p className="eyebrow">有项目、研究问题，或一个还没成形的想法？</p><h2>LET'S MAKE<br /><em>THE NEXT THING.</em></h2><MagneticLink href="mailto:2389380094@qq.com" className="contact-link">2389380094@QQ.COM ↗</MagneticLink></div><div className="contact-marquee" aria-hidden="true"><span>MAKE IT MOVE — MAKE IT MATTER — MAKE IT YOURS — </span></div></section>
      </main>

      {selectedProject && <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
        <div className={`project-modal-card tone-${selectedProject.tone}`}>
          <button className="project-modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button>
          <div className="project-modal-meta"><span>{selectedProject.index} / {selectedProject.year}</span><span>{selectedProject.type}</span></div>
          <h2 id="project-modal-title">{selectedProject.name}</h2>
          <div className="project-modal-grid"><div><span className="eyebrow">ROLE</span><p>{selectedProject.role}</p></div><div><span className="eyebrow">STACK / METHOD</span><p>{selectedProject.stack}</p></div></div>
          <p className="project-modal-summary">{selectedProject.summary}</p>
          <div className="project-modal-footer"><span>DETAIL ENTRY / {selectedProject.index}</span><button type="button" onClick={() => setSelectedProject(null)}>BACK TO INDEX ↗</button></div>
        </div>
      </div>}

      <footer className="site-footer"><span>© 2026 朱飞阳 / MOFARIGANO</span><a className="footer-mail" href="mailto:2389380094@qq.com">2389380094@qq.com</a><span>PRODUCT / RESEARCH / BUILD</span><a href="#intro">BACK TO TOP ↑</a></footer>
    </div>
  );
}

export { App };
