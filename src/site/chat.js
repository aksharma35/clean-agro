// Ask Clean Agro — floating chat widget
// Knowledge base and matching engine below are verbatim from the published
// artifact (https://claude.ai/public/artifacts/7fb6f6fa-eaa1-463a-b835-7e61f167882d).
// =========================================================================
// Knowledge base — every entry's `answer` is drawn only from
// clean_agro_help_docs.md. `section` is the exact citation shown to the
// user as "Traced to <section>." Nothing here should assert a fact that
// isn't in the source document.
// =========================================================================
const KB = [
  {
    section: "Company Overview",
    keywords: [
      "who are you", "what is clean agro", "about clean agro", "tell me about clean agro",
      "company", "who founded", "founder", "ankush", "mayank", "sharma", "registered",
      "where are you based", "based in nashik", "headquarters", "head office",
      "where is clean agro located", "clean agro located", "located in",
      "which state", "state do you operate", "how many farmer", "farmer partner",
      "how many acre", "acre under conversion", "synthetic pesticide", "pesticide use",
      "0 ml", "mission", "smallholder", "western india", "ai engineer", "seven year",
      "operational unit", "when was clean agro", "when did clean agro start", "who started clean agro",
      "about your company", "tell me about your company"
    ],
    answer: `Hi! We're Clean Agro, registered in 2024 and based in Nashik, Maharashtra. We team up with smallholder farmers across western India, helping them grow residue-free fruit, veggies, and grain using bio-fertilizers and real on-farm science instead of synthetic inputs.<br><br>We were founded by Ankush Sharma and Mayank Sharma — two AI engineers who left their tech careers in 2023 to build something rooted in soil science and real farm economics. Today that's grown into 2,140+ farmer partners across 11,800 acres in Maharashtra, Madhya Pradesh, and Gujarat, with 0&nbsp;ml of synthetic pesticide used on our partner farms.`
  },
  {
    section: "What We Do",
    keywords: [
      "what do you do", "what does clean agro do", "overview of your work",
      "services you offer", "services do you offer", "grow harvest learn", "three areas", "how does clean agro work"
    ],
    answer: `Good question! We focus on three things: <strong>Grow</strong> — the bio-inputs we make, <strong>Harvest</strong> — buying and certifying residue-free produce from partner farms, and <strong>Learn</strong> — our farmer transition programme. Want me to go deeper on any of these?`
  },
  {
    section: "Grow — Bio-inputs",
    keywords: [
      "bio-input", "bio input", "products do you make", "what products",
      "vermicompost", "fym", "farmyard manure", "neem", "pest management", "jeevamrut",
      "microbial", "consortia", "soil test", "soil testing", "fertilizer", "organic fertilizer",
      "where are your products made", "batch tested", "farm waste"
    ],
    answer: `We make our bio-inputs at our Nashik and Indore units, from farm waste, neem, and native microbial cultures — every batch gets tested before it leaves the gate. Here's what we produce:<br>• Vermicompost &amp; enriched FYM (farmyard manure)<br>• Neem-based pest management<br>• Jeevamrut &amp; microbial consortia<br>• Soil testing, explained in plain language`
  },
  {
    section: "Harvest — Residue-free produce",
    keywords: [
      "what crop", "which crop", "crop do you buy", "produce", "buy from farmer", "sourcing",
      "grape", "pomegranate", "banana", "onion", "tomato", "okra", "turmeric", "soybean", "wheat", "chickpea",
      "residue-free", "residue free", "lab tested", "lab-tested", "traceable", "cold chain", "grading",
      "price before sowing", "before sowing", "committed price", "farm-gate price", "how do you price", "how is pricing"
    ],
    answer: `We commit to a price before sowing even starts, then handle grading, cold chain logistics, and residue certification ourselves. Our crops include:<br>• Table grapes, pomegranate, banana<br>• Onion, tomato, okra, turmeric<br>• Soybean, wheat, chickpea<br><br>Every lot's lab-tested and traceable straight back to the farm it came from.`
  },
  {
    section: "Learn — Farmer transition programme",
    keywords: [
      "transition programme", "transition program", "learn programme", "field school",
      "agronomist", "training for farmer", "farmer training", "transition credit", "buy-back", "buyback",
      "three-season", "three season", "marathi", "hindi", "chemical to organic",
      "living-soil", "living soil", "how do farmers transition", "what does the programme include",
      "farmers transition", "transition to organic"
    ],
    answer: `Learn is our three-season programme that helps a farm move from chemical dependence to living-soil practices — without losing a season's income along the way. It includes:<br>• Field schools in Marathi and Hindi<br>• An agronomist on call all season<br>• Transition credit for bio-inputs<br>• A committed buy-back starting from year one`
  },
  {
    section: "Impact & Verification",
    keywords: [
      "impact", "verify your impact", "verification", "audited", "audit", "impact report",
      "publish impact", "how do you measure impact", "input cost saving", "premium over mandi",
      "mandi price", "farm-gate premium", "when do you publish", "annual report", "fy 2025", "2025-26", "2025–26"
    ],
    answer: `We publish our impact numbers every March, audited alongside our accounts. We track farmer partners across our three states, acres under residue-free cultivation, the average drop in input costs by season three, and the average premium farmers get over mandi (market) price at the farm gate. What you're seeing now is from our FY 2025–26 audit — happy to point you to the full report on request.`
  },
  {
    section: "Impact & Verification",
    keywords: [
      "timeline", "history of clean agro", "growth story", "milestone", "how has clean agro grown",
      "year by year", "when did you expand", "expansion to madhya pradesh", "expansion to gujarat",
      "yield increase", "35%", "28%", "50,000 dataset", "1m field observation",
      "how did clean agro start", "growth timeline"
    ],
    answer: `Here's the journey so far:<br>• <strong>2023</strong> — Our founders left tech and started training an AI model on 50,000 public farm datasets<br>• <strong>2024</strong> — We registered Clean Agro in Nashik and brought our AI crop-planning tool to 120 early-adopter farms<br>• <strong>2024</strong> — Our bio-inputs network came together, and our first 500 farmers saw 35% lower input costs<br>• <strong>2025</strong> — We expanded into Madhya Pradesh and Gujarat, and average yields rose 28%<br>• <strong>2026</strong> — Now we're at 2,140 farmer partners across 11,800 acres, with zero synthetic pesticide use on partner farms`
  },
  {
    section: "Harvest Calendar",
    keywords: [
      "harvest calendar", "when is grape season", "when do you harvest", "kharif", "rabi",
      "sowing season", "growing season", "onion season", "turmeric season", "wheat season", "soybean season",
      "sangli", "growing cycle", "sourcing calendar",
      "wheat harvest", "onion harvest", "turmeric harvest", "soybean harvest", "grape harvest", "harvest schedule"
    ],
    answer: `We work around the Kharif and Rabi growing seasons — farmers sow already knowing their price is locked in. Here's what we track:<br>• Grapes — Nashik<br>• Soybean — Kharif season, Madhya Pradesh<br>• Wheat — Rabi season, Madhya Pradesh<br>• Onion — Late Kharif<br>• Turmeric — Sangli belt<br><br>Each one shows its sowing, growing, and harvest &amp; supply windows through the year.`
  },
  {
    section: "Farmer Portal",
    keywords: [
      "farmer portal", "log in", "login", "sign in", "portal", "my account", "programme tools"
    ],
    answer: `Yep — farmer partners get their own Farmer Portal, linked from our site navigation, with all their programme tools and info. It's a separate login, just for farmers.`
  },
  {
    section: "Partnering with Clean Agro — For Buyers",
    keywords: [
      "buyer", "retailer", "exporter", "food brand", "wholesale", "how can i buy", "how can i source",
      "source from you", "become a buyer", "i'm a retailer", "we are a retailer", "supply agreement",
      "volume need", "become a customer", "want to buy", "purchase from", "buy from you", "buy your produce"
    ],
    answer: `We'd love to! We supply retailers, exporters, and food brands with lab-certified, residue-free produce, traceable right back to the farm. Send us your volume needs and sourcing calendar when you reach out, and we'll take it from there.`
  },
  {
    section: "Partnering with Clean Agro — For Farmers",
    keywords: [
      "join as a farmer", "become a partner farmer", "farmer eligibility", "eligible for the programme",
      "join clean agro", "join the transition programme", "how can my farm join", "field team visit",
      "free soil test", "first soil test", "soil test free", "sign up as a farmer", "farmland eligible",
      "how do i join", "is my farm eligible", "join the programme", "sign up my farm"
    ],
    answer: `If your farmland's in Maharashtra, Madhya Pradesh, or Gujarat, you're eligible! Our field team will come visit, and your first soil test is on us.`
  },
  {
    section: "Contact & Support",
    keywords: [
      "contact", "email", "phone", "call you", "phone number", "address", "reach you", "support",
      "help", "office location", "working hour", "opening hour", "newsletter", "mailing list", "contact form",
      "contact you", "contact clean agro", "reach clean agro", "get in touch", "how do i contact",
      "your contact", "contact info"
    ],
    answer: `Easiest is email — <a href="mailto:namaste@cleanagro.in">namaste@cleanagro.in</a> — or call +91 253 000 0000, Monday–Saturday, 9:00–18:00 IST. You can also visit us at Plot 12, MIDC Ambad, Nashik 422010, Maharashtra, or use the contact form on our site (a person replies within two working days). No mailing lists from us, promise.`
  }
];

