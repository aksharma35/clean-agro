// Ask Agro — floating chat widget (static FAQ assistant, no backend)
const fab = document.getElementById('agroFab');
const panel = document.getElementById('agroChat');
const closeBtn = document.getElementById('agroChatClose');
const body = document.getElementById('agroChatBody');
const form = document.getElementById('agroChatForm');
const input = document.getElementById('agroChatText');

const GREETING = "Namaste! I'm Agro 🌱 — ask me about our bio-inputs, the harvest calendar, the farmer portal, pricing, or how to reach the team.";

function addMessage(text, who) {
  const el = document.createElement('div');
  el.className = `agro-msg ${who}`;
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'agro-msg bot typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
  return el;
}

// Keyword -> answer knowledge base, drawn from the site's own content.
const FAQ = [
  {
    keywords: ['portal', 'login', 'sign in', 'sign-in', 'dashboard', 'soil test result'],
    answer: "The farmer portal is where our partners see soil test results, field visit notes, and payment records. You can open it from the \"Farmer portal\" link in the top menu, or go straight to /portal/.",
  },
  {
    keywords: ['bio-input', 'bio input', 'vermicompost', 'neem', 'fertiliser', 'fertilizer', 'jeevamrut', 'pesticide', 'organic'],
    answer: "Our bio-inputs are made in our Nashik and Indore units from farm waste, neem, and native microbial cultures, batch-tested before they leave the gate: vermicompost & enriched FYM, neem-based pest management, Jeevamrut & microbial consortia, plus soil testing with plain-language reports.",
  },
  {
    keywords: ['harvest', 'calendar', 'season', 'kharif', 'rabi', 'sow', 'crop', 'grape', 'soybean', 'wheat', 'onion', 'turmeric'],
    answer: "Our network follows the Kharif and Rabi cycles — grapes (Nashik), soybean and wheat (Madhya Pradesh), onion, and turmeric (Sangli belt) are on the harvest calendar section of this page. Buyers plan against it; farmers sow against a price already committed.",
  },
  {
    keywords: ['price', 'pricing', 'pay', 'buy back', 'buyback', 'mandi', 'farm-gate', 'farm gate', 'sell', 'income'],
    answer: "We commit the buy-back price before sowing, so farmers don't carry transition risk alone. On average that's a 19% premium over mandi price, paid at the farm gate.",
  },
  {
    keywords: ['impact', 'stats', 'acres', 'farmers', 'result', 'yield'],
    answer: "As of our latest audit: 2,140+ farmer partners, 11,800 acres under residue-free cultivation, a 34% average drop in input costs by season three, and a 19% average premium over mandi price. Full figures are in the Impact section above.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'talk to', 'address', 'office'],
    answer: "You can reach us at namaste@cleanagro.in, or call +91 253 000 0000 (Mon–Sat, 9:00–18:00 IST). Our office is at Plot 12, MIDC Ambad, Nashik 422010, Maharashtra. A person replies within two working days.",
  },
  {
    keywords: ['where', 'location', 'state', 'maharashtra', 'gujarat', 'madhya pradesh', 'mp', 'nashik', 'indore'],
    answer: "We work with farmer partners across Maharashtra, Madhya Pradesh, and Gujarat, with units in Nashik and Indore, and an office in Vadodara.",
  },
  {
    keywords: ['about', 'story', 'who are you', 'founder', 'history', 'clean agro'],
    answer: "Clean Agro was founded in 2024 by Ankush Sharma and Mayank Sharma, two AI engineers who left tech careers to pair AI-driven crop planning with organic bio-inputs — helping smallholder farmers grow residue-free produce from living soil. You can read the full story in the \"Our story\" section.",
  },
  {
    keywords: ['farmer', 'transition', 'join', 'partner with you', 'become a partner'],
    answer: "If your land is in Maharashtra, Madhya Pradesh, or Gujarat and you're ready to transition, our field team will visit and the first soil test is on us. Our three-season transition programme includes field schools, on-call agronomist support, transition credit for bio-inputs, and a committed buy-back from year one. Reach out via the Contact section to get started.",
  },
  {
    keywords: ['thank', 'thanks'],
    answer: "You're welcome! 🌱 Anything else you'd like to know about Clean Agro?",
  },
  {
    keywords: ['hi', 'hello', 'hey', 'namaste'],
    answer: GREETING,
  },
];

function findAnswer(raw) {
  const text = raw.toLowerCase();
  for (const entry of FAQ) {
    if (entry.keywords.some((k) => text.includes(k))) return entry.answer;
  }
  return "I don't have a ready answer for that yet — email namaste@cleanagro.in or call +91 253 000 0000 (Mon–Sat, 9:00–18:00 IST) and our team will help directly.";
}

function openChat() {
  panel.hidden = false;
  fab.hidden = true;
  fab.setAttribute('aria-expanded', 'true');
  if (!body.childElementCount) addMessage(GREETING, 'bot');
  input.focus();
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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  const typing = showTyping();
  const answer = findAnswer(text);
  setTimeout(() => {
    typing.remove();
    addMessage(answer, 'bot');
  }, 500 + Math.random() * 400);
});
