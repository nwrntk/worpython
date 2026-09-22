/* layout shell (sidebar + topbar) + quiz — ทั้งเว็บใช้ไฟล์นี้ไฟล์เดียว
   สร้างโครง .pres-layout ครอบ <main> ที่มีอยู่แล้ว จึงไม่ต้องแก้ HTML ทุกไฟล์ */

const PAGES = [
  { group: 'Start',                   file: 'index.html', num: '·',  title: 'หน้าแรก' },
  { group: 'Start',                   file: 'ch0.html',   num: '0',  title: 'ติดตั้งและรันโปรแกรม' },
  { group: 'I · พื้นฐาน',             file: 'ch1.html',   num: '1',  title: 'print และตัวแปร' },
  { group: 'I · พื้นฐาน',             file: 'ch2.html',   num: '2',  title: 'ชนิดข้อมูล' },
  { group: 'II · การตัดสินใจ',        file: 'ch3.html',   num: '3',  title: 'เงื่อนไข if' },
  { group: 'III · ข้อมูลชุด',         file: 'ch4.html',   num: '4',  title: 'List — ลิสต์' },
  { group: 'III · ข้อมูลชุด',         file: 'ch5.html',   num: '5',  title: 'Tuple — ทูเพิล' },
  { group: 'IV · การวนซ้ำ',           file: 'ch6.html',   num: '6',  title: 'for loop' },
  { group: 'IV · การวนซ้ำ',           file: 'ch7.html',   num: '7',  title: 'while loop' },
  { group: 'IV · การวนซ้ำ',           file: 'ch8.html',   num: '8',  title: 'Loop Patterns' },
  { group: 'V · ข้อมูลแบบกลุ่ม',      file: 'ch9.html',   num: '9',  title: 'Dictionary' },
  { group: 'V · ข้อมูลแบบกลุ่ม',      file: 'ch10.html',  num: '10', title: 'Set — เซต' },
  { group: 'VI · ข้อความและฟังก์ชัน', file: 'ch11.html',  num: '11', title: 'String — ข้อความ' },
  { group: 'VI · ข้อความและฟังก์ชัน', file: 'ch12.html',  num: '12', title: 'Function' },
  { group: 'VII · ไฟล์และข้อผิดพลาด', file: 'ch13.html',  num: '13', title: 'File I/O & Exception' },
  { group: 'VIII · Lib สำคัญ',        file: 'ch14.html',  num: '14', title: 'OpenCV — ประมวลผลภาพ' },
  { group: 'VIII · Lib สำคัญ',        file: 'ch15.html',  num: '15', title: 'ภาพดิจิทัลและการประมวลผล' },
  { group: 'VIII · Lib สำคัญ',        file: 'ch16.html',  num: '16', title: 'Matplotlib — พล็อตกราฟ' },
  { group: 'อ้างอิง',                 file: 'errors.html', num: '!', title: 'คู่มืออ่าน error' },
];

const here = location.pathname.split('/').pop() || 'index.html';
const at = Math.max(0, PAGES.findIndex(p => p.file === here));

