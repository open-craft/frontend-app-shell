import React, { Suspense } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { LoadProfileMFE } from './LoadProfileMFE';


function App() {
  const { authenticatedUser } = React.useContext(AppContext);
  const username = authenticatedUser?.username ?? '';

  return (
    <Suspense fallback={'...'}>
      <Router>
        <Routes>
          <Route path="/profile/*" element={<LoadProfileMFE />} />
          <Route path="/" element={
            <p className="my-3 text-center">
              Home page for all MFEs. You can use the header to navigate but it doesn't yet support soft reload.
              Here's a "soft" link to your profile: <Link to={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`}>Profile MFE</Link>
            </p>
          } />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
