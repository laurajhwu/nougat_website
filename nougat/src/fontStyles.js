import { createGlobalStyle } from "styled-components";
import OzCaramel from "./fonts/OzCaramel.ttf";
import Marshmallow from "./fonts/HanyiSentyMarshmallow.ttf";
import Chalk from "./fonts/HanyiSentyChalk 2018.ttf";
import Tea from "./fonts/SentyTEA-20190904.ttf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'caramel';
  src: url(${OzCaramel})    
}
@font-face {
  font-family: 'marshmallow';
  src: url(${Marshmallow})    
}
@font-face {
  font-family: 'chalk';
  src: url(${Chalk})    
}

@font-face {
  font-family: 'tea';
  src: url(${Tea})    
}
`;

export default FontStyles;
