import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {APIProvider} from '@vis.gl/react-google-maps';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
   </APIProvider>
);
