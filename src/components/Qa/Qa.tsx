import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Qa.scss";

export default function Qa() {
  return (
    <section className="qa">
      <h2>Q&A</h2>
      <div className="qa__container">
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Сколько по времени обрабатывается заявка?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Заявка на обмен в среднем обрабатывается в течение 30 минут после
            получения необходимого количества подтверждений в сети криптовалюты,
            или уведомления о зачислении средств от платежной системы. Однако,
            поступление средств на Ваш кошелек не всегда зависит от нас. Среднее
            время транзакции в сети Биткоин составляет до 1 часа, но из-за
            высокой загруженности сети операции могут проходить до суток.
            Количество подтверждений, необходимое для непосредственного
            зачисления средств на кошелек: В сети BTC — 2 подтверждения, BTC
            BEP20 — 4, ETH — 32, ETH BEP20 — 40, Tether TRC20 — 20, Tether BEP20
            — 40, Tether ERC20 — 32, Tether SOL — 500, Tether Polygon — 500, BNB
            — 4, TONCoin — 1, Monero — 10, TRON — 20, Dogecoin — 15, DAI — 32,
            USDC ERC20 — 32, Litecoin — 6, ETC — 300, Ripple — 1, SOL — 500,
            Cardano — 40, Polkadot — 50, Chainlink — 32, Polygon — 500, Stellar
            — 1.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Почему нужно указывать действительный телеграм аккаунт при создании
            заявки?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Telegram — это удобный способ для идентификации пользователя,
            которому принадлежит определенная заявка. Через telegram
            осуществляется связь с технической поддержкой обменного пункта, если
            по заявке возникла какая-либо проблема. Наиболее распространенные из
            них: — Была допущена ошибка в номере карты — Карта или кошелек
            недействительны — Был согласован возврат средств по какой-либо
            причине Именно через аккаунт в телеграме, указанный при создании
            заявки будет производиться дальнейшее согласование информации с
            клиентом для решения возникшей проблемы с данной заявкой.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Что будет если я указал недействительный аккаунт в заявке?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            В большинстве случаев указание недействительного ака при создании
            заявки не несет никаких негативных последствий, если не возникает
            вышеуказанных в предыдущем пункте проблем. В случае возникновения
            проблемы с заявкой, в которой была указана недействительный акк —
            будет трудно идентифицировать Вас как владельца данной заявки, что
            создает дополнительные трудозатраты, как для Вас, так и для
            сотрудников технической поддержки. Именно по этой причине многие
            обменные пункты настоятельно рекомендуют указывать действительные
            данные для связи (аккаунт в телеграм, почта, номер телефона и т.д.).
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Возможно ли отменить заявку?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            В случае, если Ваша заявка обработана, средства возврату не
            подлежат. Если заявка оплачена, но еще не выполнена, Вы можете
            вернуть свои средства (за вычетом комиссии за перевод), написав в
            службу online поддержки.
          </AccordionDetails>
        </Accordion>
        <Accordion className="custom-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="custom-details"
          >
            Для чего нужна верификация карты и что это такое?
          </AccordionSummary>
          <AccordionDetails className="custom-accordion">
            Верификация карты нужна для того, чтобы предотвратить
            несанкционированное снятие средств с карты. В последнее время
            участились случаи взлома аккаунтов интернет-банков, к сожалению,
            злоумышленникам не составляет труда сделать дубликат сим карты и
            совершить перевод средств. В связи с этим, многие обменные сервисы,
            чтобы не быть вовлеченными в подобные мошеннические схемы, ввели
            процедуру верификации карты. Верификация карты — это проверка
            принадлежности карты (или счета) её владельцу. Это обязательно
            условие, без выполнения которого, Вы не сможете обменять средства на
            нашем сервисе. Условия верификации карты просты и не требуют больших
            усилий. Для верификации необходимо сфотографировать только лицевую
            сторону вашей карты(строну где видно последние 4 цифры карты) на
            фоне нашего сайта. Процесс верификации займет несколько минут и
            требуется всего один раз на каждую новую карту. На фото должны
            читаться номер карты и имя владельца, а на заднем фоне (за картой)
            должен быть виден монитор с открытой вкладкой сайта ccbtc.ru
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}
