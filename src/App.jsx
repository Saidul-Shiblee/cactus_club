import MainRoutes from './Routes/MainRoutes'
import { ContextProvider } from "./context/context";






function App() {


  return (
    <>
      <ContextProvider>
        <MainRoutes />
      </ContextProvider>
    </>
  );
}

export default App