import './App.css'

// ── Monochrome palette ────────────────────────────────────────
const INK     = "#111111"          // primary text / filled elements
const INK2    = "#444444"          // secondary text
const INK3    = "#888888"          // muted / labels
const BORDER  = "rgba(0,0,0,0.09)" // card borders
const RULE    = "rgba(0,0,0,0.07)" // row dividers
const SH      = "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)"

// ── Surface presets ───────────────────────────────────────────
const S1: React.CSSProperties = {   // main card — white
  background: "#FFFFFF",
  border: `1px solid ${BORDER}`,
  borderRadius: 20,
  boxShadow: SH,
}
const S2: React.CSSProperties = {   // inner chip — light grey
  background: "#F3F3F3",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 10,
}

// ── Pill ─────────────────────────────────────────────────────
type PillKind = "solid" | "outline" | "muted"
function Pill({ label, kind = "outline" }: { label: string; kind?: PillKind }) {
  const styles: Record<PillKind, React.CSSProperties> = {
    solid:   { background: INK,    color: "#fff",  border: `1px solid ${INK}` },
    outline: { background: "transparent", color: INK2, border: `1px solid rgba(0,0,0,0.22)` },
    muted:   { background: "#EBEBEB", color: INK3, border: "1px solid rgba(0,0,0,0.08)" },
  }
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 1.2,
      textTransform: "uppercase" as const,
      padding: "3px 9px", borderRadius: 99,
      whiteSpace: "nowrap" as const,
      ...styles[kind],
    }}>{label}</span>
  )
}

// ── Dot ──────────────────────────────────────────────────────
function Dot({ shade = INK }: { shade?: string }) {
  return (
    <span style={{
      display: "inline-block", width: 6, height: 6, borderRadius: "50%",
      background: shade, flexShrink: 0,
    }}/>
  )
}

// ── Section label ─────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <Dot />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" as const, color: INK3 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
    </div>
  )
}

