import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userName = useSelector((state) => state.user.userName);

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-3 py-2">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-2xl font-semibold">Your cart, {userName}</h2>
      <ul className="mt-2 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-5 space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onCLick={() => dispatch(clearCart())}>
          clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
