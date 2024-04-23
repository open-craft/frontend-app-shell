# Basic Frontend Shell Demo (with Vite)



How to run:

1. Check this out and clone/update the submodules too.
2. Start a Tutor devstack, but configure the "profile" MFE to run in development mode and then shut it down, so the
   `mfe` and `lms` containers are running but not `profile`.
3. Install this repo's dependenies on your host with with `npm install`
4. Run this on your host with `npm run dev`
5. Access it at http://apps.local.overhang.io:1995/ or http://apps.local.edly.io:1995/ (likely only one of these will
   work, depending on your Tutor config.)
