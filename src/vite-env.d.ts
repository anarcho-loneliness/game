/// <reference types="vite/client" />

declare module "*.m4a" {
  const url: string
  export default url;
}

declare module "*.mp3" {
  const url: string;
  export default url;
}
