/**
 * API KEYS FORM COMPONENT
 * 
 * PURPOSE:
 * This component provides a form interface for creating new API keys and editing existing ones.
 * It handles both creation and update modes based on the editingId prop.
 * 
 * FUNCTIONALITY:
 * - Creates new API keys with name and value fields
 * - Edits existing API keys by pre-filling form data
 * - Validates required fields before submission
 * - Shows different button text based on mode (Create/Update)
 * - Includes cancel button when editing
 * 
 * CONNECTIONS:
 * - Used by: ApiKeysManagement component
 * - Receives props: form state, handlers, and mode indicators
 * - Integrates with the main API keys management system
 * - Part of the CRUD operations for API keys
 * 
 * FORM FIELDS:
 * - Name: Human-readable identifier for the API key
 * - Value: The actual API key string (should be secure)
 * 
 * OPERATION MODES:
 * - Create Mode: editingId is null, shows "Create Key" button
 * - Edit Mode: editingId has value, shows "Update Key" and "Cancel" buttons
 * 
 * PROPS INTERFACE:
 * - form: Object containing { name, value } for form data
 * - setForm: Function to update form state
 * - editingId: String/null indicating edit mode
 * - showForm: Boolean controlling form visibility
 * - loading: Boolean for loading state
 * - onSubmit: Function to handle form submission
 * - onCancel: Function to handle edit cancellation
 * 
 * STYLING:
 * - Responsive grid layout (1 column on mobile, 3 on desktop)
 * - Consistent with overall application design
 * - Form validation styling
 * - Loading state indicators
 * 
 * VALIDATION:
 * - Both name and value fields are required
 * - Form won't submit without valid data
 * - Error handling managed by parent component
 * 
 * FUTURE ENHANCEMENTS:
 * - Field validation with error messages
 * - Auto-generation of secure API keys
 * - Key strength indicators
 * - Duplicate name checking
 */

export default function ApiKeysForm({ 
  form, 
  setForm, 
  editingId, 
  showForm, 
  loading, 
  onSubmit, 
  onCancel 
}) {
  if (!showForm) return null;

  return (
    <form onSubmit={onSubmit} className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-black/[.06] dark:border-white/[.08]">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Name</label>
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Key name"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Value</label>
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-neutral-800"
          value={form.value}
          onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
          placeholder="Key value"
          required
        />
      </div>
      <div className="flex items-end gap-2">
        <button
          className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background font-medium text-sm h-10 px-4"
          type="submit"
          disabled={loading}
        >
          {editingId ? "Update Key" : "Create Key"}
        </button>
        {editingId && (
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4"
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
