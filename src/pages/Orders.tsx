import { Loading } from "@components/index";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";
import useOrders from "@hooks/useOrders";
import LottieHandler from "@components/feedback/LottieHandler";

const Orders = () => {
  const {
    loading,
    error,
    orderList,
    getQuantity,
    openDialog,
    handlerCloseDialog,
    handlerOpenDialog,
    itemsOrderSelected,
  } = useOrders();

  return (
    <Loading status={loading} error={error} type="product">
      {orderList.length === 0 ? (
        <LottieHandler type="empty" message="No orders found" />
      ) : (
        <>
          <Dialog
            onClose={handlerCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={openDialog}
          >
            <DialogContent dividers>
              {itemsOrderSelected.map(
                ({ title, quantity, main_img, price, id }) => (
                  <div
                    key={id}
                    className="mb-8 flex items-start gap-5 last:mb-0"
                  >
                    <div className="h-36 w-36 overflow-hidden rounded-full bg-gray-200">
                      <img src={main_img} alt="image product" />
                    </div>
                    <div className="mt-3 flex columns-1 flex-col gap-2">
                      <h3 className="text-xl font-bold">Title: {title}</h3>
                      <p className="text-lg">Quantity: {quantity}</p>
                      <p className="text-lg">Price: {price}$</p>
                    </div>
                  </div>
                ),
              )}
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>/</TableCell>
                  <TableCell align="left">id</TableCell>
                  <TableCell align="left">items</TableCell>
                  <TableCell align="left">total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map(({ subtotal = "undefined", items, id }, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">
                      {getQuantity(items)} item(s) /
                      <span
                        onClick={() => handlerOpenDialog(idx)}
                        className="capitaliz font-bold text-gray-700 underline hover:cursor-pointer hover:text-emerald-400"
                      >
                        product details
                      </span>
                    </TableCell>
                    <TableCell align="left">{subtotal}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Loading>
  );
};

export default Orders;
