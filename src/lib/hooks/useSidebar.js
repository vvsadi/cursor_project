/**
 * USE SIDEBAR HOOK
 * 
 * PURPOSE:
 * This custom hook manages the sidebar collapsed/expanded state across the application.
 * It provides a simple way to control sidebar visibility and maintain state consistency.
 * 
 * FUNCTIONALITY:
 * - Manages sidebar collapsed state (true/false)
 * - Provides toggle function to switch between states
 * - Maintains state across component re-renders
 * - Simple boolean state management
 * 
 * CONNECTIONS:
 * - Used by: Home page (/) and Dashboard page (/dashboards)
 * - Provides state to: Sidebar component
 * - Ensures consistent sidebar behavior across pages
 * - Part of the global navigation system
 * 
 * STATE MANAGEMENT:
 * - sidebarCollapsed: Boolean indicating if sidebar is collapsed
 * - toggleSidebar: Function to toggle between collapsed/expanded
 * 
 * SIDEBAR BEHAVIOR:
 * - Expanded: Full width (w-64) with text labels visible
 * - Collapsed: Narrow width (w-16) with only icons visible
 * - Smooth transitions between states
 * - Responsive design considerations
 * 
 * USAGE PATTERN:
 * - Initialize with collapsed: false (expanded by default)
 * - Toggle state with toggleSidebar function
 * - Pass state to Sidebar component as props
 * 
 * BENEFITS:
 * - Centralized sidebar state management
 * - Consistent behavior across pages
 * - Easy to extend with additional sidebar features
 * - Prevents state duplication
 * 
 * FUTURE ENHANCEMENTS:
 * - Persist sidebar state in localStorage
 * - Add keyboard shortcuts for toggling
 * - Support for multiple sidebar configurations
 * - Animation customization options
 * 
 * RELATED COMPONENTS:
 * - Sidebar: Receives state and toggle function
 * - Home page: Uses hook for sidebar control
 * - Dashboard page: Uses hook for sidebar control
 */

import { useState } from "react";

export function useSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return {
    sidebarCollapsed,
    toggleSidebar,
  };
}
