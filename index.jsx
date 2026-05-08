import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SECTIONS = ["BOOT","ABOUT","XP","PROJECTS","SKILLS","EDU","CONTACT","TERMINAL","PLAY"];

const PROJECTS = [
  {
    id: "P01",
    title: "Box-Build ERP",
    tag: "Manufacturing · Odoo",
    desc: "Led end-to-end ERP implementation for a chip box-build manufacturer. Mapped the entire production flow and rebuilt it inside Odoo — cutting manual overhead, clarifying roles, and reducing dependency on paper trails.",
    result: "↓ Manpower needed · ↑ Process clarity",
    icon: "📦",
  },
  {
    id: "P02",
    title: "Mfg. Workflow Overhaul",
    tag: "Manufacturing · Consulting",
    desc: "Embedded with a manufacturing client to dissect their existing operations. Redesigned workflows inside Odoo from scratch — fewer bottlenecks, full traceability from raw material to finished goods, and measurable drop in delays.",
    result: "↓ Manual effort · ↑ Traceability",
    icon: "⚙️",
  },
  {
    id: "P03",
    title: "Trading ERP Suite",
    tag: "Trading · Multi-client",
    desc: "Handled a portfolio of trading clients — from basic purchase-sale flows to advanced multi-warehouse, multi-currency setups. Each implementation was uniquely configured to the client's business model.",
    result: "Multiple live deployments",
    icon: "📊",
  },
  {
    id: "P04",
    title: "Custom Uniform Industry",
    tag: "Apparel · Complex Flows",
    desc: "Sole consultant on a complex apparel client with custom size matrices, bespoke order flows, and multi-step production. Managed the full implementation independently — requirements, configuration, testing, go-live.",
    result: "Solo delivery · Full adoption",
    icon: "👔",
  },
  {
    id: "P05",
    title: "Holt Doctors CRM",
    tag: "Healthcare · UK",
    desc: "Worked with UK-based NHS hospital clients to rethink the locum doctor hiring process. Built a tailored CRM that tracked candidates, matched shifts, and gave hiring managers real-time visibility — all without the chaos of spreadsheets.",
    result: "↑ Hiring speed · ↑ Retention",
    icon: "🏥",
  },
  {
    id: "P06",
    title: "POS Training Program",
    tag: "Training · Team Lead",
    desc: "Designed and delivered multiple Odoo POS training batches for incoming interns. Created evaluation frameworks, mentored team leads, and submitted performance reports directly to management for payroll processing.",
    result: "3+ batches · Multiple teams",
    icon: "🎓",
  },
];

const SKILLS = [
  { name: "Odoo ERP", level: 92, desc: "End-to-end implementation across manufacturing, trading, CRM & POS" },
  { name: "Business Consulting", level: 88, desc: "Workflow analysis, solution design, and stakeholder alignment" },
  { name: "CRM Systems", level: 85, desc: "Custom CRM design for healthcare and SaaS clients" },
  { name: "Stakeholder Management", level: 90, desc: "C-suite demos, requirement gathering, and adoption driving" },
  { name: "Product Thinking", level: 68, desc: "Actively upskilling in product ownership and market dynamics" },
  { name: "Training & Mentorship", level: 80, desc: "Intern training programs, team management, evaluation reports" },
];

const XP = [
  {
    company: "Odoo India Pvt. Ltd.",
    role: "Business Advisor",
    period: "May 2024 – Present",
    color: "#7C3AED",
    points: [
      "Collaborate with senior management to understand needs and propose tailored ERP solutions",
      "Conduct customized demos across CRM, Sales, Accounting modules showcasing real impact",
      "Perform Odoo Studio customizations for client-specific workflows",
      "Manage pricing negotiations, subscriptions, and post-purchase support",
      "Conducted 3 POS intern training batches — prepared evaluation reports for payroll",
    ],
  },
  {
    company: "IMS Group (Holt Doctors)",
    role: "Senior Sales Consultant",
    period: "Jan 2023 – Apr 2024",
    color: "#D97706",
    points: [
      "Built relationships with NHS hospital stakeholders to understand locum hiring pain points",
      "Delivered CRM demos to healthcare decision-makers, improving system adoption",
      "Expanded market reach by acquiring new NHS Trusts and driving project revenue",
      "Generated 3× client expectations for 4 consecutive months — ICE Award Sep '23",
      "Improved LMS workforce solution revenue by 15%",
    ],
  },
  {
    company: "Skillbee",
    role: "Marketing Intern",
    period: "Nov 2022 – Dec 2022",
    color: "#10B981",
    points: [
      "Executed outbound campaigns via cold calls and email to management-level contacts",
      "Identified key decision-makers and tailored pitches around Skillbee's value proposition",
      "Contributed to strategic marketing campaigns and content creation",
      "Built foundation in market research, campaign analysis, and client communication",
    ],
  },
];

