// ===========================
//   MORZEN — script.js
// ===========================

const BRAND_NAME = "MORZEN";

// ===========================
//   DATA
// ===========================
const ALL_COURSES = [
  { name: "Python",         emoji: "🐍", color: "#00D4FF" },
  { name: "Web Dev",        emoji: "🌐", color: "#D4AF37" },
  { name: "Java",           emoji: "☕", color: "#E74C3C" },
  { name: "App Dev",        emoji: "📱", color: "#00D4FF" },
  { name: "Software Dev",   emoji: "💻", color: "#D4AF37" },
  { name: "AI Engineering", emoji: "🤖", color: "#E74C3C" }
];

const COURSE_TOPICS = {
  "Introduction & Basics":  ["Overview & History","Setting Up Environment","Core Syntax","First Program","Basic Debugging"],
  "Core Concepts":          ["Data Types","Control Flow","Functions","Error Handling","Standard Library"],
  "Intermediate Topics":    ["OOP Principles","File I/O","Modules & Packages","APIs & Requests","Testing Basics"],
  "Advanced Techniques":    ["Design Patterns","Performance Optimization","Security Practices","Concurrency","Build Tools"],
  "Project & Capstone":     ["Project Planning","Architecture Design","Implementation","Code Review","Deployment"]
};
const PRIMARY_MODULES = Object.keys(COURSE_TOPICS);

const BV_MODULES = [
  "Foundations & Theory",
  "Core Methodology",
  "Applied Techniques",
  "Research & Capstone"
];
const BV_TOPICS_MAP = {
  "Foundations & Theory":  ["Historical Context","Core Principles","Terminology","Fundamental Laws","Key Frameworks"],
  "Core Methodology":      ["Research Methods","Data Collection","Analysis Techniques","Case Studies","Practical Labs"],
  "Applied Techniques":    ["Real-World Applications","Simulation & Modeling","Tools & Software","Industry Standards","Problem Solving"],
  "Research & Capstone":   ["Literature Review","Project Proposal","Implementation","Results & Analysis","Final Presentation"]
};

const BON_VOYAGE_COURSES = [
  { name: "Mechanical Engineering", emoji: "⚙️",  price: 30, desc: "Machines, forces & thermodynamics" },
  { name: "Astronomy",              emoji: "🌌",  price: 40, desc: "Stars, galaxies & the cosmos" },
  { name: "Biotechnology",          emoji: "🧬",  price: 50, desc: "DNA, genetic engineering & biotech" },
  { name: "Civil Engineering",      emoji: "🏗️",  price: 35, desc: "Structures, materials & construction" },
  { name: "Cybersecurity",          emoji: "🔒",  price: 60, desc: "Systems, networks & data protection" },
  { name: "Data Science",           emoji: "📊",  price: 55, desc: "Statistics, wrangling & ML pipelines" },
  { name: "Electrical Engineering", emoji: "⚡",  price: 45, desc: "Circuits, electronics & power systems" },
  { name: "Environmental Science",  emoji: "🌿",  price: 25, desc: "Ecology, sustainability & climate" },
  { name: "Robotics",               emoji: "🦾",  price: 60, desc: "Sensors, actuators & automation" },
  { name: "Quantum Computing",      emoji: "🔮",  price: 60, desc: "Qubits, superposition & algorithms" }
];

const ORO_RESPONSES = [
  "Understood. I've analyzed your query. I recommend focusing on completing the remaining modules in your primary courses to maximize credit yield.",
  "Affirmative. Your learning trajectory is on schedule. Consistent daily engagement yields optimal knowledge retention.",
  "Processing... Based on your current completion rate, you are progressing within expected parameters. Keep it up.",
  "That is an excellent area of inquiry. I recommend cross-referencing multiple modules for a comprehensive understanding.",
  "I've run a diagnostic on your progress metrics. You are performing well within efficiency parameters.",
  "Noted. I suggest proceeding with the next available topic to maintain your momentum.",
  "My analysis indicates that completing Bon Voyage courses would significantly diversify your technical skill set.",
  "Acknowledged. Allow me to cross-reference your learning profile for a more precise assessment."
];

