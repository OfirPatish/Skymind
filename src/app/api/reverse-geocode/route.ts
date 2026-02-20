import { NextRequest, NextResponse } from "next/server";
import { API } from "@/lib/constants";

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  country?: string;
  country_code?: string;
};

type NominatimResponse = {
  address?: NominatimAddress;
};

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Missing lat or lon" },
      { status: 400 }
    );
  }

  const parsedLat = parseFloat(lat);
  const parsedLon = parseFloat(lon);
  if (isNaN(parsedLat) || isNaN(parsedLon)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  const rawLang =
    request.nextUrl.searchParams.get("lang") ??
    request.headers.get("accept-language")?.split(",")[0]?.trim() ??
    "en";
  const safeLang = /^[a-z]{2}(-[a-zA-Z0-9]+)?$/i.test(rawLang) ? rawLang : "en";

  const params = new URLSearchParams({
    lat: lat,
    lon: lon,
    format: "json",
    addressdetails: "1",
    "accept-language": safeLang,
  });

  try {
    const res = await fetch(`${API.NOMINATIM}?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Skymind-Weather/1.0 (https://github.com/skymind-weather)",
      },
    });

    if (!res.ok) return NextResponse.json(null, { status: 200 });

    const data = (await res.json()) as NominatimResponse;
    const addr = data?.address;
    if (!addr) return NextResponse.json(null, { status: 200 });

    const country = addr.country ?? "";
    const countryCode = (addr.country_code ?? "").toUpperCase();
    const admin1 = addr.state ?? addr.county ?? undefined;
    const name =
      addr.city ??
      addr.town ??
      addr.village ??
      addr.municipality ??
      addr.county ??
      "Current Location";

    return NextResponse.json({ name, country, countryCode, admin1 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
