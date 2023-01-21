export interface Transaction{
    id: number
    walletId: string,
    token: string,
    amount: number,
    type: string,
    startDate: Date,
    buyingPrice: number,
    currentPrice: number,
    profit: number
}