// ===========================
//   STATE
// ===========================
function getState() {
  return {
    userName:               localStorage.getItem('mz_userName') || '',
    goldCount:              parseInt(localStorage.getItem('mz_goldCount')) || 0,
    selectedPrimaryCourses: JSON.parse(localStorage.getItem('mz_selectedPrimary'))   || [],
    unlockedBonVoyage:      JSON.parse(localStorage.getItem('mz_unlockedBonVoyage')) || [],
    completedTopics:        JSON.parse(localStorage.getItem('mz_completedTopics'))   || {},
    bvCompletedTopics:      JSON.parse(localStorage.getItem('mz_bvCompletedTopics')) || {}
  };
}

function saveState(s) {
  localStorage.setItem('mz_userName',          s.userName);
  localStorage.setItem('mz_goldCount',         s.goldCount);
  localStorage.setItem('mz_selectedPrimary',   JSON.stringify(s.selectedPrimaryCourses));
  localStorage.setItem('mz_unlockedBonVoyage', JSON.stringify(s.unlockedBonVoyage));
  localStorage.setItem('mz_completedTopics',   JSON.stringify(s.completedTopics));
  localStorage.setItem('mz_bvCompletedTopics', JSON.stringify(s.bvCompletedTopics));
}

// ===========================
//   NAVIGATION & GUARD
// ===========================
function navigate(page) { window.location.href = page; }

function guardPage() {
  const s = getState();
  if (!s.userName || s.selectedPrimaryCourses.length < 2) {
    window.location.href = 'index.html'; return;
  }
  updateGoldDisplay();
  const pn = document.getElementById('profileName');
  if (pn) pn.textContent = s.userName;
  const pni = document.getElementById('profileNameInput');
  if (pni) pni.value = s.userName;
}

function updateGoldDisplay() {
  const el = document.getElementById('goldDisplay');
  if (el) el.textContent = getState().goldCount;
}

// ===========================
//   PROFILE
// ===========================
function openProfile() {
  const s = getState();
  const pn = document.getElementById('profileName');
  if (pn) pn.textContent = s.userName;
  const pni = document.getElementById('profileNameInput');
  if (pni) pni.value = s.userName;
  document.getElementById('profileModal').classList.remove('hidden');
}
function closeProfile() {
  document.getElementById('profileModal').classList.add('hidden');
}
function updateName() {
  const input = document.getElementById('profileNameInput');
  const newName = input.value.trim();
  if (!newName) return;
  const s = getState();
  s.userName = newName;
  saveState(s);
  const pn = document.getElementById('profileName');
  if (pn) pn.textContent = newName;
  const hn = document.getElementById('homeUserName');
  if (hn) hn.textContent = newName;
  closeProfile();
}
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// ===========================
//   INDEX PAGE
// ===========================
(function initIndex() {
  if (!document.getElementById('loginForm')) return;
  const s = getState();
  if (s.userName && s.selectedPrimaryCourses.length === 2) {
    window.location.href = 'assets/home.html'; return;
  }
  if (s.userName) showLoginScreen('selectionScreen');

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    if (!name) return;
    const st = getState();
    st.userName = name;
    saveState(st);
    showLoginScreen('selectionScreen');
  });

  document.getElementById('courseGrid').addEventListener('click', e => {
    const card = e.target.closest('.course-card');
    if (!card) return;
    const course = card.dataset.course;
    const st = getState();
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
      st.selectedPrimaryCourses = st.selectedPrimaryCourses.filter(c => c !== course);
    } else {
      if (st.selectedPrimaryCourses.length >= 2) return;
      card.classList.add('selected');
      st.selectedPrimaryCourses.push(course);
    }
    saveState(st);
    updateSelNextBtn(st.selectedPrimaryCourses.length);
    document.getElementById('selCount').textContent = st.selectedPrimaryCourses.length;
  });

  function updateSelNextBtn(count) {
    const btn = document.getElementById('nextBtn');
    if (count === 2) {
      btn.className = 'btn-enabled';
      btn.disabled = false;
      btn.onclick = () => { window.location.href = 'assets/home.html'; };
    } else {
      btn.className = 'btn-disabled';
      btn.disabled = true;
      btn.onclick = null;
    }
  }

  function showLoginScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
})();

