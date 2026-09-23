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
  { group: 'อ้างอิง',                 file: 'debug.html',  num: '?', title: 'วิธีหาบั๊ก' },
];

const here = location.pathname.split('/').pop() || 'index.html';
const at = Math.max(0, PAGES.findIndex(p => p.file === here));

function buildLayout() {
  const main = document.querySelector('main');
  // หัวข้อย่อยของบทนี้ → ลิงก์ใต้ชื่อบทในเมนู
  const heads = [...main.querySelectorAll('h2')];
  heads.forEach((h, i) => { if (!h.id) h.id = 's' + (i + 1); });

  const org = 'ภาควิชาวิศวกรรมระบบชีวภาพและเกษตร KMITL';
  let nav = `<a class="pres-org" href="index.html"><img src="bae_logo.png" alt="โลโก้${org}">
      <span>ดร.วรนิษฐา กรุงแสนเมือง<small>${org}</small></span></a>
    <div class="pres-sidebar-title">Python Lab</div>`;
  let lastGroup = null;
  for (const p of PAGES) {
    if (p.group !== lastGroup) {
      nav += `<div class="pres-nav-chapter">${p.group}</div>`;
      lastGroup = p.group;
    }
    const active = p.file === here ? ' active' : '';
    nav += `<a class="pres-nav-item${active}" href="${p.file}">
      <span class="pres-nav-num">${p.num}</span> ${p.title}</a>`;
    if (active) nav += `<div class="pres-nav-sub">${heads.map(h =>
      `<a href="#${h.id}">${h.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</a>`).join('')}</div>`;
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
          <span class="pres-credit">ดร.วรนิษฐา กรุงแสนเมือง <small>· ${org}</small></span>
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

  // เลือกหัวข้อย่อยแล้วเลื่อนไป · จอเล็กปิดเมนูให้ด้วย · ไฮไลต์หัวข้อที่กำลังอ่าน
  const content = document.getElementById('content');
  const subs = [...layout.querySelectorAll('.pres-nav-sub a')];
  layout.querySelector('.pres-nav-sub')?.addEventListener('click', e => {
    if (e.target.tagName === 'A' && window.innerWidth <= 900) toggleSidebar();
  });
  const spy = () => {
    const top = content.getBoundingClientRect().top + 90;
    let k = -1;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top <= top) k = i; });
    subs.forEach((a, i) => a.classList.toggle('on', i === k));
  };
  content.addEventListener('scroll', spy, { passive: true });
  // เปิดลิงก์ที่มี #หัวข้อ มาตรง ๆ: เบราว์เซอร์เลื่อนไปก่อนที่เราย้าย main เข้ากรอบ เลยต้องเลื่อนเองอีกที
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
  spy();

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
  copy.innerHTML = '&copy; 2026 ดร.วรนิษฐา กรุงแสนเมือง · ภาควิชาวิศวกรรมระบบชีวภาพและเกษตร KMITL · สงวนลิขสิทธิ์';
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

    // โหมดลูกศร (class="stepper ref"): ตัวแปรเป็นป้ายชื่อ ลากลูกศรไปหาก้อนข้อมูล · ป้าย ①② เดียวกัน = ก้อนเดียวกัน
    const ref = box.classList.contains('ref');
    if (ref) box.querySelector('.st-label').textContent = 'ตัวแปร → ก้อนข้อมูล';
    const items = s => {                                 // "[1, 'a, b', 3]" → ['1', "'a, b'", '3']
      const out = [];
      let cur = '', q = '', depth = 0;
      for (const ch of s.slice(1, -1)) {
        if (q) { if (ch === q) q = ''; }
        else if (ch === "'" || ch === '"') q = ch;
        else if ('[({'.includes(ch)) depth++;
        else if ('])}'.includes(ch)) depth--;
        else if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; continue; }
        cur += ch;
      }
      if (cur.trim()) out.push(cur.trim());
      return out;
    };
    const objects = st => {
      const m = new Map();
      if (st) for (const f of st.fr) for (const [, v, tag] of f.v) if (tag && !m.has(tag)) m.set(tag, items(v));
      return m;
    };
    const heap = (st, prev) => {
      const was = objects(prev);
      return [...objects(st)].map(([tag, els]) => {
        const old = was.get(tag);
        return `<div class="rf-obj${old ? '' : ' in'}" data-tag="${tag}"><span class="rf-tag">${tag} list</span><div class="rf-els">${
          els.length ? els.map((e, i) => `<span class="rf-el${old && old[i] !== e ? ' pop' : ''}">${esc(e)}<small>${i}</small></span>`).join('')
                     : '<span class="rf-empty">ว่าง</span>'}</div></div>`;
      }).join('');
    };
    const arrows = () => {
      const rf = vars.querySelector('.rf');
      if (!rf) return;
      const svg = rf.querySelector('.rf-svg');
      // วัดตำแหน่งจาก layout (offset) ไม่ใช่ getBoundingClientRect เพราะ list ใหม่กำลังเลื่อนลงมา (transform) ตอนวาด
      const box_ = el => {
        let x = 0, y = 0;
        for (let e = el; e && e !== rf; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; }
        return { left: x, top: y, width: el.offsetWidth, height: el.offsetHeight };
      };
      svg.innerHTML = `<defs>${['a', 'f'].map(t => `<marker id="rfm-${t}${box.dataset.rfId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" class="rf-head ${t}"/></marker>`).join('')}</defs>` +
        [...rf.querySelectorAll('.rf-dot')].map(dot => {
          const obj = rf.querySelector(`.rf-obj[data-tag="${dot.dataset.to}"]`);
          if (!obj) return '';
          const d = box_(dot), o = box_(obj);
          const x1 = d.left + d.width / 2, y1 = d.top + d.height / 2;
          const x2 = o.left - 1, y2 = o.top + 18, dx = Math.max(24, (x2 - x1) / 2);
          const fn = dot.classList.contains('fn');
          return `<path class="rf-arrow${fn ? ' fn' : ''}${dot.classList.contains('new') ? ' new' : ''}" pathLength="1"
            d="M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}" marker-end="url(#rfm-${fn ? 'f' : 'a'}${box.dataset.rfId})"/>`;
        }).join('');
    };
    if (ref) {
      box.dataset.rfId = document.querySelectorAll('[data-rf-id]').length;
      new ResizeObserver(arrows).observe(vars);         // กว้างเปลี่ยน (เปิดเมนู หมุนจอ ฟอนต์โหลด) → วาดลูกศรใหม่
    }

    const valueOf = (st, frame, name) => {
      const f = st && st.fr.find(x => x.n === frame);
      const v = f && f.v.find(x => x[0] === name);
      return v ? v[1] + v[2] : undefined;
    };

    function show() {
      const st = steps[at], prev = steps[at - 1];
      box.querySelector('.st-code').classList.toggle('done', !!st.end);   // จบโปรแกรม: ขึ้นแถบใต้โค้ด
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
        ${f.v.length ? f.v.map(([n, v, tag, ty]) => `
          <div class="st-var${prev && valueOf(prev, f.n, n) !== v + tag ? ' chg' : ''}">
            <span class="st-n">${esc(n)}</span>
            <span class="st-v">${ref && tag
              ? `<i class="rf-dot${(valueOf(prev, f.n, n) || '').slice(-1) !== tag ? ' new' : ''}${k ? ' fn' : ''}" data-to="${tag}"></i>`
              : `${tag ? `<b class="st-tag">${tag}</b>` : ''}${esc(v)}`}</span>
            ${ty ? `<span class="st-type" title="ชนิดข้อมูล">${esc(ty)}</span>` : ''}
          </div>`).join('') : '<div class="st-empty">ยังไม่มีตัวแปร</div>'}
        </div>`).join('');
      if (ref) {
        vars.innerHTML = `<div class="rf"><div>${vars.innerHTML}</div><div class="rf-heap">${heap(st, prev)}</div><svg class="rf-svg"></svg></div>`;
        arrows();
      }
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

/* ---------- list เป็นกล่อง: เมธอดแต่ละตัวขยับกล่องยังไง (FLIP animation) ---------- */

function initListViz() {
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (const box of document.querySelectorAll('.listviz')) {
    const { name, code, steps } = JSON.parse(box.querySelector('script').textContent);
    box.insertAdjacentHTML('beforeend', `
      <div class="lv-grid">
        <ol class="st-code lv-code">${code.map(l => `<li><code>${esc(l)}</code></li>`).join('')}</ol>
        <div>
          <div class="lv-stage"><span class="lv-name">${esc(name)}</span><div class="lv-row"></div></div>
          <div class="lv-vars"></div>
        </div>
      </div>
      <div class="st-msg lv-msg"></div>
      <div class="st-ctl">
        <button data-go="first" title="กลับจุดเริ่ม">⏮</button>
        <button data-go="-1" title="ย้อน 1 ขั้น">◀ ย้อน</button>
        <button data-go="1" class="st-next" title="คำสั่งถัดไป">ถัดไป ▶</button>
        <span class="st-count"></span>
      </div>`);
    const stage = box.querySelector('.lv-stage'), row = box.querySelector('.lv-row');
    const lis = [...box.querySelectorAll('.lv-code li')];
    const msg = box.querySelector('.lv-msg'), vars = box.querySelector('.lv-vars');
    const count = box.querySelector('.st-count'), next = box.querySelector('.st-next');
    const buttons = [...box.querySelectorAll('.st-ctl button')];
    let at = 0, busy = false;

    function paint(st) {
      lis.forEach((li, i) => li.classList.toggle('ex', i + 1 === st.line));
      vars.innerHTML = Object.entries(st.vars).map(([k, v]) =>
        `<span class="lv-var${st.target === k ? ' new' : ''}"><b>${esc(k)}</b> = ${esc(v)}</span>`).join('');
      msg.innerHTML = st.msg;
      count.textContent = `คำสั่ง ${at + 1} / ${steps.length}`;
      buttons[1].disabled = at === 0;
      const last = at === steps.length - 1;
      next.dataset.go = last ? 'first' : '1';
      next.textContent = last ? '↺ เริ่มใหม่' : 'ถัดไป ▶';
    }

    // วางกล่องตามสถานะ st · animate = true ให้กล่องไหลจากตำแหน่งเดิม
    function place(st, animate) {
      const before = new Map([...row.children].map(el => [el.dataset.id, el.getBoundingClientRect()]));
      const els = new Map([...row.children].map(el => [el.dataset.id, el]));
      const keep = new Set(st.items.map(([id]) => String(id)));
      const sr = stage.getBoundingClientRect();
      for (const [id, el] of els) {
        if (keep.has(id)) continue;
        if (animate) {                                        // กล่องที่ถูกดึงออก: ลอยขึ้นแล้วหาย
          const r = before.get(id), ghost = el.cloneNode(true);
          ghost.classList.add('lv-ghost');
          ghost.style.left = r.left - sr.left + 'px';
          ghost.style.top = r.top - sr.top + 'px';
          stage.appendChild(ghost);
          requestAnimationFrame(() => ghost.classList.add('out'));
          setTimeout(() => ghost.remove(), 900);
        }
        el.remove();
      }
      let entered = 0;
      st.items.forEach(([id, v], i) => {
        let el = els.get(String(id));
        if (!el) {
          el = document.createElement('div');
          el.className = 'lv-box';
          el.dataset.id = id;
          if (animate) {
            el.classList.add(st.kind === 'extend' ? 'in-right' : 'in-top');
            el.style.animationDelay = (st.kind === 'extend' ? entered++ * 180 : 150) + 'ms';
            const delay = parseInt(el.style.animationDelay) || 0;
            setTimeout(() => { el.classList.remove('in-right', 'in-top'); el.style.animationDelay = ''; }, delay + 650);
          }
        } else if (animate && el.dataset.v !== String(v)) {
          el.classList.remove('lv-set'); void el.offsetWidth; el.classList.add('lv-set');
        }
        el.classList.remove('hit', 'scan');
        el.dataset.v = v;
        el.innerHTML = `<span class="lv-v">${esc(v)}</span><span class="lv-i">${i}</span>`;
        row.appendChild(el);
      });
      if (!animate) return;
      for (const el of row.children) {                        // กล่องที่ยังอยู่: ไหลจากที่เดิมไปที่ใหม่
        const o = before.get(el.dataset.id);
        if (!o) continue;
        const n = el.getBoundingClientRect(), dx = o.left - n.left, dy = o.top - n.top;
        if (!dx && !dy) continue;
        el.style.transition = 'none';
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.transition = 'transform .55s cubic-bezier(.3, .7, .3, 1)';
          el.style.transform = '';
        }));
      }
    }

    async function goTo(k, animate) {
      if (busy) return;
      busy = true;
      buttons.forEach(b => b.disabled = true);
      const st = steps[k];
      const forward = animate && !calm && k === at + 1;
      if (forward && st.scan) {                               // remove / index: ไล่หาจากซ้ายทีละกล่อง
        const boxes = [...row.children];
        for (const i of st.scan) {
          boxes.forEach(b => b.classList.remove('scan'));
          boxes[i].classList.add(i === st.hit ? 'hit' : 'scan');
          await wait(i === st.hit ? 450 : 320);
        }
        boxes.forEach(b => b.classList.remove('scan'));
      } else if (forward && st.kind === 'pop') {
        row.children[st.hit].classList.add('hit');
        await wait(350);
      }
      at = k;
      place(st, forward);
      if (forward && st.kind === 'index') row.children[st.hit].classList.add('hit');
      paint(st);
      if (forward) await wait(650);
      busy = false;
      buttons.forEach(b => b.disabled = false);
      paint(st);
    }

    box.querySelector('.st-ctl').addEventListener('click', e => {
      const go = e.target.dataset.go;
      if (!go) return;
      goTo(go === 'first' ? 0 : Math.max(0, Math.min(steps.length - 1, at + Number(go))), go === '1');
    });
    place(steps[0], false);
    paint(steps[0]);
  }
}

/* ---------- dict เป็นลิ้นชัก / set ตัดค่าซ้ำ / แผนภาพเซต ---------- */

const vzEsc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const vzWait = ms => new Promise(r => setTimeout(r, ms));
const vzCalm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// วางลูกตามลำดับ entries = [{id, html}] · animate: ลูกที่อยู่ต่อไหลจากที่เดิม ลูกที่หายลอยออก ลูกใหม่ใส่คลาส enter
function vzPlace(stage, holder, entries, animate, enter = 'in-top', cls = 'lv-box') {
  const before = new Map([...holder.children].map(el => [el.dataset.id, el.getBoundingClientRect()]));
  const els = new Map([...holder.children].map(el => [el.dataset.id, el]));
  const keep = new Set(entries.map(e => String(e.id)));
  const sr = stage.getBoundingClientRect();
  for (const [id, el] of els) {
    if (keep.has(id)) continue;
    if (animate) {
      const r = before.get(id), ghost = el.cloneNode(true);
      ghost.classList.add('lv-ghost');
      Object.assign(ghost.style, { left: r.left - sr.left + stage.scrollLeft + 'px', top: r.top - sr.top + 'px', width: r.width + 'px' });
      stage.appendChild(ghost);
      requestAnimationFrame(() => ghost.classList.add('out'));
      setTimeout(() => ghost.remove(), 900);
    }
    el.remove();
  }
  for (const e of entries) {
    let el = els.get(String(e.id));
    if (!el) {
      el = document.createElement('div');
      el.className = cls;
      el.dataset.id = e.id;
      if (animate) {
        el.classList.add(enter);
        // ถอดคลาสด้วยตัวจับเวลาด้วย เผื่อ animationend ไม่ถูกยิง (แท็บพื้นหลัง / เบราว์เซอร์ข้ามอนิเมชัน)
        setTimeout(() => el.classList.remove(enter), 700);
      }
    }
    el.classList.remove('hit', 'scan', 'ok', 'dup');
    if (el.dataset.html !== e.html) { el.innerHTML = e.html; el.dataset.html = e.html; }
    holder.appendChild(el);
  }
  if (!animate) return;
  for (const el of holder.children) {
    const o = before.get(el.dataset.id);
    if (!o) continue;
    const n = el.getBoundingClientRect(), dx = o.left - n.left, dy = o.top - n.top;
    if (!dx && !dy) continue;
    el.style.transition = 'none';
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = 'transform .55s cubic-bezier(.3, .7, .3, 1)';
      el.style.transform = '';
    }));
  }
}

// ปุ่ม ⏮ ◀ ▶ ร่วมกัน · show(step, animate) คืน Promise เมื่ออนิเมชันจบ
function vzControls(box, steps, show) {
  box.insertAdjacentHTML('beforeend', `
    <div class="st-msg lv-msg"></div>
    <div class="st-ctl">
      <button data-go="first" title="กลับจุดเริ่ม">⏮</button>
      <button data-go="-1" title="ย้อน 1 ขั้น">◀ ย้อน</button>
      <button data-go="1" class="st-next" title="ขั้นถัดไป">ถัดไป ▶</button>
      <span class="st-count"></span>
    </div>`);
  const buttons = [...box.querySelectorAll('.st-ctl button')], next = box.querySelector('.st-next');
  const msg = box.querySelector('.lv-msg'), count = box.querySelector('.st-count');
  let at = 0, busy = false;
  const paint = () => {
    msg.innerHTML = steps[at].msg;
    count.textContent = `ขั้น ${at + 1} / ${steps.length}`;
    buttons[1].disabled = at === 0;
    const last = at === steps.length - 1;
    next.dataset.go = last ? 'first' : '1';
    next.textContent = last ? '↺ เริ่มใหม่' : 'ถัดไป ▶';
  };
  box.querySelector('.st-ctl').addEventListener('click', async e => {
    const go = e.target.dataset.go;
    if (!go || busy) return;
    const k = go === 'first' ? 0 : Math.max(0, Math.min(steps.length - 1, at + Number(go)));
    const forward = go === '1' && !vzCalm();
    busy = true;
    buttons.forEach(b => b.disabled = true);
    at = k;
    await show(steps[k], forward);
    busy = false;
    buttons.forEach(b => b.disabled = false);
    paint();
  });
  show(steps[0], false);
  paint();
}

function initDictViz() {
  for (const box of document.querySelectorAll('.dictviz')) {
    const { name, code, steps } = JSON.parse(box.querySelector('script').textContent);
    box.insertAdjacentHTML('beforeend', `
      <div class="lv-grid">
        <ol class="st-code lv-code">${code.map(l => `<li><code>${vzEsc(l)}</code></li>`).join('')}</ol>
        <div>
          <div class="lv-stage dv-stage"><span class="lv-name">${vzEsc(name)}</span><div class="dv-rows"></div></div>
          <div class="lv-vars"></div>
        </div>
      </div>`);
    const stage = box.querySelector('.dv-stage'), rows = box.querySelector('.dv-rows');
    const lis = [...box.querySelectorAll('.lv-code li')], vars = box.querySelector('.lv-vars');
    const rowOf = key => [...rows.children].find(r => r.dataset.id === key);
    vzControls(box, steps, async (st, anim) => {
      lis.forEach((li, i) => li.classList.toggle('ex', i + 1 === st.line));
      if (anim) {
        const row = rowOf(st.key);
        if (['get', 'in', 'del', 'pop'].includes(st.kind) && row) {    // กระโดดไปที่ key ตรง ๆ ไม่ไล่ทีละแถว
          row.classList.add(st.kind === 'get' || st.kind === 'in' ? 'ok' : 'hit');
          await vzWait(600);
        } else if (st.kind === 'getdef') {                              // หา key ไม่เจอ
          rows.insertAdjacentHTML('beforeend', `<div class="dv-row dv-miss"><span class="dv-key">${vzEsc(st.key)}</span><span class="dv-val">✗ ไม่มี key นี้</span></div>`);
          await vzWait(1100);
        }
      }
      rows.querySelector('.dv-miss')?.remove();
      vzPlace(stage, rows, st.rows.map(([k, v]) => ({
        id: k, html: `<span class="dv-key">${vzEsc(k)}</span><span class="dv-arrow">→</span><span class="dv-val">${vzEsc(v)}</span>`
      })), anim, 'in-top', 'dv-row');
      if (anim && st.kind === 'upd') { const r = rowOf(st.key); r.classList.remove('lv-set'); void r.offsetWidth; r.classList.add('lv-set'); }
      if (anim && (st.kind === 'get' || st.kind === 'in')) rowOf(st.key)?.classList.add('ok');
      vars.innerHTML = Object.entries(st.vars).map(([k, v]) =>
        `<span class="lv-var${anim && st.target === k ? ' new' : ''}"><b>${vzEsc(k)}</b> = ${vzEsc(v)}</span>`).join('');
      if (anim) await vzWait(650);
    });
  }
}

function initSetViz() {
  for (const box of document.querySelectorAll('.setviz')) {
    const { nums, steps } = JSON.parse(box.querySelector('script').textContent);
    box.insertAdjacentHTML('beforeend', `
      <div class="lv-stage sv-stage">
        <span class="lv-name">nums</span>
        <div class="lv-row sv-list">${nums.map((n, i) => `<div class="lv-box" data-i="${i}"><span class="lv-v">${n}</span><span class="lv-i">${i}</span></div>`).join('')}</div>
      </div>
      <div class="sv-flow">↓ <code>set(nums)</code></div>
      <div class="lv-stage sv-set"><span class="lv-name">unique</span><div class="sv-bubbles"></div><span class="sv-len"></span></div>`);
    const listBoxes = [...box.querySelectorAll('.sv-list .lv-box')];
    const set = box.querySelector('.sv-set'), bubbles = box.querySelector('.sv-bubbles'), len = box.querySelector('.sv-len');
    vzControls(box, steps, async (st, anim) => {
      listBoxes.forEach((b, i) => {
        b.classList.toggle('scan', i === st.i && !st.dup);
        b.classList.toggle('used', i < st.i || !!st.end);
        b.classList.toggle('hit', i === st.i && !!st.dup);
      });
      vzPlace(set, bubbles, st.members.map(v => ({ id: v, html: String(v) })), anim, 'in-top', 'sv-ball');
      if (st.dup) [...bubbles.children].find(x => x.dataset.id === String(st.v))?.classList.add('dup');
      len.textContent = `len = ${st.members.length}`;
      if (anim) await vzWait(600);
    });
  }
}

function initVenn() {
  for (const box of document.querySelectorAll('.vennviz')) {
    const { a, b, steps } = JSON.parse(box.querySelector('script').textContent);
    const both = a.filter(x => b.includes(x)), onlyA = a.filter(x => !b.includes(x)), onlyB = b.filter(x => !a.includes(x));
    const col = (vals, x) => vals.map((v, i) => `<text class="vn-num" data-v="${v}" x="${x}" y="${100 + (i - (vals.length - 1) / 2) * 28}">${v}</text>`).join('');
    const id = 'vn' + Math.random().toString(36).slice(2, 7);
    box.insertAdjacentHTML('beforeend', `
      <svg class="vn-svg" viewBox="0 0 360 200" role="img" aria-label="แผนภาพเซต a และ b">
        <defs><clipPath id="${id}"><circle cx="135" cy="100" r="82"/></clipPath></defs>
        <circle class="vn-fill vn-a" cx="135" cy="100" r="82"/>
        <circle class="vn-fill vn-b" cx="225" cy="100" r="82"/>
        <circle class="vn-lens" cx="225" cy="100" r="82" clip-path="url(#${id})"/>
        <circle class="vn-ring" cx="135" cy="100" r="82"/><circle class="vn-ring" cx="225" cy="100" r="82"/>
        <text class="vn-lbl" x="62" y="26">a</text><text class="vn-lbl" x="292" y="26">b</text>
        ${col(onlyA, 100)}${col(both, 180)}${col(onlyB, 260)}
      </svg>
      <div class="vn-ops">${steps.map((s, i) => `<button data-k="${i}">${i ? vzEsc(s.code) : 'a, b'}</button>`).join('')}</div>
      <div class="vn-res"></div>
      <div class="st-msg lv-msg"></div>`);
    const show = k => {
      const st = steps[k];
      box.dataset.op = st.name ? st.name.split(' ')[0] : 'none';
      box.querySelectorAll('.vn-ops button').forEach((bt, i) => bt.classList.toggle('on', i === k));
      box.querySelectorAll('.vn-num').forEach(t => t.classList.toggle('in', !!st.res && st.res.includes(+t.dataset.v)));
      box.querySelector('.vn-res').innerHTML = st.res
        ? `<code>${vzEsc(st.code)}</code> → <code>{${st.res.join(', ')}}</code> <span class="vn-name">${vzEsc(st.name)}</span>`
        : `<code>a = {${a.join(', ')}}</code> · <code>b = {${b.join(', ')}}</code>`;
      box.querySelector('.lv-msg').innerHTML = st.msg;
    };
    box.querySelector('.vn-ops').addEventListener('click', e => { if (e.target.dataset.k) show(+e.target.dataset.k); });
    show(0);
  }
}

/* ---------- slice: พิมพ์ start:stop:step แล้วดูว่ากล่องไหนถูกเลือก ---------- */

// ตัดแบบเดียวกับ Python (ทดสอบเทียบ Python จริง 4,725 กรณี) · คืน index ที่ถูกเลือกตามลำดับ
function pySlice(n, a, b, c) {
  const step = c == null ? 1 : c;
  const fix = (v, lo, hi, dflt) => {
    if (v == null) return dflt;
    if (v < 0) v += n;
    return Math.min(Math.max(v, lo), hi);
  };
  const start = step > 0 ? fix(a, 0, n, 0) : fix(a, -1, n - 1, n - 1);
  const stop = step > 0 ? fix(b, 0, n, n) : fix(b, -1, n - 1, -1);
  const idx = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) idx.push(i);
  return { start, stop, step, idx };
}

function initSliceViz() {
  for (const box of document.querySelectorAll('.sliceviz')) {
    const { name, seq, str, presets } = JSON.parse(box.querySelector('script').textContent);
    const n = seq.length;
    const rep = v => str ? v : String(v);
    const repr = vals => str ? `'${vals.join('')}'` : `[${vals.join(', ')}]`;
    box.insertAdjacentHTML('beforeend', `
      <div class="sl-ops">${presets.map(p => `<button>${vzEsc(p)}</button>`).join('')}</div>
      <label class="sl-in"><code>${vzEsc(name)}[</code><input spellcheck="false" autocomplete="off" aria-label="พิมพ์ index หรือ start:stop:step"><code>]</code>
        <span class="sl-hint">พิมพ์เองก็ได้</span></label>
      <div class="lv-stage sl-stage"><span class="lv-name">${vzEsc(name)}</span>
        <div class="lv-row">${seq.map((v, i) => `<div class="lv-box"><span class="sl-neg">${i - n}</span>${vzEsc(rep(v))}<span class="lv-i">${i}</span></div>`).join('')}
        <span class="sl-stop"><b>stop</b></span></div></div>
      <div class="lv-stage sl-res"><span class="lv-name">ผลลัพธ์</span><div class="lv-row"></div></div>
      <div class="st-msg lv-msg"></div>`);
    const input = box.querySelector('input'), boxes = [...box.querySelectorAll('.sl-stage .lv-box')];
    const stopMark = box.querySelector('.sl-stop'), res = box.querySelector('.sl-res .lv-row');
    const msg = box.querySelector('.lv-msg');
    const num = v => v === undefined || v === '' ? null : Number(v);

    function show(text, animate) {
      box.querySelectorAll('.sl-ops button').forEach(b => b.classList.toggle('on', b.textContent === text));
      boxes.forEach(b => { b.classList.remove('pick', 'hit'); b.querySelector('.sl-ord')?.remove(); });
      stopMark.hidden = true;
      res.innerHTML = '';
      const m = text.match(/^\s*(-?\d+)?\s*(?::\s*(-?\d+)?\s*(?::\s*(-?\d+)?\s*)?)?$/);
      if (!m || !text.trim()) {
        msg.innerHTML = 'พิมพ์ได้ 2 แบบ: เลขตัวเดียว เช่น <code>2</code> <code>-1</code> หรือแบบ slice เช่น <code>1:4</code> <code>::2</code> <code>::-1</code>';
        return;
      }
      if (!text.includes(':')) {                                   // index ตัวเดียว
        let i = Number(m[1]);
        const j = i < 0 ? i + n : i;
        if (j < 0 || j >= n) {
          msg.innerHTML = `<span class="st-exc">IndexError: ${str ? 'string' : 'list'} index out of range</span> · มีแค่ index 0 ถึง ${n - 1} (หรือ −${n} ถึง −1) · <b>index เกินขอบจะพัง แต่ slice ไม่พัง</b>`;
          return;
        }
        boxes[j].classList.add('hit');
        res.innerHTML = `<div class="lv-box in-top">${vzEsc(rep(seq[j]))}</div>`;
        msg.innerHTML = `<code>${vzEsc(name)}[${i}]</code> → <code>${vzEsc(str ? `'${seq[j]}'` : String(seq[j]))}</code>` +
          (i < 0 ? ` · ติดลบนับจากท้าย: ${i} คือ index ${j}` : '') + ' · <b>ได้ค่าเดียว ไม่ใช่ ' + (str ? 'string' : 'list') + '</b>';
        return;
      }
      const [a, b, c] = [num(m[1]), num(m[2]), num(m[3])];
      if (c === 0) { msg.innerHTML = '<span class="st-exc">ValueError: slice step cannot be zero</span> · step เป็น 0 ไม่ได้ (เดินไม่ไปไหน)'; return; }
      const s = pySlice(n, a, b, c), vals = s.idx.map(i => seq[i]);
      s.idx.forEach((i, k) => {
        boxes[i].classList.add('pick');
        boxes[i].insertAdjacentHTML('beforeend', `<span class="sl-ord">${k + 1}</span>`);
      });
      // เส้น stop: ขอบกล่องที่ไม่ถูกเอา (เดินขวา = ขอบซ้าย, เดินซ้าย = ขอบขวา)
      const edge = s.step > 0
        ? (s.stop < n ? boxes[s.stop].offsetLeft : boxes[n - 1].offsetLeft + boxes[n - 1].offsetWidth)
        : (s.stop >= 0 ? boxes[s.stop].offsetLeft + boxes[s.stop].offsetWidth : boxes[0].offsetLeft);
      stopMark.style.left = edge - 1 + 'px';
      stopMark.hidden = !(s.step > 0 ? s.stop < n : s.stop >= 0);
      res.innerHTML = vals.map((v, k) => `<div class="lv-box${animate ? ' in-top' : ''}" style="animation-delay:${k * 70}ms">${vzEsc(rep(v))}</div>`).join('');
      setTimeout(() => res.querySelectorAll('.in-top').forEach(e => e.classList.remove('in-top')), vals.length * 70 + 650);
      const why = [];
      if (a == null) why.push(`ละ start → เริ่มที่${s.step > 0 ? 'ตัวแรก' : 'ตัวท้าย'}`);
      else if (a < 0) why.push(`start ${a} = index ${a + n}`);
      if (b == null) why.push(`ละ stop → ไปจน${s.step > 0 ? 'สุดท้าย' : 'ถึงตัวแรก'}`);
      else if (b < 0 && b + n >= 0) why.push(`stop ${b} = index ${b + n}`);
      if ((a != null && (a >= n || a < -n)) || (b != null && (b > n || b < -n))) why.push('<b>เลขเกินขอบ slice ไม่พัง ตัดเท่าที่มี</b>');
      if (s.step < 0) why.push('<b>step ติดลบ = เดินถอยหลัง</b>');
      msg.innerHTML = `<code>${vzEsc(name)}[${vzEsc(text.trim())}]</code> → <code>${vzEsc(repr(vals.map(rep)))}</code> · ` +
        (vals.length
          ? `เริ่ม index <b>${s.start}</b> เดินทีละ <b>${s.step}</b> ${s.stop === n || s.stop === -1 ? 'ไปจน<b>สุดขอบ</b>' : `หยุด<b>ก่อน</b> index <b>${s.stop}</b> (ไม่เอาตัวนี้)`}`
          : '<b>ไม่ได้สักตัว</b> เพราะจุดเริ่มเลยจุดหยุดไปแล้ว') +
        (why.length ? `<div class="st-note">${why.join(' · ')}</div>` : '');
    }
    box.querySelector('.sl-ops').addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      input.value = e.target.textContent;
      show(input.value, !vzCalm());
    });
    input.addEventListener('input', () => show(input.value, false));
    input.value = presets[0];
    show(presets[0], false);
  }
}

/* ---------- convolution: เคอร์เนลเลื่อนทับภาพทีละตำแหน่ง ---------- */

function initConvViz() {
  for (const box of document.querySelectorAll('.convviz')) {
    const { img, k, div, out } = JSON.parse(box.querySelector('script').textContent);
    const R = out.length, C = out[0].length, kn = k.length;
    const gray = v => `background:rgb(${v},${v},${v});color:${v < 130 ? '#fff' : 'var(--ink)'}`;
    const steps = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const terms = [];
      let sum = 0;
      k.forEach((row, i) => row.forEach((w, j) => { terms.push(`${img[r + i][c + j]}×${w}`); sum += img[r + i][c + j] * w; }));
      steps.push({ r, c, msg: `(${terms.join(' + ')}) ÷ ${div} = ${sum} ÷ ${div} = <b>${out[r][c]}</b>` });
    }
    box.insertAdjacentHTML('beforeend', `
      <div class="cv-wrap">
        <div><div class="cv-lbl">ภาพเข้า ${img.length}×${img[0].length} · กรอบ = เคอร์เนล ÷ ${div}</div>
          <div class="cv-grid" style="--n:${img[0].length}">
            ${img.flat().map(v => `<span style="${gray(v)}">${v}</span>`).join('')}
            <div class="cv-k" style="--n:${kn}">${k.flat().map(w => `<i>×${w}</i>`).join('')}</div>
          </div></div>
        <div class="cv-eq">=</div>
        <div><div class="cv-lbl">ภาพออก ${R}×${C}</div>
          <div class="cv-grid cv-out" style="--n:${C}">${out.flat().map(() => '<span></span>').join('')}</div></div>
      </div>`);
    const win = box.querySelector('.cv-k'), cells = [...box.querySelectorAll('.cv-out span')];
    vzControls(box, steps, async (st, anim) => {
      win.style.transition = anim ? '' : 'none';
      win.style.transform = `translate(calc(${st.c} * var(--cell)), calc(${st.r} * var(--cell)))`;
      const cur = st.r * C + st.c;
      cells.forEach((el, i) => {
        const v = out[Math.floor(i / C)][i % C];
        el.textContent = i <= cur ? v : '';
        el.style.cssText = i <= cur ? gray(v) : '';
        el.classList.toggle('now', i === cur);
      });
      if (anim) await vzWait(450);
    });
    // ปุ่มเล่นอัตโนมัติ: กด "ถัดไป" ให้เองจนถึงตำแหน่งสุดท้าย
    const ctl = box.querySelector('.st-ctl'), next = box.querySelector('.st-next');
    ctl.querySelector('.st-count').insertAdjacentHTML('beforebegin', '<button class="cv-play" title="เล่นอัตโนมัติ">⏵ เล่น</button>');
    const play = ctl.querySelector('.cv-play');
    let timer = null;
    const stop = () => { clearInterval(timer); timer = null; play.textContent = '⏵ เล่น'; };
    play.addEventListener('click', () => {
      if (timer) return stop();
      if (next.dataset.go === 'first') next.click();
      play.textContent = '⏸ หยุด';
      timer = setInterval(() => next.dataset.go === 'first' ? stop() : next.click(), 1300);
    });
    ctl.addEventListener('click', e => { if (e.isTrusted && e.target !== play) stop(); });
  }
}

/* ---------- เติมโค้ดในช่องว่าง ---------- */

function initFillIn() {
  // ยอมรับช่องว่างต่างกัน และ ' กับ " สลับกันได้ แต่ตัวพิมพ์เล็กใหญ่ต้องตรง (Python แยกตัวพิมพ์)
  const norm = s => s.trim().replace(/\s+/g, ' ').replace(/'/g, '"');
  for (const box of document.querySelectorAll('.fillin')) {
    const { code, blanks, out } = JSON.parse(box.querySelector('script').textContent);
    let n = 0;
    const html = code.map(line => vzEsc(line).replace(/@(\d+)@/g, (_, k) => {
      n++;
      const b = blanks[k];
      return `<input class="fi-in" size="${Math.max(4, b.a[0].length + 1)}" spellcheck="false" autocomplete="off"
        data-k="${k}" aria-label="ช่องเติมที่ ${k}"${b.hint ? ` title="${vzEsc(b.hint)}" placeholder="${vzEsc(b.hint)}"` : ''}>`;
    })).join('\n');
    box.insertAdjacentHTML('beforeend', `
      <pre class="fi-code">${html}</pre>
      ${out ? `<div class="fi-want"><b>ต้องได้ผลลัพธ์</b><pre class="out-box">${vzEsc(out)}</pre></div>` : ''}
      <div class="fi-ctl">
        <button class="fi-check">ตรวจคำตอบ</button>
        <button class="fi-show">ดูเฉลย</button>
        <span class="fi-msg"></span>
      </div>`);
    const inputs = [...box.querySelectorAll('.fi-in')];
    const msg = box.querySelector('.fi-msg'), check = box.querySelector('.fi-check'), show = box.querySelector('.fi-show');
    const mark = i => {
      const ok = blanks[i.dataset.k].a.some(a => norm(a) === norm(i.value));
      i.classList.toggle('right', ok);
      i.classList.toggle('wrong', !ok);
      return ok;
    };
    check.addEventListener('click', () => {
      const ok = inputs.filter(mark).length;
      msg.textContent = ok === inputs.length
        ? `ถูกทุกช่อง ${ok}/${inputs.length} · ลองพิมพ์ลงไฟล์ .py แล้วรันดูด้วย`
        : `ถูก ${ok}/${inputs.length} ช่อง · ช่องสีแดงลองใหม่`;
    });
    let saved = null;                                  // ดูเฉลย ↔ ปิดเฉลย: ปิดแล้วได้ของที่พิมพ์ไว้คืน
    show.addEventListener('click', () => {
      if (!saved) {
        saved = inputs.map(i => i.value);
        for (const i of inputs) { i.value = blanks[i.dataset.k].a[0]; i.readOnly = true; mark(i); }
        show.textContent = 'ปิดเฉลย';
        check.disabled = true;
        msg.textContent = 'นี่คือคำตอบหนึ่งที่ถูก · เขียนต่างจากนี้แต่ได้ผลเดียวกันก็ถือว่าใช้ได้';
      } else {
        inputs.forEach((i, k) => { i.value = saved[k]; i.readOnly = false; i.classList.remove('right', 'wrong'); });
        saved = null;
        show.textContent = 'ดูเฉลย';
        check.disabled = false;
        msg.textContent = '';
      }
    });
    inputs.forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') check.click(); }));
  }
}

/* ---------- ระบายสีโค้ด Python (เขียนเอง ไม่ต้องโหลดไลบรารีจากเน็ต) ---------- */

const PY_KW = new Set(('False None True and as assert async await break class continue def del elif else except ' +
  'finally for from global if import in is lambda nonlocal not or pass raise return try while with yield').split(' '));
const PY_BI = new Set(('abs all any bool chr dict divmod enumerate filter float format id input int isinstance len ' +
  'list map max min open ord pow print range repr reversed round set sorted str sum tuple type zip').split(' '));

// คอมเมนต์ · ข้อความ (รวม f-string และสามอัญประกาศ) · ตัวเลข · ชื่อ
const PY_RE = /(#[^\n]*)|('''[\s\S]*?'''|"""[\s\S]*?"""|[frbFRB]{0,2}'(?:\\.|[^'\\\n])*'|[frbFRB]{0,2}"(?:\\.|[^"\\\n])*")|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)/g;

function pyColor(code) {
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let out = '', last = 0, m;
  PY_RE.lastIndex = 0;
  while ((m = PY_RE.exec(code))) {
    out += esc(code.slice(last, m.index));
    last = PY_RE.lastIndex;
    const [all, comment, string, num, name] = m;
    if (comment) out += `<span class="c-cm">${esc(all)}</span>`;
    else if (string) out += `<span class="c-st">${esc(all)}</span>`;
    else if (num) out += `<span class="c-nu">${all}</span>`;
    else if (PY_KW.has(name)) out += `<span class="c-kw">${name}</span>`;
    else if (PY_BI.has(name)) out += `<span class="c-bi">${name}</span>`;
    else if (/^\s*(def|class)\s+$/.test(code.slice(0, m.index).split('\n').pop())) out += `<span class="c-fn">${name}</span>`;
    else out += name;
  }
  return out + esc(code.slice(last));
}

function colorCode() {
  // โค้ดในบทเรียน: ระบายเฉพาะข้อความเปล่า ส่วนที่ถูกครอบด้วย span อยู่แล้ว (คอมเมนต์ผลลัพธ์ / error) ปล่อยไว้
  for (const pre of document.querySelectorAll('pre')) {
    if (pre.matches('.out-box, .err, .st-out') || pre.closest('.out-box')) continue;
    for (const node of [...pre.childNodes]) {
      if (node.nodeType !== 3 || !node.nodeValue.trim()) continue;
      const span = document.createElement('span');
      span.innerHTML = pyColor(node.nodeValue);
      node.replaceWith(span);
    }
  }
  // โค้ดในวิดเจ็ต (ตัวไล่ทีละบรรทัด / กล่อง list / slice)
  for (const code of document.querySelectorAll('.st-code li code'))
    code.innerHTML = pyColor(code.textContent);
}

/* ---------- boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  buildPager();
  initQuiz();
  initTrace();
  initStepper();
  initListViz();
  initDictViz();
  initSetViz();
  initVenn();
  initSliceViz();
  initConvViz();
  initFillIn();
  colorCode();          // ต้องหลัง initFillIn เพื่อระบายสีโค้ดรอบช่องเติมด้วย
  buildLayout();
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.toLowerCase() === 's') toggleSidebar();
  if (e.key === 'ArrowLeft')  go(-1);
  if (e.key === 'ArrowRight') go(1);
});
