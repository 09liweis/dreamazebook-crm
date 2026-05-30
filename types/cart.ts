import { ResultImage } from "./order";

export interface FaceImage {
  url: string;
  original_name?: string;
  mime?: string;
  path?: string | null;
}

export interface CartItem {
  id: number;
  name?: string;
  format?: string;
  box?: string;
  image?: string;
  price?: number;
  quantity: number;
  total_price?: number;
  unit_price?: number;
  product_name?: string;
  product_image?: string;
  picbook_name?: string;
  picbook_cover?: string;
  message?: string;
  status: string;
  sku_code?: string;
  created_at?: string;
  updated_at?: string;
  result_images?: ResultImage[];
  customization_data?: {
    face_images?: FaceImage[];
    [key: string]: any;
  };
}
