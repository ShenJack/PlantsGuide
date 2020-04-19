import React from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiCreatePlant} from "../../api/plant";
import {Button, message} from "antd";

const formCreatPlant = {
  name: {type: FormTypes.TYPE_INPUT},
  description: {type: FormTypes.TYPE_TEXTAREA},
  type: {type: FormTypes.TYPE_INPUT},
  coverUrl: {type: FormTypes.TYPE_UPLOAD},

  family: {type: FormTypes.TYPE_INPUT},
  genus: {type: FormTypes.TYPE_INPUT},

}


interface Props {
  preset?: any
}

export function AdminFormCreatePlant(props: Props) {
  return <div className="admin-forms">

    <FormGenerator title={'新建植物'} formDetail={formCreatPlant} onConfirm={values => {
      apiCreatePlant(values).then(res => {
        message.success("创建成功")
      })
    }
    }/>
  </div>
}
