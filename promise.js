function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//2초동안 기다리게 하고 사과를 리턴하는 메서드
async function getApple() {
  await delay(2000);
  return "🍎";
}
//1초동안 기다라게 하고 사과를 리턴하는 메서드
async function getBanana() {
  await delay(1000);
  return "🍌";
}
getApple().then(console.log);
getBanana().then(console.log);
