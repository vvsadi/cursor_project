/**
 * USE API KEYS HOOK
 * 
 * PURPOSE:
 * This custom hook manages all state and operations related to API keys management.
 * It provides a centralized way to handle CRUD operations, form state, and user interactions.
 * 
 * FUNCTIONALITY:
 * - Manages API keys data fetching and state
 * - Handles CRUD operations (Create, Read, Update, Delete)
 * - Manages form state for creating/editing keys
 * - Controls loading states and error handling
 * - Manages toast notifications for user feedback
 * - Handles key reveal/hide functionality
 * 
 * CONNECTIONS:
 * - Used by: Dashboard page (/dashboards)
 * - Integrates with: /api/keys endpoints for data operations
 * - Provides state and handlers to: ApiKeysManagement component
 * - Manages all API key related business logic
 * 
 * STATE MANAGEMENT:
 * - apiKeys: Array of all API keys
 * - loading: Boolean for loading states
 * - error: String for error messages
 * - form: Object for form data { name, value }
 * - editingId: String/null for edit mode
 * - showForm: Boolean for form visibility
 * - revealedIds: Object tracking revealed keys
 * - toastMessage: String for notifications
 * - toastType: String for notification styling
 * 
 * API OPERATIONS:
 * - refresh(): Fetches all API keys from /api/keys
 * - handleSubmit(): Creates or updates keys via POST/PUT
 * - handleDelete(): Deletes keys via DELETE /api/keys/[id]
 * - All operations include proper error handling
 * 
 * FORM OPERATIONS:
 * - startEdit(): Prepares form for editing existing key
 * - cancelEdit(): Resets form and exits edit mode
 * - toggleReveal(): Shows/hides individual key values
 * - Form state management with validation
 * 
 * TOAST NOTIFICATIONS:
 * - Success messages for create operations
 * - Delete confirmations
 * - Error messages for failed operations
 * - Auto-dismiss after 2 seconds
 * 
 * SECURITY FEATURES:
 * - Keys are masked by default
 * - Reveal functionality for temporary viewing
 * - Secure API communication
 * 
 * ERROR HANDLING:
 * - Network error handling
 * - API error response handling
 * - User-friendly error messages
 * - Graceful fallbacks
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - useCallback for stable function references
 * - Prevents unnecessary re-renders
 * - Efficient state updates
 * 
 * FUTURE ENHANCEMENTS:
 * - Real-time updates with WebSocket
 * - Offline support with local storage
 * - Advanced caching strategies
 * - Rate limiting and throttling
 */

import { useState, useCallback, useEffect } from "react";

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", value: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [revealedIds, setRevealedIds] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/keys", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load");
      setApiKeys(data);
    } catch (e) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data when hook is first used
  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    const created = !editingId;
    try {
      if (editingId) {
        const res = await fetch(`/api/keys/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to update");
      } else {
        const res = await fetch("/api/keys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to create");
      }
      setForm({ name: "", value: "" });
      setEditingId(null);
      setShowForm(false);
      await refresh();

      if (created) {
        setToastMessage("API key created");
        setToastType("success");
        setTimeout(() => setToastMessage(""), 2000);
      }
    } catch (e) {
      setError(e.message || "Unexpected error");
    }
  }, [editingId, form, refresh]);

  const handleDelete = useCallback(async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete");
      await refresh();

      setToastMessage("API key deleted");
      setToastType("delete");
      setTimeout(() => setToastMessage(""), 2000);
    } catch (e) {
      setError(e.message || "Unexpected error");
    }
  }, [refresh]);

  const startEdit = useCallback((key) => {
    setEditingId(key.id);
    setForm({ name: key.name, value: key.value });
    setShowForm(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setForm({ name: "", value: "" });
    setShowForm(false);
  }, []);

  const toggleReveal = useCallback((id) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage("");
  }, []);

  return {
    // State
    apiKeys,
    loading,
    error,
    form,
    editingId,
    showForm,
    revealedIds,
    toastMessage,
    toastType,
    
    // Actions
    refresh,
    handleSubmit,
    handleDelete,
    startEdit,
    cancelEdit,
    toggleReveal,
    clearToast,
    
    // Setters
    setForm,
    setShowForm,
    setError,
  };
}
