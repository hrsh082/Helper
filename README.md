# Helper App with Google Maps Integration

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and includes Google Maps integration for location picking, similar to ride-sharing apps like Uber and Rapido.

## Google Maps Setup

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key with appropriate restrictions

### 2. Configure the API Key

1. Open the `.env` file in the root directory
2. Replace `YOUR_API_KEY_HERE` with your actual Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

## Features

- **Location Search**: Search for locations using Google Places Autocomplete
- **Interactive Map**: Drag the map to select a specific location
- **Current Location**: Use device's geolocation to find current position
- **Address Display**: Show the full address of the selected location
- **Animated Pin**: Visual feedback during location selection

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Usage Example

The MapPicker component can be used in any part of your application where location selection is needed:

```jsx
import MapPicker from './MapPicker';

function YourComponent() {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMap(false);
  };

  return (
    <div>
      <button onClick={() => setShowMap(true)}>Select Location</button>
      
      {selectedLocation && (
        <div>
          <p>Selected Location: {selectedLocation.name}</p>
          <p>Coordinates: {selectedLocation.lat}, {selectedLocation.lon}</p>
        </div>
      )}

      {showMap && (
        <MapPicker
          open={showMap}
          onClose={() => setShowMap(false)}
          onSelect={handleLocationSelect}
          initialLat={selectedLocation?.lat || 20.5937}
          initialLon={selectedLocation?.lon || 78.9629}
        />
      )}
    </div>
  );
}
```

## Security Note

Make sure to:
- Add appropriate restrictions to your Google Maps API key
- Never commit your actual API key to version control
- Use environment variables for API keys

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
