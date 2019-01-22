const { app, BrowserWindow, Menu, dialog } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `${__dirname}/public/icon.ico`
  });

  // and load the index.html of the app.
  win.loadFile('public/index.html');

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

const aboutApp =
`Originally meant to be a tetris clone + machine learning...
the developer team of one (1) + trusted cats (2) had to settle on a clone with no MR`;
const aboutDev =
`Human Dev:
https://www.linkedin.com/in/pavel-machuca/
https://github.com/pavel6767/
https://twitter.com/pavelmachuca

Cat Devs:
cats be cats`;

  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Restart',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'The App',
          click() {
            console.log(
              dialog.showMessageBox({
                title: 'FSA 1810 NYC - tetris clone',
                message: aboutApp
              })
            );
          }
        },
        {
          label: 'The Dev',
          click() {
            console.log(
              dialog.showMessageBox({
                title: 'Human Dev + cat',
                message: aboutDev
              })
            );
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