const EDU = [
  {
    school: "New LJ Commerce College",
    uni: "Gujarat University",
    degree: "B.Com — Advanced Accounting, Auditing & Economics",
    year: "2021",
    icon: "🎓",
  },
  {
    school: "Mount Litera Zee School",
    location: "Gandhidham",
    degree: "12th — Commerce",
    year: "2018",
    icon: "📚",
  },
];

// ─── TERMINAL LOGIC ───────────────────────────────────────────────────────────
function runTerminal(input, setLines, gameState, setGameState) {
  const cmd = input.trim().toLowerCase();
  const push = (text, color = "#00FF41") =>
    setLines((l) => [...l, { text, color }]);

  if (cmd === "help") {
    push("══════════════════════════════════════", "#FFD700");
    push("  VARUN OS v1.0 — Available Commands", "#FFD700");
    push("══════════════════════════════════════", "#FFD700");
    push("  whoami      → About Varun");
    push("  skills      → List all skills");
    push("  contact     → Get in touch");
    push("  rps         → Rock Paper Scissors 🪨📄✂️");
    push("  quiz        → Business trivia quiz 🧠");
    push("  joke        → Random business joke 😄");
    push("  hack        → Try hacking in... 👀");
    push("  clear       → Clear terminal");
    push("══════════════════════════════════════", "#FFD700");
  } else if (cmd === "whoami") {
    push(">> VARUN MAHESHWARI", "#FF6B35");
    push("   Business Advisor · ERP Consultant · Problem Solver");
    push("   Based in Gandhinagar, Gujarat 🇮🇳");
    push("   Currently: Odoo India Pvt. Ltd.");
    push("   Motto: 'Grew up figuring out games. Now I figure out businesses.'");
  } else if (cmd === "skills") {
    push(">> SKILL LOADOUT:", "#FF6B35");
    push("   [████████████] Odoo ERP          92%");
    push("   [███████████░] Stakeholder Mgmt  90%");
    push("   [███████████░] Biz Consulting     88%");
    push("   [██████████░░] CRM Systems        85%");
    push("   [████████░░░░] Product Thinking   68%");
  } else if (cmd === "contact") {
    push(">> CONTACT VARUN:", "#FF6B35");
    push("   📧 vmah.official@gmail.com");
    push("   📱 +91 7227005752");
    push("   🔗 linkedin.com/in/varun-maheshwari-8651a8232");
  } else if (cmd === "joke") {
    const jokes = [
      "Why did the ERP consultant go broke? He lost track of his modules.",
      "I told my client 'we need to customize the workflow'. He said 'fine'. I said 'no, that's the module name'.",
      "Sales tip: Never say 'it's complicated'. Say 'it's an enterprise-grade multi-step solution'.",
      "My Odoo demo crashed. I called it a 'real-time stress test feature'.",
    ];
    push(">> 😄 " + jokes[Math.floor(Math.random() * jokes.length)], "#FFD700");
  } else if (cmd === "hack") {
    push(">> Initiating breach...", "#FF0040");
    push("   [▓▓▓▓▓▓▓▓▓▓] 100%", "#FF0040");
    push("   Access granted to... your own portfolio.", "#FF0040");
    push("   Nice try. Go consult something.", "#FFD700");
  } else if (cmd === "clear") {
    setLines([{ text: 'Type "help" to see available commands', color: "#888" }]);
  } else if (cmd === "rps" || cmd === "rock" || cmd === "paper" || cmd === "scissors") {
    if (cmd === "rps") {
      push(">> Rock Paper Scissors — type: rock / paper / scissors", "#FF6B35");
      setGameState({ mode: "rps" });
    } else if (gameState.mode === "rps") {
      const choices = ["rock", "paper", "scissors"];
      const cpu = choices[Math.floor(Math.random() * 3)];
      const emoji = { rock: "🪨", paper: "📄", scissors: "✂️" };
      push(`   You: ${emoji[cmd]} ${cmd} vs CPU: ${emoji[cpu]} ${cpu}`, "#AAA");
      if (cmd === cpu) push("   🟡 Draw!", "#FFD700");
      else if (
        (cmd === "rock" && cpu === "scissors") ||
        (cmd === "paper" && cpu === "rock") ||
        (cmd === "scissors" && cpu === "paper")
      ) push("   🟢 You WIN! ERP speed.", "#00FF41");
      else push("   🔴 CPU wins. Re-strategize.", "#FF0040");
      push('   Play again or type "rps" to restart', "#888");
    } else {
      push(">> Type 'rps' first to start the game!", "#FF0040");
    }
  } else if (cmd === "quiz") {
    const questions = [
      { q: "What does ERP stand for?", a: "enterprise resource planning", hint: "Enterprise Resource _______" },
      { q: "What module tracks customer interactions?", a: "crm", hint: "Three letters, starts with C" },
      { q: "Varun's current employer?", a: "odoo", hint: "It's on this portfolio 😄" },
    ];
    if (!gameState.quiz) {
      const q = questions[Math.floor(Math.random() * questions.length)];
      push(">> QUIZ TIME 🧠", "#FFD700");
      push("   Q: " + q.q);
      push("   Hint: " + q.hint, "#888");
      push("   Type your answer below:", "#888");
      setGameState({ mode: "quiz", q });
    } else if (gameState.q) {
      if (cmd.includes(gameState.q.a)) {
        push("   ✅ Correct! You'd pass a Varun demo.", "#00FF41");
      } else {
        push(`   ❌ Wrong. Answer: ${gameState.q.a.toUpperCase()}`, "#FF0040");
      }
      setGameState({});
    }
  } else {
    push(`>> Command not found: "${cmd}". Type "help" for options.`, "#FF0040");
  }
}

