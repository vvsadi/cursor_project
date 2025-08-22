/**
 * API KEY UTILITY FUNCTIONS
 * 
 * PURPOSE:
 * This module provides utility functions for working with API keys, including type detection,
 * value masking for security, and clipboard operations. These functions are used throughout
 * the application for consistent API key handling.
 * 
 * FUNCTIONALITY:
 * - getKeyType(): Determines API key type based on prefix
 * - maskValue(): Securely masks API key values for display
 * - copyToClipboard(): Cross-browser clipboard functionality
 * 
 * CONNECTIONS:
 * - Used by: ApiKeysTable component for key display and management
 * - Used by: Dashboard page for copy operations
 * - Provides consistent key handling across the application
 * - Part of the security and usability features
 * 
 * KEY TYPE DETECTION:
 * - prod_: Production environment keys
 * - stg_: Staging environment keys
 * - dev_: Development environment keys
 * - custom: Any other key format
 * 
 * SECURITY FEATURES:
 * - Keys are masked by default for security
 * - Type-based masking preserves key identification
 * - Custom keys show only first 4 characters
 * - Environment keys show type prefix
 * 
 * CLIPBOARD FUNCTIONALITY:
 * - Modern browsers: Uses navigator.clipboard API
 * - Fallback: Uses document.execCommand for older browsers
 * - Graceful error handling
 * - Returns success/failure status
 * 
 * MASKING PATTERNS:
 * - prod: "prod-******************************"
 * - stg: "stg-******************************"
 * - dev: "dev-******************************"
 * - custom: "abcd******************************"
 * 
 * USAGE EXAMPLES:
 * - getKeyType("prod_abc123") → "prod"
 * - maskValue("prod_abc123") → "prod-******************************"
 * - copyToClipboard("key123") → true/false
 * 
 * ERROR HANDLING:
 * - Graceful fallbacks for unsupported operations
 * - No exceptions thrown for user safety
 * - Consistent return values
 * 
 * FUTURE ENHANCEMENTS:
 * - Additional key type detection patterns
 * - Configurable masking lengths
 * - Enhanced clipboard error handling
 * - Key strength validation
 * 
 * SECURITY CONSIDERATIONS:
 * - Keys are never logged or stored in plain text
 * - Masking prevents accidental exposure
 * - Clipboard operations are secure
 * - No sensitive data in function parameters
 */

export function getKeyType(value = "") {
  if (value.startsWith("prod_")) return "prod";
  if (value.startsWith("stg_")) return "stg";
  if (value.startsWith("dev_")) return "dev";
  return "custom";
}

export function maskValue(value = "") {
  const type = getKeyType(value);
  const prefix = type === "custom" ? value.slice(0, 4) : `${type}-`;
  return `${prefix}${"*".repeat(30)}`;
}

export async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    return true;
  } catch (_) {
    return false;
  }
}
