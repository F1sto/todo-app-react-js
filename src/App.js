import { Header } from "../components/Header/Header";
import { TodoList } from "../components/TodoList/TodoList";

import styles  from "./App.module.scss"

function App() {
  return (
    <div className={ styles.wrapper }>
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
