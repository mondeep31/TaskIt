import { Provider } from "react-redux";

import { store } from "./store/taskSlice";
import { TaskManagerContent } from "./components/TaskManagementContent";

function App() {
  return (
    <Provider store={store}>
      <TaskManagerContent />
    </Provider>
  );
}

export default App;
