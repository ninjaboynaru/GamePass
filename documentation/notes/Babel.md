## [New Things About Babel 6](http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/)
1.**babel** npm package no longer exists. Babel has been split into multiple packages:
	- **babel-cli**, which contains the babel command line interface
	- **babel-core**, which contains the Node API and require hook
	- **babel-polyfill**, which when required, sets you up with a full ES2015-ish environment
---
2.Every single transform is now a plugin, including ES2015 and JSX. *As a result, nothing happens by default.*
	- So you’ll need to install the correct plugins
---
3.Babel 6 adds presets, or collections of plugins.  
And it provides two presets for the functionality provided by default in Babel 5
>  npm install babel-preset-es2015 babel-preset-react --save-dev  

---
4.Stage 0 is now a separate preset, not an option.
	- Previously, you enabled ES7 features like decorators and async/await by passing --stage 0 to babel.
	- Now, you install and load the babel-preset-stage-0 package.
---