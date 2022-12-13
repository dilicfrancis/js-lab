const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
view[0] = 4;
view[1] = 92;
view[2] = 34; //out of buffer space
console.log(view);
