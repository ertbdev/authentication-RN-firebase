import 'styled-components/native';
import {Colors} from './types';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: Colors;
  }
}
