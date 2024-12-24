export default function SecuritySettings() {
    return (
      <div>
        <h1>Настройки безопасности</h1>
        <form>
          <div>
            <label>Новый пароль:</label>
            <input type="password" />
          </div>
          <div>
            <label>Повторите новый пароль:</label>
            <input type="password" />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    );
  }
  