import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className=" flex items-center justify-between border-b border-stone-500 bg-yellow-500 px-4 py-3 font-semibold uppercase md:py-5">
      <Link to="/" className="tracking-[10px]">
        {" "}
        fast pizza{" "}
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
