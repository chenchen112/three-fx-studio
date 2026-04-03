export interface EffectType {
  id: number;
  name: string;
  type: 'particle' | 'light' | 'material' | 'animation';
  description: string;
}