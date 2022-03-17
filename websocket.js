// let exampleSocket = new WebSocket(
//   "wss://api.upbit.com/websocket/v1",
//   "protocolOne"
// );
const WebSocket = require("ws");

let socket; // 소켓

// 웹소켓 연결
function connectWS() {
  if (socket !== undefined) {
    socket.close();
  }

  socket = new WebSocket("wss://api.upbit.com/websocket/v1");
  socket.binaryType = "arraybuffer";

  socket.onopen = function (e) {
    // filterRequest(`[
    //   { ticket: "UNIQUE_TICKET" },
    //   { type: "ticker", codes: ["KRW-BTC"] },
    //   { type: "orderbook", codes: ["KRW-BTC"] },
    //   { type: "trade", codes: ["KRW-BTC"] }
    // ]`);

    filterRequest(`[
        { ticket: "UNIQUE_TICKET" },
        { type: "ticker", codes: ["KRW-BTC"] }
      ]`);
  };
  socket.onclose = function (e) {
    socket = undefined;
  };
  socket.onmessage = function (e) {
    let enc = new TextDecoder("utf-8");

    let arr = new Uint8Array(e.data);
    let str_d = enc.decode(arr);
    let d = JSON.parse(str_d);
    console.log(d);
    if (d.type === "ticker") {
      // 현재가 데이터
      // TODO
    }
    if (d.type === "orderbook") {
      // 호가 데이터
      // TODO
    }
    if (d.type === "trade") {
      // 체결 데이터
      // TODO
    }
  };
}
// 웹소켓 연결 해제
function closeWS() {
  if (socket !== undefined) {
    socket.close();
    socket = undefined;
  }
}

// 웹소켓 요청
function filterRequest(filter) {
  if (socket === undefined) {
    alert("no connect exists");
    return;
  }
  socket.send(filter);
}

connectWS();
