const payoutList = [
  {
    symbol: "🍋",
    payout: 5,
  },
  {
    symbol: "🍀",
    payout: 10,
  },
  {
    symbol: "🃏",
    payout: 15,
  },
  {
    symbol: "🔮",
    payout: 20,
  },
  {
    symbol: "🍉",
    payout: 25,
  },
  {
    symbol: "7️⃣",
    payout: 30,
  },
  {
    symbol: "🍌",
    payout: 35,
  },
  {
    symbol: "🍒",
    payout: 40,
  },
  {
    symbol: "🍏",
    payout: 45,
  },
  {
    symbol: "💎",
    payout: 50,
  },
  {
    symbol: "🎩",
    payout: 60,
  },
  {
    symbol: "💰",
    payout: 70,
  },
  {
    symbol: "🎲",
    payout: 80,
  },
  {
    symbol: "👑",
    payout: 90,
  },
  {
    symbol: "🧲",
    payout: 100,
  },
  {
    symbol: "❤️",
    payout: 120,
  },
  {
    symbol: "🍓",
    payout: 140,
  },
  {
    symbol: "🔔",
    payout: 160,
  },
  {
    symbol: "🌸",
    payout: 180,
  },
  {
    symbol: "🏆",
    payout: 200,
  },
];

const PayoutsTable = () => {
  return (
    <div>
      <h2>Payouts Table</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          {payoutList.map((el) => (
            <tr key={el.payout}>
              <td>{el.symbol}</td>
              <td>{el.payout + "x"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutsTable;
