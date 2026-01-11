import { Category } from "./category.interface"

export interface Expense {
    id: number
    amount: number
    date: string
    description: string
    category: Category
}