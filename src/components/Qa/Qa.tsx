import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Qa.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Qa() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const translations = {
    ru: {
      title: "Вопросы и ответы",
      questions: [
        {
          question: "Сколько по времени обрабатывается заявка?",
          answer: `Заявка на обмен в среднем обрабатывается в течение 30 минут после получения необходимого количества подтверждений в сети криптовалюты,
          или уведомления о зачислении средств от платежной системы. Однако, поступление средств на Ваш кошелек не всегда зависит от нас. Среднее
          время транзакции в сети Биткоин составляет до 1 часа, но из-за высокой загруженности сети операции могут проходить до суток. Количество
          подтверждений, необходимое для непосредственного зачисления средств на кошелек: В сети BTC — 2 подтверждения, BTC BEP20 — 4, ETH — 32,
          ETH BEP20 — 40, Tether TRC20 — 20, Tether BEP20 — 40, Tether ERC20 — 32, Tether SOL — 500, Tether Polygon — 500, BNB — 4, TONCoin — 1,
          Monero — 10, TRON — 20, Dogecoin — 15, DAI — 32, USDC ERC20 — 32, Litecoin — 6, ETC — 300, Ripple — 1, SOL — 500, Cardano — 40,
          Polkadot — 50, Chainlink — 32, Polygon — 500, Stellar — 1.`,
        },
        {
          question:
            "Почему нужно указывать действительный телеграм аккаунт при создании заявки?",
          answer: `Telegram — это удобный способ для идентификации пользователя, которому принадлежит определенная заявка. Через telegram
          осуществляется связь с технической поддержкой обменного пункта, если по заявке возникла какая-либо проблема. Наиболее распространенные из
          них: — Была допущена ошибка в номере карты — Карта или кошелек недействительны — Был согласован возврат средств по какой-либо причине
          Именно через аккаунт в телеграме, указанный при создании заявки будет производиться дальнейшее согласование информации с клиентом для
          решения возникшей проблемы с данной заявкой.`,
        },
        {
          question:
            "Что будет если я указал недействительный аккаунт в заявке?",
          answer: `В большинстве случаев указание недействительного ака при создании заявки не несет никаких негативных последствий, если не возникает
          вышеуказанных в предыдущем пункте проблем. В случае возникновения проблемы с заявкой, в которой была указана недействительный акк — будет
          трудно идентифицировать Вас как владельца данной заявки, что создает дополнительные трудозатраты, как для Вас, так и для сотрудников
          технической поддержки. Именно по этой причине многие обменные пункты настоятельно рекомендуют указывать действительные данные для связи
          (аккаунт в телеграм, почта, номер телефона и т.д.).`,
        },
        {
          question: "Возможно ли отменить заявку?",
          answer: `В случае, если Ваша заявка обработана, средства возврату не подлежат. Если заявка оплачена, но еще не выполнена, Вы можете вернуть свои
          средства (за вычетом комиссии за перевод), написав в службу online поддержки.`,
        },
        {
          question: "Для чего нужна верификация карты и что это такое?",
          answer: `Верификация карты нужна для того, чтобы предотвратить несанкционированное снятие средств с карты. В последнее время участились случаи
          взлома аккаунтов интернет-банков, к сожалению, злоумышленникам не составляет труда сделать дубликат сим карты и совершить перевод средств.
          В связи с этим, многие обменные сервисы, чтобы не быть вовлеченными в подобные мошеннические схемы, ввели процедуру верификации карты.
          Верификация карты — это проверка принадлежности карты (или счета) её владельцу. Это обязательно условие, без выполнения которого, Вы не
          сможете обменять средства на нашем сервисе. Условия верификации карты просты и не требуют больших усилий. Для верификации необходимо
          сфотографировать только лицевую сторону вашей карты(строну где видно последние 4 цифры карты) на фоне нашего сайта. Процесс верификации
          займет несколько минут и требуется всего один раз на каждую новую карту. На фото должны читаться номер карты и имя владельца, а на заднем
          фоне (за картой) должен быть виден монитор с открытой вкладкой сайта ccbtc.ru.`,
        },
      ],
    },
    en: {
      title: "Q&A",
      questions: [
        {
          question: "How long does it take to process a request?",
          answer: `An exchange request is usually processed within 30 minutes after receiving the required number of confirmations in the cryptocurrency network
          or receiving a notification of funds crediting from the payment system. However, the arrival of funds to your wallet does not always depend on us.
          The average transaction time in the Bitcoin network is up to 1 hour, but due to network congestion, operations can take up to 24 hours. The number of
          confirmations required for the direct crediting of funds to the wallet: In BTC network — 2 confirmations, BTC BEP20 — 4, ETH — 32, ETH BEP20 — 40,
          Tether TRC20 — 20, Tether BEP20 — 40, Tether ERC20 — 32, Tether SOL — 500, Tether Polygon — 500, BNB — 4, TONCoin — 1, Monero — 10, TRON — 20,
          Dogecoin — 15, DAI — 32, USDC ERC20 — 32, Litecoin — 6, ETC — 300, Ripple — 1, SOL — 500, Cardano — 40, Polkadot — 50, Chainlink — 32, Polygon — 500,
          Stellar — 1.`,
        },
        {
          question:
            "Why is it necessary to specify a valid Telegram account when creating a request?",
          answer: `Telegram is a convenient way to identify the user who owns a particular request. Through telegram, communication is carried out with the
          technical support of the exchange point if there is any problem with the request. The most common problems include: — A mistake in the card number
          — The card or wallet is invalid — A refund was agreed upon for any reason. It is through the telegram account specified when creating the request that
          further coordination of information with the client will be carried out to solve the problem with the given request.`,
        },
        {
          question:
            "What happens if I specify an invalid account in the request?",
          answer: `In most cases, specifying an invalid account when creating a request has no negative consequences if none of the problems mentioned in the previous point occur. If a problem arises with the request, which contains an invalid account, it will be difficult to identify you as the owner of the request, which creates additional effort for both you and the technical support staff. This is why many exchange services strongly recommend providing valid contact details (Telegram account, email, phone number, etc.).`,
        },
        {
          question: "Is it possible to cancel a request?",
          answer: `If your request has already been processed, the funds are non-refundable. If the request is paid for but not yet completed, you can get your funds back (less the transfer fee) by contacting online support.`,
        },
        {
          question: "Why is card verification necessary and what is it?",
          answer: `Card verification is necessary to prevent unauthorized withdrawals from the card. Recently, there have been increased cases of online bank account hacks, and unfortunately, it is not difficult for fraudsters to duplicate a SIM card and transfer funds. To avoid being involved in such fraudulent schemes, many exchange services have introduced the card verification process. Card verification is the process of checking the ownership of the card (or account) by its owner. It is a mandatory requirement, without which you will not be able to exchange funds on our service. The verification requirements are simple and do not require much effort. To verify, you need to take a photo of only the front side of your card (the side where the last 4 digits are visible) with our website in the background. The verification process will take a few minutes and is only required once for each new card. The card number and the name of the owner should be visible in the photo, and in the background (behind the card), the monitor with an open tab of the website ccbtc.ru should be visible.`,
        },
      ],
    },
  };

  const { title, questions } = translations[currentLanguage];
  return (
    <section className="qa">
      <h2>{title}</h2>
      <div className="qa__container">
        {questions.map((q, index) => (
          <Accordion key={index} className="custom-details">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
              className="custom-details"
            >
              {q.question}
            </AccordionSummary>
            <AccordionDetails className="custom-accordion">
              {q.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
