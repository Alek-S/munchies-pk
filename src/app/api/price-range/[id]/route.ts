import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import {ResponseBody} from "@/types/api";

const priceByIdCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      errorResponseBody('price ID (price_range_id) missing'),
      { status: 400 }
    );
  }

  const cacheKey = `price-${id}`;
  let respData = {};
  const cachedData = priceByIdCache.get(cacheKey);


  if (cachedData) {
    console.log(`[price ${id}] Cache hit`);
    respData = cachedData;
  } else {
    console.log(`[price ${id}] Cache miss`);
    const response = await fetch(`${API_URL}/price-range/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          errorResponseBody('price range not found'),
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          errorResponseBody('error fetching price range for provided id (check using price_range_id and not restaurant_id)'),
          { status: 500 }
        );
      }
    }

    respData = await response.json();
    priceByIdCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };
  return NextResponse.json(responseBody, {status: 200})
}
