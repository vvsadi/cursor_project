/**
 * API PLAYGROUND PAGE COMPONENT
 * 
 * PURPOSE:
 * This page allows users to test their API keys by submitting them for validation.
 * It provides a form interface and handles the validation process.
 * 
 * FUNCTIONALITY:
 * - Form to input API key
 * - Validation submission to /protected endpoint
 * - Toast notifications for success/error feedback
 * - Responsive design with consistent styling
 * 
 * CONNECTIONS:
 * - Uses Sidebar component for navigation
 * - Uses useSidebar hook for sidebar state
 * - Uses Toast component for notifications
 * - Submits to /protected API endpoint
 * 
 * STYLING:
 * - Consistent with application theme
 * - Responsive design
 * - Form validation styling
 */

"use client";

import { useState } from "react";
import { useSidebar } from "../../lib/hooks";
import { Sidebar, Toast } from "../../components";

export default function ApiPlayground() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      if (response.ok) {
        // Navigate to protected page on success
        window.location.href = "/protected";
      } else {
        setToastType("error");
        setToastMessage("Invalid API Key");
        
        // Auto-hide toast after 3 seconds
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
      }
    } catch (error) {
      setToastType("error");
      setToastMessage("Invalid API Key");
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const closeToast = () => {
    setToastMessage("");
  };

  return (
    <div className="font-sans min-h-screen bg-[radial-gradient(80%_100%_at_70%_0%,rgba(67,56,202,0.15),rgba(0,0,0,0))] flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content */}
      <div className="flex-1">
        <div className="mx-auto max-w-4xl p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">API Playground</h1>
            <p className="text-gray-600">
              Test your API key to validate access to protected endpoints
            </p>
          </div>

          {/* API Key Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your API key will be validated against our secure endpoint
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !apiKey.trim()}
                className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                  isLoading || !apiKey.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isLoading ? "Validating..." : "Validate API Key"}
              </button>
            </form>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How it works</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  Enter your API key in the form above
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  Click "Validate API Key" to test access
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  Receive immediate feedback on validity
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  Valid keys gain access to protected endpoints
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={closeToast} 
      />
    </div>
  );
}