// Topics section 8 explicitly rules out (investment/equity, financial
// figures beyond Impact, international shipping, careers, anything
// unrelated to farming/sourcing/bio-inputs). This is a RELEVANCE GATE:
// it runs before any KB match is accepted, and a hit here always wins,
// even if some words in the question also happened to overlap with a
// KB entry's keywords. This is what stops things like "What is Clean
// Agro's annual revenue?" (which starts like a Company Overview
// question but isn't one) or "Does Clean Agro ship produce
// internationally?" (which contains the in-scope word "produce" but is
// actually asking about something the document never covers).
const OUT_OF_SCOPE_RE = /\b(invest\w*|equit\w*|shareholder\w*|funding|valuation|ipo|career\w*|job\w*|vacan\w*|hiring|hire\w*|salary|salaries|resume|international(ly)?|overseas|abroad|revenue|turnover|profit\w*|net\s?worth|stock\s?price)\b/i;

function isOutOfScope(text) {
  return OUT_OF_SCOPE_RE.test(text);
}

const FALLBACK_HTML = 'That is not covered here, please contact support at <a href="mailto:namaste@cleanagro.in">namaste@cleanagro.in</a>.';

function normalize(t) { return (t || '').toLowerCase().trim(); }

// Most single words in this KB (crop names, product names, proper nouns,
// terms like "registered" or "traceable") are specific enough to trust
// on their own. Only a small handful are common English words that
// could plausibly show up in a totally unrelated sentence — those are
// the ones that actually caused the false positives we saw ("produce"
// matching a shipping question). Denylisting just those, instead of
// allowlisting everything else, means new document-specific keywords
// work correctly by default instead of needing to be added to a list.
const WEAK_SINGLE_WORDS = new Set([
  "help", "support", "contact", "produce", "company", "address", "mission", "sourcing"
]);

