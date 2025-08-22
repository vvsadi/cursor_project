/**
 * COMPONENTS INDEX FILE
 * 
 * PURPOSE:
 * This file serves as a central export point for all UI components in the application.
 * It provides a clean, organized way to import components and maintains consistency
 * across the codebase.
 * 
 * FUNCTIONALITY:
 * - Centralizes all component exports
 * - Provides clean import statements
 * - Maintains component organization
 * - Enables easy refactoring and maintenance
 * 
 * CONNECTIONS:
 * - Used by: Home page (/) and Dashboard page (/dashboards)
 * - Exports all components from the components directory
 * - Part of the application's module system
 * - Enables clean import statements like: import { Sidebar } from '../components'
 * 
 * EXPORTED COMPONENTS:
 * - Sidebar: Main navigation component
 * - DashboardHeader: Dashboard plan and usage display
 * - Toast: Notification system component
 * - ApiKeysForm: Form for creating/editing API keys
 * - ApiKeysTable: Table display for API keys
 * - ApiKeysManagement: Main orchestrator component
 * 
 * IMPORT PATTERNS:
 * - Named exports for all components
 * - Consistent naming conventions
 * - Easy to extend with new components
 * - Maintains backward compatibility
 * 
 * BENEFITS:
 * - Single import source for components
 * - Easier dependency management
 * - Cleaner import statements
 * - Better code organization
 * 
 * USAGE EXAMPLE:
 * import { Sidebar, DashboardHeader, Toast } from '../components';
 * 
 * MAINTENANCE:
 * - Add new components here when created
 * - Keep exports organized alphabetically
 * - Ensure all components are properly exported
 * - Update documentation when adding new components
 */

export { default as Sidebar } from './Sidebar';
export { default as DashboardHeader } from './DashboardHeader';
export { default as Toast } from './Toast';
export { default as ApiKeysForm } from './ApiKeysForm';
export { default as ApiKeysTable } from './ApiKeysTable';
export { default as ApiKeysManagement } from './ApiKeysManagement';
