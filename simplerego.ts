contract SimpleContract {
  private balances: Map<string, number> = new Map<string, number>();

  constructor() {
  }

  function deposit(): void {
    const sender: string = msg.sender;
    const value: number = msg.value;

    if (value > 0) {
      if (balances.has(sender)) {
        balances.set(sender, balances.get(sender) + value);
      } else {
        balances.set(sender, value);
      }
    }
  }

  function withdraw(amount: number): void {
    const sender: string = msg.sender;

    if (amount > 0 && balances.has(sender)) {
      const balance: number = balances.get(sender);

      if (amount <= balance) {
        balances.set(sender, balance - amount);
        msg.sender.transfer(amount);
      }
    }
  }

  function getBalance(): number {
    const sender: string = msg.sender;

    if (balances.has(sender)) {
      return balances.get(sender);
    } else {
      return 0;
    }
  }
}
