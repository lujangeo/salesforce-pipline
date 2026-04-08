import { useState } from "react";

const COLORS = {
  bg: "#F3F3F3",
  cardBg: "#FFFFFF",
  primary: "#0176D3",
  primaryDark: "#014486",
  accent: "#1B96FF",
  success: "#2E844A",
  warning: "#DD7A01",
  error: "#EA001E",
  textPrimary: "#181818",
  textSecondary: "#444444",
  textMuted: "#706E6B",
  border: "#DDDBDA",
  headerBg: "#032D60",
  prospecting: "#1B96FF",
  qualification: "#0176D3",
  proposal: "#DD7A01",
  negotiation: "#9050E9",
  closedWon: "#2E844A",
  closedLost: "#EA001E",
};

const pipelineData = [
  { stage: "Prospecting", count: 42, value: 284000, color: COLORS.prospecting },
  { stage: "Qualification", count: 28, value: 412000, color: COLORS.qualification },
  { stage: "Proposal/Quote", count: 15, value: 367000, color: COLORS.proposal },
  { stage: "Negotiation", count: 8, value: 289000, color: COLORS.negotiation },
  { stage: "Closed Won", count: 12, value: 523000, color: COLORS.closedWon },
  { stage: "Closed Lost", count: 6, value: 118000, color: COLORS.closedLost },
];

const recentOpps = [
  { name: "Acme Corp — Enterprise License", stage: "Negotiation", amount: 87000, close: "Apr 12", prob: 75, owner: "M. Santos" },
  { name: "TechFlow Inc — Data Migration", stage: "Proposal/Quote", amount: 42000, close: "Apr 18", prob: 60, owner: "J. Rivera" },
  { name: "Pacific Health — CRM Setup", stage: "Qualification", amount: 65000, close: "May 01", prob: 40, owner: "M. Santos" },
  { name: "Island Logistics — Renewal", stage: "Negotiation", amount: 34000, close: "Apr 08", prob: 90, owner: "A. Chen" },
  { name: "GovServe — Phase 2 Expansion", stage: "Prospecting", amount: 125000, close: "May 22", prob: 20, owner: "J. Rivera" },
  { name: "BlueStar Media — Support Pkg", stage: "Closed Won", amount: 28000, close: "Mar 28", prob: 100, owner: "A. Chen" },
];

const monthlyData = [
  { month: "Oct", won: 185000, lost: 42000 },
  { month: "Nov", won: 210000, lost: 38000 },
  { month: "Dec", won: 298000, lost: 65000 },
  { month: "Jan", won: 245000, lost: 51000 },
  { month: "Feb", won: 312000, lost: 47000 },
  { month: "Mar", won: 523000, lost: 118000 },
];

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
};

const SFIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#00A1E0" />
    <path d="M7 12.5C7 10.5 8.5 9 10.5 9C11.3 9 12 9.3 12.5 9.8C13 9.3 13.7 9 14.5 9C16.5 9 18 10.5 18 12.5C18 14.5 16.5 16 14.5 16H10.5C8.5 16 7 14.5 7 12.5Z" fill="white" />
  </svg>
);

const KPICard = ({ label, value, sub, trend, trendUp }) => (
  <div style={{
    background: COLORS.cardBg,
    borderRadius: 8,
    padding: "20px 24px",
    border: `1px solid ${COLORS.border}`,
    flex: 1,
    minWidth: 160,
  }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.1, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{value}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
      {trend && (
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: trendUp ? COLORS.success : COLORS.error,
          fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
          {trendUp ? "▲" : "▼"} {trend}
        </span>
      )}
      {sub && <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{sub}</span>}
    </div>
  </div>
);

const PipelineBar = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value));
  return (
    <div style={{
      background: COLORS.cardBg,
      borderRadius: 8,
      padding: 24,
      border: `1px solid ${COLORS.border}`,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Pipeline by Stage</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 20, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Current quarter — all owners</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 110, fontSize: 12, color: COLORS.textSecondary, textAlign: "right", flexShrink: 0, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{d.stage}</div>
            <div style={{ flex: 1, height: 28, background: "#F0F0F0", borderRadius: 4, overflow: "hidden", position: "relative" }}>
              <div style={{
                width: `${(d.value / maxVal) * 100}%`,
                height: "100%",
                background: d.color,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
                transition: "width 0.6s ease",
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "white", fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{fmt(d.value)}</span>
              </div>
            </div>
            <div style={{ width: 28, fontSize: 12, fontWeight: 600, color: COLORS.textMuted, textAlign: "right", fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{d.count}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Count →</span>
      </div>
    </div>
  );
};

const MonthlyChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.won + d.lost));
  const chartH = 160;
  return (
    <div style={{
      background: COLORS.cardBg,
      borderRadius: 8,
      padding: 24,
      border: `1px solid ${COLORS.border}`,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Monthly Won vs Lost</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 16, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Last 6 months</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: chartH, paddingBottom: 24, position: "relative" }}>
        {data.map((d, i) => {
          const wonH = (d.won / maxVal) * (chartH - 24);
          const lostH = (d.lost / maxVal) * (chartH - 24);
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: chartH - 24 }}>
                <div style={{ width: 18, height: wonH, background: COLORS.closedWon, borderRadius: "3px 3px 0 0", transition: "height 0.4s ease" }} title={`Won: ${fmt(d.won)}`} />
                <div style={{ width: 18, height: lostH, background: COLORS.closedLost, borderRadius: "3px 3px 0 0", opacity: 0.7, transition: "height 0.4s ease" }} title={`Lost: ${fmt(d.lost)}`} />
              </div>
              <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 6, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>{d.month}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.closedWon }} />
          <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Won</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.closedLost, opacity: 0.7 }} />
          <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Lost</span>
        </div>
      </div>
    </div>
  );
};

