import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2 ">
      <div className="flex items-center justify-between space-y-1">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="w-[80%]  capitalize italic text-stone-500 sm:min-w-fit">
        {isLoadingIngredients ? " loading..." : ingredients.join(",")}
      </p>
    </li>
  );
}

export default OrderItem;
