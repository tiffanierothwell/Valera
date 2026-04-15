import './App.css'

// ── Status pill ──────────────────────────────────────────────
function Pill({ label, type }: { label: string; type: "done" | "pending" | "blocked" | "yours" }) {
  const styles = {
    done:    { bg: "#E8F5E9", color: "#2E7D32", border: "#2E7D321A" },
    pending: { bg: "#FFF8F0", color: "#E87830", border: "#E878301A" },
    blocked: { bg: "#FFF3F3", color: "#C62828", border: "#C628281A" },
    yours:   { bg: "#EDE7FF", color: "#5C35CC", border: "#5C35CC1A" },
  }[type];
  return (
    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" as const, padding: "3px 9px", borderRadius: 20, background: styles.bg, color: styles.color, border: `1px solid ${styles.border}`, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

// ── Row item ─────────────────────────────────────────────────
function Item({ label, value, pill }: { label: string; value: string; pill?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F0F0F0", gap: 12 }}>
      <span style={{ fontSize: 12, color: "#888", minWidth: 120 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#111", flex: 1 }}>{value}</span>
      {pill}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EBEBEB", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #F0F0F0", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 3, height: 16, background: accent, borderRadius: 2 }} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#333" }}>{title}</span>
      </div>
      <div style={{ padding: "4px 20px 16px" }}>{children}</div>
    </div>
  );
}

// ── Step card ─────────────────────────────────────────────────
function Step({ n, title, who, detail, status }: { n: number; title: string; who: string; detail: string; status: "done" | "pending" | "blocked" | "yours" }) {
  const accent = { done: "#2E7D32", pending: "#E87830", blocked: "#C62828", yours: "#5C35CC" }[status];
  return (
    <div style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #F5F5F5" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: accent + "18", color: accent, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{title}</span>
          <Pill label={who} type={status} />
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.55 }}>{detail}</p>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#F4F4F6", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: "36px 24px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, color: "#999" }}>AAA Accelerator · Coaching Brief · April 15, 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 4px" }}>Little Tree — POS Help Desk</h1>
              <p style={{ color: "#777", margin: 0, fontSize: 14 }}>Tiffanie Rothwell &nbsp;·&nbsp; Client of Mike David (MJM Ventures)</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              <Pill label="App: Built" type="done" />
              <Pill label="Backend: Not Connected" type="blocked" />
              <Pill label="Next: Supabase CLI" type="yours" />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* LEFT COLUMN */}
          <div>
            {/* WHAT IS THIS */}
            <Section title="Project in one sentence" accent="#0077B6">
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.65, margin: "12px 0 0" }}>
                An internal IT ticketing system for 3 gas station / convenience store locations. Staff submit tickets when POS breaks. Manager triages. Owner gets daily reports. <strong>No customer-facing component.</strong>
              </p>
            </Section>

            {/* WHAT'S BUILT */}
            <Section title="What exists today" accent="#2E7D32">
              <Item label="Language" value="PHP + HTML/CSS" pill={<Pill label="Do not change" type="pending" />} />
              <Item label="Frontend" value="All screens built" pill={<Pill label="Done" type="done" />} />
              <Item label="Submit wizard" value="4-step form + photo upload UI" pill={<Pill label="Done" type="done" />} />
              <Item label="Manager board" value="Queue → Open → Closed → Archive" pill={<Pill label="Done" type="done" />} />
              <Item label="Status flow" value="New → In Process → Needs Approval → Completed" pill={<Pill label="Done" type="done" />} />
              <Item label="Analytics dashboard" value="Ticket counts, SLA %, filters" pill={<Pill label="Done" type="done" />} />
              <Item label="Database" value="Mock data only — not connected" pill={<Pill label="Missing" type="blocked" />} />
              <Item label="File storage" value="Photo upload UI exists, nowhere to save" pill={<Pill label="Missing" type="blocked" />} />
              <Item label="Auth / login" value="No real login yet" pill={<Pill label="Missing" type="blocked" />} />
              <Item label="Emails" value="Not wired up yet" pill={<Pill label="Missing" type="blocked" />} />
            </Section>

            {/* PEOPLE */}
            <Section title="People involved" accent="#E87830">
              <Item label="Tiffanie" value="Project owner — builds with Claude Code, not a developer" />
              <Item label="Andre Boudreault" value="IT lead, 10+ yrs with Mike. Manages the server + MySQL DB. Comfortable with MySQL, not Supabase support." />
              <Item label="Mike David" value="Business owner — wants daily reports, approves tickets" />
              <Item label="Valera" value="You — coaching Tiffanie through the technical build" />
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* AGREED TECH STACK */}
            <Section title="Agreed architecture" accent="#5C35CC">
              <Item label="App hosting" value="Andre's data center" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="Database" value="Supabase (Postgres)" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="File storage" value="Supabase Storage" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="Auth / login" value="MySQL read-only → Andre's Cashiers table" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="Email" value="PHP Mailer — already on Andre's server" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="Automations" value="Built into PHP — no Make.com, no n8n" pill={<Pill label="Confirmed" type="done" />} />
              <Item label="Vercel" value="Not an option — PHP not supported" pill={<Pill label="Ruled out" type="blocked" />} />
              <div style={{ marginTop: 12, background: "#F7F4FF", border: "1px solid #5C35CC22", borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ margin: 0, fontSize: 12, color: "#5C35CC", lineHeight: 1.6 }}>
                  <strong>Andre's recommendation:</strong> Baby steps. Get Supabase connected first with Claude Code. Login + emails come after. Do not do everything at once.
                </p>
              </div>
            </Section>

            {/* CREDENTIALS */}
            <Section title="Credentials status" accent="#E87830">
              <Item label="Supabase" value="Connection details received from Andre" pill={<Pill label="In hand" type="done" />} />
              <Item label="MySQL" value="Read-only user + Cashiers table query provided" pill={<Pill label="In hand" type="done" />} />
              <Item label="PHP Mailer" value="Andre to provide in next exchange" pill={<Pill label="Pending" type="pending" />} />
              <div style={{ marginTop: 12, background: "#FFF8F0", border: "1px solid #E8783022", borderRadius: 10, padding: "10px 14px" }}>
                <p style={{ margin: 0, fontSize: 12, color: "#E87830", lineHeight: 1.6 }}>
                  <strong>Note:</strong> Credentials are stored privately — not published here. Tiffanie has them in email from Andre.
                </p>
              </div>
            </Section>

            {/* WHAT TIFFANIE NEEDS FROM VALERA */}
            <Section title="What Tiffanie needs from you" accent="#5C35CC">
              <div style={{ paddingTop: 8 }}>
                <div style={{ background: "#F7F4FF", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#5C35CC", letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 6 }}>🎯 This session's focus</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#333", lineHeight: 1.6, fontWeight: 600 }}>Walk Tiffanie through installing Supabase CLI on her new iMac and authorizing it to the Supabase account — so Claude Code can create the schema and tables directly.</p>
                </div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 6 }}>→ Review the schema Claude Code generates (tickets, stores, attachments, ticket_updates)</div>
                  <div style={{ marginBottom: 6 }}>→ Guide her on the MySQL login page instruction for Claude Code</div>
                  <div>→ Validate her written step-by-step plan before she starts building (Andre asked her to write it out and send to both of you)</div>
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* NEXT STEPS - FULL WIDTH */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #EBEBEB", overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #F0F0F0", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 16, background: "#E87830", borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#333" }}>Build sequence — baby steps, in order</span>
          </div>
          <div style={{ padding: "0 20px" }}>
            <Step n={1} title="Supabase CLI + Schema" who="Valera leads" status="yours"
              detail="Install Supabase CLI on Tiffanie's Mac. Authorize to Supabase account. Claude Code generates the full schema and creates tables directly via CLI." />
            <Step n={2} title="Redesign app for Supabase" who="Tiffanie + Claude Code" status="pending"
              detail="Claude Code rewrites the PHP data layer to read/write from Supabase. Photo uploads go to Supabase Storage. Mock data is replaced with real DB calls." />
            <Step n={3} title="Login page → MySQL auth" who="Tiffanie + Claude Code" status="pending"
              detail="PHP login page queries Andre's MySQL Cashiers table (read-only). CashierType field sets role. Store dropdown removed — login sets the store from StoreNo." />
            <Step n={4} title="PHP Mailer email triggers" who="Tiffanie + Andre + Claude Code" status="pending"
              detail="Wire: new ticket → email Andre. Status change → email submitter. 48hr untouched → escalation. Andre provides PHP Mailer credentials." />
            <Step n={5} title="Deploy to Andre's server" who="Tiffanie + Andre" status="pending"
              detail="PHP app files go to littletree.itgeneration.ca. Data and photos stay in Supabase. Test full flow end-to-end." />
          </div>
        </div>

        <div style={{ textAlign: "center" as const, fontSize: 11, color: "#bbb", paddingBottom: 20 }}>
          MJM Ventures · Little Tree POS Help Desk · AAA Accelerator · April 2026
        </div>

      </div>
    </div>
  );
}