// ── Row ───────────────────────────────────────────────────────
function Row({ label, value, pill }: { label: string; value: string; pill?: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 0", borderBottom: `1px solid ${RULE}`,
    }}>
      <span style={{ fontSize: 11, color: INK3, minWidth: 110, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: INK2, flex: 1 }}>{value}</span>
      {pill}
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────
function Card({ children, dark, style }: { children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      ...S1,
      position: "relative" as const,
      overflow: "hidden",
      ...(dark ? { background: INK, border: `1px solid ${INK}`, boxShadow: "none" } : {}),
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Step ──────────────────────────────────────────────────────
type StepStatus = "now" | "next" | "later"
function Step({ n, title, who, detail, status }: {
  n: number; title: string; who: string; detail: string; status: StepStatus
}) {
  const bubbleStyle: React.CSSProperties =
    status === "now"  ? { background: INK,    color: "#fff", border: `1px solid ${INK}` } :
    status === "next" ? { background: "#fff", color: INK,   border: `1px solid ${INK}` } :
                        { background: "#fff", color: INK3,  border: "1px solid #D0D0D0" }
  const pillKind: PillKind = status === "now" ? "solid" : status === "next" ? "outline" : "muted"

  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid ${RULE}` }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        fontWeight: 800, fontSize: 13,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 1, ...bubbleStyle,
      }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" as const }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: status === "later" ? INK3 : INK }}>{title}</span>
          <Pill label={who} kind={pillKind} />
        </div>
        <p style={{ margin: 0, fontSize: 12, color: INK3, lineHeight: 1.65 }}>{detail}</p>
      </div>
    </div>
  )
}

// ── Waving figure ─────────────────────────────────────────────
function WavingFigure() {
  const s = INK
  const sw = 2.5
  return (
    <svg viewBox="0 0 130 200" width="130" height="200" style={{ position: "relative" as const, zIndex: 1 }}>
      <circle cx="65" cy="46" r="24" fill="#F3F3F3" stroke={s} strokeWidth={sw}/>
      <rect x="46" y="39" width="16" height="11" rx="5.5" fill="none" stroke={s} strokeWidth="1.8"/>
      <rect x="65" y="39" width="16" height="11" rx="5.5" fill="none" stroke={s} strokeWidth="1.8"/>
      <line x1="62" y1="44" x2="65" y2="44" stroke={s} strokeWidth="1.8"/>
      <circle cx="54" cy="44" r="2.5" fill={s}/>
      <circle cx="73" cy="44" r="2.5" fill={s}/>
      <path d="M 54 54 Q 65 62 76 54" fill="none" stroke={s} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="65" y1="70" x2="65" y2="83" stroke={s} strokeWidth={sw}/>
      <path d="M 38 83 Q 65 78 92 83 L 94 138 Q 65 142 36 138 Z" fill="#F3F3F3" stroke={s} strokeWidth={sw} strokeLinejoin="round"/>
      <path d="M 39 90 Q 24 112 22 132" fill="none" stroke={s} strokeWidth={sw} strokeLinecap="round"/>
      <circle cx="21" cy="136" r="6" fill="#EBEBEB" stroke={s} strokeWidth="1.8"/>
      <path d="M 91 90 Q 108 68 112 46" fill="none" stroke={s} strokeWidth={sw} strokeLinecap="round"/>
      <circle cx="113" cy="40" r="9" fill="#EBEBEB" stroke={s} strokeWidth="1.8"/>
      <line x1="113" y1="31" x2="110" y2="24" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="117" y1="31" x2="117" y2="23" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="121" y1="33" x2="124" y2="26" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="52" y1="138" x2="46" y2="178" stroke={s} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="78" y1="138" x2="84" y2="178" stroke={s} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M 46 178 Q 36 180 34 178 Q 35 174 46 175" fill="none" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M 84 178 Q 94 180 96 178 Q 95 174 84 175" fill="none" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F7F7",
      fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', sans-serif",
      padding: "44px 28px 80px",
    }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>

        {/* ── HERO HEADER ── */}
        <Card style={{ marginBottom: 20, overflow: "hidden", padding: 0 }}>
          <div style={{ display: "flex", alignItems: "stretch", minHeight: 236 }}>

            {/* Left — greeting + stats */}
            <div style={{ flex: 1, padding: "32px 36px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>

              {/* Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" as const }}>
                <span style={{ ...S2, padding: "4px 11px", display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase" as const, color: INK }}>
                  AAA Accelerator
                </span>
                <span style={{ ...S2, padding: "4px 11px", display: "inline-block", fontSize: 10, fontWeight: 600, color: INK3 }}>April 15, 2026</span>
                <span style={{ ...S2, padding: "4px 11px", display: "inline-block", fontSize: 10, fontWeight: 600, color: INK3 }}>Session 2</span>
              </div>

              {/* Greeting */}
              <div>
                <h1 style={{ fontSize: 44, fontWeight: 900, color: INK, margin: "0 0 6px", letterSpacing: -1.5, lineHeight: 1.05 }}>
                  Hi Valera!
                </h1>
                <p style={{ fontSize: 13, color: INK3, margin: "0 0 24px", lineHeight: 1.6 }}>
                  It's good to see you again. Here's the full picture for today's session — Little Tree POS Help Desk.
                </p>
              </div>

              {/* Stat chips */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                {([
                  { value: "5",  sub: "Screens built"   },
                  { value: "0",  sub: "DB connected"     },
                  { value: "1",  sub: "Today's goal"     },
                  { value: "3",  sub: "Store locations"  },
                ] as { value: string; sub: string }[]).map(({ value, sub }) => (
                  <div key={sub} style={{
                    ...S2, padding: "12px 18px",
                    display: "flex", flexDirection: "column" as const, alignItems: "center",
                    minWidth: 72,
                  }}>
                    <span style={{ fontSize: 24, fontWeight: 900, color: INK, lineHeight: 1, letterSpacing: -1 }}>{value}</span>
                    <span style={{ fontSize: 9.5, color: INK3, marginTop: 4, letterSpacing: 0.4, textAlign: "center" as const, lineHeight: 1.3 }}>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — character panel */}
            <div style={{
              width: 200, flexShrink: 0,
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              padding: "0 16px 0",
              background: "#F3F3F3",
              borderLeft: `1px solid ${BORDER}`,
            }}>
              <WavingFigure />
            </div>
          </div>
        </Card>

        {/* ── MAIN GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* LEFT COL */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>

            {/* One liner */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Project in one sentence" />
              <p style={{ margin: 0, fontSize: 13, color: INK3, lineHeight: 1.75 }}>
                Internal IT ticketing system for 3 store locations (gas station / convenience). Staff submit tickets when the POS breaks → Manager triages → Owner receives daily reports.{" "}
                <span style={{ color: INK, fontWeight: 600 }}>Fully internal. No customer-facing layer.</span>
              </p>
            </Card>

            {/* What exists */}
            <Card style={{ padding: "22px 24px", flex: 1 }}>
              <SectionLabel label="What exists today" />
              <Row label="Language"       value="PHP + HTML/CSS"                      pill={<Pill label="Don't change" kind="muted" />} />
              <Row label="All screens"    value="Submit, Board, Detail, Analytics"    pill={<Pill label="Built"        kind="solid" />} />
              <Row label="Submit wizard"  value="4-step form + photo upload UI"       pill={<Pill label="Built"        kind="solid" />} />
              <Row label="Manager board"  value="Urgent → Open → Closed → Archive"   pill={<Pill label="Built"        kind="solid" />} />
              <Row label="Status bar"     value="New → In Process → Approval → Done" pill={<Pill label="Built"        kind="solid" />} />
              <Row label="Analytics"      value="Ticket counts, SLA %, filters"       pill={<Pill label="Built"        kind="solid" />} />
              <Row label="Database"       value="Mock data only — not connected"      pill={<Pill label="Missing"      kind="outline"/>} />
              <Row label="File storage"   value="UI exists, nowhere to save photos"   pill={<Pill label="Missing"      kind="outline"/>} />
              <Row label="Auth / login"   value="No real login built yet"             pill={<Pill label="Missing"      kind="outline"/>} />
              <Row label="Email triggers" value="Not wired up yet"                    pill={<Pill label="Missing"      kind="outline"/>} />
            </Card>

            {/* People */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="People" />
              <Row label="Tiffanie"  value="Project owner — builds with Claude Code, not a developer" />
              <Row label="Andre B."  value="IT lead, 10+ yrs. Owns server + MySQL DB. MySQL ✓ / Supabase ✗" />
              <Row label="Mike D."   value="Business owner — approves tickets, wants daily reports" />
              <Row label="Valera"    value="You — coaching Tiffanie through the technical build" />
            </Card>

          </div>

          {/* RIGHT COL */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>

            {/* Agreed architecture */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Agreed architecture" />
              <Row label="App hosting"  value="Andre's server (littletree.itgeneration.ca)" pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="Database"     value="Supabase — Postgres"                         pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="File storage" value="Supabase Storage — photo attachments"        pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="Auth"         value="MySQL read-only → Cashiers table"            pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="Email"        value="PHP Mailer — already on Andre's server"      pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="Automations"  value="Built in PHP — no Make.com, no n8n needed"  pill={<Pill label="Confirmed" kind="solid"   />} />
              <Row label="Vercel"       value="Not an option — PHP not supported there"     pill={<Pill label="Ruled out" kind="muted"   />} />
              <div style={{ ...S2, padding: "12px 14px", marginTop: 14 }}>
                <p style={{ margin: 0, fontSize: 12, color: INK3, lineHeight: 1.65 }}>
                  <span style={{ color: INK, fontWeight: 700 }}>Andre's rule: </span>
                  Baby steps. Supabase first. Login after. Emails after that. One step done before the next begins.
                </p>
              </div>
            </Card>

            {/* Credentials */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Credentials status" />
              <Row label="Supabase"   value="Connection details received from Andre" pill={<Pill label="In hand" kind="solid"   />} />
              <Row label="MySQL"      value="Read-only user + Cashiers table query"  pill={<Pill label="In hand" kind="solid"   />} />
              <Row label="PHP Mailer" value="Andre to provide in next exchange"      pill={<Pill label="Pending" kind="outline" />} />
              <div style={{ ...S2, padding: "12px 14px", marginTop: 14 }}>
                <p style={{ margin: 0, fontSize: 12, color: INK3, lineHeight: 1.65 }}>
                  <span style={{ color: INK, fontWeight: 700 }}>Note: </span>
                  All credentials stored privately. Tiffanie has them directly from Andre via email.
                </p>
              </div>
            </Card>

            {/* What Tiffanie needs from Valera */}
            <Card dark style={{ padding: "22px 24px", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Dot shade="#fff" />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>What Tiffanie needs from you</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.10)" }} />
              </div>

              {/* Focus box */}
              <div style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12, padding: "16px 18px", marginBottom: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Dot shade="#fff" />
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 1.5, textTransform: "uppercase" as const }}>This session's focus</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.90)", lineHeight: 1.65, fontWeight: 600 }}>
                  Walk Tiffanie through installing Supabase CLI on her new iMac and authorizing it — so Claude Code can create the schema and tables directly from terminal.
                </p>
              </div>

              {[
                "Review the schema Claude Code generates: tickets, stores, attachments, ticket_updates tables",
                "Guide the MySQL login page instruction Tiffanie gives Claude Code",
                "Validate her step-by-step written plan before she starts — Andre asked her to send it to both of you",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                  <span style={{ color: "#fff", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                  <span>{t}</span>
                </div>
              ))}
            </Card>

          </div>
        </div>

        {/* ── BUILD SEQUENCE — FULL WIDTH ── */}
        <Card style={{ padding: "24px 28px" }}>
          <SectionLabel label="Build sequence — baby steps, in order" />
          <Step n={1} status="now"  title="Supabase CLI + Schema"    who="Valera leads"
            detail="Install Supabase CLI on Tiffanie's Mac. Authorize to account. Claude Code generates full schema and creates tables directly via CLI. Valera guides the whole setup." />
          <Step n={2} status="next" title="Redesign app for Supabase" who="Tiffanie + Claude Code"
            detail="Claude Code rewrites the PHP data layer to read/write from Supabase. Photos go to Supabase Storage. Mock data fully replaced with real database calls." />
          <Step n={3} status="later" title="Login page → MySQL auth"  who="Tiffanie + Claude Code"
            detail="PHP login queries Andre's MySQL Cashiers table (read-only). CashierType field sets role. Store dropdown removed — login sets the store automatically from StoreNo." />
          <Step n={4} status="later" title="PHP Mailer email triggers" who="Tiffanie + Andre + Claude Code"
            detail="New ticket → email Andre. Status change → email submitter. 48hr untouched → escalation email. Andre provides PHP Mailer host and credentials." />
          <Step n={5} status="later" title="Deploy to Andre's server"  who="Tiffanie + Andre"
            detail="PHP app files uploaded to littletree.itgeneration.ca. All data + photos stay in Supabase. Full end-to-end test: submit → board → email fires." />
        </Card>

        <p style={{ textAlign: "center" as const, fontSize: 10, color: "#BBBBBB", marginTop: 24, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
          MJM Ventures · Little Tree POS Help Desk · AAA Accelerator · April 2026
        </p>

      </div>
    </div>
  )
}
