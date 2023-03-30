import React from "./react";
import ReactDOM from "./react-dom";
const root = document.getElementById("root");

//1. key相同，类型相同，复用老节点，只更新属性
document.querySelector("#single1").addEventListener("click", () => {
  let element = (
    <div key="title" id="title">
      title
    </div>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#single1Update").addEventListener("click", () => {
  let element = (
    <div key="title" id="title2">
      title2
    </div>
  );
  ReactDOM.render(element, root);
});

//2.key相同,类型不同，删除老节点，添加新节点
document.querySelector("#single2").addEventListener("click", () => {
  let element = (
    <div key="title" id="title">
      title
    </div>
  );
  ReactDOM.render(element, root);
});

//2.复用老节点，只更新属性
document.querySelector("#single2Update").addEventListener("click", () => {
  let element = (
    <p key="title" id="title">
      p
    </p>
  );
  ReactDOM.render(element, root);
});

//3.类型相同,key不同,删除老节点，添加新节点
document.querySelector("#single3").addEventListener("click", () => {
  let element = (
    <div key="title1" id="title">
      div
    </div>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#single3Update").addEventListener("click", () => {
  let element = (
    <div key="title2" id="title">
      title
    </div>
  );
  ReactDOM.render(element, root);
});

//4.原来多个节点，现在只有一个节点
document.querySelector("#single4").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C">C</li>
    </ul>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#single4Update").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="B" id="B2">
        B2
      </li>
    </ul>
  );
  ReactDOM.render(element, root);
});

//多节点
//5.多个节点的数量，类型和key全部相同，只更新属性
document.querySelector("#multi1").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C" id="C">
        C
      </li>
    </ul>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#multi1Update").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <p key="B" id="B2">
        B2
      </p>
      <li key="C" id="C2">
        C2
      </li>
    </ul>
  );
  ReactDOM.render(element, root);
});

//6.多个节点的类型和key全部相同，有新增元素
document.querySelector("#multi2").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C">C</li>
    </ul>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#multi2Update").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B2">
        B2
      </li>
      <li key="C">C</li>
      <li key="D">D</li>
    </ul>
  );
  ReactDOM.render(element, root);
});

//7.多个节点的类型和key全部相同，有删除元素
document.querySelector("#multi3").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C">C</li>
    </ul>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#multi3Update").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B2">
        B2
      </li>
    </ul>
  );
  ReactDOM.render(element, root);
});

//9.多个节点数量不同、key不同
document.querySelector("#multi5").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="B" id="B">
        B
      </li>
      <li key="C">C</li>
      <li key="D">D</li>
      <li key="E">E</li>
      <li key="F">F</li>
    </ul>
  );
  ReactDOM.render(element, root);
});

document.querySelector("#multi5Update").addEventListener("click", () => {
  let element = (
    <ul key="ul">
      <li key="A">A</li>
      <li key="C">C</li>
      <li key="E">E</li>
      <li key="B" id="B2">
        B2
      </li>
      <li key="G">G</li>
      <li key="D">D</li>
    </ul>
  );
  ReactDOM.render(element, root);
});
