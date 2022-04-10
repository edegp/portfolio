import { format } from "date-fns";

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), "yyyy年MM月d日")}
    </time>
  );
}
