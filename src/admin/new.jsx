import React from "react";

export default function PremiumDashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F8FAFF] via-[#F6F7FF] to-[#FBFBFD] text-[#0F172A]">

      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-gradient-to-b from-[#EEF2FF] via-[#F5F3FF] to-white border-r border-[#E0E7FF] flex flex-col px-6 py-6">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10 font-semibold text-lg text-[#4338CA]">
          ⚡ Logopipsum
        </div>

        {/* MENU */}
        <p className="text-xs uppercase tracking-widest text-[#818CF8] mb-3">
          Menu
        </p>

        <nav className="space-y-1 text-sm">
          <SidebarItem label="Overview" />
          <SidebarItem label="Test Cases" />
          <SidebarItem label="Test Suites" active />
          <SidebarItem label="Test Packages" />
          <SidebarItem label="Execution" />
          <SidebarItem label="Results" />
        </nav>

        {/* DIVIDER */}
        <div className="my-6 border-t border-[#E0E7FF]" />

        {/* PROJECT */}
        <p className="text-xs uppercase tracking-widest text-[#818CF8] mb-3">
          Project
        </p>

        <nav className="space-y-1 text-sm">
          <SidebarItem label="Flow Settings" />
          <SidebarItem label="Settings" />
        </nav>
      </aside>

      {/* ========== MAIN AREA ========== */}
      <main className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-[#E2E8F0] px-8 flex items-center justify-between">
          <div className="text-sm text-[#64748B]">
            Dashboard <span className="mx-1">›</span> Profile Creation
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#64748B]">Support</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] flex items-center justify-center font-semibold text-[#4338CA]">
              LR
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8 space-y-6">

          {/* TITLE BAR */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Load objects</h1>

            <div className="flex gap-3">
              <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-sm bg-white">
                <option>Sales</option>
              </select>

              <button className="bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white px-4 py-2 rounded-lg text-sm shadow hover:opacity-90">
                Generate Testcases
              </button>
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white/90 backdrop-blur border border-[#E2E8F0] rounded-2xl shadow-sm grid grid-cols-12 overflow-hidden">

            {/* LEFT PANEL */}
            <div className="col-span-4 border-r border-[#E2E8F0] p-6">
              <p className="font-medium mb-4 text-sm">Available objects</p>

              <div className="space-y-2">
                {["Account", "Bike Service", "Campaign", "Contact"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm transition ${
                        i === 0
                          ? "bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] text-[#4338CA]"
                          : "hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <span>{item}</span>
                      <input
                        type="checkbox"
                        defaultChecked={i < 2}
                        className="accent-[#4338CA]"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="col-span-8 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">Account</p>
                  <p className="text-xs text-[#64748B]">
                    2 / 25 fields selected
                  </p>
                </div>

                <div className="flex gap-2">
                  <ActionBtn label="Field mapping" />
                  <ActionBtn label="Tab Design" />
                </div>
              </div>

              {/* TABLE */}
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 bg-gradient-to-r from-[#F1F5FF] to-[#EEF2FF] px-5 py-3 text-xs uppercase text-[#64748B]">
                  <div className="col-span-5">Field name</div>
                  <div className="col-span-7">Display name</div>
                </div>

                {[
                  ["Account ID*", "Account Name", true],
                  ["Assistant Phone", "Asst. Phone", true],
                  ["Department", "Department", false],
                  ["Home Phone", "Home Phone", false],
                ].map(([a, b, c], i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 px-5 py-4 text-sm border-t border-[#E2E8F0] hover:bg-[#F8FAFC]"
                  >
                    <div className="col-span-5 flex gap-3 items-center">
                      <input
                        type="checkbox"
                        defaultChecked={c}
                        className="accent-[#4338CA]"
                      />
                      <span>{a}</span>
                    </div>
                    <div className="col-span-7 text-[#64748B]">
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

/* ===== Reusable Components ===== */

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white shadow"
          : "text-[#475569] hover:bg-[#EEF2FF]"
      }`}
    >
      {label}
    </div>
  );
}

function ActionBtn({ label }) {
  return (
    <button className="px-4 py-1.5 rounded-lg text-sm border border-[#E0E7FF] text-[#4338CA] bg-white hover:bg-[#EEF2FF] transition">
      {label}
    </button>
  );
}
