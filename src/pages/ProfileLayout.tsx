import { List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const sitting = ["Account", "orders"];

const ProfileLayout = () => {
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedIndex(pathname.split("/")[2] ? 2 : 1);
  }, [pathname]);

  return (
    <div className="grid w-full grid-cols-[1fr_3fr] gap-10">
      <List component="nav" aria-label="secondary mailbox folder">
        {sitting.map((el, idx) => (
          <Link to={el === "Account" ? "" : el.toLowerCase()} key={idx}>
            <ListItemButton
              selected={selectedIndex === idx + 1}
              onClick={(event) => handleListItemClick(event, idx + 1)}
            >
              <ListItemText primary={el} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
