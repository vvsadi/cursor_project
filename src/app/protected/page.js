/**
 * PROTECTED PAGE COMPONENT
 * 
 * PURPOSE:
 * This is a protected page that users can access after successfully validating their API key.
 * It demonstrates access control and provides a copy functionality with toast notifications.
 * 
 * FUNCTIONALITY:
 * - Displays protected content message
 * - Copy button with clipboard functionality
 * - Toast notification for copy success
 * - Consistent sidebar navigation
 * 
 * CONNECTIONS:
 * - Uses Sidebar component for navigation
 * - Uses useSidebar hook for sidebar state
 * - Uses Toast component for copy notifications
 * - Accessible after API key validation
 * 
 * STYLING:
 * - Consistent with application theme
 * - Responsive design
 * - Clean, professional layout
 */

"use client";

import { useState } from "react";
import { useSidebar } from "../../lib/hooks";
import { Sidebar, Toast } from "../../components";

export default function ProtectedPage() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Debug logging for toast state changes
  console.log("ProtectedPage render - toastMessage:", toastMessage, "toastType:", toastType);

  const handleCopy = async () => {
    const textToCopy = "This is a protected page";
    console.log("Copy button clicked, attempting to copy:", textToCopy);
    
    try {
      // Try using the modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        console.log("Using modern clipboard API");
        await navigator.clipboard.writeText(textToCopy);
        console.log("Successfully copied with modern API");
        setToastType("success");
        setToastMessage("Copied to clipboard");
        console.log("Toast state set to:", "Copied to clipboard", "success");
      } else {
        console.log("Using fallback copy method");
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          console.log("Fallback copy result:", successful);
          if (successful) {
            setToastType("success");
            setToastMessage("Copied to clipboard");
            console.log("Toast state set to:", "Copied to clipboard", "success");
          } else {
            setToastType("error");
            setToastMessage("Failed to copy to clipboard");
            console.log("Toast state set to:", "Failed to copy to clipboard", "error");
          }
        } catch (err) {
          console.error("Fallback copy error:", err);
          setToastType("error");
          setToastMessage("Failed to copy to clipboard");
          console.log("Toast state set to:", "Failed to copy to clipboard", "error");
        }
        
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Copy error:", error);
      setToastType("error");
      setToastMessage("Failed to copy to clipboard");
      console.log("Toast state set to:", "Failed to copy to clipboard", "error");
    }
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage("");
      console.log("Toast auto-hidden");
    }, 3000);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Protected Page</h1>
            <p className="text-gray-600">
              You have successfully accessed this protected resource
            </p>
          </div>

          {/* Protected Content */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Access Granted
                </h2>
                <p className="text-gray-600">
                  Your API key has been validated successfully
                </p>
              </div>

              {/* Protected Message */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-lg text-gray-800 font-medium">
                  This is a protected page
                </p>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Message
              </button>

              {/* Test Toast Button */}
              <button
                onClick={() => {
                  console.log("Test button clicked");
                  setToastType("success");
                  setToastMessage("Test toast - this should work!");
                  setTimeout(() => setToastMessage(""), 3000);
                }}
                className="ml-4 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform"
              >
                Test Toast
              </button>

              {/* Simple Test Button */}
              <button
                onClick={() => {
                  console.log("Simple test clicked");
                  setToastMessage("Simple test message");
                  setToastType("success");
                }}
                className="ml-4 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform"
              >
                Simple Test
              </button>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">What this means</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Your API key has been verified and is valid
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    You now have access to protected resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    Use the copy button above to copy the protected message
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage("")} 
      />
      
      {/* Debug info - remove this after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded text-xs z-50">
          Toast State: {toastMessage ? `"${toastMessage}" (${toastType})` : 'No message'}
        </div>
      )}
    </div>
  );
}
