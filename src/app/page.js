/**
 * HOME PAGE COMPONENT
 * 
 * PURPOSE:
 * This is the main landing page for the Dandi AI application. It serves as the entry point
 * for users and provides an overview of the platform's capabilities.
 * 
 * FUNCTIONALITY:
 * - Displays a hero section with welcome message and call-to-action buttons
 * - Shows feature cards highlighting key platform capabilities
 * - Provides quick action buttons for common tasks
 * - Includes the same sidebar navigation as the dashboard for consistency
 * 
 * CONNECTIONS:
 * - Uses Sidebar component from ../components/Sidebar
 * - Uses useSidebar hook from ../lib/hooks/useSidebar
 * - Routes to /dashboards for API key management
 * - Part of the main app routing structure
 * 
 * STYLING:
 * - Uses the same color scheme and design patterns as the dashboard
 * - Responsive design with mobile-first approach
 * - Consistent with the overall application theme
 * 
 * ROUTING:
 * - Accessible at the root path "/"
 * - Links to /dashboards for full functionality
 */

"use client";

import { useCallback } from "react";
import { useSidebar } from "../lib/hooks";
import { Sidebar } from "../components";
import Image from "next/image";

export default function Home() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  const handleGetStarted = useCallback(() => {
    // This could navigate to a getting started page or show a modal
    console.log("Get Started clicked");
  }, []);

  const handleViewDocs = useCallback(() => {
    window.open("https://nextjs.org/docs", "_blank");
  }, []);

  const handleOpenDashboard = useCallback(() => {
    window.location.href = "/dashboards";
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[radial-gradient(80%_100%_at_70%_0%,rgba(67,56,202,0.15),rgba(0,0,0,0))] flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content */}
      <div className="flex-1">
        <div className="mx-auto max-w-6xl p-6">
          {/* Hero Section */}
          <div className="rounded-2xl overflow-hidden shadow border border-white/10 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white mb-8">
            <div className="p-8 sm:p-10">
              <div className="text-center">
                <div className="mb-6">
        <Image
                    className="dark:invert mx-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                  Welcome to <span className="text-blue-400">Dandi AI</span>
                </h1>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                  Your comprehensive platform for managing API keys, exploring AI capabilities, and building intelligent applications.
                </p>
                <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
                  <button
                    onClick={handleGetStarted}
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:w-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started
                  </button>
                  <button
                    onClick={handleViewDocs}
                    className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:w-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* API Keys Management */}
            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-neutral-900 shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7 7m0 0a6 6 0 01-7-7m7 7v4m0 0v4m0-4h4m-4 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">API Keys Management</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Securely manage your API keys with advanced features like masking, reveal/hide, and usage tracking.
              </p>
              <button
                onClick={handleOpenDashboard}
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background font-medium text-sm h-10 px-4 w-full"
              >
                Manage Keys
              </button>
            </div>

            {/* AI Playground */}
            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-neutral-900 shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Playground</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Experiment with AI models, test prompts, and explore the capabilities of our advanced AI systems.
              </p>
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4 w-full">
                Coming Soon
              </button>
            </div>

            {/* Use Cases */}
            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-neutral-900 shadow-sm p-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Use Cases</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Discover real-world applications and examples of how AI can transform your business processes.
              </p>
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4 w-full">
                Coming Soon
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-white dark:bg-neutral-900 shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handleOpenDashboard}
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background font-medium text-sm h-10 px-4 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Dashboard
              </button>
              
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documentation
              </button>
              
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Billing
              </button>
              
              <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-sm h-10 px-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
