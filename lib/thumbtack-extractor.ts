/**
 * Runs inside the Thumbtack profile page (ScrapingBee `js_scenario` evaluate).
 * Thumbtack keeps the review list in client state, so the only way to read it is
 * to drive the page's own sort select and Next button, then read the DOM.
 *
 * Kept as a plain string so the exact same source can be pasted into a real
 * browser to test it against the live page. It travels in a URL query string,
 * so it must stay free of `//` comments, backticks and interpolation, and every
 * statement must end in a semicolon (callers collapse newlines to spaces).
 * Contract: sets window.__tt = { done, reviews, aggregate, error } and appends
 * <div id="tt-done"> when finished, so the caller can wait_for it.
 *
 * DOM notes: each star is a gray svg with a nested div clipping a green svg, and
 * an unfilled star has a zero-width overlay. A review card's innerText lines are
 * name, date, bullet, "Hired on Thumbtack", body, details, "<pro>'s reply", reply;
 * the service label is read from the card's last element instead. React tracks
 * the select value, so the sort is set through the native value setter.
 */
export const THUMBTACK_EXTRACTOR = String.raw`(() => {
  const T = (window.__tt = { done: false, reviews: [], aggregate: null, error: null });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const until = async (fn, ms) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      const v = fn();
      if (v) return v;
      await sleep(150);
    }
    return null;
  };
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const isMore = (l) => /^(…|\.\.\.)\s*read more$/i.test(l);
  const section = () => document.getElementById('ServicePageReviewsSection');
  const cards = () => {
    const s = section();
    return s ? [...s.querySelectorAll('div.pv4.bb.b-gray')] : [];
  };
  const key = (c) => clean(c.innerText).slice(0, 80);
  const rating = (c) =>
    [...c.querySelectorAll('div')]
      .filter((d) => d.querySelector(':scope > svg') && d.querySelector(':scope > div > svg'))
      .filter((d) => d.querySelector(':scope > div').getBoundingClientRect().width > 0).length;
  const parse = (c) => {
    const lines = c.innerText.split('\n').map(clean).filter(Boolean);
    const det = lines.findIndex((l) => /^Details:/i.test(l));
    const rep = lines.findIndex((l) => /['’]s reply$/i.test(l));
    let start = 2;
    while (lines[start] === '•' || /^Hired/i.test(lines[start] || '')) start++;
    const stops = [det, rep].filter((i) => i >= 0);
    const end = stops.length ? Math.min(...stops) : lines.length;
    const last = c.firstElementChild && c.firstElementChild.lastElementChild;
    const lastText = last ? clean(last.innerText) : '';
    const isLabel = lastText && lastText.length < 80 && lastText !== lines[rep + 1] && !/^(show|see|read)\b/i.test(lastText);
    const service = isLabel ? lastText : '';
    const replyLines = rep >= 0 ? lines.slice(rep + 1) : [];
    if (service && replyLines[replyLines.length - 1] === service) replyLines.pop();
    return {
      name: lines[0] || '',
      date: lines[1] || '',
      rating: rating(c),
      service,
      details: det >= 0 ? lines[det].replace(/^Details:\s*/i, '') : '',
      body: lines.slice(start, end).filter((l) => !isMore(l)).join(' '),
      reply: replyLines.filter((l) => !isMore(l)).join(' '),
    };
  };
  const sortNewest = async () => {
    const sel = section().querySelector('select');
    if (!sel) return;
    const first = cards()[0] && key(cards()[0]);
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(sel, 'newestFirst');
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await until(() => cards()[0] && key(cards()[0]) !== first, 4000);
  };
  (async () => {
    try {
      if (!(await until(() => cards().length, 15000))) throw new Error('review cards not found');
      await sleep(500);
      try {
        const ld = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
        const node = (ld['@graph'] || [ld]).find((x) => x.aggregateRating);
        if (node) T.aggregate = { rating: node.aggregateRating.ratingValue, count: node.aggregateRating.reviewCount };
      } catch (e) {}
      await sortNewest();
      const seen = new Set();
      const deadline = Date.now() + 20000;
      for (let page = 0; page < 30 && Date.now() < deadline; page++) {
        for (const c of cards()) {
          const r = parse(c);
          const k = r.name + '|' + r.body.slice(0, 40);
          if (r.name && r.body && !seen.has(k)) {
            seen.add(k);
            T.reviews.push(r);
          }
        }
        const next = section().querySelector('button[aria-label="Next"]');
        if (!next || next.disabled) break;
        const first = cards()[0] && key(cards()[0]);
        next.click();
        if (!(await until(() => cards()[0] && key(cards()[0]) !== first, 4000))) break;
      }
    } catch (e) {
      T.error = String((e && e.message) || e);
    }
    T.done = true;
    const m = document.createElement('div');
    m.id = 'tt-done';
    document.body.appendChild(m);
  })();
})();`;
