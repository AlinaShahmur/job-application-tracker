import './App.css';
import {ProcessesPage} from './components/Processes/ProcessesPage';
import ErrorBoundary from './utils/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <ProcessesPage/>
      </div>
      </ErrorBoundary>
  );
}

export default App;
