export function createResponse(statusCode: Number, status: string, message: string, data: any = null, meta?: any) {
  return {
    statusCode,
    status,
    message,
    meta,
    data
  };
}


export function createError(message: string, status: number) {
  const err = new Error(message) as Error & { status: number };
  err.status = status;
  return err;
}
