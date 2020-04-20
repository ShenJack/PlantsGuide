import React, {useState, useEffect} from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiCreatePlant, apiCreatePlantInstance, apiGetAllPlants} from "../../api/plant";
import {Button, message} from "antd";
import {appHistory} from "../../router";
import {BottomSheet} from "../../component/bottomSheet";
import {fromJS} from 'immutable'
import {getDispatch} from "../../store/dispatches";
import {STORES} from "../../store/const";
import {PlantStore} from "../../store/plants";

interface Props {
  preset?: any
}

export function AdminFormCreatePlantInstance(props: Props) {
  let [formCreatePlant, setFormCreatePlant] = useState(fromJS({
      plantId: {
        type: FormTypes.TYPE_SELECT, list: []
      },

      coverUrl: {type: FormTypes.TYPE_UPLOAD},
      vrUrl: {type: FormTypes.TYPE_UPLOAD},

      lat: {type: FormTypes.TYPE_INPUT},
      lng: {type: FormTypes.TYPE_INPUT},
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
      let plantId = formCreatePlant.get('plantId').set('list',list)
      let obj = formCreatePlant.set('plantId',plantId);
      setFormCreatePlant(obj)
    })
  }, []);
  return <div className="admin-forms">
    <div className="create-plant">
      <Button onClick={() => {
        BottomSheet.close();
        appHistory.push('/admin/forms/create')
      }}>新建植物</Button>
    </div>
    <FormGenerator title={'新建植株'} formDetail={formCreatePlant.toJS()} preset={props.preset} onConfirm={values => {
      apiCreatePlantInstance(values).then(res => {
        message.success("创建成功")
        BottomSheet.close();
        PlantStore.loadPlantInstances();
      })
    }
    }/>
  </div>
}
