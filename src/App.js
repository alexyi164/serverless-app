import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AmplifySignOut } from  '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <div>
        <AmplifySignOut buttonText="Log Out"></AmplifySignOut>
      </div>
    </div>
  );
}

export default withAuthenticator(App)