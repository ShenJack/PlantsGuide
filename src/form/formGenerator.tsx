import {Button, Form, Icon, Input, message, Upload} from 'antd';
import {WrappedFormUtils} from "antd/es/form/Form";
import React from 'react'
import {apiUploadImage} from "../api/upload";
import './index.scss'

interface Props {
  form: WrappedFormUtils
  formDetail: { [key: string]: FormTypes }
  onConfirm: Function
  title: string,
}

export enum FormTypes {
  TYPE_INPUT,
  TYPE_UPLOAD
}


const uploadButton = (
  <div>
    <Icon type={'plus'}/>
    <div className="ant-upload-text">Upload</div>
  </div>
);

const Wrapper = (props) => {
  let key = (props as any)['data-__field'].name
  let type = props.that.props.formDetail[key]
  return <div>
    {type === FormTypes.TYPE_INPUT && <Input value={props.value} onChange={props.onChange} placeholder={key}/>}
    {type === FormTypes.TYPE_UPLOAD &&
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
    </Upload>}
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
          <h2 style={{fontSize: '2rem'}}>{this.props.title}</h2>
        </Form.Item>
        {Object.entries(this.props.formDetail).map(([key, type]) => <Form.Item label={key}>
          {getFieldDecorator(key, {})(
            <Wrapper that={this}/>
          )}
        </Form.Item>)}
        <Form.Item>
          <Button htmlType={'submit'}>Confirm</Button>
        </Form.Item>
      </Form>
    );
  }
}

export const FormGenerator = Form.create<Props>({name: 'normal_login'})(formGenerator);