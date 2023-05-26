import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { loadRemote } from "../../utils/loadRemote";
import { Loader } from "../loader/loader";

interface RemoteComponentProps {
  remoteName: string;
  remoteUrl: string;
  component: string;
}

const RemoteComponent = ({
  remoteUrl,
  remoteName,
  component,
}: RemoteComponentProps) => {
  const Component = lazy(
    loadRemote({
      remoteComponent: `./${component}`,
      remoteName,
      remoteFile: remoteUrl,
    })
  );

  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary
        fallback={<h2>Failed to load {remoteName} micro frontend</h2>}
      >
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
};

export { RemoteComponent };
