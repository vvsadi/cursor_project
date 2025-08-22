import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(_req, { params }) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      console.log("Supabase not configured for GET request");
      return NextResponse.json({ message: "API not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("id,name,value,created_at,updated_at")
      .eq("id", params.id)
      .maybeSingle();

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({
      id: data.id,
      name: data.name,
      value: data.value,
      createdAt: data.created_at,
      updatedAt: data.updated_at ?? data.created_at,
    });
  } catch (error) {
    console.error("GET API key error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const updates = { updated_at: new Date().toISOString() };
    if (typeof body?.name === "string") updates.name = body.name;
    if (typeof body?.value === "string") updates.value = body.value;

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      console.log("Supabase not configured for PUT request");
      return NextResponse.json({ message: "API not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .update(updates)
      .eq("id", params.id)
      .select("id,name,value,created_at,updated_at")
      .single();

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({
      id: data.id,
      name: data.name,
      value: data.value,
      createdAt: data.created_at,
      updatedAt: data.updated_at ?? data.created_at,
    });
  } catch (error) {
    console.error("PUT API key error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      console.log("Supabase not configured for DELETE request");
      return NextResponse.json({ message: "API not configured" }, { status: 503 });
    }

    const { error, count } = await supabase
      .from("api_keys")
      .delete({ count: "exact" })
      .eq("id", params.id);

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    if (!count) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE API key error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}