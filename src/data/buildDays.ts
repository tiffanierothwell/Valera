export type DayChip = { l: string; c?: string }
export type DayWorkflowStep = { kind: string; name: string }
export type DayDetail = {
  eyebrow: string
  title: string
  chips: DayChip[]
  workflow: DayWorkflowStep[]
  what: string
  how: string[]
  modules: string[]
  tables: string[]
  accept: string[]
  notes: string
  longExplain: string
}

export const BUILD_DAYS: Record<string, DayDetail> = {

  'w1-mon': {
    eyebrow:'WEEK 1 · MONDAY · 9–4',
    title:'Supabase Init + Iterative Schema Kickoff',
    chips:[{l:'FOUNDATION',c:'lvl-low'},{l:'WEEK 1'}],
    workflow:[
      {kind:'trigger',name:'/prime in Claude Code'},
      {kind:'service',name:'Andre\'s server · Supabase Studio'},
      {kind:'storage',name:'Run M001 + M002 migrations'},
      {kind:'output',name:'Foundation tables live + 2 users provisioned'}
    ],
    what:'Stand up the Supabase project on Andre\'s server, enable RLS, and run the foundation migration block (profiles, companies, company_access, auth_audit, activity_log). No upfront full schema — only what Phase 1 needs to start. Confirm Littletree MySQL read-only refresh path.',
    how:[
      'Run /prime in Claude Code to load full project context · <b>10 min</b>',
      'Verify Supabase Studio access on Andre\'s server (URL, credentials, anon key, service role key) · <b>15 min</b>',
      'Confirm Littletree MySQL read-only credentials work — test connection from Studio + a sample SELECT · <b>20 min</b>',
      'Apply migration M001 — extensions (uuid-ossp, pgcrypto, vector), profiles, companies (seeded), company_access, has_company_access() helper · <b>1 hr</b>',
      'Apply migration M002 — auth_audit + activity_log + their indexes · <b>30 min</b>',
      'Manually provision the first 2 users (Mike, Tiffanie) via Studio + insert profiles rows + company_access for all 10 companies · <b>20 min</b>',
      'Test RLS: log in as Mike, query companies (should see all); insert a fake user with limited access, verify they\'re blocked · <b>45 min</b>',
      'Save connection strings + key rotation notes to 1Password + send to Andre · <b>15 min</b>',
      'Buffer for unexpected blockers (cert issues, missing perms, etc.) · <b>~1 hr 25 min</b>'
    ],
    modules:['Claude Code','Supabase Studio','Postgres 15','Terminal','psql / Studio SQL editor','1Password'],
    tables:['profiles','companies','company_access','auth_audit','activity_log'],
    accept:['Studio reachable on Andre\'s server','M001 + M002 applied with no errors','Mike + Tiffanie can log in','RLS blocks unauthorized reads','Littletree read-only confirmed working'],
    notes:'This is the only day where I\'m fully blocked if Andre hasn\'t finished the Supabase setup. Confirm the night before. If Andre is slammed, fall back to a cloud Supabase sandbox for testing only — never for production data.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> by end of day, the Mike\'s World database exists, has 5 foundation tables, RLS is on, and 2 real users can authenticate. Nothing is wired into the UI yet — that\'s tomorrow.</p>'+
      '<p><strong>Why iterative?</strong> Valera was clear in the meeting: don\'t dump the whole schema upfront. Each automation gets its own table when it\'s being wired. M001 + M002 only contain what we need to support auth + a generic activity log. The rest comes online during W1 Wed–Fri as services get wired.</p>'+
      '<p><strong>Why test RLS today?</strong> If RLS is broken, every later automation that writes per-company data ships with a security hole. Today is the only day where I have nothing to do BUT test it. Catching it now saves ~3 days of debugging mid-Week 2.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~3.5 hours of real work. Buffer: ~1.5 hours for the inevitable "Andre needs to grant one more permission" loop. If everything goes smoothly, I finish by 1pm and start W1 Tue early.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">What I tell Andre at end of day</h4>'+
      '<p>"Foundation block is live, RLS validated, Mike + I are real users. Tomorrow I\'m wiring the login form against this. If you have 10 min later this week to walk me through Storage bucket setup, that unblocks W2 Wed."</p>'
  },

  'w1-tue': {
    eyebrow:'WEEK 1 · TUESDAY · 9–4',
    title:'Supabase Auth + RLS + mike.html Wrapper',
    chips:[{l:'FOUNDATION',c:'lvl-low'},{l:'WEEK 1'}],
    workflow:[
      {kind:'trigger',name:'login.html email/password submit'},
      {kind:'service',name:'Supabase Auth · signInWithPassword'},
      {kind:'storage',name:'profiles + company_access lookup'},
      {kind:'ui',name:'Role-based redirect → /mike.html with iframe'}
    ],
    what:'Replace the localStorage gate site-wide with real Supabase Auth (email/password — no Google SSO on self-hosted). Build the mike.html wrapper that gates on session, renders the hero, and embeds the existing Little Tree Ventures Dashboard iframe.',
    how:[
      'Install @supabase/supabase-js into the repo, add anon key to a config file (gitignored) · <b>15 min</b>',
      'Build login.html email/password form with Supabase signInWithPassword + error handling · <b>1 hr</b>',
      'Replace <code>localStorage.mjm_auth === \'1\'</code> check on mike.html with <code>supabase.auth.getSession()</code> + redirect to login if missing · <b>1 hr</b>',
      'Wire role-based post-login redirect: CEO → /ceo, Manager → /company, Employee → /mj · <b>45 min</b>',
      'Build hero block on mike.html: greeting, today\'s date, week #, quarter · <b>45 min</b>',
      'Embed /ltv/index.html iframe in mike.html with proper sizing + sandbox attrs · <b>30 min</b>',
      'Test: log in as Mike → land on /mike.html → see hero → iframe loads · <b>45 min</b>',
      'Buffer for SDK quirks + CORS on the iframe · <b>~1 hr</b>'
    ],
    modules:['@supabase/supabase-js','Frontend JS','HTML / CSS','postMessage (later for #113)'],
    tables:['auth.users','profiles','company_access'],
    accept:['Login with email/password works for Mike + Tiffanie','localStorage gate removed from mike.html','Wrong-role users get redirected correctly','Iframe renders inside mike.html','Logout clears session'],
    notes:'The localStorage gate is on every page in the repo — today only swaps it on mike.html and login.html. Sweeping the rest happens during W3 Thu (the LOW automations sweep). This is intentional — we\'re keeping change blast radius small.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> Mike can log in with email + password, land on his hub, and see the existing Little Tree Ventures Dashboard embedded inside it. No mock data, no localStorage. Real session, real RLS-gated reads.</p>'+
      '<p><strong>Why no SSO?</strong> Self-hosted Supabase doesn\'t ship Google SSO — it\'s a paid cloud-only feature. Valera and Andre both confirmed it\'s not worth fighting on day one. Manual provisioning is fine for the 2–5 users we have now. We can revisit later if Mike wants Workspace tied in.</p>'+
      '<p><strong>Why hero before iframe?</strong> The hero proves the page is rendering Mike-specific data BEFORE the iframe loads. If the iframe fails (CORS, server hiccup), the hub still works as a navigation shell. Defensive ordering.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5 hours. Buffer: ~1 hour. If the SDK is well-behaved, I finish early and start scaffolding the Telegram bot for tomorrow.</p>'
  },

  'w1-wed': {
    eyebrow:'WEEK 1 · WEDNESDAY · 9–4',
    title:'Telegram Bot Scaffolding + Integrations Sync',
    chips:[{l:'FOUNDATION',c:'lvl-low'},{l:'WEEK 1'}],
    workflow:[
      {kind:'trigger',name:'BotFather creates bot'},
      {kind:'service',name:'FastAPI webhook on Andre\'s server'},
      {kind:'service',name:'GCal · Fireflies · Calendly collectors'},
      {kind:'storage',name:'Upsert into calendar_events / meetings / telegram_messages'}
    ],
    what:'Stand up CommandOS — the Telegram bot Mike will live in — and wire the integration collectors that pull from Google Calendar, Fireflies, and Calendly. By end of day, the first overnight cron lands real data into Mike\'s World.',
    how:[
      'Create bot via BotFather, save token to /opt/automations/.env · <b>15 min</b>',
      'FastAPI app skeleton on Andre\'s server at /opt/automations, supervisor or systemd unit · <b>45 min</b>',
      'Webhook endpoint: POST /telegram/webhook receives updates, parses JSON, writes to telegram_messages · <b>1 hr</b>',
      '"hello Mike" round-trip: send /start → bot replies → row appears in telegram_messages · <b>30 min</b>',
      'Add API keys to .env: GCal service account, Fireflies webhook secret, Calendly token · <b>30 min</b>',
      'Build GCal sync collector — Python script using google-api-python-client, upsert into calendar_events · <b>1 hr 30 min</b>',
      'Schedule cron for nightly pull at 2am via crontab on Andre\'s server · <b>30 min</b>',
      'Buffer for OAuth consent screen pain + token refresh logic · <b>~30 min</b>'
    ],
    modules:['Telegram Bot API','BotFather','FastAPI','python-telegram-bot','google-api-python-client','requests','cron','supervisord'],
    tables:['telegram_messages','calendar_events','meetings (Fireflies)'],
    accept:['Bot replies to /start','telegram_messages writes confirmed','GCal pull populates calendar_events','Cron job scheduled and visible in crontab -l','First overnight pull runs successfully'],
    notes:'Calendly + Fireflies are webhook-driven (real-time), GCal is cron-pulled (5–15 min polling). Don\'t mix the two patterns — keep collectors as separate Python modules under /opt/automations/collectors/.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> by tomorrow morning, Mike\'s actual calendar events are sitting in calendar_events, his bot replies to /start, and the data path from external systems → Mike\'s World is proven end-to-end.</p>'+
      '<p><strong>Why GCal first?</strong> It\'s the highest-volume data source AND the one Mike sees most. If GCal is broken, the hub is dead. Fireflies and Calendly come later in the week once GCal is bulletproof.</p>'+
      '<p><strong>Why FastAPI not Make.com?</strong> Per Valera and Andre — we own the server, no per-operation cost, no third-party rate limits. Worth the extra setup time once.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.5 hours. Buffer: ~30 min. OAuth is the wildcard — if Google\'s consent screen is stuck in "testing" mode, plan an extra hour.</p>'
  },

  'w1-thu': {
    eyebrow:'WEEK 1 · THURSDAY · 9–4',
    title:'Hero + Calendar Pull + 4 Venture Iframes',
    chips:[{l:'MEDIUM',c:'lvl-med'},{l:'WEEK 1'}],
    workflow:[
      {kind:'trigger',name:'Page load'},
      {kind:'service',name:'Supabase query · calendar_events for current week'},
      {kind:'ui',name:'Render calendar grid + 4 venture cards'},
      {kind:'output',name:'Mike sees his real week + click-through to ventures'}
    ],
    what:'Build the visible surface of mike.html: hero card, in-page weekly calendar pulled from Supabase, and the 4 venture iframe shells with click-through to each external dashboard.',
    how:[
      'Build hero card with name greeting + today\'s date + week meta · <b>30 min</b>',
      'Python cron script: pull GCal weekly view → calendar_events upsert (refines yesterday\'s collector) · <b>1 hr 30 min</b>',
      'Render in-page calendar grid: 7 columns × time slots, read from Supabase WHERE user_id=mike AND starts_at BETWEEN week start/end · <b>1 hr 30 min</b>',
      'Scaffold 4 venture iframe wrappers: LT Capital, LT Fuel, LT Pay, Ai Agency · <b>1 hr</b>',
      'Folder cards UI: name, KPI snapshot placeholder, click → expand · <b>45 min</b>',
      'External dashboard click handlers: window.open with target=_blank · <b>15 min</b>',
      'Buffer: layout polish, edge case (no events this week) · <b>~30 min</b>'
    ],
    modules:['Frontend JS','CSS Grid','Supabase JS SDK','Python cron','GCal API'],
    tables:['calendar_events','companies'],
    accept:['Hero renders correct date + greeting','Calendar grid shows this week\'s events from Supabase','New GCal event appears in grid within 5 min','4 venture cards render','Click on venture opens external dashboard in new tab'],
    notes:'The 4 venture iframes today are SHELLS only — empty placeholders that link out. Real iframe-bridge auth (#137 cross-venture JWT) is tomorrow. Today is "make the page feel real."',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> if Mike opens mike.html at end of today, it looks and feels like his hub. Real calendar, real venture cards, real navigation. Just no AI-generated content yet.</p>'+
      '<p><strong>Why this order?</strong> Hero → calendar → ventures matches the visual top-down on the page. If the cron fails, the hero still works. If the calendar fails, the ventures still work. Layered failure modes.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.5 hours. Buffer: ~30 min. CSS Grid layout is the time sink — budget extra if anything in the design needs custom breakpoints.</p>'
  },

  'w1-fri': {
    eyebrow:'WEEK 1 · FRIDAY · 9–4',
    title:'Cross-Venture JWT Bridge + Activity Ticker',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 1'},{l:'#137 + #138'}],
    workflow:[
      {kind:'service',name:'JWT signer service (FastAPI)'},
      {kind:'storage',name:'Public key at /.well-known/jwks.json'},
      {kind:'ui',name:'Iframe verifies JWT · activity ticker hover'},
      {kind:'output',name:'Single-sign iframe + last 5 events tooltip'}
    ],
    what:'Two HIGH-complexity automations in one day. (1) JWT bridge so iframes can verify a session signed by Mike\'s World without a separate login. (2) Hover-debounce activity ticker on each venture card showing last 5 events.',
    how:[
      'JWT signer service in FastAPI: RSA keypair generation, /sign endpoint that issues a 5-min JWT with sub=user_id · <b>2 hr</b>',
      'Publish public key as JWKS at /.well-known/jwks.json on the server · <b>30 min</b>',
      'venture_activity table writes — wire trigger from existing automations to write entries · <b>30 min</b>',
      'Hover-debounce JS: 200ms delay before showing tooltip, cancel on mouseleave · <b>45 min</b>',
      'Tooltip popover with last 5 events from venture_activity, formatted with relative timestamps · <b>1 hr</b>',
      'Coordinate verifier code with one venture dashboard (LT Capital first) — postMessage exchange + JWT verification · <b>1 hr</b>',
      'Buffer · <b>~15 min</b>'
    ],
    modules:['FastAPI','PyJWT or jose','RSA keypair','postMessage API','JS debounce','Supabase realtime (optional)'],
    tables:['venture_activity','jwt_keys'],
    accept:['JWT signer issues valid 5-min tokens','Public key fetchable at JWKS endpoint','LT Capital iframe verifies JWT and skips its own login','Hover on venture card shows tooltip after 200ms','Tooltip lists last 5 venture_activity events','Other 3 ventures stubbed but ready for the same verifier code'],
    notes:'This is the riskiest day of Week 1. JWT key management is easy to do unsafely — keep private keys on server only, never in frontend. If the JWT bridge is even slightly off by Friday end, defer #138 to W3 Thu sweep and ship #137 clean.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> by end of day, when Mike clicks "LT Capital" inside his hub, the iframe loads WITHOUT a second login. And when he hovers on a venture card, he sees a tooltip with what happened there today.</p>'+
      '<p><strong>Why two HIGHs in one day?</strong> They share infrastructure — both need the venture cards to be live (W1 Thu output) and both write/read the activity_log + venture_activity tables. Doing them together avoids context-switching.</p>'+
      '<p><strong>Fallback if blocked:</strong> ship #137 only. The activity ticker (#138) is nice-to-have for W1; the JWT bridge is required to make the iframe pattern work for the next 2 weeks of work.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~6 hours. Buffer: ~15 min. This is a TIGHT day — Valera will be on speed-dial.</p>'
  },

  'w2-mon': {
    eyebrow:'WEEK 2 · MONDAY · 9–4',
    title:'Meeting Prep Page + Pre-Meeting Brief (#130)',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 2'},{l:'#130'}],
    workflow:[
      {kind:'trigger',name:'Hourly cron · meetings 23–25h out'},
      {kind:'service',name:'Context-gather agent · Claude composer'},
      {kind:'service',name:'CommandOS deliver to Telegram'},
      {kind:'output',name:'24h prep brief lands in Mike\'s pocket'}
    ],
    what:'Build the Meeting Prep section on mike.html and ship the T-24h pre-meeting brief automation that DMs Mike a context-aware brief before every meeting.',
    how:[
      'Meeting Prep section UI on mike.html: card grid of upcoming meetings · <b>1 hr</b>',
      'Supabase query for next 7 days of calendar_events ordered by starts_at · <b>30 min</b>',
      'Click → modal renderer reading prep details (placeholder until Tuesday) · <b>45 min</b>',
      'Hourly cron: query calendar_events WHERE starts_at BETWEEN now+23h AND now+25h AND brief_sent=false · <b>45 min</b>',
      'Context-gather agent: pull attendees from meeting_attendees, prior meetings (last 3), open tasks, KPIs · <b>1 hr 30 min</b>',
      'Claude composer with prep prompt template (200-word brief) · <b>45 min</b>',
      'CommandOS deliver to Telegram + mark brief_sent=true · <b>30 min</b>',
      'End-to-end test with a real upcoming meeting · <b>15 min</b>'
    ],
    modules:['Cron','Claude API','Supabase multi-table query','Telegram CommandOS','FastAPI'],
    tables:['calendar_events','meetings','meeting_attendees','tasks','kpis','meeting_prep'],
    accept:['Meeting Prep section renders next 7 days','Cron runs hourly on schedule','Brief lands in Telegram 23–25h before meeting','Brief stays under 200 words','brief_sent flag prevents duplicates','No brief sent for cancelled meetings'],
    notes:'This is the M&J #14 pattern but per-user (Mike). Same prompt structure, same delivery pipe, different data scope. If the M&J version exists in any form, copy that prompt verbatim and tune from there.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> Mike\'s 6am brief tomorrow includes prep for any meeting he has tomorrow. Real attendees, real history, real ask. The capstone moment of the AIOS for him.</p>'+
      '<p><strong>Why 23–25h window?</strong> Cron runs hourly — the window has to be at least an hour wide or some meetings slip through. 23–25h gives a safety buffer.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~6 hours. The context-gather is the time sink — getting the SQL JOINs right and the prompt token-efficient takes iteration.</p>'
  },

  'w2-tue': {
    eyebrow:'WEEK 2 · TUESDAY · 9–4',
    title:'AI Prep Doc Generator (#141) + Meeting Prep MED Batch',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 2'},{l:'#141 + 8 MED'}],
    workflow:[
      {kind:'trigger',name:'Click meeting card on mike.html'},
      {kind:'service',name:'Multi-table read · Claude prompt'},
      {kind:'storage',name:'Write to meeting_prep table'},
      {kind:'ui',name:'Modal renders structured prep doc'}
    ],
    what:'Build the in-app AI prep doc generator (richer than the Telegram brief — full screen, structured, actionable) plus the 8 medium-complexity automations that surround the Meeting Prep section.',
    how:[
      'Multi-table read function: calendar_events JOIN meetings JOIN tasks JOIN kpis · <b>1 hr</b>',
      'Structured Claude prompt: agenda, attendee history, open threads, related tasks, recommended questions · <b>45 min</b>',
      'meeting_prep table writes — UPSERT by calendar_event_id · <b>30 min</b>',
      'Modal renderer reading from meeting_prep + markdown rendering · <b>1 hr</b>',
      '8 MED automations (~15 min each via shared boilerplate): long-form modal, attendee history popup, linked tasks list, transcript link, prior-meeting summary, prep-doc download, "regenerate" button, calendar-link copy · <b>2 hr</b>',
      'Buffer + integration testing · <b>~30 min</b>'
    ],
    modules:['Claude API','Supabase JOIN queries','markdown-it or similar','Frontend modal'],
    tables:['calendar_events','meetings','meeting_attendees','tasks','kpis','meeting_prep'],
    accept:['Click on meeting card opens prep modal','Prep doc has 5 structured sections','Regenerate button refreshes Claude output','Attendee history popup works','Markdown renders correctly'],
    notes:'8 MEDs in 2 hours sounds aggressive but they share the same modal infrastructure built earlier in the day — most are 5–10 lines of new code.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Difference from yesterday\'s brief:</strong> the 24h Telegram brief is short and pushed. Today\'s in-app prep doc is long and pulled — Mike clicks into a meeting and gets the full context dump on screen.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.5 hours. Buffer: ~30 min. The MED batch can compress further if I get clever about reusable components.</p>'
  },

  'w2-wed': {
    eyebrow:'WEEK 2 · WEDNESDAY · 9–4',
    title:'Resources Page + 5 Mentor Tabs + PDF Embeddings',
    chips:[{l:'MEDIUM',c:'lvl-med'},{l:'WEEK 2'}],
    workflow:[
      {kind:'trigger',name:'PDF upload via Resources page'},
      {kind:'service',name:'Chunker → OpenAI embeddings'},
      {kind:'storage',name:'pdf_chunks (pgvector 1536-dim)'},
      {kind:'output',name:'Searchable mentor library'}
    ],
    what:'Build the Resources page with 5 mentor tabs (Tony, Jay, Strategic Coach, A360, AI Bali), wire the PDF upload pipeline, and backfill all existing mentor PDFs into pgvector for semantic search.',
    how:[
      'Tabbed Resources page UI: 5 tabs, content panels, active state · <b>1 hr</b>',
      'Upload component: drag-drop PDF input, store to Supabase Storage pdfs/ bucket · <b>45 min</b>',
      'Enable pgvector extension on Mike\'s World (one-line SQL, may already be done in M001) · <b>15 min</b>',
      'Chunker script: pypdf or pdfplumber → split into ~500-token chunks with page numbers preserved · <b>1 hr</b>',
      'OpenAI embeddings API integration: text-embedding-3-small, 1536-dim, batch of 100 chunks per request · <b>45 min</b>',
      'Backfill job: iterate all uploaded PDFs through chunker + embedder, write to pdf_chunks · <b>1 hr 30 min</b>',
      'Verification: spot-check 3 PDFs, confirm chunk count + page numbers + embeddings exist · <b>30 min</b>',
      'Buffer · <b>~15 min</b>'
    ],
    modules:['Supabase Storage','pypdf or pdfplumber','OpenAI Python SDK','pgvector','Frontend tabs'],
    tables:['mentor_resources','pdf_chunks'],
    accept:['Upload a PDF → appears in resources tab within 30s','Backfilled chunks queryable from Studio','Embedding dimension is 1536','Page numbers correct on chunks','Storage bucket pdfs/ permissions correct'],
    notes:'The HNSW index on pdf_chunks.embedding gets built tomorrow (W2 Thu) right before #155 needs to query it — building it AFTER the backfill is faster than building empty.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> by end of day, every mentor PDF Mike has shared is chunked, embedded, and queryable by cosine similarity. Tomorrow we light up Cmd+K to actually USE the embeddings.</p>'+
      '<p><strong>Why text-embedding-3-small not large?</strong> 1536-dim vs 3072-dim — 3-small is 5× cheaper, fast enough, and accuracy delta is small for short business documents. Switch later if quality is poor.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.75 hours. Buffer: ~15 min. The backfill takes wallclock time but is async — start it during lunch.</p>'
  },

  'w2-thu': {
    eyebrow:'WEEK 2 · THURSDAY · 9–4',
    title:'Cmd+K Semantic Search Palette (#155)',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 2'},{l:'#155'}],
    workflow:[
      {kind:'trigger',name:'Cmd+K keystroke'},
      {kind:'service',name:'Embed query · pgvector top-10'},
      {kind:'service',name:'Claude rerank top-5'},
      {kind:'ui',name:'Result preview + deep-link to PDF page'}
    ],
    what:'Build the Cmd+K command palette: type a question, get the top 5 most relevant chunks across all mentor PDFs, with deep-links to the exact page.',
    how:[
      'Cmd+K UI: keyboard listener (cmd/ctrl+K), modal palette overlay with input field · <b>1 hr</b>',
      'Query input → debounced (300ms) embedding API call · <b>45 min</b>',
      'pgvector top-10 cosine search query: SELECT *, embedding <=> $1 AS distance ORDER BY distance LIMIT 10 · <b>1 hr</b>',
      'Build HNSW index on pdf_chunks.embedding (now that backfill is done) · <b>15 min</b>',
      'Claude rerank top-5: send 10 chunks + query, ask Claude to rerank by genuine relevance · <b>1 hr</b>',
      'Result preview pane: chunk text excerpt, mentor name, page number, "Open at page" button · <b>1 hr 30 min</b>',
      'Deep-link handler: open PDF in new tab with #page=N anchor · <b>45 min</b>',
      'Buffer · <b>~30 min</b>'
    ],
    modules:['Frontend keyboard handlers','OpenAI embeddings','pgvector HNSW','Claude API rerank','PDF.js or native browser PDF viewer'],
    tables:['pdf_chunks','mentor_resources'],
    accept:['Cmd+K opens palette anywhere on the page','Type query → results appear within 1.5s','Top result is genuinely relevant for 4 of 5 test queries','Click "Open at page" jumps to the right page','Escape closes palette'],
    notes:'The Claude rerank step is what makes this feel magical — pgvector alone gives noisy top-K, Claude prunes to the genuinely best 5.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Why two-stage retrieval?</strong> pgvector is fast but noisy. Claude is smart but slow + expensive. Two-stage = pgvector narrows 10,000 chunks to 10, Claude reranks 10 to 5. Best of both.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.75 hours. Buffer: ~30 min.</p>'
  },

  'w2-fri': {
    eyebrow:'WEEK 2 · FRIDAY · 9–4',
    title:'Ask Your Mentor (Telegram, #160) + Skills Page',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 2'},{l:'#160'}],
    workflow:[
      {kind:'trigger',name:'Mike DMs the bot a question'},
      {kind:'service',name:'Mentor router · pgvector retrieve · Claude voice prompt'},
      {kind:'service',name:'Reply via CommandOS'},
      {kind:'output',name:'Tony / Jay / etc. answers in their voice'}
    ],
    what:'Two outputs today. (1) Mike can ask any mentor a question via Telegram and get a reply in that mentor\'s voice. (2) The Skills page goes live with downloadable .skill modules.',
    how:[
      'Telegram inbound handler for mentor questions: detect @tony, @jay, etc. or auto-route · <b>1 hr</b>',
      'Mentor router: classify which mentor to consult based on question intent (Claude classify call) · <b>45 min</b>',
      'pgvector retrieve top-5 chunks filtered by mentor_resources.mentor · <b>1 hr</b>',
      'Voice-emulation prompt template per mentor + retrieved context · <b>1 hr</b>',
      'Claude reply, send back via CommandOS · <b>30 min</b>',
      'Skills page grid UI: card per skill, tags, download button · <b>1 hr</b>',
      'Supabase Storage upload pipeline for .skill files (admin-only) · <b>30 min</b>',
      'Download counter increment on click · <b>15 min</b>'
    ],
    modules:['Telegram CommandOS','Claude API','pgvector filtered query','Supabase Storage','Frontend grid'],
    tables:['telegram_messages','pdf_chunks','mentor_resources','skills','skill_downloads'],
    accept:['DM "@tony how do I close a deal?" → reply in Tony\'s voice within 8s','Reply cites mentor PDF page','Skills page renders all active skills','Click download → file delivered + counter increments'],
    notes:'Voice emulation is harder than retrieval. Spend the first hour iterating the per-mentor prompt with 3–5 sample questions before wiring the Telegram path.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Why mentor routing?</strong> Mike doesn\'t want to remember to type @tony — he just wants to ask a question. Claude classifies the question by topic and picks the right mentor automatically.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~6 hours. Voice prompt iteration is the wildcard — if it\'s flat, budget another 30 min.</p>'
  },

  'w3-mon': {
    eyebrow:'WEEK 3 · MONDAY · 9–4',
    title:'Skill Recommendation Engine (#168) + Resources/Skills MED Batch',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 3'},{l:'#168 + 12 MED'}],
    workflow:[
      {kind:'trigger',name:'Daily cron · pull Mike\'s 14-day activity'},
      {kind:'service',name:'Embed activity summary · pgvector match skills'},
      {kind:'service',name:'Claude rerank top-5'},
      {kind:'ui',name:'"Recommended for you" strip on Skills page'}
    ],
    what:'Build the personalized skill recommendation engine that surfaces the 5 skills most relevant to what Mike has been working on. Plus 12 medium-complexity automations across Resources and Skills.',
    how:[
      'Activity aggregator: pull Mike\'s last 14 days from activity_log + summarize · <b>45 min</b>',
      'Embed the activity summary using same OpenAI model as skills · <b>30 min</b>',
      'pgvector match query against skills.embedding, top 10 · <b>45 min</b>',
      'Claude rerank top-5 with explanation per pick · <b>45 min</b>',
      '"Recommended for you" UI strip on Skills page above the grid · <b>1 hr</b>',
      '12 MED automations across Resources + Skills (~10 min each via shared utils): download tracking, related-skill links, "you also viewed", recently added, search-within-tab, etc. · <b>2 hr</b>',
      'Buffer · <b>~15 min</b>'
    ],
    modules:['Cron','OpenAI embeddings','pgvector','Claude API','Frontend strip component'],
    tables:['activity_log','skills','skill_downloads'],
    accept:['Recommendations refresh daily','Top 5 picks feel relevant on manual review','Click → download tracked correctly'],
    notes:'12 MEDs in 2 hours requires shared utils — build a single ActivityAggregate util and reuse it across 4–5 of them.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Why activity-based?</strong> Static category match is dumb. "Mike just spent 3 days on hiring" → recommend Tony\'s leadership skill, not a generic finance skill. Activity log is the signal.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.75 hours. Buffer: ~15 min.</p>'
  },

  'w3-tue': {
    eyebrow:'WEEK 3 · TUESDAY · 9–4',
    title:'Weekly Snapshots PM Row + PM Weekly Synthesis (#173)',
    chips:[{l:'HIGH',c:'lvl-high'},{l:'WEEK 3'},{l:'#173'}],
    workflow:[
      {kind:'trigger',name:'Monday 7am cron'},
      {kind:'service',name:'Pull last week\'s activity_log'},
      {kind:'service',name:'Claude narrative writer'},
      {kind:'storage',name:'weekly_snapshots.narrative_md'}
    ],
    what:'Build the Weekly Snapshots PM row UI (3-col Watch/Building/Next + Mike\'s Ideas + Blockers) AND the Monday-morning AI synthesis that writes Tiffanie\'s week-in-review narrative.',
    how:[
      '3-col Snapshots layout: Watch / Building / Next columns · <b>1 hr</b>',
      'Mike\'s Ideas + Blockers panels (right rail) · <b>45 min</b>',
      'Wire to weekly_snapshots Supabase reads · <b>45 min</b>',
      'Monday cron at 7am: pull last week\'s activity_log entries for Tiffanie · <b>30 min</b>',
      'Claude narrative writer prompt: "summarize Tiffanie\'s week as PM in 3 paragraphs" · <b>1 hr</b>',
      'Save to weekly_snapshots.narrative_md · <b>30 min</b>',
      'Render narrative in PM row + "Last updated Mon 7am" timestamp · <b>1 hr</b>',
      'Buffer · <b>~30 min</b>'
    ],
    modules:['Cron','Claude API','Supabase reads','markdown renderer','Frontend grid'],
    tables:['activity_log','weekly_snapshots'],
    accept:['Layout renders correctly','Monday cron writes new narrative','Narrative is genuinely useful (manual review)','Mike sees something different each Monday'],
    notes:'This is the row Mike reads first thing Monday morning to know what Tiffanie did. Get the prompt right or the whole feature feels like noise.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Why Monday 7am?</strong> Mike opens the dashboard before his 8am standup. Narrative needs to be ready before he lands.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5.5 hours. Buffer: ~30 min.</p>'
  },

  'w3-wed': {
    eyebrow:'WEEK 3 · WEDNESDAY · 9–4',
    title:'Weekly Snapshots Leah Row + Win Input',
    chips:[{l:'MEDIUM',c:'lvl-med'},{l:'WEEK 3'}],
    workflow:[
      {kind:'trigger',name:'Leah submits a win'},
      {kind:'service',name:'Claude categorizes'},
      {kind:'storage',name:'leah_wins'},
      {kind:'output',name:'Friday digest cron · Telegram delivery'}
    ],
    what:'Add Leah\'s row to the Snapshots section with daily win-capture form, Claude categorization, and a Friday Telegram digest.',
    how:[
      '5 day cards UI for Leah (Mon–Fri) on Snapshots row · <b>1 hr</b>',
      'Win capture form: text input + submit (sits inline on her row) · <b>45 min</b>',
      'Supabase write to leah_wins table · <b>30 min</b>',
      'Claude categorize wins (sales / ops / culture / etc.) on insert · <b>45 min</b>',
      'Friday 4pm digest cron: pull week\'s wins, group by category, format as Telegram message · <b>1 hr 30 min</b>',
      'Telegram delivery hook for digest (to Mike + Leah) · <b>30 min</b>',
      'Buffer · <b>~1 hr</b>'
    ],
    modules:['Frontend form','Supabase insert','Claude classify','Cron','Telegram CommandOS'],
    tables:['leah_wins','telegram_messages'],
    accept:['Leah submits win → row card highlights','Friday 4pm digest lands in Telegram','Categories accurate on manual review'],
    notes:'Lighter day. Use the buffer for dogfooding the prep brief flow with a real meeting before Friday\'s demo.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Why categorize?</strong> The Friday digest is more readable when wins are grouped. "3 sales wins, 2 culture wins" beats a flat list.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5 hours. Buffer: ~1 hour — banked for dogfooding ahead of Friday.</p>'
  },

  'w3-thu': {
    eyebrow:'WEEK 3 · THURSDAY · 9–4',
    title:'Remaining MED + LOW Automations Sweep',
    chips:[{l:'LOW',c:'lvl-low'},{l:'WEEK 3'}],
    workflow:[
      {kind:'trigger',name:'Punch list of pending automations'},
      {kind:'service',name:'Boilerplate reuse · shared utils'},
      {kind:'storage',name:'activity_log writes'},
      {kind:'output',name:'Polish + parity across pages'}
    ],
    what:'Sweep through the long tail — per-page beacons, click logs, theme persistence, audit log surface, navigation polish, plus any straggler MED automations from earlier weeks that got deferred.',
    how:[
      'Per-page beacons: page view logger writing to activity_log on every page · <b>1 hr</b>',
      'Click logs across nav buttons (debounced) · <b>45 min</b>',
      'Theme persistence to profiles.theme on toggle, apply on login · <b>45 min</b>',
      'Audit log surface UI: simple table view of recent auth_audit entries (admin-only) · <b>1 hr</b>',
      'Navigation polish: active state, hover, breadcrumbs · <b>30 min</b>',
      'Long-tail stragglers (any MED/LOW deferred from W1-W2) · <b>~2 hr</b>'
    ],
    modules:['Frontend JS','Supabase inserts','Cron (none today)','CSS polish'],
    tables:['activity_log','auth_audit','profiles'],
    accept:['Every page write to activity_log on load','Theme persists across devices','Audit log readable by admin','No regressions from earlier weeks'],
    notes:'Resist scope creep. If something feels HIGH-complexity, defer to v2 and capture in a tickets file. This is sweep day, not new-build day.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>Goal:</strong> reduce the deferred-tickets list to zero (or close to it) before tomorrow\'s demo. Every "I\'ll come back to this" from W1–W2 lands today or gets explicitly punted to v2.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~6 hours. The 2-hour straggler block is the wildcard — could be 30 min if W1-W2 went clean, could be 4 hours if there\'s real debt.</p>'
  },

  'w3-fri': {
    eyebrow:'WEEK 3 · FRIDAY · 9–4',
    title:'End-to-End Test + Demo to Mike + Sign-Off',
    chips:[{l:'TEST',c:'lvl-med'},{l:'WEEK 3'}],
    workflow:[
      {kind:'trigger',name:'Fresh login as Mike'},
      {kind:'service',name:'Walk through full day flow'},
      {kind:'output',name:'Demo · feedback · v2 backlog'}
    ],
    what:'Real-data dry run, fix tickets, screen-share walk-through with Mike, capture v2 feedback, formal sign-off.',
    how:[
      'Real-data dry run: fresh login, walk through full day flow (login → hub → meeting → brief → mentor query → snapshot review) · <b>1 hr</b>',
      'Capture and triage any tickets found · <b>1 hr</b>',
      'Re-test critical paths after fixes · <b>1 hr</b>',
      'Screen-share walk-through with Mike (45–60 min meeting) · <b>1 hr</b>',
      'Capture feedback for v2 in a structured doc · <b>45 min</b>',
      'Final sign-off + handoff notes to Andre + buffer · <b>~1 hr 15 min</b>'
    ],
    modules:['Manual testing','Telegram','Mike\'s actual calendar','Screen recorder (Loom)'],
    tables:['all of them'],
    accept:['Mike successfully completes a full simulated day from his phone + laptop','No P0 / P1 bugs','Mike signs off in writing','v2 backlog captured'],
    notes:'No new features today. If something breaks during the demo and the fix is more than 30 min, capture it as v2.',
    longExplain:
      '<h4 style="margin-top:6px;margin-bottom:8px;font-size:14px;font-weight:800;">The day, step by step</h4>'+
      '<p><strong>The demo is the deliverable.</strong> Three weeks of work compress into a 60-minute walkthrough where Mike either nods or doesn\'t. Prep the demo flow as a script — don\'t freestyle.</p>'+
      '<h4 style="margin-top:18px;margin-bottom:8px;font-size:14px;font-weight:800;">Time math</h4>'+
      '<p>Productive: ~5 hours. Buffer: ~1 hour 15 min — for the inevitable last-minute fix.</p>'
  }

}
