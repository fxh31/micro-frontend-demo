let domDefault;

export const bootstrap = (props) =>
  Promise.resolve().then((res) => {
    domDefault = document.createElement("h1");
    domDefault.id = "default";
    document.body.appendChild(domDefault);
  });

export const mount = (props) =>
  Promise.resolve().then(() => {
    domDefault.textContent = "Default is mounted!";
  });

export const unmount = (props) =>
  Promise.resolve().then(() => {
    domDefault.textContent = "";
  });
