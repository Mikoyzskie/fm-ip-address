"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
interface LocationData {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}

interface AsData {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

interface Data {
  ip: string;
  location: LocationData;
  domains: string[];
  as: AsData;
  isp: string;
}

export async function ipSearch(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    ipAddress: z.string().min(1),
  });
  const parse = schema.safeParse({
    ipAddress: formData.get("ipAddress"),
  });

  if (!parse.success) {
    return { message: "invalid ip" };
  }

  const data = parse.data;

  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_cme4nGNshJDTm681IJPFZdA64XY5f&ipAddress=${data.ipAddress}`,
      {
        method: "GET",
      }
    );
    const results: Data = await res.json();

    if (!res.ok) return { message: "internal error" };

    revalidatePath("/");
    return { message: `Ip found`, result: results };
  } catch (e) {
    return { message: "ip not found" };
  }
}
