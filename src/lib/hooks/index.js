/**
 * HOOKS INDEX FILE
 * 
 * PURPOSE:
 * This file serves as a central export point for all custom React hooks in the application.
 * It provides a clean, organized way to import hooks and maintains consistency across
 * the codebase.
 * 
 * FUNCTIONALITY:
 * - Centralizes all custom hook exports
 * - Provides clean import statements
 * - Maintains hook organization
 * - Enables easy refactoring and maintenance
 * 
 * CONNECTIONS:
 * - Used by: Home page (/) and Dashboard page (/dashboards)
 * - Exports all custom hooks from the hooks directory
 * - Part of the application's module system
 * - Enables clean import statements like: import { useApiKeys } from '../lib/hooks'
 * 
 * EXPORTED HOOKS:
 * - useApiKeys: Manages all API key related state and operations
 * - useSidebar: Manages sidebar collapsed/expanded state
 * 
 * HOOK DESCRIPTIONS:
 * - useApiKeys: Comprehensive state management for API keys CRUD operations
 * - useSidebar: Simple boolean state management for sidebar visibility
 * 
 * IMPORT PATTERNS:
 * - Named exports for all hooks
 * - Consistent naming conventions
 * - Easy to extend with new hooks
 * - Maintains backward compatibility
 * 
 * BENEFITS:
 * - Single import source for custom hooks
 * - Easier dependency management
 * - Cleaner import statements
 * - Better code organization
 * - Centralized hook documentation
 * 
 * USAGE EXAMPLE:
 * import { useApiKeys, useSidebar } from '../lib/hooks';
 * 
 * MAINTENANCE:
 * - Add new hooks here when created
 * - Keep exports organized alphabetically
 * - Ensure all hooks are properly exported
 * - Update documentation when adding new hooks
 * - Maintain consistent hook naming conventions
 * 
 * HOOK DEVELOPMENT GUIDELINES:
 * - Use descriptive names starting with "use"
 * - Keep hooks focused on single responsibility
 * - Provide clear return values and documentation
 * - Handle errors gracefully
 * - Optimize for performance with useCallback/useMemo
 */

export { useApiKeys } from './useApiKeys';
export { useSidebar } from './useSidebar';
