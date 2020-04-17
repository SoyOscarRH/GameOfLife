import React, { Suspense } from "react";

import stylesApp from "./App.module.css";

const Main = React.lazy(() => import("../Main"));

const App: React.FC = () => {
  return (
    <main className={stylesApp.app}>
      <div id="mainScreen">
        <Suspense fallback={null}>
          <Main />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
