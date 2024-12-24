export default function UserAccounts() {
    return (
      <div>
        <h1>Ваши счета</h1>
        <button>Добавить счёт</button>
        <table>
          <thead>
            <tr>
              <th>Платёжная система</th>
              <th>Номер счёта</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Пример системы</td>
              <td>12345678</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  