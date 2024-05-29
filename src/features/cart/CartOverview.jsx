import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  // const totalCartPrice = useSelector((state) =>
  //   state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0),
  // );
  // the prefferd way is to use the selector
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  if (!totalCartQuantity) return null;
  return (
    <div className="  flex items-center justify-between bg-stone-800 p-3 uppercase text-stone-200 sm:p-5">
      <p className="space-x-3 font-semibold text-stone-300">
        <span className="text-yellow-400">{totalCartQuantity} pizzas</span>
        <span className=" text-yellow-400">
          {formatCurrency(totalCartPrice)}
        </span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
