import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Upload } from 'antd';
import React from 'react';
import http from '../../utils/http';

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

function AddForm() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (values.upload?.length > 0) {
      const { category, description, upload } = values;
      http
        .post('/api/add', {
          category,
          description,
          filename: upload[0].name,
        })
        .then((res) => {
          if (res?.data?.status && res.data.status.code === 0) {
            message.success('保存成功！');
          }
        });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="分类"
        name="category"
        rules={[{ required: true, message: '请输入分类' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="描述" name="description">
        <Input />
      </Form.Item>

      <Form.Item
        label="上传图片"
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: '请上传图片' }]}
      >
        <Upload
          accept=".png, .jpg, .jpeg"
          name="file"
          action="/api/upload"
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddForm;
