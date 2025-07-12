import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import {ResponseBody} from "@/types/api";

const openByIdCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      errorResponseBody('restaurant ID missing'),
      { status: 400 }
    );
  }

  const cacheKey = `open-${id}`;
  let respData = {};
  const cachedData = openByIdCache.get(cacheKey);


  if (cachedData) {
    console.log(`[open - restaurant ${id}] Cache hit`);
    respData = cachedData;
  } else {
    console.log(`[open - restaurant ${id}] Cache miss`);
    const response = await fetch(`${API_URL}/open/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          errorResponseBody('Restaurant not found'),
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          errorResponseBody('error fetching open status of restaurant'),
          { status: 500 }
        );
      }
    }

    respData = await response.json();
    openByIdCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };
  return NextResponse.json(responseBody, {status: 200})
}
