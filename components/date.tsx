import { format } from "date-fns";

export default function DateComponent({ dateString,className }) {
  return (
    <time dateTime={dateString} className={className}>
      {format(new Date(dateString), "yyyy年MM月d日")}
    </time>
  );
}
