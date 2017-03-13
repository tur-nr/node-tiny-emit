import tinyEmit from '../src';

describe('#tinyEmit()', () => {
	const emitter = tinyEmit();

	it('should have event emitter on interface', () => {
		expect(typeof emitter.on).toBe('function');
	});

	it('should have event emitter once interface', () => {
		expect(typeof emitter.once).toBe('function');
	});

	it('should have event emitter off interface', () => {
		expect(typeof emitter.off).toBe('function');
	});

	it('should have event emitter emit interface', () => {
		expect(typeof emitter.emit).toBe('function');
	});

	describe('.on()', () => {
		const listener = jest.fn();
		let off;

		beforeEach(() => {
			listener.mockReset();
		});

		it('should add event listener', () => {
			off = emitter.on('foo', listener);
			emitter.emit('foo');

			expect(listener).toHaveBeenCalled();
		});

		it('should return off function for listener', () => {
			off();
			emitter.emit('foo');

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('.once()', () => {
		const listener = jest.fn();

		beforeEach(() => {
			listener.mockReset();
		});

		it('should add event listener once', () => {
			emitter.once('foo', listener);
			emitter.emit('foo');
			emitter.emit('foo');

			expect(listener.mock.calls.length).toBe(1);
		});

		it('should return off function for once listener', () => {
			emitter.once('foo', listener)();
			emitter.emit('foo');

			expect(listener).not.toHaveBeenCalled();
		});
	});

	describe('.off()', () => {
		it('should remove listener with name and function from emitter', () => {
			const listener = jest.fn();
			emitter.on('foo', listener);
			emitter.off('foo', listener);
			emitter.emit('foo');

			expect(listener).not.toHaveBeenCalled();
		});

		it('should remove listeners with name from emitter', () => {
			const listener = jest.fn();
			emitter.on('foo', listener);
			emitter.off('foo');
			emitter.emit('foo');

			expect(listener).not.toHaveBeenCalled();
		});

		it('should remove all listeners from emitter', () => {
			const listener = jest.fn();
			emitter.on('foo', listener);
			emitter.off();
			emitter.emit('foo');

			expect(listener).not.toHaveBeenCalled();
		});

		it('should not remove anything not found', () => {
			const listener = jest.fn();
			emitter.on('foo', listener);
			emitter.off('foo', jest.fn());
			emitter.emit('foo');

			expect(listener).toHaveBeenCalled();
		});
	});

	describe('.emit()', () => {
		it('should emit event with args', () => {
			const listener = jest.fn();
			emitter.on('foo', listener);
			emitter.emit('foo', 1, true, 'bar');

			expect(listener).toHaveBeenCalledWith(1, true, 'bar');
		});
	});
});
