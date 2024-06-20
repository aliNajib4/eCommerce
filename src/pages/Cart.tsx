import { CartItem, Loading } from "@components/index";
import useCart from "@hooks/useCart";
import LottieHandler from "@components/feedback/LottieHandler";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Cart = () => {
  const {
    loading,
    error,
    products,
    totalPrice,
    totalQuantity,
    handelQuantity,
    deleteItem,
    handleClickCheckout,
    handleCloseDialog,
    handleAcceptDialog,
    openDialog,
    loadingPlaceOrder,
    errorPlaceOrder,
  } = useCart();

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          are you sure you want to checkout?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            - Total quantity: <span>{totalQuantity}</span>
            <br />- Total: <span>{totalPrice}</span>$
            {errorPlaceOrder && (
              <p className="text-red-500">{errorPlaceOrder}</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAcceptDialog}
            autoFocus
            disabled={loadingPlaceOrder === "pending"}
          >
            {loadingPlaceOrder === "pending" ? "Loading..." : "Accept"}
          </Button>
        </DialogActions>
      </Dialog>
      <Loading status={loading} error={error} type="product">
        {loadingPlaceOrder === "succeeded" ? (
          <LottieHandler type="accept" message="Order placed successfully" />
        ) : (
          <>
            {products.length !== 0 ? (
              products.map((el) => (
                <CartItem
                  key={el.id}
                  {...el}
                  deleteItem={deleteItem}
                  changeQuantity={handelQuantity}
                />
              ))
            ) : (
              <LottieHandler type="empty" message="cart is empty" />
            )}
            <div className="flex items-center justify-between">
              <span>Total: </span>
              <span>{totalQuantity} item(s)</span>
              <span>{totalPrice}$</span>
            </div>
            <Button
              variant="outlined"
              sx={{ mt: 5, width: "100%", fontSize: 20, py: 2 }}
              onClick={handleClickCheckout}
            >
              Checkout
            </Button>
          </>
        )}
      </Loading>
    </>
  );
};

export default Cart;
