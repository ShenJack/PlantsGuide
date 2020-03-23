import React from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiCreatePlant} from "../../api/plant";
import {message} from "antd";

const formCreatPlant: { [key: string]: FormTypes } = {
  name: FormTypes.TYPE_INPUT,
  origin: FormTypes.TYPE_INPUT,
  description: FormTypes.TYPE_INPUT,
  type: FormTypes.TYPE_INPUT,
  coverUrl: FormTypes.TYPE_UPLOAD,
  vrUrl: FormTypes.TYPE_UPLOAD,
  likes: FormTypes.TYPE_INPUT,
}


interface Props {
  isUpdate:boolean
}

export function AdminFormsCreate(props:Props) {
  return <div className="admin-forms">
    <FormGenerator title={'Create Plant'} formDetail={formCreatPlant} onConfirm={values => {
      apiCreatePlant(values).then(res => {
        message.success("创建成功")
      })
    }
    }/>
  </div>
}
