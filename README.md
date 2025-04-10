Deploying: 
    - for backend (python code) installation of the dependecies listed in the requirements.txt file
    - for frontend installation of react, react-router-dom, react-dom, @react-oauth/google
    - cd into frontend and run "npm run build" + "npm run dev"
    - localhost:5173 should be the default, app will run and be synced to the website listed in the document 
AI: 
    -ChatGPT: Used to debug error codes that popped up when trying to load the web app in browser.
        -the jsx pages are the ones mainly affected as they were the ones throwing error codes often.
        -ex prompt: What does this error code mean Uncaught TypeError: Cannot destructure property 'basename' of 'React10.useContext(...)' as it is null.
            -This error helped fix the FaceApp.jsx by explaining I needed to wrap the main routes in a <BrowserRouter> tag 
    -CoPilot: Used to auto write comments and github commits.