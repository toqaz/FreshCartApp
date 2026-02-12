interface PaymentDetailsResponse {
  status: string;
  session: PaymentDetails;
}

interface PaymentDetails {
  url: string;
  success_url: string;
  cancel_url: string;
}
