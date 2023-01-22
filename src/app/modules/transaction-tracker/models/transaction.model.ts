export interface Transaction{
    id: number
    walletId: string,
    token: string,
    amount: number,
    type: string,
    startDate: Date,
    endDate: Date,
    buyingPrice: number,
    currentPrice: number,
    sellingPrice: number,
    profit: number
}