const stageBadge = (stage) => {
  const colorMap = {
    "Prospecting": COLORS.prospecting,
    "Qualification": COLORS.qualification,
    "Proposal/Quote": COLORS.proposal,
    "Negotiation": COLORS.negotiation,
    "Closed Won": COLORS.closedWon,
    "Closed Lost": COLORS.closedLost,
  };
  const c = colorMap[stage] || COLORS.textMuted;
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      background: `${c}18`,
      color: c,
      whiteSpace: "nowrap",
      fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {stage}
    </span>
  );
};

const OppTable = ({ data }) => (
  <div style={{
    background: COLORS.cardBg,
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    overflow: "hidden",
  }}>
    <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Recent Opportunities</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>Sorted by close date</div>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <thead>
          <tr style={{ background: "#FAFAF9" }}>
            {["Opportunity Name", "Stage", "Amount", "Close Date", "Probability", "Owner"].map((h, i) => (
              <th key={i} style={{
                padding: "10px 16px",
                textAlign: i === 2 || i === 4 ? "right" : "left",
                fontWeight: 600,
                color: COLORS.textMuted,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                borderBottom: `1px solid ${COLORS.border}`,
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((o, i) => (
            <tr key={i} style={{ borderBottom: i < data.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <td style={{ padding: "12px 16px", color: COLORS.primary, fontWeight: 500, cursor: "pointer" }}>{o.name}</td>
              <td style={{ padding: "12px 16px" }}>{stageBadge(o.stage)}</td>
              <td style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: COLORS.textPrimary }}>{fmt(o.amount)}</td>
              <td style={{ padding: "12px 16px", color: COLORS.textSecondary, whiteSpace: "nowrap" }}>{o.close}</td>
              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                  <div style={{ width: 48, height: 6, background: "#ECEBEA", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${o.prob}%`, height: "100%", background: o.prob >= 75 ? COLORS.success : o.prob >= 50 ? COLORS.warning : COLORS.textMuted, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, color: COLORS.textMuted, width: 28, textAlign: "right" }}>{o.prob}%</span>
                </div>
              </td>
              <td style={{ padding: "12px 16px", color: COLORS.textSecondary, whiteSpace: "nowrap" }}>{o.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function SalesPipelineDashboard() {
  const totalPipeline = pipelineData.reduce((s, d) => s + d.value, 0);
  const wonValue = pipelineData.find(d => d.stage === "Closed Won")?.value || 0;
  const totalOpps = pipelineData.reduce((s, d) => s + d.count, 0);
  const avgDeal = Math.round(totalPipeline / totalOpps);
  const winRate = Math.round((12 / (12 + 6)) * 100);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: COLORS.headerBg,
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SFIcon size={28} />
          <div>
            <div style={{ color: "white", fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>Sales Pipeline Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>Q1 2026 — All Opportunities</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Last refreshed: Mar 31, 2026 8:42 AM ChST</div>
          <div style={{
            padding: "6px 14px",
            borderRadius: 4,
            background: "rgba(255,255,255,0.12)",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>⟳ Refresh</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 28px 48px" }}>
        {/* KPI Row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <KPICard label="Total Pipeline" value={fmt(totalPipeline)} trend="+18%" trendUp sub="vs last quarter" />
          <KPICard label="Closed Won" value={fmt(wonValue)} trend="+67%" trendUp sub="vs last quarter" />
          <KPICard label="Win Rate" value={`${winRate}%`} trend="+5pp" trendUp sub="vs last quarter" />
          <KPICard label="Avg Deal Size" value={fmt(avgDeal)} trend="-3%" sub="vs last quarter" />
          <KPICard label="Open Opps" value={totalOpps - 18} sub="across 3 reps" />
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 24 }}>
          <PipelineBar data={pipelineData} />
          <MonthlyChart data={monthlyData} />
        </div>

        {/* Table */}
        <OppTable data={recentOpps} />

        {/* Footer */}
        <div style={{
          marginTop: 24,
          padding: "16px 24px",
          background: COLORS.cardBg,
          borderRadius: 8,
          border: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textPrimary }}>Portfolio Sample — Sales Pipeline Dashboard</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Built with native Salesforce report & dashboard components. No third-party tools required.</div>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "right" }}>
            <div>Designed by George</div>
            <div>Salesforce Certified Associate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
