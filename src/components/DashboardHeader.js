/**
 * DASHBOARD HEADER COMPONENT
 * 
 * PURPOSE:
 * This component displays the main header section of the dashboard, showing the user's current
 * plan, subscription status, and API usage statistics.
 * 
 * FUNCTIONALITY:
 * - Displays current subscription plan (e.g., "Researcher")
 * - Shows operational status with visual indicators
 * - Displays API usage progress bar
 * - Provides "Manage Plan" button for subscription management
 * - Uses gradient background for visual appeal
 * 
 * CONNECTIONS:
 * - Used by: Dashboard page (/dashboards)
 * - Part of: ApiKeysManagement component hierarchy
 * - Displays static content (no props required)
 * - Styled consistently with other dashboard components
 * 
 * CONTENT DISPLAYED:
 * - Plan name and type
 * - Operational status badge
 * - API usage progress (currently shows 0/1,000 credits)
 * - Manage plan button (currently non-functional)
 * 
 * STYLING:
 * - Dark gradient background (slate-950 to indigo-950)
 * - White text with opacity variations for hierarchy
 * - Emerald accent colors for status indicators
 * - Rounded corners and shadow effects
 * - Responsive padding and typography
 * 
 * FUTURE ENHANCEMENTS:
 * - Dynamic plan information from user profile
 * - Real-time API usage statistics
 * - Interactive plan management functionality
 * - Integration with billing system
 */

export default function DashboardHeader() {
  return (
    <div className="rounded-2xl overflow-hidden shadow border border-white/10 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white">
      <div className="p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-wide text-white/70">Current Plan</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Researcher</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 text-emerald-300 px-4 py-1 text-sm border border-emerald-400/30">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Operational
            </span>
            <button className="hidden sm:inline-flex rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
              Manage Plan
            </button>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-white/70">API Usage</div>
          <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[0%] bg-white/70"></div>
          </div>
          <div className="mt-2 text-xs text-white/60">0 / 1,000 Credits</div>
        </div>
      </div>
    </div>
  );
}
