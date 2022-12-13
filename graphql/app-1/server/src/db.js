//Demo Data Sources
const users = [
  {
    id: "Y4",
    name: "Pooky Hounds",
    email: "pooky@hounds.io",
    age: 36,
    // posts: ["P1", "P2"],
  },
  { id: "Y5", name: "Lucy Grass", email: "lucy@grass.org" },
  {
    id: "Y6",
    name: "Jonah Lay",
    email: "jonah@lay.com",
    age: 54,
    //posts: ["P4"],
  },
  { id: "Y7", name: "Coco Kilo", email: "coco@kilo.co", age: 24 },
  {
    id: "Y8",
    name: "Laden Ives",
    email: "laden@ives.ng",
    age: 19,
    // posts: ["P3"],
  },
];

const posts = [
  {
    id: "P1",
    title: "Arctic Circle",
    body: "It was a wonderful morning, but understating...",
    author: "Y5",
    published: true,
    // comments: ["C5"],
  },
  {
    id: "P2",
    title: "Brilliant Ice",
    body: "When the stars twinkle on ice, will you see it?",
    author: "Y5",
    published: false,
    //comments: ["C1", "C2", "C3"], //this is what the resolver handles
  },
  {
    id: "P3",
    title: "Glaciers",
    body: "Even a mammoth saw it coming...",
    author: "Y8",
    published: false,
    //comments: ["C4"],
  },
  {
    id: "P4",
    title: "Snow Peaks",
    body: "Stories about a fiery birds living the the peaks of mountains are usually false ",
    author: "Y6",
    published: true,
  },
];

const comments = [
  { id: "C1", text: "Absolutely stupendous", author: "Y4", post: "P2" },
  { id: "C2", text: "Wow! Really!", author: "Y4", post: "P2" },
  { id: "C3", text: "Meh, I've seen better.", author: "Y7", post: "P2" },
  { id: "C4", text: "This is an outrage", author: "Y5", post: "P3" },
  { id: "C5", text: "uhh?  smh", author: "Y6", post: "P1" },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
