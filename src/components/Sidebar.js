/**
 * SIDEBAR NAVIGATION COMPONENT
 * 
 * PURPOSE:
 * This component provides the main navigation sidebar for the Dandi AI application. It's used
 * across multiple pages to maintain consistent navigation and branding.
 * 
 * FUNCTIONALITY:
 * - Collapsible sidebar with smooth animations
 * - Navigation menu with active state highlighting
 * - Company branding and user profile section
 * - Responsive design that adapts to different screen sizes
 * - Toggle button for expanding/collapsing the sidebar
 * 
 * CONNECTIONS:
 * - Used by: Home page (/) and Dashboard page (/dashboards)
 * - Imports: useRouter and usePathname from Next.js navigation
 * - Receives props: sidebarCollapsed (boolean) and toggleSidebar (function)
 * - Part of the main layout structure for both main pages
 * 
 * NAVIGATION ITEMS:
 * - Home (/) - Landing page
 * - API Playground (/dashboards) - Main functionality
 * - Use Cases (#) - Future feature (placeholder)
 * - Billing (#) - Future feature (placeholder)
 * - Settings (#) - Future feature (placeholder)
 * - Documentation (#) - Future feature (placeholder)
 * 
 * PROPS INTERFACE:
 * - sidebarCollapsed: Boolean controlling sidebar width
 * - toggleSidebar: Function to toggle sidebar state
 * 
 * STYLING:
 * - Uses Tailwind CSS for responsive design
 * - Smooth transitions for collapse/expand animations
 * - Active state highlighting with blue accent colors
 * - Consistent with overall application theme
 * 
 * RESPONSIVE BEHAVIOR:
 * - Full width (w-64) when expanded
 * - Narrow width (w-16) when collapsed
 * - Text labels hidden when collapsed
 * - Icons remain visible in both states
 */

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ sidebarCollapsed, toggleSidebar }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      onClick: () => router.push('/'),
      isActive: pathname === "/",
    },
    {
      name: "Dashboard",
      href: "/dashboards",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      onClick: () => router.push('/dashboards'),
      isActive: pathname === "/dashboards",
    },
    {
      name: "API Playground",
      href: "/api-playground",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      onClick: () => router.push('/api-playground'),
      isActive: pathname === "/api-playground",
    },
    {
      name: "Use Cases",
      href: "#",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
      onClick: null,
      isActive: false,
    },
    {
      name: "Billing",
      href: "#",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      onClick: null,
      isActive: false,
    },
    {
      name: "Settings",
      href: "#",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      onClick: null,
      isActive: false,
    },
    {
      name: "Documentation",
      href: "#",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      onClick: null,
      isActive: false,
      hasExternalIcon: true,
    },
  ];

  return (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative`}>
      {/* Sidebar Toggle Button - Top Right */}
      <div className="absolute -right-3 top-6 z-10">
        <button
          onClick={toggleSidebar}
          className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 shadow-sm transition-all duration-200"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <svg 
            className="w-3 h-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {sidebarCollapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      {/* Top Section - Navigation Links */}
      <div className="flex-1 p-6">
        {/* Company Header */}
        <div className={`mb-6 pb-4 border-b border-gray-200 ${sidebarCollapsed ? 'text-center' : ''}`}>
          {sidebarCollapsed ? (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          ) : (
            <h1 className="text-xl font-bold text-gray-900">Dandi AI</h1>
          )}
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button 
              key={item.name}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.isActive 
                  ? 'text-gray-900 font-semibold bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.name : ""}
            >
              <svg className={`w-5 h-5 ${item.isActive ? 'text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {!sidebarCollapsed && <span>{item.name}</span>}
              {!sidebarCollapsed && item.hasExternalIcon && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Bottom Section - User Profile */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">A</span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1">
              <div className="text-gray-900 font-medium">Aditya V.V.S.</div>
            </div>
          )}
          {!sidebarCollapsed && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
