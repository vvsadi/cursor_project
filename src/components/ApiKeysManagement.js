/**
 * API KEYS MANAGEMENT COMPONENT
 * 
 * PURPOSE:
 * This component serves as the main orchestrator for API keys management, combining the form
 * and table components into a unified interface. It's the central hub for all API key operations.
 * 
 * FUNCTIONALITY:
 * - Combines form and table components for complete CRUD operations
 * - Manages form visibility toggle
 * - Displays error messages from API operations
 * - Provides header with description and add key button
 * - Coordinates between different child components
 * 
 * CONNECTIONS:
 * - Used by: Dashboard page (/dashboards)
 * - Imports: ApiKeysForm and ApiKeysTable components
 * - Receives all necessary props from parent dashboard component
 * - Acts as intermediary between parent state and child components
 * 
 * COMPONENT COMPOSITION:
 * - Header section with title, description, and toggle button
 * - ApiKeysForm component for creating/editing keys
 * - Error display section
 * - ApiKeysTable component for displaying existing keys
 * 
 * PROPS INTERFACE:
 * - apiKeys: Array of API key objects
 * - loading: Boolean for loading state
 * - error: String for error messages
 * - form: Object for form state
 * - setForm: Function to update form state
 * - editingId: String/null for edit mode
 * - showForm: Boolean for form visibility
 * - revealedIds: Object for key reveal state
 * - Various handler functions for user actions
 * 
 * STATE COORDINATION:
 * - Form visibility state management
 * - Error display coordination
 * - Data flow between form and table
 * - Action handler distribution
 * 
 * USER INTERACTIONS:
 * - Toggle form visibility
 * - Submit form data
 * - Cancel form operations
 * - Manage individual keys
 * - Handle errors gracefully
 * 
 * STYLING:
 * - Consistent with overall dashboard design
 * - Responsive layout with proper spacing
 * - Card-based design with borders and shadows
 * - Proper visual hierarchy
 * 
 * FUTURE ENHANCEMENTS:
 * - Advanced filtering options
 * - Bulk operations interface
 * - Search functionality
 * - Export/import capabilities
 */

import ApiKeysForm from "./ApiKeysForm";
import ApiKeysTable from "./ApiKeysTable";

export default function ApiKeysManagement({
  apiKeys,
  loading,
  error,
  form,
  setForm,
  editingId,
  showForm,
  revealedIds,
  onToggleForm,
  onSubmit,
  onCancel,
  onToggleReveal,
  onStartEdit,
  onDelete,
  onCopy
}) {
  return (
    <div className="mt-8 rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-neutral-900 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/[.06] dark:border-white/[.08]">
        <div>
          <h2 className="text-lg font-semibold">API Keys</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Use a key to authenticate your requests.
          </p>
        </div>
        <button
          className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background font-medium text-sm h-10 px-4"
          onClick={onToggleForm}
        >
          {showForm ? "Close" : "+ Add Key"}
        </button>
      </div>

      <ApiKeysForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        showForm={showForm}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />

      {error && (
        <div className="px-6 py-3 text-red-600">{error}</div>
      )}

      <ApiKeysTable
        apiKeys={apiKeys}
        loading={loading}
        revealedIds={revealedIds}
        onToggleReveal={onToggleReveal}
        onStartEdit={onStartEdit}
        onDelete={onDelete}
        onCopy={onCopy}
      />
    </div>
  );
}