function keywordWeight(kw) {
  const words = kw.trim().split(/\s+/);
  if (words.length >= 2) return 4;                    // a real phrase match
  return WEAK_SINGLE_WORDS.has(kw) ? 0 : 2;            // generic word vs. everything else
}

function scoreEntry(text, entry) {
  // Find every keyword that matches, longest first, and skip a match
  // that's already covered by a longer match we've counted (otherwise
  // e.g. "transition programme" and "transition program" would both
  // score on the same text and double-count one real signal).
  const matched = entry.keywords.filter(function (kw) { return text.includes(kw); });
  matched.sort(function (a, b) { return b.length - a.length; });
  const counted = [];
  let score = 0;
  for (const kw of matched) {
    const redundant = counted.some(function (c) { return c.includes(kw); });
    if (redundant) continue;
    counted.push(kw);
    score += keywordWeight(kw);
  }
  return score;
}

function getBotReply(raw) {
  const text = normalize(raw);
  if (!text) return null;

  if (/^\s*(hi|hello|hey|namaste|yo)\b/i.test(text) || /^\s*good (morning|afternoon|evening)\b/i.test(text)) {
    return { kind: 'greeting', text: "Namaste! Happy to help with anything about Clean Agro — our story, bio-inputs, harvest crops, the transition programme, impact numbers, the harvest calendar, or how to reach us. What would you like to know?" };
  }
  if (/\bthank/i.test(text) || /\bthx\b/i.test(text) || /\bcheers\b/i.test(text)) {
    return { kind: 'smalltalk', text: "You're welcome! Anything else you'd like to know?" };
  }
  if (/^\s*(bye|goodbye|see you|take care)\b/i.test(text)) {
    return { kind: 'smalltalk', text: 'Take care! Reach us anytime at <a href="mailto:namaste@cleanagro.in">namaste@cleanagro.in</a>.' };
  }

  // Relevance gate: run first, and it always wins. A question doesn't
  // get answered from the document just because a few words overlapped
  // with a KB entry — it also has to NOT be asking about something the
  // document explicitly doesn't cover. This is what stops the two
  // reported false positives, independent of anything below.
  if (isOutOfScope(text)) {
    return { kind: 'fallback', text: FALLBACK_HTML };
  }

  let best = null, bestScore = 0;
  for (const entry of KB) {
    const s = scoreEntry(text, entry);
    if (s > bestScore) { bestScore = s; best = entry; }
  }

  // A single genuine keyword match (weight 2) is enough — the relevance
  // gate above is what protects against false positives, not a high bar
  // here. This just filters out the handful of denylisted weak words
  // scoring 0 on their own.
  const MIN_CONFIDENCE = 2;
  if (best && bestScore >= MIN_CONFIDENCE) {
    return { kind: 'answer', text: best.answer, section: best.section };
  }

  return { kind: 'fallback', text: FALLBACK_HTML };
}

