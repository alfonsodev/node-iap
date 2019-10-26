// Type definitions for node-iap 1.1.0
// Project: https://github.com/Wizcorp/node-iap
// Definitions by: @alfonsodev <https://github.com/alfonsodev>

type Google = "google";
type Apple = "apple";
type Amazon = "amazon";
type Roku = "roku";

export type Platform = "apple" | Google | "amazon" | "roku";
export interface Payment {
  receipt: string;
  productId: string;
  packageName: string;
  secret: string;
  subscription?: boolean;
}
export interface ApplePayment extends Payment {}
export interface GooglePayment extends Payment {
  keyObject: {};
}

export interface AmazonPayment extends Payment {
  userId: string;
}

export interface RokuPayment extends Payment {
  devToken: string;
}

export interface VerifyPaymentResponse {
  productId: string; ///Id of the product
  transactionId: string; // Id to uniquely identify transaction
  purchaseDate: number; //Date of purchase in millis
  expirationDate: number; // Date of expiration in millis
}
export interface VerifyApplePaymentResponse extends VerifyPaymentResponse {}

// https://developer.amazon.com/docs/in-app-purchasing/iap-rvs-for-android-apps.html
export interface AmazonReceipt {
  betaProduct: boolean;
  cancelDate?: number;
  parentProductId?: string;
  productId: string;
  productType: "CONSUMABLE" | "SUBSCRIPTION" | "ENTITLED";
  purchaseDate: number;
  quantity: number;
  receiptId: string;
  renewalDate?: number;
  term: string;
  termSku: string;
  testTransaction: boolean;
}

export interface ApplePurchase {
  quantity: string;
  product_id: string;
  transaction_id: string;
  original_transaction_id: string;
  purchase_date: string;
  purchase_date_ms: string;
  purchase_date_pst: string;
  original_purchase_date: string;
  original_purchase_date_ms: string;
  original_purchase_date_pst: string;
  expires_date: string;
  expires_date_ms: string;
  expires_date_pst: string;
  web_order_line_item_id: string;
  is_trial_period: string;
}
export interface AppleReceipt {
  original_purchase_date_pst: string;
  purchase_date_ms: string;
  unique_identifier: string;
  original_transaction_id: string;
  bvrs: string;
  transaction_id: string;
  quantity: string;
  unique_vendor_identifier: string;
  item_id: string;
  product_id: string;
  purchase_date: string;
  original_purchase_date: string;
  purchase_date_pst: string;
  bid: string;
  original_purchase_date_ms: string;
  in_app: ApplePurchase[];
}

export interface VerifyAmazonPaymentResponse extends VerifyPaymentResponse {
  receipt: AmazonReceipt;
  platform: Amazon;
}
export interface VerifyGooglePaymentResponse extends VerifyPaymentResponse {}
export interface VerifyRokuPaymentResponse extends VerifyPaymentResponse {}
export interface CancelSubscriptionResponse {}

// Define functions overloads for each platform
export function verifyPayment(
  platform: Amazon,
  payment: AmazonPayment,
  callback: (error: Error, response: VerifyAmazonPaymentResponse) => void
): void;

export function verifyPayment(
  platform: Apple,
  payment: ApplePayment,
  callback: (error: Error, response: VerifyApplePaymentResponse) => void
): void;

export function verifyPayment(
  platform: Google,
  payment: GooglePayment,
  callback: (error: Error, response: VerifyGooglePaymentResponse) => void
): void;

export function verifyPayment(
  platform: Roku,
  payment: RokuPayment,
  callback: (error: Error, response: VerifyRokuPaymentResponse) => void
): void;

export function verifyPayment(
  platform: Apple | Google | Roku | Amazon,
  payment: ApplePurchase | GooglePayment | RokuPayment | Amazon,
  callback: (
    error: Error,
    response:
      | VerifyAmazonPaymentResponse
      | VerifyApplePaymentResponse
      | VerifyGooglePaymentResponse
      | VerifyRokuPaymentResponse
  ) => void
): void;
export function cancelSubscription(
  platform: Google,
  payment: GooglePayment,
  callback: (error: Error, response: CancelSubscriptionResponse) => void
): void;
