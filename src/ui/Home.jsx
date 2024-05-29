import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const { userName } = useSelector((state) => state.user);
  return (
    <div className="my-10 text-center">
      <h1 className="mb-6 px-4 text-xl font-semibold  sm:text-3xl md:text-4xl ">
        The best pizza.
        <br />
        <span className=" mt-3 block text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!userName ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Start ordering , {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
