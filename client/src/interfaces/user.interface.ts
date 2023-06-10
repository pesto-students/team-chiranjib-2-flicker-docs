export interface User {
  _id?: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  token: string;
  documents?: Array<string>;
  sharedDocuments?: Array<string>;
  subscription?: {
    subscriptionId: string;
    customerId: string;
    priceId: string;
    amount: number;
    currency: string;
    created: number;
    current_period_start: number;
    current_period_end: number;
  };
}

export interface Document {
  _id?: string;
  name: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
  data?: string;
}
