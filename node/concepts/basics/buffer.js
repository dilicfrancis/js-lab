const buf = new Buffer("Pookie", "utf8"); //utf8 is default when encoding is not provided
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[2]);

buf.write("Hou");
console.log(buf.toString());
