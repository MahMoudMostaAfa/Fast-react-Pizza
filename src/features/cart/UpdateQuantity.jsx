import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreasingQuantitty, increasingQuantitty } from "./cartSlice";

function UpdateQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="mx-2 flex items-center justify-center gap-1">
      <Button
        type="round"
        onCLick={() => dispatch(decreasingQuantitty(pizzaId))}
      >
        -
      </Button>
      <span className="mx-1 font-semibold">{currentQuantity}</span>
      <Button
        type="round"
        onCLick={() => dispatch(increasingQuantitty(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
