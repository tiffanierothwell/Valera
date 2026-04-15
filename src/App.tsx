import './App.css'

// ── Palette — Blue / Cyan / Amber / Violet. No red or green. ─
const BLUE   = "#3B82F6"
const CYAN   = "#06B6D4"
const AMBER  = "#F59E0B"
const VIOLET = "#8B5CF6"
const PINK   = "#EC4899"
const WHITE  = "rgba(255,255,255,0.85)"
const DIM    = "rgba(255,255,255,0.35)"
const FAINT  = "rgba(255,255,255,0.12)"

// ── Glass presets ─────────────────────────────────────────────
const G1: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)",
}
const G2: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 14,
}

// ── Helpers ───────────────────────────────────────────────────
function hex(h: string) {
  return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
}

type PillType = "blue"|"cyan"|"amber"|"violet"|"pink"|"dim"
const PILL_MAP: Record<PillType,{c:string;a:number}> = {
  blue:   { c: BLUE,   a: 0.18 },
  cyan:   { c: CYAN,   a: 0.18 },
  amber:  { c: AMBER,  a: 0.18 },
  violet: { c: VIOLET, a: 0.18 },
  pink:   { c: PINK,   a: 0.18 },
  dim:    { c: "#fff", a: 0.08 },
}

function Pill({ label, type = "dim" }: { label: string; type?: PillType }) {
  const { c, a } = PILL_MAP[type]
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 1.3,
      textTransform: "uppercase" as const,
      padding: "3px 10px", borderRadius: 99,
      background: `rgba(${hex(c)},${a})`,
      color: c, border: `1px solid rgba(${hex(c)},0.3)`,
      whiteSpace: "nowrap" as const,
    }}>{label}</span>
  )
}

function Dot({ color }: { color: string }) {
  return (
    <span style={{
      display: "inline-block", width: 7, height: 7, borderRadius: "50%",
      background: color, boxShadow: `0 0 8px ${color}, 0 0 16px rgba(${hex(color)},0.5)`,
      flexShrink: 0,
    }}/>
  )
}

function SectionLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <Dot color={accent} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" as const, color: DIM }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, rgba(${hex(accent)},0.3), transparent)` }} />
    </div>
  )
}

function Row({ label, value, pill }: { label: string; value: string; pill?: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 0", borderBottom: `1px solid ${FAINT}`,
    }}>
      <span style={{ fontSize: 11, color: DIM, minWidth: 108, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: WHITE, flex: 1 }}>{value}</span>
      {pill}
    </div>
  )
}

function Card({ children, glow, style }: { children: React.ReactNode; glow?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      ...G1,
      position: "relative" as const,
      overflow: "hidden",
      ...(glow ? { boxShadow: `0 0 40px rgba(${hex(glow)},0.12), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)` } : {}),
      ...style,
    }}>
      {/* top specular */}
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)", borderRadius: 1 }} />
      {children}
    </div>
  )
}

type StepStatus = "yours"|"next"|"later"
const STEP_COLORS: Record<StepStatus,string> = { yours: PINK, next: CYAN, later: VIOLET }

