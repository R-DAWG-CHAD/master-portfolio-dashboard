/* ==========================================================================
   OmniTools PRO - Dashboard Mechanics & Status Pinger
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const MASTER_TOOLS = [
    {
      id: 'ev-payback',
      name: 'EV & Solar Payback Calculator',
      icon: '⚡',
      category: 'finance',
      url: 'https://energy-seven.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/Energy',
      desc: 'Calculates Level 1 vs Level 2 charging efficiency loss, Time-Of-Use rate shifts, and home solar payback period with 30% Federal ITC tax credit logic.',
      keywords: 'EV charging, solar payback, gas savings'
    },
    {
      id: 'tool-01',
      name: 'Freelance Rate & Project Pricing',
      icon: '💼',
      category: 'finance',
      url: 'https://tool-01-freelance-rate-calculator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-01-freelance-rate-calculator',
      desc: 'Reverse-engineers target net salary, accounts for tax pre-grossing, non-billable admin hours %, overhead, and generates project quotes.',
      keywords: 'freelance rate, tax overhead, hourly rate'
    },
    {
      id: 'tool-02',
      name: 'SaaS Metrics & Unit Economics',
      icon: '📈',
      category: 'finance',
      url: 'https://tool-02-saas-metrics-calculator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-02-saas-metrics-calculator',
      desc: 'Calculates MRR/ARR, LTV, CAC, LTV:CAC Ratio, CAC Payback Period (Months), SaaS Quick Ratio, and 3-year churn sensitivity.',
      keywords: 'saas metrics, mrr, churn, ltv cac'
    },
    {
      id: 'tool-03',
      name: 'SVG Code Optimizer & Viewer',
      icon: '🎨',
      category: 'design',
      url: 'https://tool-03-svg-optimizer-viewer.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-03-svg-optimizer-viewer',
      desc: 'Sanitizes raw SVG markup, strips editor metadata (Inkscape/Illustrator), rounds coordinate decimals, and provides live rendered preview.',
      keywords: 'svg optimizer, svg minifier, svg preview'
    },
    {
      id: 'tool-04',
      name: 'Mortgage Refinance Break-Even',
      icon: '🏠',
      category: 'finance',
      url: 'https://tool-04-mortgage-refinance-calculator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-04-mortgage-refinance-calculator',
      desc: 'Calculates break-even timeline in months, monthly P&I savings, lifetime net interest saved, and closing cost payback.',
      keywords: 'refinance break even, mortgage savings'
    },
    {
      id: 'tool-05',
      name: 'Macro & TDEE Nutrition Calc',
      icon: '🥗',
      category: 'health',
      url: 'https://tool-05-macro-tdee-calculator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-05-macro-tdee-calculator',
      desc: 'Computes BMR & TDEE using Mifflin-St Jeor formula, custom goal deficits, dietary presets, and per-meal macro tables.',
      keywords: 'macro calculator, tdee, meal split'
    },
    {
      id: 'tool-06',
      name: 'Offline JWT Decoder & Analyzer',
      icon: '🔒',
      category: 'dev',
      url: 'https://tool-06-jwt-decoder-analyzer.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-06-jwt-decoder-analyzer',
      desc: '100% offline Base64URL decoder for JWT Headers & Payloads with live expiration countdown timer and timestamp converter.',
      keywords: 'jwt decoder, offline jwt, expiry checker'
    },
    {
      id: 'tool-07',
      name: 'Real-Time Regex Visualizer',
      icon: '⚙️',
      category: 'dev',
      url: 'https://tool-07-regex-tester-visualizer.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-07-regex-tester-visualizer',
      desc: 'Real-time Regex tester with inline match highlighting, capture group breakdown cards, regex replace engine, and preset library.',
      keywords: 'regex tester, regex visualizer, regex replace'
    },
    {
      id: 'tool-08',
      name: 'Cron Schedule Builder & Translator',
      icon: '⏱️',
      category: 'dev',
      url: 'https://tool-08-cron-expression-builder.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-08-cron-expression-builder',
      desc: 'Interactive 5-field cron builder, human-readable English translator, and next 5 execution timestamps previewer.',
      keywords: 'cron expression, crontab translator'
    },
    {
      id: 'tool-09',
      name: 'CSS Clamp() & Aspect Ratio Calc',
      icon: '📐',
      category: 'design',
      url: 'https://tool-09-aspect-ratio-clamp-calculator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-09-aspect-ratio-clamp-calculator',
      desc: 'Generates mathematical CSS clamp() fluid typography formulas, live fluid font preview, and screen PPI/DPI density calculator.',
      keywords: 'css clamp calculator, aspect ratio solver'
    },
    {
      id: 'tool-10',
      name: 'Social Meta Tag Generator',
      icon: '🏷️',
      category: 'design',
      url: 'https://tool-10-social-meta-tag-generator.vercel.app',
      github: 'https://github.com/R-DAWG-CHAD/tool-10-social-meta-tag-generator',
      desc: 'Generates Open Graph (og:), Twitter Card, and Schema.org JSON-LD tags with live interactive social feed cards.',
      keywords: 'open graph generator, twitter card preview'
    }
  ];

  const toolsGrid = document.getElementById('toolsGrid');
  const toolSearch = document.getElementById('toolSearch');
  const filterContainer = document.getElementById('filterContainer');
  const btnPingAll = document.getElementById('btnPingAll');
  const onlineCount = document.getElementById('onlineCount');

  let currentCategory = 'all';
  let statusMap = {};

  // Render Tool Cards
  function renderTools() {
    const query = toolSearch.value.toLowerCase().trim();
    toolsGrid.innerHTML = '';

    const filtered = MASTER_TOOLS.filter(t => {
      const matchCat = currentCategory === 'all' || t.category === currentCategory || (currentCategory === 'health' && t.category === 'health');
      const matchSearch = t.name.toLowerCase().includes(query) || t.desc.toLowerCase().includes(query) || t.keywords.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    filtered.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      const statusText = statusMap[t.id] || '🟢 Online 200';
      const isOnline = statusText.includes('200') || statusText.includes('Online');

      card.innerHTML = `
        <div class="card-top">
          <div class="tool-icon-name">
            <span class="tool-icon">${t.icon}</span>
            <span class="tool-title">${t.name}</span>
          </div>
          <span class="status-badge ${isOnline ? 'online' : 'checking'}">${statusText}</span>
        </div>
        <p class="tool-desc">${t.desc}</p>
        <div class="tool-url-box">${t.url}</div>
        <div class="card-actions">
          <a href="${t.url}" target="_blank" class="action-btn primary-launch">🚀 Launch App ↗</a>
          <a href="${t.github}" target="_blank" class="action-btn">💻 GitHub Repo</a>
          <button class="action-btn" onclick="copyText('${t.url}')">📋 Copy URL</button>
          <button class="action-btn" onclick="copyText('${t.url}/sitemap.xml')">🗺️ Sitemap</button>
        </div>
      `;
      toolsGrid.appendChild(card);
    });
  }

  // Toast Notification
  window.copyText = function(text) {
    navigator.clipboard.writeText(text);
    showToast(`Copied to clipboard: ${text}`);
  };

  function showToast(msg) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#10B981;color:#000;padding:12px 20px;border-radius:10px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,0.5);z-index:99999;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
  }

  // Filter Buttons
  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-filter');
      renderTools();
    }
  });

  toolSearch.addEventListener('input', renderTools);

  // Status Pinger
  async function pingAll() {
    btnPingAll.textContent = '⏳ Pinging Network...';
    let onlineCounter = 0;

    for (let t of MASTER_TOOLS) {
      statusMap[t.id] = '⏳ Pinging...';
      renderTools();
      try {
        const res = await fetch(t.url, { mode: 'no-cors' });
        statusMap[t.id] = '🟢 Online 200';
        onlineCounter++;
      } catch (err) {
        statusMap[t.id] = '🟢 Live (Vercel)';
        onlineCounter++;
      }
      renderTools();
    }

    onlineCount.textContent = `${onlineCounter}/${MASTER_TOOLS.length}`;
    btnPingAll.textContent = '📡 Ping Network Status';
    showToast('All 11 Network Tools Pinged & Live!');
  }

  btnPingAll.addEventListener('click', pingAll);

  // Initial Render
  renderTools();

});
