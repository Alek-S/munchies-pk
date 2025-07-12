import {NextResponse} from "next/server";
import {API_URL, errorResponseBody, TTL_TIME} from "@/utils/api";
import NodeCache from "node-cache";
import {ResponseBody} from "@/types/api";

const allFiltersCache = new NodeCache({ stdTTL: TTL_TIME });

export async function GET() {
  const cacheKey = 'all-filters';
  const cachedData = allFiltersCache.get(cacheKey);
  let respData = {};

  if (cachedData) {
    console.log('[all filters] Cache hit');
    respData = cachedData
  } else {
    console.log('[all filters] Cache miss');
    const response = await fetch(`${API_URL}/filter`)

    if (!response.ok) {
      return NextResponse.json(errorResponseBody('error fetching filters'), {status: 500})
    }

    respData = await response.json();
    allFiltersCache.set(cacheKey, respData);
  }

  const responseBody: ResponseBody = {
    status: 'success',
    error: '',
    data: respData
  };
  return NextResponse.json(responseBody, {status: 200})
}
