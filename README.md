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

객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다.  

setTimeout과 같이 Network 통신을 기다리거나 순서를 보장해줘야 할 때   
Promise(다음 순서 약속) | Resolve(실행 위치)

- Callback 지옥 
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

- 해결 : Promise
```js
// function a(callback) {
//   setTimeout(() => {
//     console.log('A')
//     callback()
//   }, 1000)
// }

// callback = resolve
// 실행을 보장하고 싶은 위치에서 사용
function a() {
  // promise: 약속의 객체!
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('A')
      resolve('Hello A')
    }, 1000)
  })
}
function b() {
  // promise: 약속의 객체!
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('B')
      resolve('Hello B')
    }, 1000)
  })
}
function c() {
  // promise: 약속의 객체!
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('C')
      resolve('Hello C')
    }, 1000)
  })
}
function d() {
  // promise: 약속의 객체!
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('D')
      resolve('Hello D')
    }, 1000)
  })
}

// callback 지옥 해결
async function test() {
  await a()
  await b()
  await c()
  await d()
  console.log('Done!')
}
test()
```

## 메서드

- then
  ```js
  function a() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('A')
      resolve()
    }, 1000)
  })
  }
  // async function test() {
  //   await a()
  //   console.log('B')
  // }
  
  // function test() {
  //   const promise = a()
  //   promise.then(() => {
  //     console.log('B')
  //   })
  // }
  
  function test() {
    a().then(() => {
      console.log('B')
    })
  }
  test()
  ```
  ```js
  function a() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('A')
      resolve()
    }, 1000)
  })
  }
  function b() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('B')
        resolve()
      }, 1000)
    })
  }
  function c() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('C')
        resolve()
      }, 1000)
    })
  }
  function d() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('D')
        resolve()
      }, 1000)
    })
  }
  // function test() {
  //   a.then(() => {
  //     b().then(() => {
  //       c().then(() => {
  //         d().then(() => {
  //           console.log('Done!')
  //         })
  //       })
  //     })
  //   })
  // }
  
  // function test() {
  //   a().then(() => {
  //     return b()
  //   }).then(() => {
  //     return c()
  //   }).then(() => {
  //     return d()
  //   }).then(() => {
  //     console.log('Done!')
  //   })
  // }
  
  function test() {
    a()
      .then(() => b())
      .then(() => c())
      .then(() => d())
      .then(() => {
        console.log('Done!')
      })
  }
  test()
  ```
- catch & finally
  ```js
  function a(number) {
  return new Promise((resolve, reject) => {
    if (number > 4) {
      reject()
      return // A 출력 X
    }
    setTimeout(() => {
      console.log('A')
      resolve()
    }, 1000)
  })
  }
  function test() {
    a(5)
      .then(() => {
        console.log('Resolve!')
      })
      .catch(() => {
        console.log('Reject!')
      })
      .finally(() => {
        console.log('Done!')
      })
  }
  test()
  ```
  ```js
  function a(number) {
  return new Promise((resolve, reject) => {
    if (number > 4) {
      reject()
      return // A 출력 X
    }
    setTimeout(() => {
      console.log('A')
      resolve()
    }, 1000)
  })
  }
  // function test() {
  //   a(5)
  //     .then(() => {
  //       console.log('Resolve!')
  //     })
  //     .catch(() => {
  //       console.log('Reject!')
  //     })
  //     .finally(() => {
  //       console.log('Done!')
  //     })
  // }
  
  async function test() {
    try {
      await a(1)
      console.log('Resolve!')
    } catch (error) {
      console.log('Reject!')
    } finally {
      console.log('Done!')
    }
  }
  test()
  ```

## 비동기 - API 비동기 처리 연습

Axios CDN => INDEX.HTML
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js" integrity="sha512-uMtXmF28A2Ab/JJO2t/vYhlaa/3ahUOgj1Zf27M5rOo8/+fcTUVH0/E0ll68njmjrLqOBjXM3V9NiPFL5ywWPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

```js
// [Promise MDN]
// 대기(pending): 이행하거나 거부되지 않은 초기 상태.
// 이행(fulfilled): 연산이 성공적으로 완료됨.
// 거부(rejected): 연산이 실패함.

function fetchMovies(title) {
  // 대기(pending): 이행하거나 거부되지 않은 초기 상태.
  const OMDB_API_KEY = '7035c60c'
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`https://omdbapi.com?apikey=${OMDB_API_KEY}&s=${title}`)
      // resolve
      // 이행(fulfilled): 연산이 성공적으로 완료됨.
      resolve(res)
    } catch (error) {
      console.log(error.message)
      // Reject
      // 거부(rejected): 연산이 실패함.
      reject(error.message)
    }
  })
}

async function test() {
  try {
    const res = await fetchMovies('frozen')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
test()

function hello() {
  fetchMovies('jobs')
    .then(res => console.log(res))
    .catch(() => {console.log(error)})
}
hello()
```
