export function getKeyName(key) {
  return keyNames[key] || key;
}
const keyNames = {
  type:"类型",
  coverUrl:'图片',
  family:'科',
  genus:'属',
  name:'名称',
  description:'描述',
}
