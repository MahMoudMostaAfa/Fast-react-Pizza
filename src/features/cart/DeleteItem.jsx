import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeFromCart } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="small"
      onCLick={() => {
        dispatch(removeFromCart(pizzaId));
      }}
    >
      delete
    </Button>
  );
}

export default DeleteItem;
