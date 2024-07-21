import LottieHandler from "@components/feedback/LottieHandler";
import { ReactNode } from "react";

type TGridListProps<T> = {
  records: T[];
  recordItem: (recordItem?: T) => ReactNode;
  className?: string;
  numGrid?: number;
};
const GridList = <T extends { id: string }>({
  records,
  recordItem,
  className,
  numGrid = 3,
}: TGridListProps<T>) => {
  if (records.length <= 0) {
    return <LottieHandler type="empty" message="No records found" />;
  }
  return (
    <ul
      className={
        "lg:grid-cols- grid grid-cols-1 gap-10 px-10 md:grid-cols-2" +
        `${numGrid} ` +
        className
      }
    >
      {records?.map((record, idx) => (
        <li key={idx} className="flex items-center justify-center">
          {recordItem(record)}
        </li>
      ))}
    </ul>
  );
};

export default GridList;
