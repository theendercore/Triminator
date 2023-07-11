const emptyPackData: PackContextData = {
  name: "",
  namespace: "",
  description: "",
  patterns: [],
  materials: [],
};
const getEmptyPack = (): PackContextData =>
  JSON.parse(JSON.stringify(emptyPackData));

export { getEmptyPack };
