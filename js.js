'use strict'
/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.toNode = function (text = '') {
  const node = document.createElement(this);
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
  return node;
}
//  Simple transliterator block
const arrru = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'];
const arren = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Shh','shh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e'];
const dictonary = arrru.reduce((a, e, i) => {return a[e] = arren[i], a}, {});
const transliterator = (str) => str.split('').reduce((a, e) => a += dictonary[e] || e, '');
// --------------------------------- //
const rusBox = document.querySelector('.rus ol');
const engBox = document.querySelector('.eng ol');
const button = document.querySelector('.magic');
const input = document.querySelector('input');
const form = document.querySelector('form');
const eraser = button.nextElementSibling;
function fillForm() {
  const text = input.value.length > 30 ? input.value.slice(0, 27) + '...' : input.value;
  const restText = input.value.slice(27, input.value.length);
  if(text) {
    const el1 = 'li'.toNode(text);
    const el2 = 'li'.toNode(transliterator(text));
      if(restText) {
        const el3 = 'span'.toNode(restText);
        console.log(el3)
        const el4 = 'span'.toNode(transliterator(restText));
        el3.classList.add('title');
        el4.classList.add('title');
      el1.addEventListener("mouseover", function( event ) {
        this.appendChild(el3);
      });
      el1.addEventListener("mouseout", function( event ) {
        this.removeChild(el3);
    });
    el2.addEventListener("mouseover", function( event ) {
      this.appendChild(el4);
    });
    el2.addEventListener("mouseout", function( event ) {
      this.removeChild(el4);
  });
    }
    rusBox.appendChild(el1);
    engBox.appendChild(el2);
    el1.classList.add('on');
    el2.classList.add('on');
    eraser.style.display = 'inline-block';
    input.value = '';
  } else {
    input.style.animation = 'shake 0.5s';
    setTimeout(() => input.style.removeProperty('animation'), 1000);
  }
};
button.addEventListener('click', fillForm);
form.addEventListener('submit', function(e) {
  e.preventDefault();
  fillForm();
});
eraser.addEventListener('click', () => {
  rusBox.innerHTML = '';
  engBox.innerHTML = '';
  eraser.style.display = 'none';
})
