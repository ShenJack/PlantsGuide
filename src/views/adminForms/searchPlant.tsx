import {FormGenerator, FormTypes} from "../../form/formGenerator";
import {apiCreatePlantInstance, apiGetAllPlants, apiSearchPlants} from "../../api/plant";
import {Button, message} from "antd";
import React from "react";
import {useEffect, useState} from "react";
import {fromJS} from "immutable";
import {BottomSheet} from "../../component/bottomSheet";
import {appHistory} from "../../router";
import {fetchPlants, PlantStore} from "../../store/plants";
import {PlantType} from "../../utils/const";
import {AppStore} from "../../store/app";
import {App} from "../../App";

export function FormSearchPlant() {
  let [formSearchPlant, setFormSearchPlant] = useState(fromJS({
      type: {
        type: FormTypes.TYPE_SELECT, list: Object.keys(PlantType).map(key => ({
          key: key,
          value: PlantType[key]
        }))
      },

      family: {type: FormTypes.TYPE_INPUT},
      genus: {type: FormTypes.TYPE_INPUT},

      name: {type: FormTypes.TYPE_INPUT},
    }
  ));
  useEffect(() => {
    apiGetAllPlants().then(res => {
      let list = res.data.plants.map(item => {
        return {
          key: item._id,
          value: item.name
        }
      });
      let plantId = formSearchPlant.get('plantId').set('list', list)
      let obj = formSearchPlant.set('plantId', plantId);
      setFormSearchPlant(obj)
    })
  }, []);
  return <div className="admin-forms">
    <FormGenerator title={'检索'} formDetail={formSearchPlant.toJS()} onConfirm={values => {
      AppStore.showLoading("正在检索")
      fetchPlants(values).then(AppStore.cancelLoading)
    }
    }/>
  </div>
}
