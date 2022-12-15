export interface Transaction{
    id: number
    walletId: string,
    token: string,
    amount: number,
    type: string
    date: Date
}