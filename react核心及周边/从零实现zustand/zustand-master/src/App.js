import { create } from "./zustand";
import { persist, createJSONStorage } from "./zustand/middleware/persist";
import logger from "./zustand/middleware/logger";
import { immer } from "./zustand/middleware/immer";

const createState = (set) => {
  return {
    number: 0,
    name: "Number",
    // add: () => set((state) => ({ number: state.number + 1 })),
    // minus: () => set((state) => ({ number: state.number - 1 })),
    add: () =>
      set((state) => {
        state.number += 1;
      }),
    minus: () =>
      set((state) => {
        state.number -= 1;
      }),
    // asyncAdd: () => {
    //   setTimeout(() => {
    //     set((state) => ({ number: state.number + 1 }));
    //   }, 1000);
    // },
    asyncAdd: () => {
      const number = get().number + 5;
      setTimeout(() => {
        set({ number });
      }, 1000);
    },
    asyncMinus: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      set((state) => ({ number: state.number - 1 }));
    },
    //请求一个接口，返回一个数字
    asyncReq: async () => {
      const result = await fetch("url").then((res) => res.json());
      set({ number: result });
    },
  };
};

const useStore = create(
  logger(
    persist(immer(createState), {
      name: "counter",
      storage: createJSONStorage(sessionStorage),
    })
  )
);

function App() {
  const { number, add } = useStore((state) => ({
    number: state.number,
    add: state.add,
  }));

  return (
    <div>
      <p>{number}</p>
      <button onClick={add}>+</button>
    </div>
  );
}

// function App() {
//   const { number, name, add, minus, asyncAdd } = useStore();

//   return (
//     <div>
//       <p>
//         {name}:{number}
//       </p>
//       <button onClick={add}>+</button>
//       <button onClick={minus}>-</button>
//       <button onClick={asyncAdd}>asyncAdd</button>
//     </div>
//   );
// }

export default App;
