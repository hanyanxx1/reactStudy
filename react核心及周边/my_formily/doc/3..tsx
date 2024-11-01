import { FormPath } from "@formily/core";

// import { createForm } from "@formily/core";

// const form = createForm();
// const field = form.createField({ name: "target" });

// console.log(form);
// console.log(field);

const target = { array: [] };
FormPath.setIn(target, "a.b.c", "dotValue");
console.log(FormPath.getIn(target, "a.b.c"));

//下标路径 对于数组路径，都会有下标，我们的下标可以用点语法，也可以用中括号
FormPath.setIn(target, "array.0.d", "arrayValue");
console.log(FormPath.getIn(target, "array.0.d")); //arrayValue

FormPath.setIn(target, "parent.[f,g]", [1, 2]);
console.log(JSON.stringify(target));
