/**
 * API KEYS TABLE COMPONENT
 * 
 * PURPOSE:
 * This component displays API keys in a tabular format with interactive features for
 * managing individual keys. It's the main display component for the API keys management system.
 * 
 * FUNCTIONALITY:
 * - Displays API keys in a responsive table layout
 * - Shows key information: name, type, usage, masked value
 * - Provides reveal/hide functionality for secure key viewing
 * - Includes copy to clipboard functionality
 * - Shows edit and delete actions for each key
 * - Handles loading and empty states
 * 
 * CONNECTIONS:
 * - Used by: ApiKeysManagement component
 * - Imports utility functions from ../lib/utils/ (getKeyType, maskValue, copyToClipboard)
 * - Receives props for data display and action handlers
 * - Part of the main API keys management interface
 * 
 * TABLE COLUMNS:
 * - Name: Key identifier with last updated timestamp
 * - Type: Key type badge (prod, stg, dev, custom)
 * - Usage: Current usage count (currently hardcoded to 0)
 * - Key: Masked key value with show/hide and copy buttons
 * - Options: Edit and delete action buttons
 * 
 * PROPS INTERFACE:
 * - apiKeys: Array of API key objects
 * - loading: Boolean for loading state
 * - revealedIds: Object tracking which keys are revealed
 * - onToggleReveal: Function to toggle key visibility
 * - onStartEdit: Function to initiate editing
 * - onDelete: Function to delete a key
 * - onCopy: Function to copy key to clipboard
 * 
 * SECURITY FEATURES:
 * - Keys are masked by default for security
 * - Reveal/hide functionality for temporary viewing
 * - Copy functionality for easy key usage
 * - Type detection based on key prefixes
 * 
 * RESPONSIVE DESIGN:
 * - Grid layout that adapts to screen size
 * - Mobile-friendly button arrangements
 * - Responsive column sizing
 * - Touch-friendly interactive elements
 * 
 * UTILITY INTEGRATION:
 * - getKeyType: Determines key type from prefix
 * - maskValue: Securely masks key values
 * - copyToClipboard: Handles clipboard operations
 * 
 * FUTURE ENHANCEMENTS:
 * - Real-time usage statistics
 * - Key expiration dates
 * - Bulk operations
 * - Advanced filtering and sorting
 */

import { getKeyType, maskValue, copyToClipboard } from "../lib/utils";

export default function ApiKeysTable({ 
  apiKeys, 
  loading, 
  revealedIds, 
  onToggleReveal, 
  onStartEdit, 
  onDelete,
  onCopy 
}) {
  if (loading) {
    return <div className="px-4 py-4 text-sm">Loading...</div>;
  }

  if (apiKeys.length === 0) {
    return <div className="px-4 py-4 text-sm">No keys yet</div>;
  }

  return (
    <div className="px-2 sm:px-6 py-2">
      <div className="hidden md:grid grid-cols-12 px-4 py-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        <div className="col-span-3">Name</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-1">Usage</div>
        <div className="col-span-4">Key</div>
        <div className="col-span-2 text-right">Options</div>
      </div>

      {apiKeys.map((key) => {
        const type = getKeyType(key.value);
        const revealed = !!revealedIds[key.id];
        
        return (
          <div key={key.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-2 px-4 py-3 border-t border-black/[.06] dark:border-white/[.08]">
            <div className="md:col-span-3">
              <div className="font-medium truncate" title={key.name}>{key.name}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Updated {new Date(key.updatedAt || key.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs border"
                data-type={type}
              >
                {type}
              </span>
            </div>
            <div className="md:col-span-1 text-sm">0</div>
            <div className="md:col-span-4">
              <div className="flex items-center gap-2">
                <input
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border rounded px-3 py-2 text-sm"
                  value={revealed ? key.value : maskValue(key.value)}
                  readOnly
                />
                <button
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-9 px-3"
                  onClick={() => onToggleReveal(key.id)}
                >
                  {revealed ? "Hide" : "Show"}
                </button>
                <button
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-9 px-3"
                  onClick={() => onCopy(key.value)}
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="md:col-span-2 flex md:justify-end gap-2">
              <button
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-9 px-3"
                onClick={() => onStartEdit(key)}
              >
                Edit
              </button>
              <button
                className="rounded-full border border-solid border-transparent transition-colors bg-red-600 text-white text-sm h-9 px-3"
                onClick={() => onDelete(key.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
