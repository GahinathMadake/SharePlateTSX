import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import AppRoutes from "./RBAC/AppRoutes";

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Router>
        <AppRoutes />
      </Router>
    </SnackbarProvider>
  );
}

export default App;