function Step({ n, title, who, detail, status }: {
  n: number; title: string; who: string; detail: string; status: StepStatus
}) {
  const c = STEP_COLORS[status]
  const pillType: PillType = status === "yours" ? "pink" : status === "next" ? "cyan" : "violet"
  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid ${FAINT}` }}>
      {/* number bubble */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        background: `rgba(${hex(c)},0.12)`,
        border: `1px solid rgba(${hex(c)},0.35)`,
        boxShadow: `0 0 14px rgba(${hex(c)},0.2)`,
        color: c, fontWeight: 800, fontSize: 13,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 1,
      }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" as const }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: WHITE }}>{title}</span>
          <Pill label={who} type={pillType} />
        </div>
        <p style={{ margin: 0, fontSize: 12, color: DIM, lineHeight: 1.65 }}>{detail}</p>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(150deg, #060912 0%, #0C0E1E 45%, #070B18 100%)",
      fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', sans-serif",
      padding: "44px 28px 80px",
      position: "relative" as const,
      overflow: "hidden",
    }}>

      {/* Ambient orbs */}
      <div style={{ position: "fixed", top: -300, left: -200, width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -300, right: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "40%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" as const }}>

        {/* ── HERO HEADER ── */}
        <Card glow={BLUE} style={{ marginBottom: 20, padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" as const }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ ...G2, padding: "4px 12px", border: `1px solid rgba(${hex(PINK)},0.2)` }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" as const, color: PINK }}>
                    AAA Accelerator · April 15, 2026
                  </span>
                </div>
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: -0.8 }}>
                Little Tree — POS Help Desk
              </h1>
              <p style={{ color: DIM, margin: 0, fontSize: 13, letterSpacing: 0.2 }}>
                Tiffanie Rothwell &nbsp;·&nbsp; MJM Ventures (Mike David)
              </p>
            </div>

            {/* Status summary */}
            <div style={{ display: "flex", flex: "none", flexDirection: "column" as const, gap: 8, alignItems: "flex-end" }}>
              {[
                { dot: BLUE,   label: "All screens built in PHP" },
                { dot: AMBER,  label: "No database connected yet" },
                { dot: PINK,   label: "Next: Supabase CLI with Valera" },
              ].map(({ dot, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, ...G2, padding: "7px 14px" }}>
                  <Dot color={dot} />
                  <span style={{ fontSize: 12, color: WHITE, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── MAIN GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* LEFT COL */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>

            {/* One liner */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Project in one sentence" accent={BLUE} />
              <p style={{ margin: 0, fontSize: 13, color: DIM, lineHeight: 1.75 }}>
                Internal IT ticketing system for 3 store locations (gas station / convenience). Staff submit tickets when the POS breaks → Manager triages → Owner receives daily reports.{" "}
                <span style={{ color: WHITE, fontWeight: 600 }}>Fully internal. No customer-facing layer.</span>
              </p>
            </Card>

            {/* What exists */}
            <Card style={{ padding: "22px 24px", flex: 1 }}>
              <SectionLabel label="What exists today" accent={CYAN} />
              <Row label="Language"       value="PHP + HTML/CSS"                       pill={<Pill label="Don't change" type="dim" />} />
              <Row label="All screens"    value="Submit, Board, Detail, Analytics"     pill={<Pill label="Built" type="blue" />} />
              <Row label="Submit wizard"  value="4-step form + photo upload UI"        pill={<Pill label="Built" type="blue" />} />
              <Row label="Manager board"  value="Urgent → Open → Closed → Archive"    pill={<Pill label="Built" type="blue" />} />
              <Row label="Status bar"     value="New → In Process → Approval → Done"  pill={<Pill label="Built" type="blue" />} />
              <Row label="Analytics"      value="Ticket counts, SLA %, filters"        pill={<Pill label="Built" type="blue" />} />
              <Row label="Database"       value="Mock data only — not connected"       pill={<Pill label="Missing" type="amber" />} />
              <Row label="File storage"   value="UI exists, nowhere to save photos"    pill={<Pill label="Missing" type="amber" />} />
              <Row label="Auth / login"   value="No real login built yet"              pill={<Pill label="Missing" type="amber" />} />
              <Row label="Email triggers" value="Not wired up yet"                     pill={<Pill label="Missing" type="amber" />} />
            </Card>

            {/* People */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="People" accent={VIOLET} />
              <Row label="Tiffanie"  value="Project owner — builds with Claude Code, not a developer" />
              <Row label="Andre B."  value="IT lead, 10+ yrs. Owns server + MySQL DB. MySQL ✓ / Supabase support ✗" />
              <Row label="Mike D."   value="Business owner — approves tickets, wants daily reports" />
              <Row label="Valera"    value="You — coaching Tiffanie through the technical build" />
            </Card>

          </div>

          {/* RIGHT COL */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>

            {/* Agreed architecture */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Agreed architecture" accent={VIOLET} />
              <Row label="App hosting"   value="Andre's data center (littletree.itgeneration.ca)" pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="Database"      value="Supabase — Postgres"                              pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="File storage"  value="Supabase Storage — photo attachments"             pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="Auth"          value="MySQL read-only → Cashiers table"                 pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="Email"         value="PHP Mailer — already on Andre's server"           pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="Automations"   value="Built in PHP — no Make.com, no n8n needed"        pill={<Pill label="Confirmed" type="blue" />} />
              <Row label="Vercel"        value="Not an option — PHP not supported there"          pill={<Pill label="Ruled out" type="violet" />} />
              <div style={{ ...G2, padding: "12px 14px", marginTop: 14 }}>
                <p style={{ margin: 0, fontSize: 12, color: DIM, lineHeight: 1.65 }}>
                  <span style={{ color: AMBER, fontWeight: 700 }}>Andre's rule: </span>
                  Baby steps. Supabase first. Login after. Emails after that. One step done before the next begins.
                </p>
              </div>
            </Card>

            {/* Credentials */}
            <Card style={{ padding: "22px 24px" }}>
              <SectionLabel label="Credentials status" accent={AMBER} />
              <Row label="Supabase"   value="Connection details received from Andre"   pill={<Pill label="In hand" type="cyan" />} />
              <Row label="MySQL"      value="Read-only user + Cashiers table query"    pill={<Pill label="In hand" type="cyan" />} />
              <Row label="PHP Mailer" value="Andre to provide in next exchange"        pill={<Pill label="Pending" type="amber" />} />
              <div style={{ ...G2, padding: "12px 14px", marginTop: 14 }}>
                <p style={{ margin: 0, fontSize: 12, color: DIM, lineHeight: 1.65 }}>
                  <span style={{ color: AMBER, fontWeight: 700 }}>Note: </span>
                  All credentials stored privately. Not published here. Tiffanie has them directly from Andre via email.
                </p>
              </div>
            </Card>

            {/* What Tiffanie needs from Valera */}
            <Card glow={PINK} style={{ padding: "22px 24px", flex: 1 }}>
              <SectionLabel label="What Tiffanie needs from you" accent={PINK} />

              {/* Focus box */}
              <div style={{
                ...G2, padding: "16px 18px", marginBottom: 16,
                border: `1px solid rgba(${hex(PINK)},0.25)`,
                background: `rgba(${hex(PINK)},0.06)`,
                boxShadow: `inset 0 0 24px rgba(${hex(PINK)},0.05)`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Dot color={PINK} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: PINK, letterSpacing: 1.5, textTransform: "uppercase" as const }}>This session's focus</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: WHITE, lineHeight: 1.65, fontWeight: 600 }}>
                  Walk Tiffanie through installing Supabase CLI on her new iMac and authorizing it to the account — so Claude Code can create the schema and tables directly from terminal.
                </p>
              </div>

              {[
                "Review the schema Claude Code generates: tickets, stores, attachments, ticket_updates tables",
                "Guide the MySQL login page instruction Tiffanie gives Claude Code",
                "Validate her step-by-step written plan before she starts — Andre asked her to send it to both of you",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 12, color: DIM, lineHeight: 1.6 }}>
                  <span style={{ color: PINK, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                  <span>{t}</span>
                </div>
              ))}
            </Card>

          </div>
        </div>

        {/* ── BUILD SEQUENCE — FULL WIDTH ── */}
        <Card style={{ padding: "24px 28px" }}>
          <SectionLabel label="Build sequence — baby steps, in order" accent={CYAN} />
          <Step n={1} status="yours" title="Supabase CLI + Schema" who="Valera leads"
            detail="Install Supabase CLI on Tiffanie's Mac. Authorize to account. Claude Code generates full schema and creates tables directly via CLI. Valera guides the whole setup." />
          <Step n={2} status="next" title="Redesign app for Supabase" who="Tiffanie + Claude Code"
            detail="Claude Code rewrites the PHP data layer to read/write from Supabase. Photos go to Supabase Storage. Mock data fully replaced with real database calls." />
          <Step n={3} status="later" title="Login page → MySQL auth" who="Tiffanie + Claude Code"
            detail="PHP login queries Andre's MySQL Cashiers table (read-only). CashierType field sets role. Store dropdown removed — login sets the store automatically from StoreNo." />
          <Step n={4} status="later" title="PHP Mailer email triggers" who="Tiffanie + Andre + Claude Code"
            detail="New ticket → email Andre. Status change → email submitter. 48hr untouched → escalation email. Andre provides PHP Mailer host and credentials." />
          <Step n={5} status="later" title="Deploy to Andre's server" who="Tiffanie + Andre"
            detail="PHP app files uploaded to littetree.itgeneration.ca. All data + photos stay in Supabase. Full end-to-end test: submit → board → email fires." />
        </Card>

        <p style={{ textAlign: "center" as const, fontSize: 10, color: "rgba(255,255,255,0.12)", marginTop: 24, letterSpacing: 1.5, textTransform: "uppercase" as const }}>
          MJM Ventures · Little Tree POS Help Desk · AAA Accelerator · April 2026
        </p>

      </div>
    </div>
  )
}
