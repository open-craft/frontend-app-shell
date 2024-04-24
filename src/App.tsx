import React, { Suspense } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as MFEs from './mfe-loaders';


function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { authenticatedUser } = React.useContext(AppContext as React.Context<{authenticatedUser: null|any}>);
  const username = authenticatedUser?.username ?? '';

  return (
    <Suspense fallback={'...'}>
      <Router>
        <Routes>
          <Route path="/profile/*" element={<MFEs.LoadProfileMFE />} />
          <Route path="/dashboard/*" element={<MFEs.LoadLearnerDashboardMFE />} />
          <Route path="/" element={
            <div className="m-4">
              <h1>Frontend Shell Home Page (temporary, for dev/testing only)</h1>
              <p className="my-3">
                This is a home page for all MFEs. You can use the header to navigate but it doesn't yet support "soft"
                navigation. The links below do (i.e. the header/footer will stay in place when you click them).<br />
              </p>
              <h2>Embedded MFEs</h2>
              <ul>
                <li><Link to={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`}>Profile MFE</Link></li>
                <li><Link to={`/dashboard/`}>Learner Dashboard MFE</Link></li>
              </ul>
            </div>
          } />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
