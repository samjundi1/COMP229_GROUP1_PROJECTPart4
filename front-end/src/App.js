import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './sections/auth/SignIn';
import SignOut from './sections/auth/SignOut';
import MainLanding from './sections/mainlanding/home';
import VendorLanding from './sections/vendorlanding/vendorHome';
import Signup from './sections/register/signup';
import ProfileManagement from './sections/profilemanagement/ProfileManagement';
import AddFlower from './sections/addflower/AddFlower';
import FlowerList from './sections/flowerlist/FlowerList';
import FlowerDetail from './sections/flowerdetail/FlowerDetail';

//import './App.css';

const App = () => {
  return (
    <><div className="App">
      <header className="App-header">
      </header>
    </div>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInWithLogging />} />
        <Route path="/signout" element={<SignOutWithLogging />} />
        <Route path="/" element={<MainLanding />} />
        <Route path="/vendor-main" element={<VendorLanding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-profile-management" element={<ProfileManagement />} />
        <Route path="/vendor-add-flower" element={<AddFlower />} />
        <Route path="/vendor-view-flower-list" element={<FlowerList />} />
        <Route path="/vendor-view-flower-detail" element={<FlowerDetail />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
    </>
  );
  
};
const SignInWithLogging = () => {
  console.log('Rendering SignIn component');
  return <SignIn />;
};

const SignOutWithLogging = () => {
  console.log('Rendering SignOut component');
  return <SignOut />;
};
export default App;
