export type DonationData = {
  row: {
    donationId: string;
    donatingUser: string;
    quantity: number;
    time: Date;
    type: string;
    isAvailable: boolean;
  };
};
