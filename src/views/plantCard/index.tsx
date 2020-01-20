import "./index.scss";
import React from "react";
import {Button} from "antd";
import {Card} from "antd";
import {appHistory} from "../../router";

export function PlantCard() {
  return (
    <div className="plant-card">
      {/*<div className="plant-img">*/}
        <img src={img}/>
      {/*</div>*/}
      <Card
        hoverable={true}
        title={plantName}
        extra={<a href="#">More</a>}
      >
      </Card>
    </div>
  );
}

const img = require("../../assets/plants/pc_01.jpeg");
const plantName:String = "梅花";
const plantOrigin:String = "北京";
const plantDistribution:String = "";
const plantDescription:String = "\"小乔木，稀灌木，高4-10米；树皮浅灰色或带绿色，平滑；小枝绿色，光滑无毛。叶片卵形或椭圆形，叶边常具小锐锯齿，灰绿色。花单生或有时2朵同生于1芽内，直径2-2.5厘米，香味浓，先于叶开放；花萼通常红褐色，但有些品种的花萼为绿色或绿紫色；花瓣倒卵形，白色至粉红色。果实近球形，直径2-3厘米，黄色或绿白色，被柔毛，味酸；果肉与核粘贴；核椭圆形，两侧微扁。花期冬春季，果期5-6月。2n=16，24。\\n\" +\n" +
  "  \"梅原产中国南方，已有三千多年的栽培历史，无论作观赏或果树均有许多品种。许多类型不但露地栽培供观赏，还可以栽为盆花，制作梅桩。鲜花可提取香精，花、叶、根和种仁均可入药。果实可食、盐渍或干制，或熏制成乌梅人药，有止咳、止泻、生津、止渴之效。梅又能抗根线虫危害，可作核果类果树的砧木。\\n\" +\n" +
  "  \"梅花是中国十大名花之首，与兰花、竹子、菊花一起列为四君子，与松、竹并称为“岁寒三友”。在中国传统文化中，梅以它的高洁、坚强、谦虚的品格，给人以立志奋发的激励。在严寒中，梅开百花之先，独天下而春。\"";
const tabList = [
  {
    key: "origin",
    tab: "产地",
  },
  {
    key: "distribution",
    tab: "分布",
  },
  {
    key: "description",
    tab: "描述"
  },
];
const contentList = {
  origin: <p>{origin}</p>,
  distribution: <p>{plantDistribution}</p>,
  description: <p>{plantDescription}</p>
};
