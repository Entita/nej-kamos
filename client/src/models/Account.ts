export interface Account {
  _id: string,
  username: string,
  password: string,
  email: string,
  phone: number,
  verified: boolean,
  roles: Array<string>,
  basketId: string,
  transactionIds: Array<string>,
  address: {
    city: string,
    street: string,
    streetNumber: number,
    zip: number,
  } | null,
  notifications: {
    news: boolean,
    marketing: boolean,
  }
}