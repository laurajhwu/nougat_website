import { createGlobalStyle } from "styled-components";
import OzCaramel from "./fonts/OzCaramel.ttf";
import Marshmallow from "./fonts/HanyiSentyMarshmallow.ttf";
import Chalk from "./fonts/HanyiSentyChalk.ttf";
import Scholar from "./fonts/HanyiSentyScholar.ttf";
import Lotus from "./fonts/HanyiSentyLotus.ttf";

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
  font-family: 'scholar';
  src: url(${Scholar})    
}

@font-face {
  font-family: 'lotus';
  src: url(${Lotus})    
}
`;

export default FontStyles;
