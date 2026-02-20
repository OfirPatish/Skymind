export class WeatherApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly reason?: string
  ) {
    super(message);
    this.name = "WeatherApiError";
  }
}

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof WeatherApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred";
};
