import React from "react";

export default function PurpleLightDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#1F2937] flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm px-6 py-8">
        <h1 className="text-lg font-semibold mb-10 text-[#7A3E4D]">
          Logopipsum
        </h1>

        <p className="text-xs uppercase tracking-widest text-[#6B7280] mb-4">
          Menu
        </p>

        <nav className="space-y-1 text-sm">
          <div className="px-3 py-2 rounded-md text-[#6B7280] hover:bg-[#F4E6EA]">
            Overview
          </div>

          <div className="px-3 py-2 rounded-md bg-[#F4E6EA] text-[#7A3E4D] font-medium">
            Test Cases
          </div>

          <div className="px-3 py-2 rounded-md text-[#6B7280] hover:bg-[#F4E6EA]">
            Test Suites
          </div>

          <div className="px-3 py-2 rounded-md text-[#6B7280] hover:bg-[#F4E6EA]">
            Execution
          </div>

          <div className="px-3 py-2 rounded-md text-[#6B7280] hover:bg-[#F4E6EA]">
            Results
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* HEADER */}
        <header className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
          <span className="text-sm text-[#6B7280]">
            Dashboard / Profile Creation
          </span>

          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-[#F4E6EA] flex items-center justify-center">
              <span className="font-semibold text-[#7A3E4D]">
                SM
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-10 py-8">
          <h2 className="text-2xl font-semibold mb-8">
            Load objects
          </h2>

          <div className="grid grid-cols-12 gap-8">

            {/* LEFT CARD */}
            <div className="col-span-4 bg-white rounded-xl shadow p-6">
              <p className="font-medium mb-6 text-sm">
                Available objects
              </p>

              {["Account", "Bike service", "Campaign", "Contact"].map(
                (item, i) => (
                  <div
                    key={item}
                    className="flex justify-between items-center py-3 border-b last:border-none border-[#E5E7EB] text-sm"
                  >
                    <span className="text-[#6B7280]">{item}</span>
                    <input
                      type="checkbox"
                      defaultChecked={i < 3}
                      className="accent-[#7A3E4D]"
                    />
                  </div>
                )
              )}
            </div>

            {/* RIGHT CARD */}
            <div className="col-span-8 bg-white rounded-xl shadow p-7">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-semibold text-sm">
                    Account
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    2 / 25 fields selected
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded-md text-sm border border-[#EAD6DD] text-[#7A3E4D] hover:bg-[#F4E6EA]">
                    Field mapping
                  </button>
                  <button className="px-4 py-1.5 rounded-md text-sm border border-[#EAD6DD] text-[#7A3E4D] hover:bg-[#F4E6EA]">
                    Tab Design
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-[#FAF7F8] px-5 py-3 text-xs uppercase tracking-wide text-[#6B7280]">
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
                    className="grid grid-cols-12 px-5 py-4 text-sm border-b last:border-none border-[#E5E7EB] hover:bg-[#FAFAFB]"
                  >
                    <div className="col-span-5 flex gap-3 items-center">
                      <input
                        type="checkbox"
                        defaultChecked={c}
                        className="accent-[#7A3E4D]"
                      />
                      <span>{a}</span>
                    </div>
                    <div className="col-span-7 text-[#6B7280]">
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
