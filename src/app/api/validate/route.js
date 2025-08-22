/**
 * API KEY VALIDATION ENDPOINT
 * 
 * PURPOSE:
 * This endpoint validates API keys submitted from the API Playground.
 * It checks if the provided API key exists in the database and is valid.
 * 
 * FUNCTIONALITY:
 * - Accepts POST requests with API key in request body
 * - Validates API key against database records
 * - Returns success/error responses based on validation
 * - Implements proper database validation
 * 
 * CONNECTIONS:
 * - Called by: API Playground page (/api-playground)
 * - Validates API keys against Supabase database
 * - Part of the API key validation system
 * 
 * SECURITY:
 * - Validates API key against actual database records
 * - Returns appropriate HTTP status codes
 * - Implements proper error handling
 */

import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    // Basic validation - check if API key exists and has proper format
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Invalid API key format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const trimmedApiKey = apiKey.trim();
    
    // Get Supabase client
    const supabase = getSupabaseServerClient();
    
    if (!supabase) {
      console.log("Supabase not configured, using fallback validation");
      // Fallback to pattern validation if Supabase is not configured
      const isValidApiKey = validateApiKeyPattern(trimmedApiKey);
      
      if (isValidApiKey) {
        return new Response(JSON.stringify({ 
          message: 'Valid API Key, /protected can be accessed',
          status: 'success'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ 
          error: 'Invalid API Key',
          status: 'error'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Query the database to check if the API key exists
    console.log("Checking API key against database:", trimmedApiKey.substring(0, 10) + "...");
    
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, value")
      .eq("value", trimmedApiKey)
      .maybeSingle();

    if (error) {
      console.error("Database query error:", error);
      return new Response(JSON.stringify({ 
        error: 'Database error occurred',
        status: 'error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (data && data.value === trimmedApiKey) {
      console.log("API key validated successfully:", data.name);
      return new Response(JSON.stringify({ 
        message: 'Valid API Key, /protected can be accessed',
        status: 'success',
        keyName: data.name
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log("API key not found in database");
      return new Response(JSON.stringify({ 
        error: 'Invalid API Key',
        status: 'error'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Validation error:", error);
    return new Response(JSON.stringify({ 
      error: 'Invalid request format',
      status: 'error'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Fallback API Key validation function for when database is not available
 * 
 * This is a simplified validation function for demonstration purposes.
 * In a real application, you would implement proper validation logic:
 * - Check against database of valid API keys
 * - Verify API key format and structure
 * - Check expiration dates
 * - Validate permissions and rate limits
 * 
 * @param {string} apiKey - The API key to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateApiKeyPattern(apiKey) {
  // Example validation patterns - replace with your actual logic
  
  // Pattern 1: Check if it's a valid UUID format
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  // Pattern 2: Check if it's a valid API key format (e.g., starts with 'sk-' and has sufficient length)
  const apiKeyPattern = /^sk-[a-zA-Z0-9]{32,}$/;
  
  // Pattern 3: Check if it's a valid JWT token format
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  
  // For demo purposes, accept any of these patterns
  // In production, implement your specific validation logic
  return uuidPattern.test(apiKey) || 
         apiKeyPattern.test(apiKey) || 
         jwtPattern.test(apiKey) ||
         // Accept any API key that's at least 20 characters long for demo
         (apiKey.length >= 20 && /^[a-zA-Z0-9-_]+$/.test(apiKey));
}

// Handle other HTTP methods
export async function GET() {
  return new Response(JSON.stringify({ 
    error: 'Method not allowed' 
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT() {
  return new Response(JSON.stringify({ 
    error: 'Method not allowed' 
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ 
    error: 'Method not allowed' 
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}
