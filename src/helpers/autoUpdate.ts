import { autoUpdater } from "electron-updater";
import { IS_MAC } from "./constants";

function setUpdaterSettings(): void {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
}

/**
 * Returns true if there is an update.
 */
export async function checkForUpdate(): Promise<boolean> {
  setUpdaterSettings();
  return (
    (await autoUpdater.checkForUpdatesAndNotify({
      title: "Update Available",
      body: `There is an update available. It will not install until you click the button in the ${
        IS_MAC ? "app" : "file"
      } menu.`,
    })) != null
  );
}

/**
 * Checks for update, downloads, quits, and installs app.
 */
export async function installUpdate(): Promise<void> {
  setUpdaterSettings();
  if (await checkForUpdate()) {
    await autoUpdater.downloadUpdate();
    autoUpdater.quitAndInstall();
  }
}
