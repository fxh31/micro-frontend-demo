import { registerApplication, start } from "single-spa";

registerApplication(
  "home", // app name
  () => import("./app/home/index.js"), // app js
  (location) => location.pathname.startsWith("/home"), // app route（路由匹配函数）
  { some: "value" },
);

// Simple usage - js
registerApplication(
  "about",
  () => import("./app/about/index.js"),
  (location) => location.pathname.startsWith("/about"),
  { some: "value" },
);
// Simple usage - react
registerApplication(
  "react",
  () => import("./app/react-app/single-spa-react"),
  (location) => location.pathname.startsWith("/react"),
  {
    some: "ferhannah",
    root_app: {
      parent: 'single-spa'
    }
  },
);
// Simple usage - vue
registerApplication(
  "vue",
  () => import("./app/vue3-app/single-spa-vue"),
  (location) => location.pathname.startsWith("/vue"),
  {
    some: "ferhannah",
    root_app: {
      parent: 'single-spa'
    }
  },
);
// Simple usage
registerApplication(
  "hello-word",
  () => import("./app/index.js"),
  (location) => location.pathname.startsWith("/"),
  { some: "ferhannah" },
);

start();