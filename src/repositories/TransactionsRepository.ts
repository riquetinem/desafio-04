import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const income = this.transactions.map(transaction);

    const income = this.transactions.reduce((previousValue, transaction) => {
      return (
        previousValue + (transaction.type === 'income' ? transaction.value : 0)
      );
    }, 0);

    const outcome = this.transactions.reduce((previousValue, transaction) => {
      return (
        previousValue + (transaction.type === 'outcome' ? transaction.value : 0)
      );
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance || null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
