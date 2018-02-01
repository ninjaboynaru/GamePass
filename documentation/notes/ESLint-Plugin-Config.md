


In **ESLint**
- Plugins define rules
- Configs decide wich of those rules to use and to not use


## eslint-config-react
Enables eslint rules to check react code

## babel-eslint parser
Somethings that babel allows are not allowed by eslint.  
This transforms those things into that wich ESlint can understand.
> Add "parser": "babel-eslint" to the .eslintrc config file


## eslint-config-prettier
Turns off unnecessary formating rules or those that may conflict with prettier.
> i.e. it gets rid of eslint complaining about formating