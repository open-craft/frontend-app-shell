import React from 'react'

export const LoadProfileMFE = React.lazy(
    () => import('@edx/frontend-app-profile/embed')
);

export const LoadLearnerDashboardMFE = React.lazy(
    () => import('@edx/frontend-app-learner-dashboard/embed')
);
