export function CustomOverlay(position, type, onClick) {
  this.type = type;
  this.position = position;
  this.onClick = onClick;
}

export enum PlantsType {
  TYPE_TREE,
  TYPE_FLOWER,
  TYPE_GRASS
}

const qq = (window as any).qq;
CustomOverlay.prototype = new qq.maps.Overlay();
//定义construct,实现这个接口来初始化自定义的Dom元素
CustomOverlay.prototype.construct = function () {
  var icon = this.icon = document.createElement("i");
  var div = this.div = document.createElement("div");
  var iconStyle = this.icon.style;
  var divStyle = this.div.style;
  switch (this.type) {
    case PlantsType.TYPE_TREE:
      icon.classList.add("iconfont", "icon-tree");
      break;
    case PlantsType.TYPE_FLOWER:
      icon.classList.add("iconfont", "icon-flower");
      break;
    case PlantsType.TYPE_GRASS:
      icon.classList.add("iconfont", "icon-grass");
      break;
  }

  div.classList.add('icon-wrapper')
  icon.classList.add('icon')


  //将dom添加到覆盖物层
  var panes = this.getPanes();
  //设置panes的层级，overlayMouseTarget可接收点击事件
  panes.overlayMouseTarget.appendChild(div);
  div.appendChild(icon)

  var self = this;
  this.icon.onclick = function () {
    alert(self.type);
  }
}
//实现draw接口来绘制和更新自定义的dom元素
CustomOverlay.prototype.draw = function () {
  var overlayProjection = this.getProjection();
  //返回覆盖物容器的相对像素坐标
  var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
  var divStyle = this.div.style;
  divStyle.left = pixel.x - 12 + "px";
  divStyle.top = pixel.y - 12 + "px";
}
//实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
CustomOverlay.prototype.destroy = function () {
  this.div.onclick = null;
  this.div.parentNode.removeChild(this.div);
  this.div = null
}
