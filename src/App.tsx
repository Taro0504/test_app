import "./App.css";

import { datadogRum } from "@datadog/browser-rum";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { Buggy } from "./components/Buggy";

function App() {
  datadogRum.init({
    applicationId: "347c418a-7e64-4ce5-a8b4-82758fc0c78d",
    clientToken: "pub7902dcfc80e587131b7f7d15a8580f98",
    site: "ap1.datadoghq.com",
    service: "test_app",
    env: "local",
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
  });

  return (
    <ErrorBoundary>
      <Buggy />
    </ErrorBoundary>
  );
}

export default App;
