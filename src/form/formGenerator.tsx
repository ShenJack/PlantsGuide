import {Button, Form, Icon, Input, message, Select, Upload} from 'antd';
import {WrappedFormUtils} from "antd/es/form/Form";
import React, {useState,useEffect} from 'react'
import {apiUploadImage} from "../api/upload";
import './index.scss'
import TextArea from "antd/es/input/TextArea";
import {getKeyName} from "../utils/keyName";

interface Props {
  form: WrappedFormUtils
  formDetail: any
  onConfirm: Function
  title: string,
  preset?: any,
}

export enum FormTypes {
  TYPE_INPUT,
  TYPE_UPLOAD,
  TYPE_SELECT,
  TYPE_TEXTAREA,
}


const uploadButton = (
  <div>
    <Icon type={'plus'}/>
    <div className="ant-upload-text">Upload</div>
  </div>
);

const Wrapper = (props) => {
  let key = (props as any)['data-__field'].name;
  let type = props.that.props.formDetail[key].type;
  const placeholder = getKeyName(key);
  return <div>
    {type === FormTypes.TYPE_INPUT && <Input value={props.value} onChange={props.onChange} placeholder={placeholder}/>}
    {type === FormTypes.TYPE_UPLOAD &&
    <div className="img-upload">
      <Upload className={'form-upload'} showUploadList={false} customRequest={options => {
        const form = new FormData();
        form.append("image", options.file);
        apiUploadImage(form).then(res => {
          props.that.props.form.setFieldsValue({
            [key]: res.data.url,
          });
          message.success("上传成功");
        });
      }}>
        {props.value ? <img src={props.value as string} alt="avatar" style={{width: '100%'}}/> : uploadButton}
      </Upload>
      或URL
      <Input value={props.value} onChange={props.onChange} placeholder={placeholder}/>
    </div>}
    {type === FormTypes.TYPE_SELECT &&
    <Select showSearch optionFilterProp={'label'} defaultValue={props.value} style={{width: 120}}
            onChange={props.onChange}>
      {(props.that.props.formDetail[key].list || []).map(item => <Select.Option key={item.key} label={item.value}
                                                      value={item.key}>{item.value}</Select.Option>)}
    </Select>
    }
    {type === FormTypes.TYPE_TEXTAREA &&
    <TextArea value={props.value} onChange={props.onChange} placeholder={placeholder}/>}


  </div>
}

const formItemLayout = {
  labelCol: {
    xs: {span: 12},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

class formGenerator extends React.Component<Props> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onConfirm(values)
      }
    });
  };


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form {...formItemLayout} layout={"horizontal"} onSubmit={this.handleSubmit}>
        <Form.Item>
          <h2 style={{fontSize: '2rem'}}>{this.props.title}</h2>
        </Form.Item>
        {Object.entries(this.props.formDetail).map(([key, type]) => <Form.Item label={getKeyName(key)}>
          {getFieldDecorator(key, {})(
            <Wrapper that={this}/>
          )}
        </Form.Item>)}
        <Form.Item>
          <Button type={"primary"} htmlType={'submit'}>确认</Button>
          <Button style={{marginLeft:10}} onClick={() => this.props.form.resetFields()}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export const FormGenerator = Form.create<Props>({
  name: 'form_generator',
  mapPropsToFields: props => {
    const result = {};
    if(props.preset){
      Object.keys(props.preset).forEach(key => {
        result[key] = Form.createFormField({
          value: props.preset[key],
        });
      });
    }
    return result;
  }
})(formGenerator);
