import { create } from './zustand';
import logger from './zustand/middleware/logger';
import { persist, createJSONStorage } from './zustand/middleware/persist';
import { immer } from './zustand/middleware/immer';
/**
 * 创建状态管理器或者说仓库
 */
//先定义一个状态的函数，执行它可以返回初始状态
const createState = (set, get, api) => {
	return {
		a: 1,
		b: 2,
		number: 0,
		number2: 0,
		name: 'Number',
		add: () => set(state => {
			state.number += 1;
		}),
		minus: () => set(state => {
			state.number -= 1;
		}),
		asyncAdd: () => {
			const number = get().number + 5;
			setTimeout(() => {
				set({ number })
			}, 1000);
		},
		asyncMinus: async () => {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve()
				}, 1000);
			})
			set(state => ({ number: state.number - 1 }))
		},
		//请求一个接口，返回一个数字
		asyncReq: async () => {
			const result = await fetch('url').then(res => res.json());
			set({ number: result })
		},
	}
}
//把createState方法传递给create方法
//先创建仓库，也就是状态管理器，然后返回一个自定义hook,调用这个自定义hook可以获取最新的状态
const useStore = create(
	immer(createState)
);

function App() {
	const { number, name, add, minus, asyncAdd, asyncMinus } = useStore(
		state => ({
			number: state.number,
			add: state.add,
			c: state.a + state.b
		})
	);
	return (
		<div>
			<p>{name}:{number}</p>
			<button onClick={add}>+</button>
		</div>
	);
}
/* function App2() {
	const { number, name, add, minus, asyncAdd } = useStore();
	return (
		<div>
			<p>{name}:{number}</p>
			<button onClick={add}>+</button>
			<button onClick={minus}>-</button>
			<button onClick={asyncAdd}>asyncAdd</button>
		</div>
	);
} */

export default App;
