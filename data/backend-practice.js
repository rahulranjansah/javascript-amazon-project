
// we're requesting to get a response
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/products/first');

// xhr is asynchronous code
xhr.send();

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
// xhr.open('GET', 'https://reqres.in/api/users/2');

// xhr.onload = function () {
//   console.log('Response:', xhr.responseText);
// };
// xhr.onerror = function () {
//   console.error('Request failed');
// };
// xhr.send();
