export interface CMSData {
  logo: string;
  tax: number;
  colors: {
    white: string;
    grey: string;
    pastel: string;
    black: string;
    brand: string;
  };
  offer_banner: string;
  policy: {
    termsAndConditions: string;
    privacyPolicy: string;
    bookingPolicy: string;
    refundsAndCancellationPolicy: string;
  };
}

export interface CMSProps {
  data: CMSData;
}
