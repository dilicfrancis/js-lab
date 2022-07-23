const a = [1, 2, 3];
const b = a;

const o = { a: 1, b: 2, c: 3 };
const p = o;

b.push(5);
console.log(a);
console.log(b);

Object.assign(p, { e: 6, f: 7 });

console.log(o);
console.log(p);
