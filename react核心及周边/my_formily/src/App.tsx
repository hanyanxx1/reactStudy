import React from "react";
import { createForm, onFieldMount, onFieldValueChange } from "@formily/core";
import { createSchemaField } from "@formily/react";
import "@formily/antd/dist/antd.css";
import { Form, FormItem, Input } from "@formily/antd";

const form = createForm({
  effects() {
    onFieldMount("target", (field: any) => {
      form.setFieldState(field.query("target"), (targetState) => {
        if (field.value === "123") {
          targetState.visible = true;
        } else {
          targetState.visible = false;
        }
      });
    });
    onFieldValueChange("source", (field: any) => {
      form.setFieldState(field.query("target"), (targetState) => {
        if (field.value === "123") {
          targetState.visible = true;
        } else {
          targetState.visible = false;
        }
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: "object",
  properties: {
    source: {
      title: "来源",
      type: "string",
      required: true,
      "x-decorator": "FormItem", //字段 UI 包装器组件
      "x-component": "Input", //字段 UI 组件属性
      "x-component-props": {
        placeholder: "请输入",
      },
    },
    target: {
      title: "目标",
      type: "string",
      "x-component": "Input", //字段 UI 组件属性
      "x-component-props": {
        //字段 UI 组件属性
        placeholder: "请输入",
      },
      "x-decorator": "FormItem", //字段 UI 包装器组件
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
