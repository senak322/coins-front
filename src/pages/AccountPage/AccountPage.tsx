export default function AccountPage() {
  return (
    <div>
      <h1>Личный кабинет</h1>
      <form>
        <div>
          <label>Логин:</label>
          <input type="text" />
        </div>
        <div>
          <label>Фамилия:</label>
          <input type="text" />
        </div>
        <div>
          <label>Имя:</label>
          <input type="text" />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
