/**
 * TOAST NOTIFICATION COMPONENT
 * 
 * PURPOSE:
 * This component displays temporary notification messages to users, providing feedback for
 * their actions such as successful operations or errors.
 * 
 * FUNCTIONALITY:
 * - Shows success and error messages with appropriate styling
 * - Automatically positioned in the top-right corner
 * - Uses different colors for different message types
 * - Includes relevant icons for visual clarity
 * - Handles null/empty messages gracefully
 * 
 * CONNECTIONS:
 * - Used by: Dashboard page (/dashboards)
 * - Receives props: message (string), type (string), onClose (function)
 * - Displays notifications triggered by API operations
 * - Part of the global notification system
 * 
 * MESSAGE TYPES:
 * - "success" - Green background with checkmark icon
 * - "delete" - Red background with trash icon
 * - Other types will default to success styling
 * 
 * PROPS INTERFACE:
 * - message: String to display (if null/empty, component doesn't render)
 * - type: String indicating message type ("success" or "delete")
 * - onClose: Function to handle closing the toast (currently unused)
 * 
 * STYLING:
 * - Fixed positioning in top-right corner
 * - Smooth transitions and animations
 * - Color-coded backgrounds for different types
 * - Shadow effects for visual prominence
 * - Responsive text sizing
 * 
 * USAGE EXAMPLES:
 * - Success: "API key created successfully"
 * - Delete: "API key deleted"
 * - Error: "Failed to create API key"
 * 
 * FUTURE ENHANCEMENTS:
 * - Auto-dismiss functionality
 * - Multiple toast support
 * - Click to dismiss
 * - Toast queuing system
 */

export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  console.log("Toast component rendering with:", { message, type });

  const getToastStyles = () => {
    switch (type) {
      case "delete":
      case "error":
        return "bg-red-600";
      case "success":
        return "bg-green-600";
      default:
        return "bg-green-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "delete":
      case "error":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        );
      case "success":
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        );
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-[9999] text-white px-6 py-3 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out ${getToastStyles()} border-2 border-white/20`}>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {getIcon()}
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
