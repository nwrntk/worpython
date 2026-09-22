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
  buildLayout();
});

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.toLowerCase() === 's') toggleSidebar();
  if (e.key === 'ArrowLeft')  go(-1);
  if (e.key === 'ArrowRight') go(1);
});
