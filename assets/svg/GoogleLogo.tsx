import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const GoogleLogo = ({size = 17, background = 'white'}: {size?: number | string; background?: string}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <Rect width="16" height="16" transform="translate(0.5)" fill={background} />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.68 8.68128C16.68 8.11401 16.6291 7.56856 16.5345 7.04492H9V10.1395H13.3055C13.12 11.1395 12.5564 11.9867 11.7091 12.554V14.5613H14.2945C15.8073 13.1686 16.68 11.1176 16.68 8.68128Z"
        fill="#4285F4"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.9987 16.4995C11.1587 16.4995 12.9696 15.7832 14.2932 14.5613L11.7078 12.5541C10.9914 13.0341 10.0751 13.3177 8.9987 13.3177C6.91506 13.3177 5.15143 11.9104 4.52234 10.0195H1.84961V12.0923C3.16597 14.7068 5.87143 16.4995 8.9987 16.4995Z"
        fill="#34A853"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.52364 10.0209C4.36364 9.54093 4.27273 9.0282 4.27273 8.50093C4.27273 7.97366 4.36364 7.46093 4.52364 6.98093V4.9082H1.85091C1.30909 5.9882 1 7.21002 1 8.50093C1 9.79184 1.30909 11.0137 1.85091 12.0937L4.52364 10.0209Z"
        fill="#FBBC05"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.9987 3.68182C10.1732 3.68182 11.2278 4.08545 12.0569 4.87818L14.3514 2.58364C12.966 1.29273 11.1551 0.5 8.9987 0.5C5.87143 0.5 3.16597 2.29273 1.84961 4.90727L4.52234 6.98C5.15143 5.08909 6.91506 3.68182 8.9987 3.68182Z"
        fill="#EA4335"
      />
    </Svg>
  );
};

export default GoogleLogo;