// ─── MINI GAME: SNAKE ─────────────────────────────────────────────────────────
const GRID = 15;
function initSnake() {
  return {
    snake: [{ x: 7, y: 7 }],
    dir: { x: 1, y: 0 },
    food: { x: 3, y: 3 },
    score: 0,
    alive: true,
    started: false,
  };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VarunPortfolio() {
  const [section, setSection] = useState("BOOT");
  const [projectIdx, setProjectIdx] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [termLines, setTermLines] = useState([{ text: 'Type "help" to see available commands', color: "#888" }]);
  const [termInput, setTermInput] = useState("");
  const [termGame, setTermGame] = useState({});
  const [snake, setSnake] = useState(initSnake());
  const [skillAnim, setSkillAnim] = useState(false);
  const termRef = useRef(null);
  const inputRef = useRef(null);
  const snakeRef = useRef(null);
  const snakeState = useRef(initSnake());

  // Boot sequence
  useEffect(() => {
    if (section !== "BOOT") return;
    const lines = [
      { t: 300, text: "VARUN OS v1.0 .......... LOADING", color: "#00FF41" },
      { t: 700, text: "Checking ERP modules ......... OK", color: "#00FF41" },
      { t: 1100, text: "Loading consulting protocols ... OK", color: "#00FF41" },
      { t: 1500, text: "Connecting to stakeholders .... OK", color: "#FFD700" },
      { t: 1900, text: "Calibrating business logic ..... OK", color: "#FFD700" },
      { t: 2300, text: "⚠ Warning: Caffeine levels low", color: "#FF6B35" },
      { t: 2700, text: "Bypassing caffeine check ....... OK", color: "#00FF41" },
      { t: 3200, text: "████████████████████ 100%", color: "#7C3AED" },
      { t: 3700, text: "SYSTEM READY. Welcome.", color: "#FFFFFF" },
    ];
    lines.forEach(({ t, text, color }) => {
      setTimeout(() => setBootLines((l) => [...l, { text, color }]), t);
    });
    setTimeout(() => setBootDone(true), 4200);
  }, [section]);

  // Snake game loop
  useEffect(() => {
    if (section !== "PLAY" || !snake.started || !snake.alive) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        if (!prev.alive || !prev.started) return prev;
        const head = {
          x: (prev.snake[0].x + prev.dir.x + GRID) % GRID,
          y: (prev.snake[0].y + prev.dir.y + GRID) % GRID,
        };
        const ate = head.x === prev.food.x && head.y === prev.food.y;
        const newSnake = [head, ...prev.snake.slice(0, ate ? undefined : -1)];
        const hit = newSnake.slice(1).some((s) => s.x === head.x && s.y === head.y);
        return {
          ...prev,
          snake: newSnake,
          food: ate ? { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) } : prev.food,
          score: ate ? prev.score + 10 : prev.score,
          alive: !hit,
        };
      });
    }, 180);
    return () => clearInterval(interval);
  }, [section, snake.started, snake.alive, snake.dir]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [termLines]);

  const nav = useCallback((dir) => {
    const idx = SECTIONS.indexOf(section);
    if (dir === "RIGHT" || dir === "DOWN") setSection(SECTIONS[Math.min(idx + 1, SECTIONS.length - 1)]);
    if (dir === "LEFT" || dir === "UP") setSection(SECTIONS[Math.max(idx - 1, 0)]);
  }, [section]);

  const handleKey = useCallback((e) => {
    if (section === "PLAY" && snake.started) {
      const map = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } };
      if (map[e.key]) {
        e.preventDefault();
        setSnake((s) => ({ ...s, dir: map[e.key] }));
      }
    }
  }, [section, snake.started]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (section === "SKILLS") {
      setSkillAnim(false);
      setTimeout(() => setSkillAnim(true), 100);
    }
  }, [section]);

  const snakeDir = (dx, dy) => setSnake((s) => ({ ...s, dir: { x: dx, y: dy }, started: true }));

  // ── SCREEN CONTENT ──────────────────────────────────────────────────────────
  const renderScreen = () => {
    if (section === "BOOT") return (
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, lineHeight: 1.6, padding: 8 }}>
        {bootLines.map((l, i) => (
          <div key={i} style={{ color: l.color }}>{l.text}</div>
        ))}
        {bootDone && (
          <div style={{ marginTop: 12, textAlign: "center" }}>
            <div style={{ color: "#FFD700", fontSize: 13, fontWeight: "bold", animation: "blink 1s infinite" }}>
              ► PRESS START ◄
            </div>
            <button onClick={() => setSection("ABOUT")} style={{
              marginTop: 8, background: "#7C3AED", border: "none", color: "#fff",
              padding: "6px 20px", borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
              fontSize: 12, letterSpacing: 2
            }}>ENTER GAME</button>
          </div>
        )}
      </div>
    );

    if (section === "ABOUT") return (
      <div style={{ padding: 10, fontFamily: "'Courier New', monospace" }}>
        <div style={{ color: "#FFD700", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>▶ PLAYER 1 — VARUN</div>
        <div style={{ color: "#7C3AED", fontSize: 16, fontWeight: "bold", lineHeight: 1.2, marginBottom: 6 }}>
          BUSINESS<br />ADVISOR
        </div>
        <div style={{ color: "#ccc", fontSize: 10, lineHeight: 1.7 }}>
          Grew up figuring out games.<br />Now I figure out businesses.<br /><br />
          I design systems, fix workflows,<br />and make operations run smoothly<br />
          — no lag, no bugs, just clean<br />execution.
        </div>
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {["ERP","CRM","Odoo","Consulting","SaaS"].map(t => (
            <span key={t} style={{ background: "#7C3AED33", border: "1px solid #7C3AED", color: "#C4B5FD", fontSize: 9, padding: "2px 6px", borderRadius: 2 }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 10, color: "#888", fontSize: 9 }}>📍 Gandhinagar, Gujarat</div>
      </div>
    );

    if (section === "XP") return (
      <div style={{ padding: 8, fontFamily: "'Courier New', monospace", overflowY: "auto", height: "100%" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 8 }}>▶ EXPERIENCE LOG</div>
        {XP.map((x, i) => (
          <div key={i} style={{ marginBottom: 12, borderLeft: `2px solid ${x.color}`, paddingLeft: 8 }}>
            <div style={{ color: x.color, fontSize: 11, fontWeight: "bold" }}>{x.company}</div>
            <div style={{ color: "#fff", fontSize: 10 }}>{x.role}</div>
            <div style={{ color: "#666", fontSize: 9, marginBottom: 4 }}>{x.period}</div>
            {x.points.slice(0, 2).map((p, j) => (
              <div key={j} style={{ color: "#aaa", fontSize: 9, lineHeight: 1.5 }}>• {p}</div>
            ))}
          </div>
        ))}
      </div>
    );

    if (section === "PROJECTS") return (
      <div style={{ padding: 8, fontFamily: "'Courier New', monospace", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>▶ PROJECT {PROJECTS[projectIdx].id}</div>
        <div style={{ fontSize: 13, color: "#fff", fontWeight: "bold", marginBottom: 2 }}>
          {PROJECTS[projectIdx].icon} {PROJECTS[projectIdx].title}
        </div>
        <div style={{ color: "#7C3AED", fontSize: 9, marginBottom: 6 }}>{PROJECTS[projectIdx].tag}</div>
        <div style={{ color: "#ccc", fontSize: 9, lineHeight: 1.6, flex: 1 }}>{PROJECTS[projectIdx].desc}</div>
        <div style={{ color: "#00FF41", fontSize: 9, marginTop: 6 }}>{PROJECTS[projectIdx].result}</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <button onClick={() => setProjectIdx(i => Math.max(0, i - 1))} style={btnSm("#333", "#aaa")}>◀ PREV</button>
          <span style={{ color: "#555", fontSize: 9 }}>{projectIdx + 1}/{PROJECTS.length}</span>
          <button onClick={() => setProjectIdx(i => Math.min(PROJECTS.length - 1, i + 1))} style={btnSm("#333", "#aaa")}>NEXT ▶</button>
        </div>
      </div>
    );

    if (section === "SKILLS") return (
      <div style={{ padding: 8, fontFamily: "'Courier New', monospace" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 8 }}>▶ SKILL TREE</div>
        {SKILLS.map((s, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#fff", fontSize: 9 }}>{s.name}</span>
              <span style={{ color: "#7C3AED", fontSize: 9 }}>{s.level}%</span>
            </div>
            <div style={{ background: "#1a1a1a", height: 5, borderRadius: 2, marginTop: 2 }}>
              <div style={{
                width: skillAnim ? `${s.level}%` : "0%",
                height: "100%",
                background: `linear-gradient(90deg, #7C3AED, #00FF41)`,
                borderRadius: 2,
                transition: `width ${0.8 + i * 0.15}s cubic-bezier(0.4,0,0.2,1)`,
              }} />
            </div>
          </div>
        ))}
      </div>
    );

    if (section === "EDU") return (
      <div style={{ padding: 10, fontFamily: "'Courier New', monospace" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 10 }}>▶ EDUCATION UNLOCKED</div>
        {EDU.map((e, i) => (
          <div key={i} style={{ marginBottom: 14, background: "#111", border: "1px solid #333", borderRadius: 4, padding: 8 }}>
            <div style={{ fontSize: 18 }}>{e.icon}</div>
            <div style={{ color: "#fff", fontSize: 11, fontWeight: "bold", marginTop: 4 }}>{e.school}</div>
            {e.uni && <div style={{ color: "#7C3AED", fontSize: 9 }}>{e.uni}</div>}
            {e.location && <div style={{ color: "#7C3AED", fontSize: 9 }}>{e.location}</div>}
            <div style={{ color: "#aaa", fontSize: 9, marginTop: 3 }}>{e.degree}</div>
            <div style={{ color: "#00FF41", fontSize: 9, marginTop: 2 }}>Completed {e.year}</div>
          </div>
        ))}
      </div>
    );

    if (section === "CONTACT") return (
      <div style={{ padding: 10, fontFamily: "'Courier New', monospace" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, marginBottom: 10 }}>▶ CONNECT</div>
        {[
          { icon: "📧", label: "Email", val: "vmah.official@gmail.com", href: "mailto:vmah.official@gmail.com" },
          { icon: "📱", label: "Phone", val: "+91 7227005752", href: "tel:+917227005752" },
          { icon: "🔗", label: "LinkedIn", val: "varun-maheshwari", href: "https://www.linkedin.com/in/varun-maheshwari-8651a8232/" },
        ].map((c, i) => (
          <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ marginBottom: 8, background: "#111", border: "1px solid #7C3AED44", borderRadius: 4, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <div>
                <div style={{ color: "#888", fontSize: 8 }}>{c.label}</div>
                <div style={{ color: "#C4B5FD", fontSize: 9 }}>{c.val}</div>
              </div>
            </div>
          </a>
        ))}
        <a href="/VarunResume.pdf" download style={{ textDecoration: "none" }}>
          <div style={{ marginTop: 8, background: "#7C3AED", borderRadius: 4, padding: "8px 10px", textAlign: "center", cursor: "pointer" }}>
            <div style={{ color: "#fff", fontSize: 10, fontFamily: "'Courier New', monospace" }}>⬇ DOWNLOAD RESUME</div>
          </div>
        </a>
      </div>
    );

    if (section === "TERMINAL") return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Courier New', monospace" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 3, padding: "4px 8px", borderBottom: "1px solid #222" }}>▶ TERMINAL v1.0</div>
        <div ref={termRef} style={{ flex: 1, overflowY: "auto", padding: 8, fontSize: 9, lineHeight: 1.7 }}>
          {termLines.map((l, i) => (
            <div key={i} style={{ color: l.color }}>{l.text}</div>
          ))}
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #222", padding: 4 }}>
          <span style={{ color: "#00FF41", fontSize: 10, paddingRight: 4 }}>$</span>
          <input
            ref={inputRef}
            value={termInput}
            onChange={e => setTermInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && termInput.trim()) {
                setTermLines(l => [...l, { text: `$ ${termInput}`, color: "#00FF41" }]);
                runTerminal(termInput, setTermLines, termGame, setTermGame);
                setTermInput("");
              }
            }}
            onClick={() => inputRef.current?.focus()}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 10, fontFamily: "inherit" }}
            placeholder="type a command..."
          />
        </div>
      </div>
    );

    if (section === "PLAY") return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Courier New', monospace" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px", borderBottom: "1px solid #222" }}>
          <span style={{ color: "#FFD700", fontSize: 9 }}>▶ SNAKE</span>
          <span style={{ color: "#00FF41", fontSize: 9 }}>SCORE: {snake.score}</span>
        </div>
        {!snake.started && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ color: "#FFD700", fontSize: 12 }}>🐍 SNAKE</div>
            <div style={{ color: "#888", fontSize: 9, textAlign: "center" }}>Use D-PAD or arrow keys<br/>to move the snake</div>
            <button onClick={() => setSnake(s => ({ ...s, started: true }))} style={btnSm("#7C3AED", "#fff")}>▶ START</button>
          </div>
        )}
        {snake.started && !snake.alive && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ color: "#FF0040", fontSize: 11 }}>GAME OVER</div>
            <div style={{ color: "#FFD700", fontSize: 10 }}>Score: {snake.score}</div>
            <button onClick={() => setSnake(initSnake())} style={btnSm("#7C3AED", "#fff")}>RESTART</button>
          </div>
        )}
        {snake.started && snake.alive && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: 1, width: "100%", aspectRatio: "1" }}>
              {Array.from({ length: GRID * GRID }).map((_, i) => {
                const x = i % GRID, y = Math.floor(i / GRID);
                const isHead = snake.snake[0]?.x === x && snake.snake[0]?.y === y;
                const isBody = snake.snake.slice(1).some(s => s.x === x && s.y === y);
                const isFood = snake.food.x === x && snake.food.y === y;
                return (
                  <div key={i} style={{
                    background: isHead ? "#00FF41" : isBody ? "#7C3AED" : isFood ? "#FFD700" : "#0a0a0a",
                    borderRadius: isHead || isFood ? "50%" : 1,
                  }} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const btnSm = (bg, color) => ({
    background: bg, border: "none", color, padding: "4px 10px", borderRadius: 3,
    cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: 1,
  });

  const sectionIdx = SECTIONS.indexOf(section);
  const sectionLabel = ["BOOT","ABOUT","EXP","PROJECTS","SKILLS","EDU","CONTACT","TERMINAL","PLAY"][sectionIdx];

  // ── FULL PAGE RENDER ────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      padding: "20px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
        backgroundSize: "40px 40px", opacity: 0.4
      }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 20, position: "relative" }}>
        <div style={{ color: "#FFD700", fontSize: 10, letterSpacing: 6, marginBottom: 4 }}>— PORTFOLIO —</div>
        <div style={{
          fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, letterSpacing: 4,
          background: "linear-gradient(135deg, #7C3AED 0%, #FFD700 50%, #FF6B35 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}>VARUN</div>
        <div style={{ color: "#666", fontSize: 10, letterSpacing: 8, marginTop: 2 }}>MAHESHWARI</div>
      </div>

      {/* Console body */}
      <div style={{
        width: "min(360px, 92vw)",
        background: "linear-gradient(160deg, #1C6B8A 0%, #0E4A63 40%, #093547 100%)",
        borderRadius: "24px 24px 40px 40px",
        boxShadow: "0 0 0 3px #0a2f40, 0 0 0 6px #1C6B8A44, 0 30px 80px #00000099, inset 0 1px 0 #4AADCF55",
        padding: "16px 16px 24px",
        position: "relative",
      }}>
        {/* Top label */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
          <span style={{ color: "#FFD700", fontSize: 8, letterSpacing: 2, fontStyle: "italic" }}>WEJJElectronics</span>
          <span style={{ color: "#00FF41", fontSize: 8 }}>● LIVE</span>
          <span style={{ color: "#FFD700", fontSize: 8, letterSpacing: 2, fontStyle: "italic" }}>WEJJElectronics</span>
        </div>

        {/* Screen bezel */}
        <div style={{
          background: "#050F12",
          borderRadius: 8,
          padding: "4px",
          boxShadow: "inset 0 0 20px #000, 0 0 0 3px #0a2030, 0 0 0 5px #1C6B8A66",
          marginBottom: 16,
          border: "2px solid #0a1820",
        }}>
          {/* Screen inner */}
          <div style={{
            background: "#0a1208",
            borderRadius: 6,
            height: 220,
            overflow: "hidden",
            position: "relative",
            boxShadow: "inset 0 0 30px #00FF4108",
          }}>
            {/* Screen reflection */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "30%",
              background: "linear-gradient(180deg, #ffffff08 0%, transparent 100%)",
              pointerEvents: "none", zIndex: 10, borderRadius: "6px 6px 0 0",
            }} />
            {/* Nav bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              background: "#050F12", borderBottom: "1px solid #1a3020",
              display: "flex", alignItems: "center", gap: 2, padding: "3px 6px", zIndex: 5,
            }}>
              {SECTIONS.slice(1).map((s, i) => (
                <button key={s} onClick={() => setSection(s)} style={{
                  background: section === s ? "#7C3AED" : "transparent",
                  border: "none", color: section === s ? "#fff" : "#444",
                  fontSize: 7, padding: "1px 4px", borderRadius: 2,
                  cursor: "pointer", fontFamily: "inherit", letterSpacing: 1,
                  transition: "all 0.2s",
                }}>{["ABOUT","EXP","PROJ","SKILL","EDU","CNTCT","TERM","PLAY"][i]}</button>
              ))}
            </div>
            {/* Content */}
            <div style={{ position: "absolute", inset: 0, top: 20, overflowY: "auto" }}>
              {renderScreen()}
            </div>
          </div>
        </div>

        {/* Controls area */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px" }}>
          {/* D-PAD */}
          <div style={{ position: "relative", width: 90, height: 90 }}>
            {/* Center */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 26, height: 26, background: "#0E4A63", borderRadius: 3,
              boxShadow: "0 2px 4px #000",
            }} />
            {/* UP */}
            <button onClick={() => { nav("UP"); if (section === "PLAY") snakeDir(0,-1); }}
              style={{ ...dpadBtn, top: 0, left: "50%", transform: "translateX(-50%)" }}>▲</button>
            {/* DOWN */}
            <button onClick={() => { nav("DOWN"); if (section === "PLAY") snakeDir(0,1); }}
              style={{ ...dpadBtn, bottom: 0, left: "50%", transform: "translateX(-50%)" }}>▼</button>
            {/* LEFT */}
            <button onClick={() => { nav("LEFT"); if (section === "PLAY") snakeDir(-1,0); }}
              style={{ ...dpadBtn, left: 0, top: "50%", transform: "translateY(-50%)" }}>◀</button>
            {/* RIGHT */}
            <button onClick={() => { nav("RIGHT"); if (section === "PLAY") snakeDir(1,0); }}
              style={{ ...dpadBtn, right: 0, top: "50%", transform: "translateY(-50%)" }}>▶</button>
            {/* Labels */}
            <span style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", color: "#aaa", fontSize: 7, whiteSpace: "nowrap" }}>UP / PREV</span>
            <span style={{ position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)", color: "#aaa", fontSize: 7, whiteSpace: "nowrap" }}>DOWN / NEXT</span>
          </div>

          {/* Center buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            <button onClick={() => setSection("BOOT")} style={{
              background: "#0E4A63", border: "1px solid #1C6B8A", color: "#FFD700",
              padding: "3px 10px", borderRadius: 10, cursor: "pointer", fontSize: 8,
              fontFamily: "inherit", letterSpacing: 1,
            }}>PAUSE</button>
            <button onClick={() => setSection("ABOUT")} style={{
              background: "#7C3AED", border: "none", color: "#fff",
              padding: "4px 12px", borderRadius: 10, cursor: "pointer", fontSize: 8,
              fontFamily: "inherit", letterSpacing: 1,
              boxShadow: "0 3px 0 #4C1D95",
            }}>START</button>
          </div>

          {/* A/B buttons */}
          <div style={{ position: "relative", width: 90, height: 90 }}>
            {/* B button */}
            <button onClick={() => setSection("TERMINAL")} style={{
              ...actionBtn("#7C3AED"), position: "absolute", left: 0, top: "50%", transform: "translateY(-20%)",
            }}>
              <span style={{ fontSize: 8 }}>B</span>
              <span style={{ fontSize: 6, display: "block", color: "#C4B5FD" }}>TERM</span>
            </button>
            {/* A button */}
            <button onClick={() => setSection("PLAY")} style={{
              ...actionBtn("#9333EA"), position: "absolute", right: 0, top: "50%", transform: "translateY(-80%)",
            }}>
              <span style={{ fontSize: 8 }}>A</span>
              <span style={{ fontSize: 6, display: "block", color: "#DDD6FE" }}>PLAY</span>
            </button>
            <span style={{ position: "absolute", top: -14, right: 4, color: "#aaa", fontSize: 7 }}>ACTION</span>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }}>
          {["VOL-","VOL+","ON/OFF"].map((lbl, i) => (
            <button key={i} onClick={() => { if (lbl === "ON/OFF") setSection("BOOT"); }}
              style={{
                background: "#0E4A63", border: "1px solid #1C6B8A55", color: "#888",
                padding: "3px 8px", borderRadius: 8, cursor: "pointer", fontSize: 7,
                fontFamily: "inherit", letterSpacing: 1,
              }}>{lbl}</button>
          ))}
          <a href="/VarunResume.pdf" download style={{ textDecoration: "none" }}>
            <button style={{
              background: "#D97706", border: "none", color: "#fff",
              padding: "3px 8px", borderRadius: 8, cursor: "pointer", fontSize: 7,
              fontFamily: "inherit", letterSpacing: 1,
            }}>⬇ CV</button>
          </a>
        </div>

        {/* Bottom art */}
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22 }}>🐒</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#FFD700", fontSize: 8, fontWeight: "bold", letterSpacing: 2 }}>金睛霎</div>
            <div style={{ color: "#FF6B35", fontSize: 11, fontStyle: "italic", fontWeight: "bold" }}>Golden Light</div>
            <div style={{ color: "#aaa", fontSize: 7 }}>WY-2007</div>
          </div>
          <div style={{ color: "#666", fontSize: 8 }}>VM™</div>
        </div>
      </div>

      {/* Section indicator */}
      <div style={{ marginTop: 16, display: "flex", gap: 6 }}>
        {SECTIONS.slice(1).map((s) => (
          <div key={s} onClick={() => setSection(s)} style={{
            width: section === s ? 20 : 6, height: 6,
            background: section === s ? "#7C3AED" : "#333",
            borderRadius: 3, cursor: "pointer",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
      <div style={{ color: "#555", fontSize: 9, marginTop: 6, letterSpacing: 2 }}>
        {sectionLabel} — USE D-PAD OR CLICK BUTTONS
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 3px; }
      `}</style>
    </div>
  );
}

const dpadBtn = {
  position: "absolute", width: 26, height: 26,
  background: "linear-gradient(145deg, #9B59B6, #7C3AED)",
  border: "none", borderRadius: 4,
  color: "#fff", fontSize: 10, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  boxShadow: "0 3px 0 #4C1D95, 0 4px 8px #00000066",
  transition: "transform 0.1s, box-shadow 0.1s",
};

const actionBtn = (bg) => ({
  width: 36, height: 36, borderRadius: "50%",
  background: `linear-gradient(145deg, ${bg}, #4C1D95)`,
  border: "none", color: "#fff", cursor: "pointer",
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  boxShadow: `0 3px 0 #3b0764, 0 4px 10px #00000077`,
  fontFamily: "'Courier New', monospace",
  transition: "transform 0.1s",
});
