import FilterSvg from "@assets/svgs/setting.svg?react";
import ArrSvg from "@assets/svgs/downArr.svg?react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { memo, useState } from "react";
import TInputs from "@types/filter";

type TProps = {
  onChange: (data: TInputs) => void;
  closeFilter: () => void;
  isShow: boolean;
};

type TData = {
  title: string;
  list: string[];
  item: (args: {
    register?: UseFormRegister<TInputs>;
    title?: string;
    item?: string;
  }) => JSX.Element;
};

type TItem<TFieldValue extends FieldValues> = {
  register: UseFormRegister<TInputs>;
  title: Path<TFieldValue>;
  item: string;
};

const item = <TFieldValue extends FieldValues>({
  register,
  title,
  item,
}: TItem<TFieldValue>): JSX.Element => {
  return (
    <li className="item">
      <input type="checkbox" {...register(title)} value={item} />
      {/* i don't know why it's not working*/}
      <span className="text">{item}</span>
    </li>
  );
};

const price = ({ register }: { register: UseFormRegister<TInputs> }) => {
  return (
    <li className="item">
      <input
        type="number"
        className={"price"}
        {...register("price", { valueAsNumber: true })}
        min={0}
      />
    </li>
  );
};

const itemLink = ({ item }: { item: string }) => {
  return (
    <Link to={"/products/" + (item === "all" ? "" : item)}>
      <li className="item">
        <span className="text">{item}</span>
        <ArrSvg />
      </li>
    </Link>
  );
};

const data: TData[] = [
  {
    title: "type",
    list: ["T-shirt", "Shoes", "shirts", "hoodie", "jeans"],
    item: item,
  },
  {
    title: "price",
    list: ["price"],
    item: price,
  },
  {
    title: "colors",
    list: [
      "orange",
      "pink",
      "red",
      "purple",
      "black",
      "green",
      "blue",
      "white",
      "sky",
      "gray",
    ],
    item: item,
  },
  {
    title: "size",
    list: [
      "XX-Small",
      "X-Small",
      "Small",
      "Medium",
      "Large",
      "X-Large",
      "XX-Large",
      "3X-Large",
      "4X-Large",
    ],
    item: item,
  },
  {
    title: "dress style",
    list: ["casual", "formal", "party", "gym", "all"],
    item: itemLink,
  },
];

const Filter = memo(({ onChange, closeFilter, isShow }: TProps) => {
  const { register, handleSubmit } = useForm<TInputs>({
    defaultValues: {
      type: [],
      price: 0,
      colors: [],
      size: [],
    },
  });

  const List = ({ title, list, item }: TData) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen((prev) => !prev);
    };
    return (
      <section className={title.replace(" ", "_") + " section"} key={title}>
        <div
          className={"headSec" + (open ? "" : " close")}
          onClick={handleOpen}
        >
          <h4 className="title">{title}</h4>
          <ArrSvg />
        </div>
        {!open ? null : (
          <ul className="list">
            {list.map((str) => (
              <Fragment key={str}>
                {item({ register, title, item: str })}
              </Fragment>
            ))}
          </ul>
        )}
      </section>
    );
  };

  const onsumbut: SubmitHandler<TInputs> = (data) => {
    onChange(data);
  };

  return (
    <div className={"filter" + (isShow ? "" : " hide")}>
      <div className="head">
        <span>filter</span>
        <FilterSvg />
      </div>

      <form onSubmit={handleSubmit(onsumbut)}>
        <div className="body">
          {data.map((item) => (
            <List key={item.title} {...item} />
          ))}
        </div>
        <div className="foot">
          <button className="applyBtn" type="submit">
            apply filter
          </button>
          <button className="cancelBtn" onClick={closeFilter}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default Filter;
