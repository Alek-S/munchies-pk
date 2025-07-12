import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import {ResponseBody} from "@/types/api";

const allRestaurantsCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET() {
  const cacheKey = 'all-restaurants';
  const cachedData = allRestaurantsCache.get(cacheKey);
  let respData = {};

  if (cachedData) {
    console.log('[all restaurants] Cache hit');
    respData = cachedData
  } else {
    console.log('[all restaurants] Cache miss');
    const response = await fetch(`${API_URL}/restaurants`)

    if (!response.ok) {
      return NextResponse.json(errorResponseBody('error fetching restaurants'), {status: 500})
    }

    respData = await response.json();
    allRestaurantsCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };

  return NextResponse.json(responseBody, {status: 200})
}
