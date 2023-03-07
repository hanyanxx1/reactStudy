/* createElement:创建虚拟DOM对象 */
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol("react.element"),
    key: null,
    ref: null,
    type: null,
    props: {},
  };
  let len = children.length;
  virtualDOM.type = ele;
  if (props !== null) {
    virtualDOM.props = {
      ...props,
    };
  }
  if (len === 1) virtualDOM.props.children = children[0];
  if (len > 1) virtualDOM.props.children = children;
  return virtualDOM;
}

let styObj = {
  fontSize: "16px",
};
let x = 10;
let y = 20;
<>
  <h2 className="title" style={styObj}></h2>
  <div className="box">
    <span>{x}</span>
    <span>{y}</span>
  </div>
</>;

let result = createElement(
  React.Fragment,
  null,
  createElement("h2", {
    className: "title",
    style: styObj,
  }),
  createElement(
    "div",
    {
      className: "box",
    },
    createElement("span", null, x),
    createElement("span", null, y)
  )
);
console.log(result);
