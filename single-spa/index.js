import './src/ferhannah-root-config'

const btn_about = document.querySelector('#about-btn');
const btn_home = document.querySelector('#home-btn');
const btn_react = document.querySelector('#react-btn');

btn_about.addEventListener('click', () => {
  navigateTo('/about');  
});
btn_home.addEventListener('click', () => {
  navigateTo('/home');
});
btn_react.addEventListener('click', () => {
  navigateTo('/react');
});
function navigateTo(path) {
  window.history.pushState({}, '', path);
  // window.dispatchEvent(new PopStateEvent('popstate'));
} 