import { type NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const SERVICE_TOKEN = process.env.API_SERVICE_TOKEN ?? "";

type Params = { path: string[] };

async function proxyRequest(request: NextRequest, params: Params, method: string) {
  try {
    const path = params.path.join("/");
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();
    const targetUrl = `${API_BASE_URL}/api/public/${path}${query ? `?${query}` : ""}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (SERVICE_TOKEN) {
      headers["Authorization"] = `Bearer ${SERVICE_TOKEN}`;
    }

    let body: string | undefined;
    if (method === "POST") {
      body = await request.text();
    }

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return NextResponse.json({ detail: message }, { status: 502 });
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  return proxyRequest(request, await params, "GET");
}

export async function POST(request: NextRequest, { params }: { params: Promise<Params> }) {
  return proxyRequest(request, await params, "POST");
}