// ===========================
//   HOME
// ===========================
function initHome() {
  const s = getState();
  const hn = document.getElementById('homeUserName');
  if (hn) hn.textContent = s.userName;

  // total completed topics (primary + bv)
  const primaryDone = Object.values(s.completedTopics)
    .reduce((acc, modules) => {
      return acc + Object.values(modules).reduce((a, topics) => {
        return a + (typeof topics === 'object' ? Object.values(topics).filter(Boolean).length : 0);
      }, 0);
    }, 0);

  const bvDone = Object.values(s.bvCompletedTopics)
    .reduce((acc, modules) => {
      return acc + Object.values(modules).reduce((a, topics) => {
        return a + (typeof topics === 'object' ? Object.values(topics).filter(Boolean).length : 0);
      }, 0);
    }, 0);

  document.getElementById('statGold').textContent      = s.goldCount;
  document.getElementById('statCompleted').textContent = primaryDone + bvDone;
  document.getElementById('statUnlocked').textContent  = s.unlockedBonVoyage.length;

  const container = document.getElementById('progressCards');
  container.innerHTML = '';
  s.selectedPrimaryCourses.forEach(courseName => {
    const cd = ALL_COURSES.find(c => c.name === courseName);
    const done = getPrimaryCompletedCount(courseName);
    const total = PRIMARY_MODULES.length * 5;
    const pct = Math.round((done / total) * 100);

    const card = document.createElement('div');
    card.className = 'progress-card';
    card.innerHTML = `
      <div class="pie-chart-wrap">
        <canvas id="pie-${safeId(courseName)}" width="80" height="80"></canvas>
        <span class="pie-label">${pct}%</span>
      </div>
      <div class="progress-info">
        <h3>${courseName}</h3>
        <p>${done}/${total} topics complete</p>
        <p class="credit-earned">Credits: ${done * 10}</p>
      </div>
    `;
    card.onclick = () => navigate('assets/courses.html');
    container.appendChild(card);
    drawPie(`pie-${safeId(courseName)}`, pct, cd.color);
  });
}

function getPrimaryCompletedCount(courseName) {
  const s = getState();
  const modules = s.completedTopics[courseName];
  if (!modules) return 0;
  let count = 0;
  Object.values(modules).forEach(topics => {
    if (typeof topics === 'object') {
      count += Object.values(topics).filter(Boolean).length;
    }
  });
  return count;
}

function drawPie(canvasId, pct, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 40, cy = 40, r = 32;
  ctx.clearRect(0, 0, 80, 80);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 10; ctx.stroke();
  if (pct > 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (pct / 100) * Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.stroke();
  }
}

function safeId(str) { return str.replace(/[\s&./]/g, ''); }

// ===========================
//   COURSES PAGE
// ===========================

// Track currently open topic
let currentCourse   = '';
let currentModule   = '';
let currentTopicIdx = 0;
let currentIsBV     = false;
let isPlaying       = false;

function initCourses() {
  renderPrimaryList();
  renderAdditionalList();
}

