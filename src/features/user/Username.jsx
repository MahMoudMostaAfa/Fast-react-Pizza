import { useSelector } from "react-redux";

function Username() {
  const { userName } = useSelector((state) => state.user);
  if (!userName) return null;
  return <p className="hidden text-sm font-semibold md:block">{userName}</p>;
}
export default Username;
