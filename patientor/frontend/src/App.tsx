import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { DiagnosisContextProvider } from "./DiagnosisContext";

const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <DiagnosisContextProvider>
            <Routes>
              <Route path="/" element={<PatientListPage />} />
              <Route path="/patients/:id" element={<PatientPage />} />
            </Routes>
          </DiagnosisContextProvider>
        </Container>
      </Router>
    </div>
  );
};

export default App;
