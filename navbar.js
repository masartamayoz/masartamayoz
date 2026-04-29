/**
 * navbar.js — Shared Navigation Component
 * أكاديمية مسار التميز
 * يُضاف في الصفحات التي ليس فيها قائمة تنقل خاصة
 */

(function() {
  // الصفحات التي لها قائمة خاصة بها — لا نضيف navbar.js فيها
  const EXCLUDED = ['index.html', 'courses.html', 'dashboard.html', 'auth.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (EXCLUDED.includes(currentPage)) return;

  // تحقق إضافي — إذا كان هناك nav-item أو header-nav موجود مسبقاً لا نضيف شيئاً
  const header = document.querySelector('header');
  if (!header) return;
  if (header.querySelector('.header-nav, .nav-item, .shared-nav')) return;

  const headerInner = header.querySelector('.header-inner');
  if (!headerInner) return;

  const LINKS = [
    { href:'index.html',     icon:'fa-home',       label:'الرئيسية' },
    { href:'courses.html',   icon:'fa-book-open',  label:'الدروس'   },
    { href:'about.html',     icon:'fa-info-circle',label:'من نحن'   },
    { href:'contact.html',   icon:'fa-envelope',   label:'تواصل معنا'},
    { href:'dashboard.html', icon:'fa-tachometer-alt', label:'لوحتي'},
  ];

  const style = document.createElement('style');
  style.textContent = `
    .shared-nav { display:flex; align-items:center; gap:4px; }
    .shared-nav a {
      color:rgba(255,255,255,.8); font-size:.85rem; font-weight:500;
      padding:7px 12px; border-radius:8px;
      display:flex; align-items:center; gap:6px;
      text-decoration:none; transition:all .2s;
      white-space:nowrap;
    }
    .shared-nav a:hover { background:rgba(255,255,255,.1); color:white; }
    .shared-nav a.active { background:rgba(255,255,255,.12); color:#fbbf24; font-weight:700; }
    @media(max-width:900px) { .shared-nav span { display:none; } }
    @media(max-width:600px) { .shared-nav { display:none; } }
  `;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.className = 'shared-nav';

  LINKS.forEach(l => {
    const isActive = currentPage === l.href;
    const a = document.createElement('a');
    a.href = l.href;
    a.className = isActive ? 'active' : '';
    a.innerHTML = `<i class="fas ${l.icon}"></i><span>${l.label}</span>`;
    nav.appendChild(a);
  });

  // أضف القائمة قبل آخر عنصر في الهيدر
  const lastChild = headerInner.lastElementChild;
  headerInner.insertBefore(nav, lastChild);
})();