function buildLayout() {
  const main = document.querySelector('main');

  let nav = `<div class="pres-sidebar-title">Python Lab</div>`;
  let lastGroup = null;
  for (const p of PAGES) {
    if (p.group !== lastGroup) {
      nav += `<div class="pres-nav-chapter">${p.group}</div>`;
      lastGroup = p.group;
    }
    const active = p.file === here ? ' active' : '';
    nav += `<a class="pres-nav-item${active}" href="${p.file}">
      <span class="pres-nav-num">${p.num}</span> ${p.title}</a>`;
  }

  const prev = PAGES[at - 1], next = PAGES[at + 1];
  const layout = document.createElement('div');
  layout.className = 'pres-layout';
  layout.innerHTML = `
    <nav class="pres-sidebar" id="sidebar">${nav}</nav>
    <div class="pres-stage">
      <div class="pres-topbar">
        <div class="pres-topbar-left">
          <button class="pres-toggle-sidebar" id="toggleSidebar" title="ซ่อน/แสดงเมนู (S)">&#9776;</button>
          <a class="pres-brand-home" href="index.html">Python Lab.</a>
          <span class="pres-slide-title">${PAGES[at].title}</span>
        </div>
        <div class="pres-topbar-right">
          <button class="pres-nav-btn pres-print" id="printBtn" title="บันทึกบทนี้เป็น PDF (Ctrl+P)">PDF</button>
          <button class="pres-nav-btn" id="prevBtn" title="บทก่อนหน้า (←)"
            ${prev ? '' : 'disabled'}>&#8592; Prev</button>
          <span class="pres-counter">${at + 1} / ${PAGES.length}</span>
          <button class="pres-nav-btn" id="nextBtn" title="บทถัดไป (→)"
            ${next ? '' : 'disabled'}>Next &#8594;</button>
        </div>
      </div>
      <div class="pres-content" id="content" tabindex="-1"></div>
    </div>`;

  document.body.appendChild(layout);
  layout.querySelector('#content').appendChild(main);

  const hint = document.createElement('div');
  hint.className = 'pres-hint';
  hint.innerHTML = '<kbd>S</kbd> เมนู &nbsp; <kbd>←</kbd> <kbd>→</kbd> เปลี่ยนบท';
  document.body.appendChild(hint);

  document.getElementById('toggleSidebar').onclick = toggleSidebar;
  document.getElementById('prevBtn').onclick = () => go(-1);
  document.getElementById('nextBtn').onclick = () => go(1);
  document.getElementById('printBtn').onclick = () => window.print();

  if (window.innerWidth <= 900) document.getElementById('sidebar').classList.add('collapsed');
  document.getElementById('content').focus();   // ให้ลูกศรขึ้น/ลงเลื่อนหน้าได้
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function go(step) {
  const target = PAGES[at + step];
  if (target) location.href = target.file;
}

/* ---------- pager ท้ายบท ---------- */

function buildPager() {
  const prev = PAGES[at - 1], next = PAGES[at + 1];
  const el = document.createElement('div');
  el.className = 'pager';
  el.innerHTML =
    (prev ? `<a href="${prev.file}">&#8592; ${prev.title}</a>` : '<span></span>') +
    '<span class="spacer"></span>' +
    (next ? `<a href="${next.file}">${next.title} &#8594;</a>` : '<span></span>');
  document.querySelector('main').appendChild(el);

  const copy = document.createElement('div');
  copy.className = 'copyright';
  copy.innerHTML = '&copy; K. Woranidtha 2026';
  document.querySelector('main').appendChild(copy);
}

/* ---------- quiz ---------- */

function initQuiz() {
  const quizzes = [...document.querySelectorAll('.quiz')];
  if (!quizzes.length) return;

  let answered = 0, correct = 0;
  const score = document.createElement('div');
  score.className = 'score';
  const paint = () => score.innerHTML =
    `ตอบแล้ว <b>${answered}</b>/${quizzes.length} · ถูก <b>${correct}</b> ข้อ`;
  paint();
  quizzes[quizzes.length - 1].after(score);

  for (const quiz of quizzes) {
    const choices = [...quiz.querySelectorAll('.choice')];
    for (const c of choices) c.addEventListener('click', () => {
      if (quiz.dataset.done) return;
      quiz.dataset.done = '1';
      answered++;
      if (c.hasAttribute('data-correct')) correct++;
      for (const o of choices) {
        o.classList.add('locked');
        if (o.hasAttribute('data-correct')) o.classList.add('right');
      }
      if (!c.hasAttribute('data-correct')) c.classList.add('wrong');
      quiz.querySelector('.explain')?.classList.add('show');
      paint();
    });
  }
}

/* ---------- ตารางไล่รอบ: เติมช่องแล้วกดตรวจ ---------- */

function initTrace() {
  // เทียบแบบไม่สนช่องว่าง ตัวพิมพ์เล็กใหญ่ และเครื่องหมายคำพูดครอบ (b กับ "b" ถือว่าเท่ากัน)
  const norm = s => s.trim().toLowerCase().replace(/^['"]|['"]$/g, '');
  for (const box of document.querySelectorAll('.trace')) {
    const inputs = [...box.querySelectorAll('input[data-a]')];
    const msg = box.querySelector('.trace-msg');
    const mark = i => {
      const ok = norm(i.value) === norm(i.dataset.a);
      i.classList.toggle('right', ok);
      i.classList.toggle('wrong', !ok);
      return ok;
    };
    box.querySelector('.trace-check').addEventListener('click', () => {
      const ok = inputs.filter(mark).length;
      msg.textContent = ok === inputs.length
        ? `ถูกทุกช่อง ${ok}/${inputs.length}`
        : `ถูก ${ok}/${inputs.length} ช่อง · ช่องสีแดงลองไล่ใหม่ตั้งแต่แถวนั้น`;
    });
    // ดูเฉลย ↔ ปิดเฉลย: ตอนปิด คืนค่าที่ผู้เรียนพิมพ์ไว้ (ยังไม่ได้พิมพ์ = ช่องว่าง)
    const check = box.querySelector('.trace-check');
    const show = box.querySelector('.trace-show');
    let saved = null;
    show.addEventListener('click', () => {
      if (!saved) {
        saved = inputs.map(i => i.value);
        for (const i of inputs) { i.value = i.dataset.a; i.readOnly = true; mark(i); }
        show.textContent = 'ปิดเฉลย';
        check.disabled = true;
        msg.textContent = 'เฉลยแล้ว · เทียบกับที่คิดไว้ว่าผิดตั้งแต่แถวไหน';
      } else {
        inputs.forEach((i, k) => { i.value = saved[k]; i.readOnly = false; i.classList.remove('right', 'wrong'); });
        saved = null;
        show.textContent = 'ดูเฉลย';
        check.disabled = false;
        msg.textContent = '';
      }
    });
  }
}

/* ---------- พิมพ์ / PDF: กางเฉลยที่พับไว้ตอนพิมพ์ แล้วพับคืนหลังพิมพ์ ---------- */

let foldedForPrint = [];
addEventListener('beforeprint', () => {
  foldedForPrint = [...document.querySelectorAll('details:not([open])')];
  for (const d of foldedForPrint) d.open = true;
});
addEventListener('afterprint', () => {
  for (const d of foldedForPrint) d.open = false;
  foldedForPrint = [];
});

/* ---------- boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  buildPager();
  initQuiz();
  initTrace();
  buildLayout();
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.toLowerCase() === 's') toggleSidebar();
  if (e.key === 'ArrowLeft')  go(-1);
  if (e.key === 'ArrowRight') go(1);
});
