import { Route, Routes } from "react-router-dom";

import { Home } from "../home/home";
import { RemoteComponent } from "../remote-component/remote-component";
import { useMicrofrontendsSetup } from "../../providers/microfrontends-setup/microfrontends-setup.context";

const Routing = () => {
  const { data } = useMicrofrontendsSetup();

  return (
    <Routes>
      <Route path="/" element={<Home />} key="some-id" />
      {data
        ? data.map(
            ({ id, remoteFile, remoteName, remoteComponent, urlPath }) => (
              <Route
                path={urlPath}
                key={id}
                element={
                  <RemoteComponent
                    remoteName={remoteName}
                    remoteUrl={remoteFile}
                    component={remoteComponent || ""}
                  />
                }
              />
            )
          )
        : null}
    </Routes>
  );
};

export { Routing };
