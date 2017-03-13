export default () => {
	let listeners = {};

	const slice = (args, start, end) => Array.prototype.slice.call(args, start, end);

	const get = (name) => listeners[name] = (listeners[name] || []);

	const createOff = (name, fn) => () => {
		const fns = get(name);
		const i = fns.indexOf(fn);
		if (i !== -1) fns.splice(i, 1);
	};

	const on = (name, fn) => {
		get(name).push(fn);
		return createOff(name, fn);
	};

	return {
		on,
		once(name, fn) {
			const off = on(name, function() {
				fn.apply(undefined, arguments);
				off();
			});
			return off;
		},
		emit: function emit(name) {
			get(name).forEach(fn => fn.apply(undefined, slice(arguments, 1)));
		},
		off(name, fn) {
			if (!name) listeners = {};
			else if (fn) createOff(name, fn)();
			else listeners[name] = [];
		}
	};
};
