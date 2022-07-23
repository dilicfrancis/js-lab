const socket = io();

//Elements
const $chatForm = document.querySelector("#chat");
const $chatInput = $chatForm.querySelector("input");
const $chatSendBtn = $chatForm.querySelector("button");
const $locationBtn = document.querySelector("#btnLocation");
const $im = document.querySelector("#im");
const $list = document.querySelector("#list");

//Templates
const imTemplate = document.querySelector("#im-template").innerHTML;
const locTemplate = document.querySelector("#loc-template").innerHTML;
const sideTemplate = document.querySelector("#side-template").innerHTML;

//AutoScroll

const scroll = () => {
  console.log("called");
  //last message
  const $lastIM = $im.lastElementChild;
  //calculate last message height
  const styleLastIM = getComputedStyle($lastIM);
  const marginLastIM = parseInt(styleLastIM.marginBottom);
  const heightIM = $lastIM.offsetHeight + marginLastIM;
  //visible height
  const heightVisible = $im.offsetHeight;
  //total height of contents
  const heightContent = $im.scrollHeight;
  //current scroll offset downward
  const offsetScroll = $im.scrollTop + heightVisible;

  if (heightContent - heightIM <= offsetScroll + 1) {
    $im.scrollTop = $im.scrollHeight;
  }
};

//Query
const query = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (msg) => {
  console.log(msg);
  const html = Mustache.render(imTemplate, {
    msg: msg.body,
    username: msg.username,
    createdOn: moment(msg.createdOn).format("h:mm a"),
  });
  $im.insertAdjacentHTML("beforeend", html);
  scroll();
});

socket.on("locationMessage", (location) => {
  console.log(location);
  const html = Mustache.render(locTemplate, {
    location: location.link,
    username: location.username,
    sharedOn: moment(location.sharedOn).format("h:mm a"),
  });
  $im.insertAdjacentHTML("beforeend", html);
  scroll();
});

socket.on("participants", ({ room, present }) => {
  console.log(present, room);
  const html = Mustache.render(sideTemplate, { room, present });
  $list.innerHTML = html;
  scroll();
});

$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $chatSendBtn.setAttribute("disabled", "disabled");

  const broadcast = e.target.elements.broadcast.value;
  socket.emit("sendBroadcast", broadcast, (err) => {
    $chatSendBtn.removeAttribute("disabled");
    $chatInput.value = "";
    $chatInput.focus();
    if (err) {
      return console.log(err);
    }
    console.log("message delivered");
  });
});

$locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported on your browser:/");
  }
  $locationBtn.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    const location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };
    socket.emit("sendLocation", location, (ack) => {
      console.log(ack);
      $locationBtn.removeAttribute("disabled");
    });
  });
});

socket.emit("start", query, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

// socket.on("countChanged", (count) => {
//   console.log("Count was updated");
//   console.log(count);
// });

// document
//   .querySelector("#add")
//   .addEventListener("click", () => socket.emit("add"));
