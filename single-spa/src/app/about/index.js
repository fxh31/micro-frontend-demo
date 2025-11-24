let domElAbout;

export const bootstrap = (props) =>
  Promise.resolve().then((res) => {
    domElAbout = document.createElement("h1");
    domElAbout.id = "app about";
    document.body.appendChild(domElAbout);
  });

export const mount = (props) =>
  Promise.resolve().then(() => {
    domElAbout.textContent = "App About is mounted!";
  });

export const unmount = (props) =>
  Promise.resolve().then(() => {
    domElAbout.textContent = "";
  });
