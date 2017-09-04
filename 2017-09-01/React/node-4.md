# mochajs

Mocha（发音"摩卡"）诞生于2011年，是现在最流行的JavaScript测试框架之一，它支持多种node的assert libs，同时支持异步和同步的测试，同时支持多种方式导出结果，也支持直接在browser上跑Javascript代码测试。

所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量。

本文全面介绍如何使用Mocha，让你轻松上手。如果你以前对测试一无所知，本文也可以当作JavaScript单元测试入门。值得说明的是，除了Mocha以外，类似的测试框架还有Jasmine、Karma、Tape等，也很值得学习。

## 环境搭建


```sh
// Install with npm globally:
$ npm install --global mocha
// or as a development dependency for your project:
$ npm install --save-dev mocha

// Mocha can also be installed via Bower (bower install mocha), and is available at cdnjs.
```

## 开始使用

```sh
$ npm install mocha
$ mkdir test
$ vi test/test.js
```

```js
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

```sh
# run test
$ ./node_modules/mocha/bin/mocha
Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)
```

Set up a test script in package.json:

```json
"scripts": {
	"test": "mocha"
}
```

```sh
$ npm test
```

## 断言
所有的测试用例都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。断言库有很多种，Mocha并不限制使用哪一种。

- should.js - BDD style shown throughout these docs
- better-assert - C-style self-documenting assert()
- expect.js - expect() style assertions
- unexpected - “the extensible BDD assertion toolkit”
- chai - expect(), assert() and should-style assertions

```js
// add.js
function add(x, y) {
  return x + y;
}

module.exports = add;
```
通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js。

```js
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

上面这段代码，就是测试脚本，它可以独立执行。测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。
describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。

## 异步
