export interface IProductItem {
  id?: string;
  photo: string;
  model: string;
  price: number;
  count?: number;
  isFavorite?: boolean;
  isCard?: boolean;
}
