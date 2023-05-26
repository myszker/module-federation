/* Webpack types */
type Factory = () => never;

interface Container {
  init(shareScope: never): void;
  get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: never };

export interface LoadRemoteFileOptions {
  remoteComponent: string;
  remoteName: string;
  remoteFile: string;
}

const fileMap: Record<string, boolean> = {};

const loadRemoteEntry = async (remoteFile: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    if (fileMap[remoteFile]) {
      resolve();

      return;
    }

    const script = document.createElement("script");
    script.src = remoteFile;

    script.onerror = (error: string | Event) => {
      console.error(error, "unable to load remote entry");
      reject();
    };

    script.onload = () => {
      fileMap[remoteFile] = true;
      resolve(); // window is the global namespace
    };

    document.body.append(script);
  });

const findExposedModule = async (
  remoteName: string,
  remoteComponent: string
) => {
  await __webpack_init_sharing__("default");
  const container: Container = (window as never)[remoteName];
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(remoteComponent);

  return factory();
};

const loadRemote =
  ({ remoteFile, remoteName, remoteComponent }: LoadRemoteFileOptions) =>
  async () => {
    await loadRemoteEntry(remoteFile);

    return await findExposedModule(remoteName, remoteComponent);
  };

export { loadRemote };
