const { app, BrowserWindow, Tray, Menu } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1020,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }

  // Tray
  let isHidden = false;

  const menuTemplate = [
    {
      id: "hide",
      label: "Hide",
      click: () => {
        if (isHidden) {
          win.show();
          win.focus({ steal: true });
          menuTemplate[0].label = "Hide";
        } else {
          win.hide();
          menuTemplate[0].label = "Show";
        }

        isHidden = !isHidden;

        const newMenu = Menu.buildFromTemplate(menuTemplate);
        tray.setContextMenu(newMenu);
      },
    },
    {
      id: "quit",
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ];

  const icon = path.resolve(__dirname, "../assets/iconTemplate.png");

  const tray = new Tray(icon);

  const context = Menu.buildFromTemplate(menuTemplate);

  tray.setContextMenu(context);
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
