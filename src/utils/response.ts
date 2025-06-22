export const sendResponse = (
  res: any,
  statusCode: number,
  message: string,
  data: unknown = {},
) => {
  res.status(statusCode).json({
    data,
    message,
  });
};
