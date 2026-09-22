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

/* ---------- เดินโค้ดทีละบรรทัด (ข้อมูลจากการรัน Python จริง อยู่ใน <script type="application/json">) ---------- */

function initStepper() {
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  for (const box of document.querySelectorAll('.stepper')) {
    const data = JSON.parse(box.querySelector('script').textContent);
    const { code, steps, notes = {} } = data;
    box.insertAdjacentHTML('beforeend', `
      <div class="st-grid">
        <ol class="st-code">${code.map(l => `<li><code>${esc(l) || ' '}</code></li>`).join('')}</ol>
        <div class="st-side">
          <div class="st-label">ตัวแปร</div><div class="st-vars"></div>
          <div class="st-label">ผลที่ print</div><pre class="st-out"></pre>
        </div>
      </div>
      <div class="st-msg"></div>
      <div class="st-ctl">
        <button data-go="first" title="กลับจุดเริ่ม">⏮</button>
        <button data-go="-1" title="ย้อน 1 ขั้น">◀ ย้อน</button>
        <button data-go="1" class="st-next" title="ไปขั้นถัดไป">ถัดไป ▶</button>
        <button data-go="play" title="เล่นอัตโนมัติ">⏵ เล่น</button>
        <span class="st-count"></span>
      </div>`);
    const lis = [...box.querySelectorAll('.st-code li')];
    const vars = box.querySelector('.st-vars'), out = box.querySelector('.st-out');
    const msg = box.querySelector('.st-msg'), count = box.querySelector('.st-count');
    const playBtn = box.querySelector('[data-go="play"]');
    let at = 0, timer = null;

    const valueOf = (st, frame, name) => {
      const f = st && st.fr.find(x => x.n === frame);
      const v = f && f.v.find(x => x[0] === name);
      return v ? v[1] + v[2] : undefined;
    };

    function show() {
      const st = steps[at], prev = steps[at - 1];
      lis.forEach((li, i) => {
        li.classList.toggle('ex', i + 1 === st.ex);
        li.classList.toggle('nx', i + 1 === st.nx);
        li.classList.toggle('err', !!st.exc && i + 1 === st.ex);
        li.querySelector('.st-chip')?.remove();
        if (st.cond && i + 1 === st.ex)                 // ป้าย True / False ท้ายบรรทัดเงื่อนไข
          li.insertAdjacentHTML('beforeend', `<span class="st-chip ${st.cond.val ? 't' : 'f'}">${st.cond.val ? '✔ True' : '✘ False'}</span>`);
      });
      vars.innerHTML = st.fr.map((f, k) => `
        <div class="st-frame${k ? ' fn' : ''}"><div class="st-fname">${esc(f.n)}</div>
        ${f.v.length ? f.v.map(([n, v, tag]) => `
          <div class="st-var${prev && valueOf(prev, f.n, n) !== v + tag ? ' chg' : ''}">
            <span class="st-n">${esc(n)}</span>
            <span class="st-v">${tag ? `<b class="st-tag">${tag}</b>` : ''}${esc(v)}</span>
          </div>`).join('') : '<div class="st-empty">ยังไม่มีตัวแปร</div>'}
        </div>`).join('');
      out.textContent = st.out || ' ';
      let m;
      if (at === 0) m = 'ยังไม่เริ่ม · กด "ถัดไป" เพื่อรันบรรทัดแรก';
      else if (st.end) m = `ทำบรรทัด ${st.ex} แล้ว · <b>จบโปรแกรม</b>`;
      else if (st.exc) m = `บรรทัด <b>${st.ex}</b> เกิด error <span class="st-exc">${esc(st.exc)}</span>`;
      else if (st.jump) m = `ข้ามบรรทัดที่เหลือใน <code>try</code> ทันที · ไปบรรทัด <b>${st.nx}</b> (except ที่ตรงกับชนิด error)`;
      else if (st.ret) m = `ฟังก์ชัน <code>${esc(st.ret[0])}()</code> จบแล้ว คืนค่า <b>${esc(st.ret[1])}</b> กลับไปให้คนเรียก`;
      else m = `เพิ่งทำบรรทัด <b>${st.ex}</b> · ต่อไปบรรทัด <b>${st.nx}</b>`;
      if (st.cond) {
        const c = st.cond, v = `<b class="st-bool ${c.val ? 't' : 'f'}">${c.val ? 'True' : 'False'}</b>`;   // แบบ Python ไม่ใช่ true/false
        m += `<div class="st-cond">เงื่อนไข <code>${esc(c.expr)}</code>` +
             (c.sub !== c.expr ? ` → <code>${esc(c.sub)}</code>` : '') + ` → ${v}` +
             (c.short ? `<span class="st-short">${c.short === 'or'
                 ? 'or: ข้อแรกจริงแล้ว คำตอบเป็น True แน่นอน Python ไม่ดูข้อหลังเลย'
                 : 'and: ข้อแรกเท็จแล้ว คำตอบเป็น False แน่นอน Python ไม่ดูข้อหลังเลย'}</span>` : '') +
             `</div>`;
      }
      if (notes[st.ex] && at > 0 && !st.ret && !st.exc && !st.jump) m += `<div class="st-note">${notes[st.ex]}</div>`;
      msg.innerHTML = m;
      count.textContent = `ขั้น ${at} / ${steps.length - 1}`;
      box.querySelector('[data-go="-1"]').disabled = at === 0;
      const next = box.querySelector('.st-next'), last = at === steps.length - 1;
      next.dataset.go = last ? 'first' : '1';          // ขั้นสุดท้าย: ปุ่มถัดไปกลายเป็นเริ่มใหม่
      next.textContent = last ? '↺ เริ่มใหม่' : 'ถัดไป ▶';
    }

    // จองความสูงเท่าขั้นที่สูงที่สุดไว้ตั้งแต่แรก ปุ่มจะได้ไม่เลื่อนลงเวลา output หรือตัวแปรเพิ่ม
    const grid = box.querySelector('.st-grid');
    function reserve() {
      const keep = at;
      grid.style.minHeight = msg.style.minHeight = '';
      let gh = 0, mh = 0;
      for (at = 0; at < steps.length; at++) {
        show();
        gh = Math.max(gh, grid.offsetHeight);
        mh = Math.max(mh, msg.offsetHeight);
      }
      at = keep;
      grid.style.minHeight = gh + 'px';
      msg.style.minHeight = mh + 'px';
      show();
      box.querySelectorAll('.st-var.chg').forEach(el => el.classList.remove('chg'));
    }
    const stop = () => { clearInterval(timer); timer = null; playBtn.textContent = '⏵ เล่น'; };
    box.querySelector('.st-ctl').addEventListener('click', e => {
      const go = e.target.dataset.go;
      if (!go) return;
      if (go === 'play') {
        if (timer) return stop();
        if (at === steps.length - 1) at = 0;
        playBtn.textContent = '⏸ หยุด';
        timer = setInterval(() => { if (at < steps.length - 1) { at++; show(); } else stop(); }, 900);
        return;
      }
      stop();
      at = go === 'first' ? 0 : Math.min(steps.length - 1, Math.max(0, at + Number(go)));
      show();
    });
    reserve();
    document.fonts?.ready.then(reserve);              // ฟอนต์โหลดเสร็จทีหลัง ความสูงเปลี่ยนได้
    let t;
    addEventListener('resize', () => { clearTimeout(t); t = setTimeout(reserve, 200); });
  }
}

/* ---------- boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  buildPager();
  initQuiz();
  initTrace();
  initStepper();
  buildLayout();
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.toLowerCase() === 's') toggleSidebar();
  if (e.key === 'ArrowLeft')  go(-1);
  if (e.key === 'ArrowRight') go(1);
});
