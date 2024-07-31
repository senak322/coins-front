import "./Exchanger.scss";

export default function Exchanger() {
  return (
    <section className="exchanger">
      {/* <div className="currency"> */}
        {/* <div className="d-flex justify-content-between mb-3">
          {title === "You give" ? (
            <>
              <CurrencyTitle title={title} />
              <CurrencySelect
                selectedCurrency={selectedCurrency}
                onCurrencyChange={onCurrencyChange}
                allCurrencies={allCurrencies}
                disabledCurrency={disabledCurrency}
                step={step}
              />
            </>
          ) : windowWidth >= 700 ? (
            <>
              <CurrencySelect
                selectedCurrency={selectedCurrency}
                onCurrencyChange={onCurrencyChange}
                allCurrencies={allCurrencies}
                disabledCurrency={disabledCurrency}
                step={step}
              />
              <CurrencyTitle title={title} />
            </>
          ) : (
            <>
              <CurrencyTitle title={title} />
              <CurrencySelect
                selectedCurrency={selectedCurrency}
                onCurrencyChange={onCurrencyChange}
                allCurrencies={allCurrencies}
                disabledCurrency={disabledCurrency}
                step={step}
              />
            </>
          )}
        </div>
        <div className="d-flex justify-content-between p-3 currency__container">
          <Input
            type="number"
            className="mx-1 currency__input"
            value={sum}
            onChange={handleChangeSum}
            disabled={step > 1}
            prefix={
              selectedCurrency === "RUB"
                ? "₽"
                : selectedCurrency === "CNY"
                ? "¥"
                : // : selectedCurrency === "IDR"
                // ? "Rp"
                // : selectedCurrency === "GEL"
                // ? "₾"
                selectedCurrency === "UAH"
                ? "₴"
                : ""
            }
          />
          <Select
            disabled={step > 1}
            value={selectedBank}
            onChange={onBankChange}
          >
            {correctBanks?.map((bank) => (
              <Select.Option key={bank.name} value={bank.name}>
                <img
                  src={bank.icon}
                  alt={bank.name}
                  className="currency__option-img"
                />
                {bank.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <span
          className={`currency__input-error ${
            instances[instanceId].inputError
              ? "currency__input-error_show"
              : "currency__input-error_hide"
          }`}
        >
          {instances[instanceId].inputError}
        </span>
      </div> */}
    </section>
  );
}
