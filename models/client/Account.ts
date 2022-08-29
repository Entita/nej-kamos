export interface Account {
  _id: string,
  firstname: string | null,
  surname: string | null,
  username: string,
  password: string,
  email: string,
  phone: number | null,
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