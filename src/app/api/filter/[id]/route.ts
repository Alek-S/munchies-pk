import { NextResponse } from "next/server";
import NodeCache from 'node-cache';
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import {ResponseBody} from "@/types/api";

const filterByIdCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      errorResponseBody('filter ID missing'),
      { status: 400 }
    );
  }

  const cacheKey = `filter-${id}`;
  let respData = {};
  const cachedData = filterByIdCache.get(cacheKey);


  if (cachedData) {
    console.log(`[filter ${id}] Cache hit`);
    respData = cachedData;
  } else {
    console.log(`[filter ${id}] Cache miss`);
    const response = await fetch(`${API_URL}/filter/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          errorResponseBody('filter not found'),
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          errorResponseBody('error fetching filter'),
          { status: 500 }
        );
      }
    }

    respData = await response.json();
    filterByIdCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };
  return NextResponse.json(responseBody, {status: 200})
}
