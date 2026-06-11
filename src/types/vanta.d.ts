// Vanta.js は型定義を同梱しないためモジュール宣言を補う
declare module "vanta/dist/vanta.net.min" {
  const effect: (options: Record<string, unknown>) => { destroy: () => void };
  export default effect;
}
declare module "vanta/dist/vanta.fog.min" {
  const effect: (options: Record<string, unknown>) => { destroy: () => void };
  export default effect;
}
