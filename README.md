# tiny-emit

![Dependencies Status](https://david-dm.org/tur-nr/node-tiny-emit.svg)
[![Build Status](https://travis-ci.org/tur-nr/node-tiny-emit.svg?branch=master)](https://travis-ci.org/tur-nr/node-tiny-emit)
[![Coverage Status](https://coveralls.io/repos/github/tur-nr/node-tiny-emit/badge.svg?branch=master)](https://coveralls.io/github/tur-nr/node-tiny-emit?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


Another event emitter, only tiny.

## Install

_Yarn_

```sh
yarn add tiny-emit
```

_NPM_

```sh
npm install --save-dev tiny-emit
```

## Usage

```javascript
import tiny from 'tiny-emit';

const emitter = tiny();

emitter.on('foo', (bar) => {
    console.log(bar); // bar
});

emitter.emit('foo', 'bar');
```

### Once

```javascript
let i = 0;

emitter.once('incr', () => (i += 1));

emitter.emit('incr');
emitter.emit('incr');

console.log(i); // 1
```

### Off

There is many ways to switch off a listener for an event. Call the listeners off function returned whenever the listener was added. This works for both `.on()` and `.once()` methods.

```javascript
const off = emitter.on('foo', () => {});
off();
```

Or use the `.off()` method on the emitter.

```javascript
emitter.off('foo', listener); // specific event and listener
emitter.off('foo');           // all listeners for given event
emitter.off();                // every listener for every event
```

## API

#### `#tiny()`

_Returns an emitter object._

### Emitter Object

#### `.on(<event>, <fn>)`

- `event` _String_ The event name.
- `fn` _Function_ The listener function.

_Returns an off Function._

#### `.once(<event>, <fn>)`

- `event` _String_ The event name.
- `fn` _Function_ The listener function.

_Returns an off Function._

#### `.off([event, [fn]])`

- `event` _String_ The event name.
- `fn` _Function_ The listener function.

_Returns void._

#### `.emit(<event>, [...args])`

- `event` _String_ The event name.
- `...args` _Any_ Optional arguments to pass.

_Returns void._

## License

[MIT](LICENSE)

Copyright (c) 2017 [Christopher Turner](https://github.com/tur-nr)
