import React from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiCreatePlant, apiUpdatePlant} from "../../api/plant";
import {message} from "antd";

const formUpdatePlant: { [key: string]: FormTypes } = {
  _id: FormTypes.TYPE_INPUT,
  name: FormTypes.TYPE_INPUT,
  origin: FormTypes.TYPE_INPUT,
  description: FormTypes.TYPE_INPUT,
  type: FormTypes.TYPE_INPUT,
  coverUrl: FormTypes.TYPE_UPLOAD,
  vrUrl: FormTypes.TYPE_UPLOAD,
  likes: FormTypes.TYPE_INPUT,
}

interface Props {
  isUpdate: boolean
}

export function AdminFormUpdatePlant(props: Props) {
  return <div className="admin-forms">
    <FormGenerator title={'更新植物'} formDetail={formUpdatePlant} onConfirm={values => {
      const id = values.id;
      delete values.id;
      apiUpdatePlant(id, values).then(res => {
        message.success("更新成功")
      })
    }
    }/>
  </div>
}
