export interface ResponseBody {
  status: 'success' | 'error',
  error: string,
  data: Record<string, any>
}

