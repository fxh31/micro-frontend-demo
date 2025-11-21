
import { cube, square } from './math.js';

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }
function component() {
  const element = document.createElement('pre');
  element.innerHTML = [
   '你好 webpacffdfsffkddddddd！',
   '5 的立方等于 ' + cube(5)
  ].join('\n\n');
  
  return element;
}
document.body.appendChild(component());

