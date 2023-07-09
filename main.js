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