// =========================================================================
// UI wiring (widget content from the artifact; open/close/outside-click
// wiring below is new, since the artifact was a standalone always-open page)
// =========================================================================
const fab = document.getElementById('agroFab');
const panel = document.getElementById('agroChat');
const closeBtn = document.getElementById('agroChatClose');
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(role, htmlOrText, opts) {
  opts = opts || {};
  const row = document.createElement('div');
  row.className = 'msg-row ' + role;

  const bubble = document.createElement('div');
  bubble.className = 'msg ' + role + (opts.fallback ? ' fallback' : '');

  if (role === 'user') {
    bubble.textContent = htmlOrText;
  } else {
    bubble.innerHTML = htmlOrText;
    if (opts.section) {
      const traceWrap = document.createElement('div');
      traceWrap.className = 'trace-wrap';
      const mark = document.createElement('span');
      mark.className = 'trace-mark';
      const label = document.createElement('span');
      label.className = 'trace-text';
      label.textContent = 'Traced to ' + opts.section + '.';
      traceWrap.appendChild(mark);
      traceWrap.appendChild(label);
      bubble.appendChild(traceWrap);
    }
  }

  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const row = document.createElement('div');
  row.id = 'typing-row';
  row.className = 'msg-row bot';
  row.innerHTML = '<div class="msg bot typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  const row = document.getElementById('typing-row');
  if (row) row.remove();
}

function updateSendState() {
  sendBtn.disabled = !inputEl.value.trim();
}

function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage('user', text);
  inputEl.value = '';
  updateSendState();
  inputEl.disabled = true;

  showTyping();
  setTimeout(function () {
    hideTyping();
    const reply = getBotReply(text);
    if (reply.kind === 'answer') {
      addMessage('bot', reply.text, { section: reply.section });
    } else if (reply.kind === 'fallback') {
      addMessage('bot', reply.text, { fallback: true });
    } else {
      addMessage('bot', reply.text);
    }
    inputEl.disabled = false;
    updateSendState();
    inputEl.focus();
  }, 450);
}

sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('input', updateSendState);
inputEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

document.querySelectorAll('.chip').forEach(function (btn) {
  btn.addEventListener('click', function () {
    inputEl.value = btn.getAttribute('data-q');
    updateSendState();
    sendMessage();
  });
});

// initial greeting (not a document answer, so no citation stub)
addMessage('bot', "Namaste! I'm here to help with anything about Clean Agro — our story, bio-inputs, harvest crops, the transition programme, impact numbers, the harvest calendar, or how to reach us. What would you like to know?");
updateSendState();

// ---- open / close / outside-click (floating-widget behavior) ----
function openChat() {
  panel.hidden = false;
  fab.hidden = true;
  fab.setAttribute('aria-expanded', 'true');
  inputEl.focus();
}

function closeChat() {
  panel.hidden = true;
  fab.hidden = false;
  fab.setAttribute('aria-expanded', 'false');
  fab.focus();
}

fab.addEventListener('click', openChat);
closeBtn.addEventListener('click', closeChat);

document.addEventListener('click', (e) => {
  if (panel.hidden) return;
  if (panel.contains(e.target) || fab.contains(e.target)) return;
  closeChat();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !panel.hidden) closeChat();
});

// exposed for automated testing of the matching engine
window.getBotReply = getBotReply;
window.KB = KB;
