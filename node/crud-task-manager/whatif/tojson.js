const plant = {
  kind: "palm",
};

plant.toJSON = function () {
  return {};
};

console.log(JSON.stringify(plant));
