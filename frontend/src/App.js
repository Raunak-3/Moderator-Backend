import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandRegistrationForm from './components/BrandRegistrationForm';
import BrandAccount from './components/Account';
import EditBrand from './components/EditPage';
import BrandDashboard from './components/BrandDashboard';
import BrandLogin from './components/BrandLoginForm'; // Import the BrandLogin component
import Home from './photographers/pages/Home';
import PhotographerDetails from './photographers/pages/PhotographerDetails';
import AccountDisplay from './components/AccountDisplay';
import TrackingPage from './components/TrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandRegistrationForm />} />
        <Route path="/brands/login" element={<BrandLogin />} /> {/* Add the login route */}
        <Route path="/brands/home" element={<BrandAccount />} />
        <Route path="/brands/edit" element={<EditBrand />} />
        <Route path="/brands/dashboard" element={<BrandDashboard />} />
        <Route path="/photographer" element={<Home />} />
        <Route path="photographer/:id" element={<PhotographerDetails />} />
        <Route path="/brands/account" element={<AccountDisplay />} />
        <Route path="/brands/status" element={<TrackingPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
