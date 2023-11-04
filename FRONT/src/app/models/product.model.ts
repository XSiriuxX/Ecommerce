export interface Product {
  productName: string;
  productDescription: string;
  stockQuantity: number;
  productPrice: number;
  categories: [];
  productImage: string;
  manufacturer: string;
  modelNumber: string;
  ratingsAndComments: [];
  promotionsAndDiscounts: {
    promotionDescription: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
  }[];
  salesHistory: {
    orderID: object;
    dateSold: Date;
  }[];
  customTags: string[];
  variantOptions: {
    optionName: string;
    optionValues: string[];
  }[];
}
