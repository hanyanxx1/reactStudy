/* import React from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import "@formily/antd/dist/antd.css";
import { Form, FormItem, Input } from "@formily/antd";

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
    source: {
      title: "来源",
      type: "string",
      required: true,
      "x-decorator": "FormItem", //字段 UI 包装器组件
      "x-component": "Input", //字段 UI 组件属性
      "x-component-props": {
        placeholder: "请输入",
      },
      "x-reactions": [
        {
          target: "target", ///要操作的字段路径，支持FormPathPattern路径语法
          //代表当前字段实例，可以在普通属性表达式中使用，也能在 x-reactions 中使用
          when: "{{$self.value == '123'}}",
          fulfill: {
            state: {
              visible: true,
            },
          },
          otherwise: {
            state: {
              visible: false,
            },
          },
        },
      ],
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
 */
