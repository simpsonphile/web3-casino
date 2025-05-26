import styles from "./index.module.scss";
import KeyboardKey from "../UI/KeyboardKey";
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
          <tr>
            <td>🍒</td>
            <td>10x</td>
          </tr>
          <tr>
            <td>🍋</td>
            <td>20x</td>
          </tr>
          <tr>
            <td>🍊</td>
            <td>50x</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayoutsTable;
