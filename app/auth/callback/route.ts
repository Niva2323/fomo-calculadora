import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  if (!getSupabaseConfig()) {
    return NextResponse.redirect(new URL("/login?notice=setup", requestUrl.origin));
  }

  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL("/cuenta", requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/login?error=google", requestUrl.origin));
}