function switchCourseTab(type) {
  document.querySelectorAll('.ctab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.ctab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(type + 'CoursesList').classList.add('active');
  document.getElementById(type + 'TabBtn').classList.add('active');
}

// ---- PRIMARY LIST ----
function renderPrimaryList() {
  const s = getState();
  const container = document.getElementById('primaryCoursesList');
  container.innerHTML = '';

  s.selectedPrimaryCourses.forEach(courseName => {
    const done  = getPrimaryCompletedCount(courseName);
    const total = PRIMARY_MODULES.length * 5;

    // Course header
    const header = document.createElement('div');
    header.className = 'course-section-header';
    header.innerHTML = `<span>${courseName}</span><span class="course-progress-mini">${done}/${total}</span>`;
    container.appendChild(header);

    // Modules
    PRIMARY_MODULES.forEach((modName, mIdx) => {
      const topics = COURSE_TOPICS[modName];
      const anyDone = topics.some((_, tIdx) => isPrimaryTopicDone(courseName, modName, tIdx));

      const modRow = document.createElement('div');
      modRow.className = `module-row${anyDone ? ' has-completed' : ''}`;

      modRow.innerHTML = `
        <div class="module-row-header">
          <div class="module-num-badge">${anyDone ? '✓' : mIdx + 1}</div>
          <span class="module-row-name">${modName}</span>
          <span class="module-row-arrow">▶</span>
        </div>
        <div class="topics-list"></div>
      `;

      const topicsList = modRow.querySelector('.topics-list');
      topics.forEach((topicName, tIdx) => {
        const done = isPrimaryTopicDone(courseName, modName, tIdx);
        const topicEl = document.createElement('div');
        topicEl.className = 'topic-item';
        if (currentCourse === courseName && currentModule === modName && currentTopicIdx === tIdx && !currentIsBV) {
          topicEl.classList.add('active-topic');
        }
        topicEl.innerHTML = `
          <span>${topicName}</span>
          <span class="topic-status ${done ? 'done' : ''}">${done ? '✓' : '○'}</span>
        `;
        topicEl.onclick = () => openPlayerPanel(courseName, modName, tIdx, topicName, false);
        topicsList.appendChild(topicEl);
      });

      modRow.querySelector('.module-row-header').addEventListener('click', () => {
        modRow.classList.toggle('open');
      });

      container.appendChild(modRow);
    });
  });
}

// ---- ADDITIONAL LIST (BV Unlocked) ----
function renderAdditionalList() {
  const s = getState();
  const container = document.getElementById('additionalCoursesList');
  container.innerHTML = '';

  if (s.unlockedBonVoyage.length === 0) {
    container.innerHTML = `
      <div class="additional-empty">
        <div class="empty-icon">🔒</div>
        <p>No additional courses unlocked yet</p>
        <span>Visit Bon Voyage to spend your credits and unlock new courses</span>
        <br/>
        <button class="btn-goto" onclick="navigate('assets/bonvoyage.html')">GO TO BON VOYAGE</button>
      </div>
    `;
    return;
  }

  // For each unlocked BV course — render exactly like primary courses
  s.unlockedBonVoyage.forEach(courseName => {
    const bvCourse = BON_VOYAGE_COURSES.find(c => c.name === courseName);
    const done  = getBVCompletedCount(courseName);
    const total = BV_MODULES.length * 5;

    // Course header (gold tinted for BV)
    const header = document.createElement('div');
    header.className = 'course-section-header bv-course-header';
    header.innerHTML = `
      <span>${bvCourse.emoji} ${courseName}</span>
      <span class="course-progress-mini">${done}/${total}</span>
    `;
    container.appendChild(header);

    // BV Modules (4 modules)
    BV_MODULES.forEach((modName, mIdx) => {
      const topics = BV_TOPICS_MAP[modName];
      const anyDone = topics.some((_, tIdx) => isBVTopicDone(courseName, modName, tIdx));

      const modRow = document.createElement('div');
      modRow.className = `module-row bv-module${anyDone ? ' has-completed' : ''}`;

      modRow.innerHTML = `
        <div class="module-row-header">
          <div class="module-num-badge">${anyDone ? '✓' : mIdx + 1}</div>
          <span class="module-row-name">${modName}</span>
          <span class="module-row-arrow">▶</span>
        </div>
        <div class="topics-list"></div>
      `;

      const topicsList = modRow.querySelector('.topics-list');
      topics.forEach((topicName, tIdx) => {
        const done = isBVTopicDone(courseName, modName, tIdx);
        const topicEl = document.createElement('div');
        topicEl.className = 'topic-item';
        if (currentCourse === courseName && currentModule === modName && currentTopicIdx === tIdx && currentIsBV) {
          topicEl.classList.add('active-topic');
        }
        topicEl.innerHTML = `
          <span>${topicName}</span>
          <span class="topic-status ${done ? 'done' : ''}">${done ? '✓' : '○'}</span>
        `;
        topicEl.onclick = () => openPlayerPanel(courseName, modName, tIdx, topicName, true);
        topicsList.appendChild(topicEl);
      });

      modRow.querySelector('.module-row-header').addEventListener('click', () => {
        modRow.classList.toggle('open');
      });

      container.appendChild(modRow);
    });
  });
}

// ---- TOPIC DONE CHECKS ----
function isPrimaryTopicDone(courseName, modName, topicIdx) {
  const s = getState();
  return s.completedTopics?.[courseName]?.[modName]?.[topicIdx] === true;
}

function isBVTopicDone(courseName, modName, topicIdx) {
  const s = getState();
  return s.bvCompletedTopics?.[courseName]?.[modName]?.[topicIdx] === true;
}

function getBVCompletedCount(courseName) {
  const s = getState();
  const modules = s.bvCompletedTopics[courseName];
  if (!modules) return 0;
  let count = 0;
  Object.values(modules).forEach(topics => {
    if (typeof topics === 'object') {
      count += Object.values(topics).filter(Boolean).length;
    }
  });
  return count;
}

// ---- OPEN PLAYER ----
function openPlayerPanel(courseName, modName, topicIdx, topicName, isBV) {
  currentCourse   = courseName;
  currentModule   = modName;
  currentTopicIdx = topicIdx;
  currentIsBV     = isBV;
  isPlaying       = false;

  const isDone = isBV
    ? isBVTopicDone(courseName, modName, topicIdx)
    : isPrimaryTopicDone(courseName, modName, topicIdx);

  // Show player
  document.getElementById('playerIdle').classList.add('hidden');
  document.getElementById('playerActive').classList.remove('hidden');

  // Breadcrumb
  document.getElementById('playerBreadcrumb').innerHTML =
    `${courseName} → ${modName} → <span class="bc-active">${topicName}</span>`;

  // Credits label
  const credEl = document.getElementById('playerCreditsLabel');
  if (isBV) {
    credEl.textContent = isDone ? 'Already completed — No more credits' : '+5 credits on first completion';
  } else {
    credEl.textContent = isDone ? '+5 credits (repeat study)' : '+10 credits on first completion';
  }

  // Buttons
  const completeBtn = document.getElementById('completeBtn');
  const alreadyDone = document.getElementById('alreadyDone');
  const repeatBtn   = document.getElementById('repeatBtn');

  if (isBV) {
    // BV: first time = 5 gold, repeat = 0 gold, show already done
    if (isDone) {
      completeBtn.classList.add('hidden');
      repeatBtn.classList.add('hidden');
      alreadyDone.classList.remove('hidden');
      alreadyDone.textContent = '⚓ Already completed — No more credits for this topic';
    } else {
      completeBtn.classList.remove('hidden');
      completeBtn.textContent = 'MARK COMPLETE & EARN CREDITS';
      repeatBtn.classList.add('hidden');
      alreadyDone.classList.add('hidden');
    }
  } else {
    // Primary: first time = 10, repeat = 5
    if (isDone) {
      completeBtn.classList.add('hidden');
      alreadyDone.classList.remove('hidden');
      alreadyDone.textContent = '✓ TOPIC COMPLETED — REPEAT STUDY EARNS 5 CREDITS';
      repeatBtn.classList.remove('hidden');
    } else {
      completeBtn.classList.remove('hidden');
      completeBtn.textContent = 'MARK COMPLETE & EARN CREDITS';
      alreadyDone.classList.add('hidden');
      repeatBtn.classList.add('hidden');
    }
  }

  // Reset play
  document.getElementById('playIcon').classList.remove('hidden');
  document.getElementById('pauseIcon').classList.add('hidden');

  // Re-render lists to update active highlight
  renderPrimaryList();
  renderAdditionalList();

  // Re-open the correct module
  reopenActiveModule();
}

function reopenActiveModule() {
  // Find and open the module row that contains the active topic
  const moduleRows = document.querySelectorAll('.module-row');
  moduleRows.forEach(row => {
    const activeTopic = row.querySelector('.active-topic');
    if (activeTopic) {
      row.classList.add('open');
    }
  });
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  document.getElementById('playIcon').classList.toggle('hidden', isPlaying);
  document.getElementById('pauseIcon').classList.toggle('hidden', !isPlaying);
}

function replayTopic() {
  isPlaying = false;
  document.getElementById('playIcon').classList.remove('hidden');
  document.getElementById('pauseIcon').classList.add('hidden');
}

function nextTopic() {
  if (currentIsBV) {
    const topics = BV_TOPICS_MAP[currentModule];
    if (!topics) return;
    if (currentTopicIdx < topics.length - 1) {
      openPlayerPanel(currentCourse, currentModule, currentTopicIdx + 1, topics[currentTopicIdx + 1], true);
    } else {
      const mIdx = BV_MODULES.indexOf(currentModule);
      if (mIdx < BV_MODULES.length - 1) {
        const nextMod = BV_MODULES[mIdx + 1];
        openPlayerPanel(currentCourse, nextMod, 0, BV_TOPICS_MAP[nextMod][0], true);
      }
    }
  } else {
    const topics = COURSE_TOPICS[currentModule];
    if (!topics) return;
    if (currentTopicIdx < topics.length - 1) {
      openPlayerPanel(currentCourse, currentModule, currentTopicIdx + 1, topics[currentTopicIdx + 1], false);
    } else {
      const mIdx = PRIMARY_MODULES.indexOf(currentModule);
      if (mIdx < PRIMARY_MODULES.length - 1) {
        const nextMod = PRIMARY_MODULES[mIdx + 1];
        openPlayerPanel(currentCourse, nextMod, 0, COURSE_TOPICS[nextMod][0], false);
      }
    }
  }
}

function completeTopic() {
  const s = getState();

  if (currentIsBV) {
    // BV: only first time earns 5 gold
    if (isBVTopicDone(currentCourse, currentModule, currentTopicIdx)) return;
    if (!s.bvCompletedTopics[currentCourse]) s.bvCompletedTopics[currentCourse] = {};
    if (!s.bvCompletedTopics[currentCourse][currentModule]) s.bvCompletedTopics[currentCourse][currentModule] = {};
    s.bvCompletedTopics[currentCourse][currentModule][currentTopicIdx] = true;
    s.goldCount += 5;
    saveState(s);
    updateGoldDisplay();

    // Update UI
    document.getElementById('completeBtn').classList.add('hidden');
    document.getElementById('alreadyDone').classList.remove('hidden');
    document.getElementById('alreadyDone').textContent = '⚓ Already completed — No more credits for this topic';
    document.getElementById('playerCreditsLabel').textContent = 'Already completed — No more credits';

    renderAdditionalList();
    reopenActiveModule();
    showCongrats(5, s.goldCount);

  } else {
    // Primary: first time = 10 credits
    if (!s.completedTopics[currentCourse]) s.completedTopics[currentCourse] = {};
    if (!s.completedTopics[currentCourse][currentModule]) s.completedTopics[currentCourse][currentModule] = {};
    s.completedTopics[currentCourse][currentModule][currentTopicIdx] = true;
    s.goldCount += 10;
    saveState(s);
    updateGoldDisplay();

    // Update UI
    document.getElementById('completeBtn').classList.add('hidden');
    document.getElementById('alreadyDone').classList.remove('hidden');
    document.getElementById('alreadyDone').textContent = '✓ TOPIC COMPLETED — REPEAT STUDY EARNS 5 CREDITS';
    document.getElementById('repeatBtn').classList.remove('hidden');
    document.getElementById('playerCreditsLabel').textContent = '+5 credits (repeat study)';

    renderPrimaryList();
    reopenActiveModule();
    showCongrats(10, s.goldCount);
  }
}

function repeatTopic() {
  // Only primary courses support repeat (5 credits)
  if (currentIsBV) return;
  const s = getState();
  s.goldCount += 5;
  saveState(s);
  updateGoldDisplay();
  showCongrats(5, s.goldCount);
}

// ===========================
//   BON VOYAGE PAGE
// ===========================
function initBonVoyage() {
  const s = getState();
  const ba = document.getElementById('goldBannerAmt');
  if (ba) ba.textContent = s.goldCount;
  renderBvStore();
}

function renderBvStore() {
  const s = getState();
  const grid = document.getElementById('bvGrid');
  if (!grid) return;
  grid.innerHTML = '';

  BON_VOYAGE_COURSES.forEach(course => {
    const isUnlocked = s.unlockedBonVoyage.includes(course.name);
    const card = document.createElement('div');
    card.className = `bv-card${isUnlocked ? ' unlocked-card' : ''}`;
    card.innerHTML = `
      <div class="bv-emoji-wrap">${course.emoji}</div>
      <div class="bv-card-info">
        <h4>${course.name}</h4>
        <p>${course.desc}</p>
        ${isUnlocked
          ? `<span class="bv-unlocked-tag">⚓ UNLOCKED</span>
             <span class="bv-goto-tag" style="margin-left:5px">→ IN COURSES</span>`
          : `<span class="bv-price-tag">🪙 ${course.price} GOLD</span>`
        }
      </div>
    `;
    card.onclick = () => {
      if (isUnlocked) {
        // Navigate to Courses > Additional tab
        navigate('assets/courses.html?tab=additional');
      } else {
        handleBvPurchase(course, card);
      }
    };
    grid.appendChild(card);
  });
}

function handleBvPurchase(course, card) {
  const s = getState();
  if (s.goldCount < course.price) {
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 600);
    alert(`⚠️ Insufficient doubloons, sailor!\nYou need ${course.price} 🪙 but only have ${s.goldCount} 🪙.\nComplete more course topics to earn credits!`);
    return;
  }
  if (confirm(`Unlock "${course.name}" for ${course.price} 🪙 gold?\nRemaining doubloons: ${s.goldCount - course.price} 🪙\n\nThis course will appear in your Courses → Additional section.`)) {
    s.goldCount -= course.price;
    s.unlockedBonVoyage.push(course.name);
    saveState(s);
    updateGoldDisplay();
    const ba = document.getElementById('goldBannerAmt');
    if (ba) ba.textContent = s.goldCount;
    renderBvStore();
    alert(`🎉 "${course.name}" is unlocked!\n\nHead to Courses → Additional to start learning!`);
  }
}

