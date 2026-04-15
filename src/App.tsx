import './App.css'

const O = "#E87830";
const G = "#2E7D32";
const P = "#5C35CC";
const B = "#0077B6";
const R = "#C62828";
const SLATE = "#374151";

function Section({ title, subtitle, accent, children }: { title: string; subtitle?: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111", margin: 0 }}>{title}</h2>
        {subtitle && <>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block" }} />
          <span style={{ fontSize: 13, color: "#999" }}>{subtitle}</span>
        </>}
      </div>
      <div style={{ height: 2, background: `linear-gradient(to right, ${accent}, transparent)`, marginBottom: 18, borderRadius: 1 }} />
      {children}
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return <span style={{ fontSize: 11, fontWeight: 700, background: color + "18", color, border: `1px solid ${color}44`, padding: "2px 8px", borderRadius: 20 }}>{label}</span>;
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${accent ? accent + "33" : "#e5e5e5"}`, borderLeft: accent ? `4px solid ${accent}` : undefined, borderRadius: 12, padding: "16px 20px" }}>
      {children}
    </div>
  );
}

function CredRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase" as const, letterSpacing: 1, minWidth: 130 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: mono ? "monospace" : undefined, background: mono ? "#F5F5F5" : undefined, padding: mono ? "2px 8px" : undefined, borderRadius: mono ? 4 : undefined }}>{value}</span>
    </div>
  );
}

function StepCard({ n, title, color, who, items }: { n: string; title: string; color: string; who: string; items: string[] }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: color, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 800, fontSize: 14, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{title}</span>
        </div>
        <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{who}</span>
      </div>
      <div style={{ padding: "12px 18px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span style={{ color: color, fontWeight: 700, fontSize: 12, minWidth: 16, marginTop: 1 }}>{i + 1}.</span>
            <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 4, height: 28, background: O, borderRadius: 2 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, color: O }}>AAA Coaching · Valera Tumash · Updated April 15, 2026</span>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#111", margin: "0 0 6px" }}>Venditio POS Help Desk — Project Briefing</h1>
          <p style={{ color: "#555", margin: 0, fontSize: 15, lineHeight: 1.6, maxWidth: 720 }}>
            This page is for <strong>Valera</strong> — updated after the April 15 meeting with Andre Boudreault and Tiffanie Rothwell. It replaces all previous information. Everything below reflects what was decided in that call plus the credentials Andre sent immediately after.
          </p>
        </div>

        {/* ── WHAT THIS APP IS ── */}
        <Section title="What This App Is" subtitle="The product we're building" accent={B}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card accent={B}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8 }}>The App</div>
              <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, margin: 0 }}>
                An internal IT help desk ticket system for three store locations: <strong>Little Tree Gas</strong>, <strong>Le Roi Convenience</strong>, and <strong>Medicine Box</strong>. Staff submit tickets when something breaks with the POS system. Managers track and resolve. Owners get reports.
              </p>
            </Card>
            <Card accent={P}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8 }}>What's Already Built</div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {[
                  "Full PHP app — all screens built",
                  "4-step ticket submit wizard with photo upload UI",
                  "Manager queue board (urgent → open → closed)",
                  "Ticket detail with status bar (New → In Process → Needs Approval → Completed)",
                  "Operations dashboard with analytics",
                  "Archive with search",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#333" }}>
                    <span style={{ color: G, fontWeight: 700 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* ── DECISIONS MADE IN THE MEETING ── */}
        <Section title="Decisions Made in the April 15 Meeting" subtitle="Agreed by Andre, Valera & Tiffanie — these are final" accent={G}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {[
              {
                icon: "🏗️", title: "App Hosting → Andre's Data Center", color: G,
                detail: "The PHP app files will be deployed to Andre's existing server (littletree.itgeneration.ca). Not Vercel — Vercel is JavaScript only and will not work with a PHP app.",
              },
              {
                icon: "🗄️", title: "Database & File Storage → Supabase", color: B,
                detail: "All ticket data, records, and photo attachments will be stored in Supabase (Postgres). NOT on Andre's server — Supabase handles everything to avoid eating up server space with image files.",
              },
              {
                icon: "🔐", title: "Login / Authentication → Andre's MySQL (Read-Only)", color: P,
                detail: "The login page will authenticate users against Andre's existing MySQL database using a read-only connection. The Cashiers table already has all staff and their store assignments. CashierType determines role (staff vs. manager).",
              },
              {
                icon: "📧", title: "Email Notifications → PHP Mailer (Already on Andre's Server)", color: O,
                detail: "No Make.com automations needed. Email triggers (new ticket, status changes, daily report) will be handled directly in PHP using PHP Mailer. Andre already has it installed and will provide credentials.",
              },
              {
                icon: "🤖", title: "No Make.com Automations — Claude Code Handles It All", color: SLATE,
                detail: "Valera confirmed: the automations are simple linear processes — form submits, send email, update status. Claude Code will build all of this directly into the PHP app. No automation platform needed.",
              },
              {
                icon: "👣", title: "Baby Steps — Do NOT Try to Do Everything at Once", color: R,
                detail: "Andre's explicit instruction: complete one step fully before moving to the next. Step 1 is Supabase. When that works, move to Step 2 (login). Then Step 3 (email). Trying to do it all at once will cause it to crash and burn.",
              },
            ].map((d, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${d.color}22`, borderLeft: `4px solid ${d.color}`, borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{d.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: d.color }}>{d.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6 }}>{d.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CREDENTIALS ── */}
        <Section title="Credentials from Andre" subtitle="Received April 15, 2026 — ready to use" accent={O}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

            {/* Supabase */}
            <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: B, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Supabase — Database & File Storage</span>
                <Tag label="Postgres" color="#fff" />
              </div>
              <div style={{ padding: "14px 18px" }}>
                <CredRow label="Server" value="Sent by Andre via email — store securely" mono />
                <CredRow label="Port" value="5432 (or 6543 for pooler)" mono />
                <CredRow label="Database" value="postgres" mono />
                <CredRow label="Username" value="postgres" mono />
                <CredRow label="Password" value="Sent by Andre via email — do not share publicly" mono />
                <div style={{ marginTop: 12, background: "#FFF8F0", border: "1px solid #F59E0B44", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>If IPv6 fails — use pooler instead:</div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "monospace" }}>Host: aws-1-eu-west-1.pooler.supabase.com</div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "monospace" }}>User: provided by Andre</div>
                </div>
                <div style={{ marginTop: 8, background: "#F0F4FF", border: "1px solid #5C35CC22", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: P, marginBottom: 2 }}>Valera's job:</div>
                  <div style={{ fontSize: 12, color: "#555" }}>Help Tiffanie install Supabase CLI on her Mac and authorize access so Claude Code can create tables and manage the database directly.</div>
                </div>
              </div>
            </div>

            {/* MySQL */}
            <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: O, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>MySQL — Login / Auth Only</span>
                <Tag label="Read-Only" color="#fff" />
              </div>
              <div style={{ padding: "14px 18px" }}>
                <CredRow label="Hostname" value="Sent by Andre via email — store securely" mono />
                <CredRow label="Port" value="3306" mono />
                <CredRow label="Username" value="dallas_readonly" mono />
                <CredRow label="Password" value="Sent by Andre via email — do not share publicly" mono />
                <CredRow label="Schema" value="littletree" mono />
                <div style={{ marginTop: 12, background: "#F5F5F5", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: SLATE, marginBottom: 6 }}>Cashiers Table — Fields to Query:</div>
                  {["StoreNo — which store the user belongs to", "Id — unique user ID", "CashierName — their display name", "cashier_pwd — their password", "CashierType — determines role (staff vs. manager)", "Language — language preference"].map((f, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#444", fontFamily: "monospace", marginBottom: 2 }}>→ {f}</div>
                  ))}
                </div>
                <div style={{ marginTop: 8, background: "#FFF3F3", border: "1px solid #C6282822", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: R, marginBottom: 2 }}>Important:</div>
                  <div style={{ fontSize: 12, color: "#555" }}>MySQL is used for login ONLY. No other page touches MySQL. All ticket data goes to Supabase. The store-selection dropdown on the submit form goes away — login determines the store automatically from StoreNo.</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── NEXT STEPS ── */}
        <Section title="Next Steps — In This Exact Order" subtitle="Andre said: do not skip ahead" accent={P}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <StepCard
              n="1" color={B} title="Supabase Setup" who="Tiffanie + Valera + Claude Code"
              items={[
                "Install Supabase CLI on Tiffanie's Mac (Valera leads this)",
                "Authorize CLI to connect to the Supabase account above",
                "Tell Claude Code to redesign the app for Supabase — generate full schema (tickets, stores, attachments, ticket_updates tables)",
                "Set up Supabase file storage for photo uploads",
                "Test: submit a ticket, confirm it saves to Supabase DB and photos upload correctly",
              ]}
            />
            <StepCard
              n="2" color={O} title="Login Page (MySQL Auth)" who="Tiffanie + Claude Code"
              items={[
                "Build login page: user selects store, enters username + password",
                "PHP connects to MySQL (108.163.128.9) using dallas_readonly credentials",
                "Query littletree.Cashiers table to validate credentials",
                "CashierType field determines access: staff → submit only, manager → full board",
                "Remove store-selection dropdown from submit form — store comes from login StoreNo",
              ]}
            />
            <StepCard
              n="3" color={G} title="PHP Mailer Email Notifications" who="Tiffanie + Andre + Claude Code"
              items={[
                "Andre provides PHP Mailer host, username, and password",
                "Wire email trigger: new ticket submitted → email Andre instantly",
                "Wire email trigger: status change → email ticket submitter",
                "Wire email trigger: ticket open 48+ hours → escalation alert",
                "Test each trigger end-to-end",
              ]}
            />
            <StepCard
              n="4" color={P} title="Deploy to Andre's Server" who="Tiffanie + Andre"
              items={[
                "Andre confirms PHP 8 environment is active on the server",
                "Upload all PHP app files to littletree.itgeneration.ca",
                "App connects to Supabase (data) and MySQL (login) remotely",
                "No data or photos stored on the server itself — just app code",
                "Test full flow live: submit ticket → manager sees it → email sent",
              ]}
            />
          </div>
          <div style={{ marginTop: 14, background: "#fff", border: `1px solid ${SLATE}22`, borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: SLATE, textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 8 }}>Phase 2 — Future (Not Now)</div>
            <div style={{ display: "flex", gap: 24 }}>
              {[
                { icon: "📱", label: "Text messaging via Avocado", note: "Andre has sample code ready" },
                { icon: "🤖", label: "AI ticket analysis via Spot", note: "Once data accumulates over time" },
                { icon: "🗃️", label: "Migrate to MySQL if needed", note: "Only after Supabase is fully proven" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{f.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── VALERA'S ROLE ── */}
        <Section title="Valera's Role in the Next Session" subtitle="What Tiffanie needs from you specifically" accent={O}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {[
              { n: "1", label: "Supabase CLI Setup on Mac", detail: "Walk Tiffanie through installing the Supabase CLI on her new iMac and authorizing it to her Supabase account so Claude Code can run migrations and create tables directly.", priority: "Start Here" },
              { n: "2", label: "Database Schema Review", detail: "Once Claude Code generates the Supabase schema (tickets, stores, attachments, ticket_updates), review it to confirm it covers everything — especially the photo attachment flow and the ticket status lifecycle.", priority: "Step 1" },
              { n: "3", label: "MySQL Login Page Guidance", detail: "Guide Tiffanie on telling Claude Code to build the login page against Andre's MySQL (108.163.128.9, dallas_readonly). The key instruction for Claude Code: authenticate via MySQL only, store all other data in Supabase.", priority: "Step 2" },
              { n: "4", label: "Validate the Step-by-Step Plan", detail: "Andre asked Tiffanie to write out her project plan and send it to both you and Andre to validate before she starts coding. Make sure the steps are in the right order and nothing is missing.", priority: "Anytime" },
            ].map((item) => (
              <div key={item.n} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ background: O, color: "#fff", fontWeight: 800, fontSize: 13, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{item.label}</span>
                    <Tag label={item.priority} color={O} />
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.55 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TECH STACK SUMMARY ── */}
        <Section title="Confirmed Tech Stack" subtitle="As agreed April 15" accent={SLATE}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              { layer: "App Language", value: "PHP", note: "Do NOT change to JavaScript", color: B },
              { layer: "Front End", value: "PHP + HTML/CSS", note: "Built with Claude Code", color: B },
              { layer: "App Hosting", value: "Andre's Data Center", note: "littletree.itgeneration.ca", color: G },
              { layer: "Database", value: "Supabase (Postgres)", note: "Tickets, users, records", color: P },
              { layer: "File Storage", value: "Supabase Storage", note: "Ticket photo attachments", color: P },
              { layer: "Authentication", value: "MySQL (Read-Only)", note: "Andre's Cashiers table", color: O },
              { layer: "Email", value: "PHP Mailer", note: "Already on Andre's server", color: G },
              { layer: "Automations", value: "Built into PHP", note: "No Make.com needed", color: G },
              { layer: "Vercel", value: "❌ Not Used", note: "PHP not supported on Vercel", color: R },
            ].map((item) => (
              <div key={item.layer} style={{ background: "#fff", border: `1px solid ${item.color}22`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 4 }}>{item.layer}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 2 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{item.note}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CLOSING ── */}
        <div style={{ background: "#FFF8F4", border: `2px solid ${O}`, borderRadius: 12, padding: "20px 24px" }}>
          <span style={{ fontWeight: 700, color: O, fontSize: 15 }}>Where we stand: </span>
          <span style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>The app is fully built in PHP. All credentials from Andre have been received. The architecture is agreed. The only thing left is execution — starting with Supabase CLI setup in the next coaching session with Valera. One step at a time.</span>
        </div>

        <div style={{ textAlign: "center" as const, marginTop: 32, fontSize: 11, color: "#bbb" }}>
          MJM Ventures · Venditio POS Help Desk · AAA Coaching with Valera Tumash · April 2026
        </div>

      </div>
    </div>
  );
}
