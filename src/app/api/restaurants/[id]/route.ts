import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, TTL_TIME} from "@/utils/api";

const restaurantByIdCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { status: 'error', error: 'Restaurant ID is required', data: {} },
      { status: 400 }
    );
  }

  const cacheKey = `restaurant-${id}`;
  let respData = {};
  const cachedData = restaurantByIdCache.get(cacheKey);


  if (cachedData) {
    console.log(`[restaurant ${id}] Cache hit`);
    respData = cachedData;
  } else {
    console.log(`[restaurant ${id}] Cache miss`);
    const response = await fetch(`${API_URL}/restaurants/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { status: 'error', error: 'Restaurant not found', data: {} },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { status: 'error', error: 'Error fetching restaurant by id', data: {} },
          { status: 500 }
        );
      }
    }

    respData = await response.json();
    restaurantByIdCache.set(cacheKey, respData);

    return NextResponse.json(
      { status: 'error', error: 'Error fetching restaurant', data: {} },
      { status: 500 }
    );

  }

  return NextResponse.json(
    { status: 'success', error: '', data: respData },
    { status: 200 }
  );
}
