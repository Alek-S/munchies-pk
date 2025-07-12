import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import {ResponseBody} from "@/types/api";

const restaurantByIdCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      errorResponseBody('restaurant ID missing'),
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
          errorResponseBody('Restaurant not found'),
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          errorResponseBody('error fetching restaurant'),
          { status: 500 }
        );
      }
    }

    respData = await response.json();
    restaurantByIdCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };
  return NextResponse.json(responseBody, {status: 200})
}
