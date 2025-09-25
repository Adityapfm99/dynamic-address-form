declare module 'react-load-script' {
  import * as React from 'react';
  export interface ScriptProps {
    url: string;
    onLoad?: () => void;
    onError?: () => void;
    [key: string]: any;
  }
  export default class Script extends React.Component<ScriptProps> {}
}