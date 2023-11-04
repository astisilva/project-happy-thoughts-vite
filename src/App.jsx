import { Posts } from "./Posts";
import { Header } from "./Header";
import './App.css'

export const App = () => {
  return <div className="posts">
    <Header />
    <Posts />
  </div>;
};