// Handle ?tab=additional query param on courses page
(function handleCourseTabParam() {
  if (!window.location.pathname.includes('courses')) return;
  const params = new URLSearchParams(window.location.search);
  if (params.get('tab') === 'additional') {
    // Will be called after initCourses runs
    window._openAdditionalTab = true;
  }
})();

// ===========================
//   O.R.O CHATBOT
// ===========================
function initChatbot() {
  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
  }
}

function quickAsk(msg) {
  document.getElementById('chatInput').value = msg;
  sendChat();
}

function sendChat() {
  const input    = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  const msg      = input.value.trim();
  if (!msg) return;

  appendMsg(msg, 'user');
  input.value = '';

  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.id = 'typing';
  typing.textContent = 'Processing query...';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const el = document.getElementById('typing');
    if (el) el.remove();
    appendMsg(getOROReply(msg), 'bot');
  }, 850);
}

function appendMsg(text, type) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function getOROReply(msg) {
  const s = getState();
  const lower = msg.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Good day, ${s.userName}. All systems are operational and I am fully at your disposal. What do you require?`;
  }
  if (lower.includes('gold') || lower.includes('credit')) {
    return `Your current credit balance is ${s.goldCount}. Primary course topics yield 10 credits on first completion and 5 on repeat study. Bon Voyage topics yield 5 credits on first completion only.`;
  }
  if (lower.includes('progress') || lower.includes('status')) {
    const p1 = getPrimaryCompletedCount(s.selectedPrimaryCourses[0] || '');
    const p2 = getPrimaryCompletedCount(s.selectedPrimaryCourses[1] || '');
    return `System diagnostic complete. ${s.selectedPrimaryCourses[0] || 'N/A'}: ${p1}/25 topics. ${s.selectedPrimaryCourses[1] || 'N/A'}: ${p2}/25 topics. ${s.unlockedBonVoyage.length} Bon Voyage course(s) unlocked.`;
  }
  if (lower.includes('bon voyage') || lower.includes('voyage') || lower.includes('unlock')) {
    return `The Bon Voyage repository contains 10 specialized courses priced between 25 and 60 credits. Once purchased, they appear in your Courses → Additional section with 4 modules and 5 topics each.`;
  }
  if (lower.includes('course') || lower.includes('module')) {
    return `You are enrolled in: ${s.selectedPrimaryCourses.join(' and ')}. Each primary course has 5 modules with 5 topics each (25 topics total). Additional courses from Bon Voyage have 4 modules with 5 topics each.`;
  }
  if (lower.includes('additional')) {
    if (s.unlockedBonVoyage.length === 0) {
      return `You have not unlocked any additional courses yet. Visit Bon Voyage, spend your credits, and the courses will appear in Courses → Additional.`;
    }
    return `Your unlocked additional courses are: ${s.unlockedBonVoyage.join(', ')}. You can access them via Courses → Additional tab.`;
  }
  if (lower.includes('help') || lower.includes('what can')) {
    return `I can assist with: progress reports, credit balance inquiries, course navigation, module breakdowns, and system diagnostics. What specific information do you require?`;
  }
  if (lower.includes('name') || lower.includes('who am i')) {
    return `Your registered identity in the Morzen system is: ${s.userName}. You may update this designation via the Profile section in the top-right corner.`;
  }
  if (lower.includes('morzen') || lower.includes('system')) {
    return `Morzen is your Advanced Personal AI Research & Intelligence Console. I am O.R.O — your Outstandingly Rocking Operator — here to ensure your learning journey runs at peak efficiency.`;
  }
  return ORO_RESPONSES[Math.floor(Math.random() * ORO_RESPONSES.length)];
}

// ===========================
//   CONGRATS
// ===========================
function showCongrats(earned, total) {
  document.getElementById('congratsMsg').textContent  = `${earned} credits have been added to your account.`;
  document.getElementById('congratsGold').textContent = total;
  document.getElementById('congratsPopup').classList.remove('hidden');
  if (typeof confetti !== 'undefined') triggerConfetti();
}
function closeCongrats() {
  document.getElementById('congratsPopup').classList.add('hidden');
}
function triggerConfetti() {
  const end = Date.now() + 2200;
  const frame = () => {
    confetti({ particleCount: 4, angle: 60,  spread: 48, origin: { x: 0 },
      colors: ['#D4AF37','#00D4FF','#C0392B','#F0D060','#fff'] });
    confetti({ particleCount: 4, angle: 120, spread: 48, origin: { x: 1 },
      colors: ['#D4AF37','#00D4FF','#C0392B','#F0D060','#fff'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

// ===========================
//   AUTO SWITCH TAB IF REDIRECTED
// ===========================
window.addEventListener('load', () => {
  if (window._openAdditionalTab && typeof switchCourseTab === 'function') {
    switchCourseTab('additional');
  }
});