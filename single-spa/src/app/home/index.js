let domElHome;

export const bootstrap = (props) =>
  Promise.resolve().then((res) => {
    domElHome = document.createElement("h1");
    domElHome.id = "home";
    document.body.appendChild(domElHome);
  });

export const mount = (props) =>
  Promise.resolve().then(() => {
    domElHome.textContent = "Home is mounted!";
  });

export const unmount = (props) =>
  Promise.resolve().then(() => {
    domElHome.textContent = "";
  });
