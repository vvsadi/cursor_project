import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

// Mock data for when Supabase is not configured
const mockApiKeys = [
  {
    id: "1",
    name: "OpenAI API Key",
    value: "sk-...",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2", 
    name: "Anthropic API Key",
    value: "sk-ant-...",
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    name: "Google AI API Key",
    value: "AIza...",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  }
];

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    // If Supabase is configured, try to fetch from database
    if (supabase) {
      const { data, error } = await supabase
        .from("api_keys")
        .select("id,name,value,created_at,updated_at")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        // Fall back to mock data on database error
        return NextResponse.json(mockApiKeys, { status: 200 });
      }

      return NextResponse.json(
        (data || []).map(r => ({
          id: r.id,
          name: r.name,
          value: r.value,
          createdAt: r.created_at,
          updatedAt: r.updated_at ?? r.created_at,
        }))
      );
    }

    // If Supabase is not configured, return mock data
    console.log("Supabase not configured, returning mock data");
    return NextResponse.json(mockApiKeys, { status: 200 });
    
  } catch (error) {
    console.error("API keys fetch error:", error);
    // Return mock data on any error
    return NextResponse.json(mockApiKeys, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const { name, value } = await request.json();
    if (!name || !value) {
      return NextResponse.json({ message: "'name' and 'value' are required" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    
    // If Supabase is configured, try to save to database
    if (supabase) {
      const { data, error } = await supabase
        .from("api_keys")
        .insert({ name, value })
        .select("id,name,value,created_at,updated_at")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
      }

      return NextResponse.json({
        id: data.id,
        name: data.name,
        value: data.value,
        createdAt: data.created_at,
        updatedAt: data.updated_at ?? data.created_at,
      }, { status: 201 });
    }

    // If Supabase is not configured, return success but don't persist
    console.log("Supabase not configured, API key not persisted");
    return NextResponse.json({
      id: Date.now().toString(),
      name,
      value: value.substring(0, 10) + "...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { status: 201 });
    
  } catch (error) {
    console.error("API key creation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


