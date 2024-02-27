const text1 =
  "Each and every Tuesday, at the beginning of the day, we hold a staff meeting. At the Tuesday staff meeting, you will need to make a report on the past weeks progress, and you will receive assignments for the following Tuesday. Just be aware that somedays this Tuesday meeting might not occur. When that happens, we will make an announcement.";

console.log(text1.replace(/\b\w{1,}day\b/g, "Monday"));
//OR
console.log(text1.replace(/\b[mtwtfs][a-z]{1,4}[nsir]day\b/gi, "Monday"));
