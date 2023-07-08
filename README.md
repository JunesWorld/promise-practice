# promise-practice

## 동기 방식(Synchronous)

코드 작성 순으로 동작

## 비동기 방식

기본적으로 지연되는 로직이 있는 경우 순서대로 출력될 수 있게 보장

- async
- await
- callback : 함수의 인수로 사용하는 또 다른 함수
  ```js
  function a(callback) {
  const str = 'Hello A'
  // 1초 뒤에 동작
  setTimeout(() => {
    console.log('A')
    callback(str)
  }, 1000)
  }
  function b() {
    console.log('B')
  }
  // 비동기 방식
  // callback 함수 : 하나의 데이터처럼 활용되는 함수
  a(function(event) {
    // str -> callback -> event / Hello A
    console.log(event)
    b()
  })
  ```
  
## Promise

Callback 지옥 해결
```js
function a(callback) {
  setTimeout(() => {
    console.log('A')
    callback()
  }, 1000)
}
function b(callback) {
  setTimeout(() => {
    console.log('B')
    callback()
  }, 1000)
}
// Problem : Callback 지옥
// Solve : Promise 객체
a(function () {
  // b() = undefined -> function
  b(function () {
    console.log('Done!')
  }) 
})
```
