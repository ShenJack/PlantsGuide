import React, {useEffect, useState} from "react";
import "./index.scss";
import {PlantsList} from "../plantsList";
import {BackButton} from "../buttons/backButton";
import {HeaderIcon} from "../plantsList/headerIcon";
import {fetchPlants, isPlantLiked, PlantStore} from "../../store/plants";
import {useStore} from "../../store";
import {STORES} from "../../store/const";
import {SearchBar} from "../searchBar";

function search() {
  return;
}


export function List() {
  let [plantStore, dispatch] = useStore(STORES.PLANT_STORE);
  let inputed = false;


  let [likedPlants, setLikedPlants] = useStore(STORES.PLANT_STORE);

  useEffect(() => {
    fetchPlants()
  }, []);


  plantStore.plants.forEach(item => {
    console.log('liked ' + isPlantLiked(item._id));
    item.liked = isPlantLiked(item._id)
  });

  return (
    <div className="list">
      <div className="title">
        <div className="back">
          <BackButton backHistory="menu"/>
        </div>
        <div className="header">
          <div className="header-icon">
            <HeaderIcon/>
          </div>
          植物列表
        </div>
      </div>
      <div className="search">
        <SearchBar/>
      </div>
      {/*<div className="filter">*/}
      {/*  <input id="plant-search" type="text" placeholder="检索.." onClick={() => {*/}
      {/*    if(inputed){*/}
      {/*      document.getElementById('plant-search').classList.add("active");*/}
      {/*      inputed = !inputed;*/}
      {/*    } else {*/}
      {/*      document.getElementById('plant-search').classList.remove("active");*/}
      {/*      inputed = !inputed;*/}
      {/*    }*/}
      {/*  }}/>*/}
      {/*    <div className="filter-icon" onClick={() => search()}>*/}
      {/*      <svg className="icon" viewBox="0 0 1024 1024" version="1.1"*/}
      {/*           xmlns="http://www.w3.org/2000/svg" p-id="2790">*/}
      {/*        <path*/}
      {/*          d="M932.140361 933.699368c-32.619932 32.832779-85.518722 32.832779-118.160143 0L666.508491 785.285177c-60.631916 39.089273-132.315538 62.448284-209.680557 62.448284-215.337393 0-389.92571-175.666882-389.92571-392.398018C66.902224 238.617609 241.490541 62.936401 456.827935 62.936401c215.362976 0 389.926734 175.681208 389.926734 392.399041 0 77.862345-23.203468 149.993153-62.08194 211.024158l147.46661 148.413168C964.785875 847.630107 964.785875 900.845099 932.140361 933.699368zM456.827935 175.049828c-153.809061 0-278.522458 125.491109-278.522458 280.285614 0 154.805762 124.713396 280.284591 278.522458 280.284591 153.834644 0 278.521434-125.478829 278.521434-280.284591C735.350392 300.540937 610.662579 175.049828 456.827935 175.049828z"*/}
      {/*          p-id="2791" fill="#cdcdcd"></path>*/}
      {/*      </svg>*/}
      {/*    </div>*/}
      {/*</div>*/}
      <div className="plants">
        <PlantsList plants={plantStore.plants}/>
      </div>
      {/*<div className="load-more" onClick={PlantStore.loadNextPage}>*/}
      {/*  加载更多*/}
      {/*</div>*/}
    </div>
  );
}
