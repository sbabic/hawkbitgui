export function isErrorWithMessage(error: unknown): error is { message: string; constructor: { name: string } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string' &&
    'constructor' in error &&
    typeof (error as any).constructor === 'function' &&
    typeof (error as any).constructor.name === 'string'
  );
}
