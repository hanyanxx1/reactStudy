import React from "react";
import { createForm } from "@formily/core";
import { createSchemaField, Field } from "@formily/react";
import "@formily/antd/dist/antd.css";
import { Form, FormItem, Input, NumberPicker } from "@formily/antd";

const form = createForm();
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: "object",
  properties: {
    name: {
      title: "姓名",
      type: "string",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    age: {
      title: "邮箱",
      type: "string",
      required: true,
      "x-validator": "email",
      "x-decorator": "FormItem", //字段 UI 包装器组件
      "x-component": "Input", //字段 UI 组件属性
    },
  },
};

function App() {
  return (
    <Form form={form} labelCol={6} wrapperCol={10}>
      <SchemaField schema={schema} />
    </Form>
  );
}

export default App;
