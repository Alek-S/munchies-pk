import {ResponseBody} from "@/types/api";

export const API_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api';

/** TTL of 10 minutes in seconds */
export const TTL_TIME = 600;

export const errorResponseBody = (errorMsg: string): ResponseBody => {
  return {
    status: 'error',
    error: errorMsg,
    data: {}
  }
}