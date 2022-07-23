import { useSelector } from "react-redux";

import Counter from "./components/Counter";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import Auth from "./components/Auth";

function App() {
  const auth = useSelector((state) => state.authentication.isAuth);
  console.log(auth);
  return (
    <>
      <Header />
      {auth ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
