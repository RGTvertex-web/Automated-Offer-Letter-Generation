import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Candidates from "./pages/Candidates";
import GenerateOffer from "./pages/GenerateOffer";
import OfferHistory from "./pages/OfferHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/dashboard" element={   
                                          <ProtectedRoute>     <Dashboard />   </ProtectedRoute> 
                                          } />

        <Route path="/candidates" element={  
                                          <ProtectedRoute>  <Candidates /> </ProtectedRoute>
                                           } />     

        <Route path="/generate-offer" element={
                                               <ProtectedRoute> <GenerateOffer /> </ProtectedRoute> 
                                               }/>
      
        <Route path="/offer-history" element={
                                          <ProtectedRoute>
                                            <OfferHistory />
                                          </ProtectedRoute>
            }
          />
      </Routes>

       
    </BrowserRouter>
  );
}

export default App;