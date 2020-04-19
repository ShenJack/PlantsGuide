import "./index.scss";
import React,{useState} from "react";
import {Button} from "antd";
import {Card} from "antd";
import {appHistory} from "../../router";

export function PlantCard() {
  // const [animated, setAnimated] = useState(false);
  let animated = false;
  return (
    <div className="plant-card">
        <img className="plant-card-img" src={img}
             // onClick={() => {
             //   if(animated == false){
             //     document.getElementsByClassName("plant-card-img")[0].className += ' click';
             //     animated = !animated;
             //   } else {
             //     document.getElementsByClassName("plant-card-img")[0].className = 'plant-card-img';
             //     animated = !animated;
             //   }
             // }}
        />
      <div className="plant-details">
        <TabsCard />
      </div>
    </div>
  );
}

const img = require("../../assets/plants/pc_01.jpeg");
const plantName:String = "梅花";
const plantOrigin:String = "北京";
const plantDistribution:String = "";
const plantDescription:String = "小乔木,稀灌木，高4-10米；树皮浅灰色或带绿色，平滑；小枝绿色，光滑无毛。叶片卵形或椭圆形，叶边常具小锐锯齿，灰绿色。花单生或有时2朵同生于1芽内，直径2-2.5厘米，香味浓，先于叶开放；花萼通常红褐色，但有些品种的花萼为绿色或绿紫色；花瓣倒卵形，白色至粉红色。果实近球形，直径2-3厘米，黄色或绿白色，被柔毛，味酸；果肉与核粘贴；核椭圆形，两侧微扁。花期冬春季，果期5-6月。\n";
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
  origin: <p>{plantOrigin}</p>,
  distribution: <p>{plantDistribution}</p>,
  description: <p>{plantDescription}</p>
};

class TabsCard extends React.Component {
  state = {
    key : 'origin'
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({[type]:key})
  };

  render(){
    return(
      <div>
        <Card
          style={{height: '400px'}}
          hoverable={true}
          title={plantName}
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </div>
    )
  }
}


