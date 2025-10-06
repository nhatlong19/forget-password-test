import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function notify(
  type: "info" | "success" | "warning" | "error",
  message: string,
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | undefined,
  duration?: number
) {
  const props = {
    position: position ?? "top-right",
    autoClose: duration ?? 4000,
  };
  switch (type) {
    case "info":
      return toast.info(message, props);
    case "warning":
      return toast.warning(message, props);
    case "error":
      return toast.error(message, props);
    default:
      return toast.success(message, props);
  }
}
