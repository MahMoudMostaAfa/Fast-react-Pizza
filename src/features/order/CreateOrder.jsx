import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = Math.trunc(totalCartPrice * 0.2);
  const totalPrice = totalCartPrice + (withPriority ? priorityPrice : 0);
  const formError = useActionData();
  const navigation = useNavigation();
  const {
    address,
    userName,
    status: addressStatus,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-3 py-3">
      <h2 className="mb-3 text-xl font-semibold">
        Ready to order ? let&apos;s go !{" "}
      </h2>
      {/* <h2>Ready to order? lets's go!</h2> */}
      <Form method="post">
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-1 rounded-md bg-red-200 p-1 text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mt-1 rounded-md bg-red-200 p-1 text-red-700">
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute right-3 top-[29px] sm:top-2 ">
            {!position.latitude && !position.longitude && (
              <Button
                type="small"
                onCLick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoadingAddress ? "loading..." : "Get position"}
              </Button>
            )}
          </span>
        </div>

        <div className="mb-7 flex items-center gap-3">
          <input
            className="h-4 w-4 accent-yellow-500"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude & position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button
            type="primary"
            disabled={navigation.state === "submitting" || isLoadingAddress}
          >
            {" "}
            {navigation.state === "submitting"
              ? " submitting..."
              : ` Order now ${formatCurrency(totalPrice)}`}{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
