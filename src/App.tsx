import React, {Suspense, useState} from "react";
import Server from "./pages/Server";
import {IServerSettings} from "./core/interfaces";
import Client from "./pages/Client";

const App = () => {
  const [serverSettings, setServerSettings] = useState<IServerSettings>();
  return (
    <Suspense fallback={<></>}>
      <div className="d-grid grid-cols-2 gap-4 p-5">
        <Server onChangeSettings={setServerSettings} />
        {serverSettings && (
          <Client serverSettings={serverSettings} />
        )}
      </div>
    </Suspense>
  );
};

export default App;
