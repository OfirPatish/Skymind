import { NextRequest, NextResponse } from "next/server";
import { API } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("latitude");
  const lon = request.nextUrl.searchParams.get("longitude");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
  }

  const parsedLat = parseFloat(lat);
  const parsedLon = parseFloat(lon);
  if (isNaN(parsedLat) || isNaN(parsedLon)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: "us_aqi",
    forecast_days: "1",
  });

  try {
    const res = await fetch(`${API.AIR_QUALITY}?${params}`);
    if (!res.ok) return NextResponse.json(null, { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
