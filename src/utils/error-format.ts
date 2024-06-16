export function formatError(
  errorCode: string,
  message: string,
  details?: Record<string, any>
) {
  const errorResponse = {
    status: "fail",
    data: {
      code: errorCode,
      message: message,
      details: details,
    },
  };
  return errorResponse;
}
