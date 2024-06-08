import { Fragment, ReactNode } from "react";

type TGridListProps<T> = {
  records: T[];
  recordItem: (recordItem?: T) => ReactNode;
};

const GridList = <T extends { id: string }>({
  records,
  recordItem,
}: TGridListProps<T>) => {
  if (records.length <= 0) {
    return "there are no records";
  }
  return (
    <div className="grid grid-cols-auto-fit-250 gap-10 px-10 ">
      {records.map((record) => (
        <Fragment key={record.id}> {recordItem(record)}</Fragment>
      ))}
    </div>
  );
};

export default GridList;
