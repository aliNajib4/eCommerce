import LottieHandler from "@components/feedback/LottieHandler";
import { ReactNode } from "react";

type TGridListProps<T> = {
  records: T[];
  recordItem: (recordItem?: T) => ReactNode;
};
const GridList = <T extends { id: string }>({
  records,
  recordItem,
}: TGridListProps<T>) => {
  if (records.length <= 0) {
    return <LottieHandler type="empty" message="No records found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-10 px-10 md:grid-cols-2 lg:grid-cols-3">
      {records?.map((record, idx) => (
        <div key={idx} className="flex items-center justify-center">
          {recordItem(record)}
        </div>
      ))}
    </div>
  );
};

export default GridList;
