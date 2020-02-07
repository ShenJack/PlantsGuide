import React from "react";
import {FormGenerator, FormTypes} from "../../form/formGenerator";
import './index.scss'
import {apiCreatePlant, apiUpdatePlant} from "../../api/plant";
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

export function AdminForms() {
  return <div className="admin-forms">
    <FormGenerator title={'Create Plant'} formDetail={formCreatPlant} onConfirm={values => {
      debugger
      apiCreatePlant(values).then(res => {
        message.success("创建成功")
      })
    }
    }/>
    <FormGenerator title={'Update Plant'} formDetail={formCreatPlant} onConfirm={values => {
      const id = values.id;
      delete values.id;
      apiUpdatePlant(id,values).then(res => {
        message.success("更新成功")
      })
    }
    }/>
  </div>
}
