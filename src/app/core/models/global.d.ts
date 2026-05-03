// ========== Auth ==========
interface IuserData {
  name?: string;
  email: string;
  password: string;
  rePassword?: string;
  phone?: string;
}

interface UserDataResponse {
  message: string;
  token: string;
}

interface Itoken {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

// ========== Orders ==========
interface Iorders {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: OrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

interface OrderCartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// ========== Products ==========
interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

interface IproductDetails extends Product {
  description: string;
  price: number;
  images: string[];
}

interface ProductDetailsResponse {
  data: IproductDetails;
}

// ========== Categories ==========
interface Icategories {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface IcategoriesResponse {
  data: Icategories[];
}

// ========== Brands ==========
interface Ibrands {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// ========== Cart ==========
interface CartDetails {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
}

interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface CartDataResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: CartDetails;
}

interface CartDetailsResponse {
  status: string;
  numOfCartItems: number;
  data: CartDetails;
}

interface PaymentDetailsResponse {
  status: string;
  session: any;
}

interface CashPaymentResponse {
  status: string;
  data: Iorders;
}
