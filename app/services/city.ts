import { City } from "app/types";
import { ServiceResult } from "@typess/index";

async function fetchCities(): Promise<City[]> {
  const res = await fetch("https://iran-locations-api.ir/api/v1/fa/cities", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("خطا در دریافت لیست شهرها");
  }

  return res.json();
}

export async function getCities(): Promise<ServiceResult<City[]>> {
  try {
    const cities = await fetchCities();

    return {
      data: cities,
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      error:
        err instanceof Error
          ? err.message
          : "خطا در دریافت لیست شهرها",
    };
  }
}
