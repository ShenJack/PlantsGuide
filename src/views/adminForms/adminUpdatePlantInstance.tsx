import React from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiUpdatePlant} from "../../api/plant";
import {message} from "antd";

const formUpdatePlantInstance = {
  plantId: {type: FormTypes.TYPE_SELECT},

  coverUrl: {type: FormTypes.TYPE_UPLOAD},
  vrUrl: {type: FormTypes.TYPE_INPUT},

  lat: {type: FormTypes.TYPE_INPUT},
  lng: {type: FormTypes.TYPE_INPUT},
}

interface Props {
  isUpdate: boolean
}

export function AdminFormsUpdatePlantInstance(props: Props) {
  // useEffect(() => {
  //
  // }, [props.plantId])
  return <div className="admin-forms">
    <FormGenerator title={'更新植物'} formDetail={formUpdatePlantInstance} onConfirm={values => {
      const id = values.id;
      delete values.id;
      apiUpdatePlant(id, values).then(res => {
        message.success("更新成功")
      })
    }
    }/>
  </div>
}
