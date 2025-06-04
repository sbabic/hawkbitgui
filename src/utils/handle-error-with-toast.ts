import { isErrorWithMessage } from '@/utils/is-error-with-message';
import { toast } from 'react-hot-toast';

export function handleErrorWithToast(error: unknown, fallbackMessage = 'Something went wrong') {
  console.error(error);
  if (isErrorWithMessage(error)) {
    toast.error(error.message);
  } else {
    toast.error(fallbackMessage);
  }
}
