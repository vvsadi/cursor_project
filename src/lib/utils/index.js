/**
 * UTILS INDEX FILE
 * 
 * PURPOSE:
 * This file serves as a central export point for all utility functions in the application.
 * It provides a clean, organized way to import utility functions and maintains consistency
 * across the codebase.
 * 
 * FUNCTIONALITY:
 * - Centralizes all utility function exports
 * - Provides clean import statements
 * - Maintains utility organization
 * - Enables easy refactoring and maintenance
 * 
 * CONNECTIONS:
 * - Used by: ApiKeysTable component for key management
 * - Used by: Dashboard page for copy operations
 * - Exports all utility functions from the utils directory
 * - Part of the application's module system
 * - Enables clean import statements like: import { copyToClipboard } from '../lib/utils'
 * 
 * EXPORTED UTILITIES:
 * - getKeyType: Determines API key type from prefix
 * - maskValue: Securely masks API key values
 * - copyToClipboard: Cross-browser clipboard functionality
 * 
 * UTILITY DESCRIPTIONS:
 * - getKeyType: Identifies key environment (prod, stg, dev, custom)
 * - maskValue: Creates secure masked display of key values
 * - copyToClipboard: Safely copies text to system clipboard
 * 
 * IMPORT PATTERNS:
 * - Named exports for all utility functions
 * - Consistent naming conventions
 * - Easy to extend with new utilities
 * - Maintains backward compatibility
 * 
 * BENEFITS:
 * - Single import source for utility functions
 * - Easier dependency management
 * - Cleaner import statements
 * - Better code organization
 * - Centralized utility documentation
 * 
 * USAGE EXAMPLE:
 * import { getKeyType, maskValue, copyToClipboard } from '../lib/utils';
 * 
 * MAINTENANCE:
 * - Add new utilities here when created
 * - Keep exports organized alphabetically
 * - Ensure all utilities are properly exported
 * - Update documentation when adding new utilities
 * - Maintain consistent utility naming conventions
 * 
 * UTILITY DEVELOPMENT GUIDELINES:
 * - Use descriptive, action-oriented names
 * - Keep functions focused on single responsibility
 * - Provide clear parameter and return value documentation
 * - Handle errors gracefully with fallbacks
 * - Ensure functions are pure when possible
 * - Test utilities thoroughly for edge cases
 * 
 * SECURITY CONSIDERATIONS:
 * - Utilities handle sensitive data (API keys)
 * - No logging or storage of sensitive information
 * - Secure clipboard operations
 * - Input validation and sanitization
 */

export { getKeyType, maskValue, copyToClipboard } from './apiKeyUtils';
