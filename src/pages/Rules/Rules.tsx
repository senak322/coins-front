import { useSelector } from "react-redux";
import "./Rules.scss";
import { RootState } from "../../store/store";

const Rules = () => {
  const language = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  return (
    <div className="rules">
      <h1 className="rules__title">
        {language === "ru" ? "Правила" : "Terms and Conditions"}
      </h1>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru" ? "Общие положения" : "General Provisions"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "Настоящее пользовательское соглашение (далее — Соглашение, Пользовательское соглашение) регулирует отношения между Coins_change и Пользователями сайта https://ccbtc.ru/. Coins_change или Сервис – система, предоставляющая Пользователям возможность обмена криптовалюты на электронные деньги и (или) национальную валюту, а также обмен электронных денег и (или) национальной валюты на криптовалюту, расположенная и функционирующая на сайте в сети Интернет по адресу https://ccbtc.ru. (далее Сайт). Используя Сайт, регистрируя учетную запись, пользуясь услугами COINS_CHANGE, Вы соглашаетесь с тем, что что прочитали, поняли и приняли все условия, содержащиеся в настоящем Соглашении, а также в Политике конфиденциальности. В случае, если Вы не согласны с условиями Пользовательского соглашения, использование сайта Coins_change не допускается."
            : "This User Agreement (hereinafter referred to as the Agreement, User Agreement) regulates the relationship between Coins_change and Users of the website https://ccbtc.ru/. Coins_change or the Service is a system providing Users with the opportunity to exchange cryptocurrency for electronic money and/or national currency, as well as to exchange electronic money and/or national currency for cryptocurrency, located and functioning on the website at https://ccbtc.ru. (hereinafter referred to as the Site). By using the Site, registering an account, and using COINS_CHANGE services, you agree that you have read, understood, and accepted all the terms contained in this Agreement, as well as in the Privacy Policy. If you do not agree with the terms of the User Agreement, the use of Coins_change is not permitted."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "1. Термины и определения"
            : "1. Terms and Definitions"}
        </h6>
        <ul className="rules__list">
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.1. KYC & AML:" : "1.1. KYC & AML:"}
            </strong>{" "}
            {language === "ru"
              ? '"Know Your Customer" (знай своего клиента) и "Anti-Money Laundering" (противодействие отмыванию средств).'
              : '"Know Your Customer" and "Anti-Money Laundering".'}
          </li>
          <li className="rules__list-item">
            <strong>{language === "ru" ? "1.2. P2P:" : "1.2. P2P:"}</strong>{" "}
            {language === "ru"
              ? "Оверлейная компьютерная сеть, основанная на равноправии участников."
              : "An overlay computer network based on peer equality."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.3. Аккаунт:" : "1.3. Account:"}
            </strong>{" "}
            {language === "ru"
              ? "Уникальная учетная запись на сайте Сервиса, идентифицирующая Пользователя."
              : "A unique account on the Service's website identifying the User."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.4. Блокчейн:" : "1.4. Blockchain:"}
            </strong>{" "}
            {language === "ru"
              ? "Выстроенная по определённым правилам непрерывная последовательная цепочка блоков (связный список), содержащих информацию о проводках между цифровыми ключами (кошельками) пользователей, которую можно передавать от одного компьютера (человека) другому посредством сети интернет."
              : "A continuous sequential chain of blocks (linked list) built according to certain rules, containing information about transactions between users' digital keys (wallets), which can be transmitted from one computer (person) to another via the internet."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.5. Верификация банковкой карты:"
                : "1.5. Bank Card Verification:"}
            </strong>{" "}
            {language === "ru"
              ? "Проверка принадлежности банковской карты (или счета) её владельцу. Условия проверки принадлежности устанавливает Сервис, производится единовременно для каждого нового счета (банковской карты) Пользователя."
              : "Verification of the ownership of a bank card (or account) by its owner. The Service sets the conditions for verification, which is performed once for each new User account (bank card)."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.6. Заявка:" : "1.6. Application:"}
            </strong>{" "}
            {language === "ru"
              ? "Выражение намерения Пользователя воспользоваться одной из услуг, предлагаемых Сервисом, путем заполнения электронной формы через сайт Сервиса, на условиях, описанных в настоящих Правилах и указанных в параметрах этой Заявки."
              : "Expression of the User's intention to use one of the services offered by the Service by filling out an electronic form through the Service's website, under the terms described in these Rules and specified in the parameters of this Application."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.7. Криптовалюта:"
                : "1.7. Cryptocurrency:"}
            </strong>{" "}
            {language === "ru"
              ? "Bitcoin, Litecoin, Ethereum и любые иные валюты, основанные на блокчейне."
              : "Bitcoin, Litecoin, Ethereum, and any other currencies based on blockchain."}
          </li>
          <li className="rules__list-item">
            <strong>{language === "ru" ? "1.8. Курс:" : "1.8. Rate:"}</strong>{" "}
            {language === "ru"
              ? "Стоимостное соотношение криптовалюты, электронных денег и фиатной валюты между собой при обмене."
              : "The value ratio of cryptocurrency, electronic money, and fiat currency to each other during exchange."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.9. Национальная валюта (фиатная валюта):"
                : "1.9. National currency (fiat currency):"}
            </strong>{" "}
            {language === "ru"
              ? "Законные платёжные средства соответствующего государства (рубль – для Российской Федерации, тенге – для Казахстана, доллар США – для США и т.д.)."
              : "Legal tender of the respective state (ruble for the Russian Federation, tenge for Kazakhstan, US dollar for the USA, etc.)."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.10. Партнер:" : "1.10. Partner:"}
            </strong>{" "}
            {language === "ru"
              ? "Лицо, оказывающее Сервису услуги по привлечению Пользователей, условия оказания которых описаны в настоящих Правилах."
              : "A person providing services to the Service to attract Users, the terms of which are described in these Rules."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.11. Платеж:" : "1.11. Payment:"}
            </strong>{" "}
            {language === "ru"
              ? "Перевод криптовалюты, электронных денег или фиатной валюты от Пользователя к Пользователю или от Пользователя Сервису, а также в обратном направлении."
              : "The transfer of cryptocurrency, electronic money, or fiat currency from the User to another User or from the User to the Service, and vice versa."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.12. Платежная система:"
                : "1.12. Payment System:"}
            </strong>{" "}
            {language === "ru"
              ? "Программно-аппаратный продукт, разработанный третьей стороной и представляющий собой механизм реализации учета денежных обязательств и организации взаиморасчетов между своими Пользователями."
              : "A software and hardware product developed by a third party that provides a mechanism for accounting monetary obligations and organizing settlements between its Users."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.13. Пользователь:" : "1.13. User:"}
            </strong>{" "}
            {language === "ru"
              ? "Дееспособное физическое лицо старше 18 лет либо юридическое лицо, использующее услуги Сервиса."
              : "A legally capable individual over 18 years of age or a legal entity using the Service's services."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.14. Сервис:" : "1.14. Service:"}
            </strong>{" "}
            {language === "ru"
              ? "Система, предоставляющая Пользователям возможность обмена криптовалюты на электронные деньги и (или) национальную валюту, а также обмен электронных денег и (или) национальной валюты на криптовалюту, расположенная и функционирующая на сайте в сети Интернет по адресу https://ccbtc.ru"
              : "A system that provides Users with the opportunity to exchange cryptocurrency for electronic money and/or national currency, as well as to exchange electronic money and/or national currency for cryptocurrency, located and functioning on the website at https://ccbtc.ru."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.15. Сообщения:" : "1.15. Messages:"}
            </strong>{" "}
            {language === "ru"
              ? "Письма, передаваемые посредством мессенджера telegram."
              : "Messages sent via the Telegram messenger."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru" ? "1.16. Средства:" : "1.16. Funds:"}
            </strong>{" "}
            {language === "ru"
              ? "Криптовалюта, электронные деньги и фиатная валюта, в соответствии с разделом 5 настоящих Правил."
              : "Cryptocurrency, electronic money, and fiat currency, in accordance with Section 5 of these Rules."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.17. Услуги сервиса:"
                : "1.17. Service Services:"}
            </strong>{" "}
            {language === "ru"
              ? "Оказание содействия в проведении Р2Р-операций между физическими лицами по обмену криптовалют, а также иные услуги, информация о которых размещена на витрине Сервиса."
              : "Assisting in conducting P2P transactions between individuals for cryptocurrency exchange, as well as other services, information about which is posted on the Service's storefront."}
          </li>
          <li className="rules__list-item">
            <strong>
              {language === "ru"
                ? "1.18. Электронные деньги:"
                : "1.18. Electronic Money:"}
            </strong>{" "}
            {language === "ru"
              ? "Денежные средства, находящиеся на счетах Пользователей электронных платежных систем (юмани, озон и др.)."
              : "Monetary funds held in Users' accounts of electronic payment systems (YooMoney, Ozon, etc.)."}
          </li>
        </ul>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "2. Правила пользования учетной записью на сайте Coins_Change"
            : "2. Rules for Using an Account on Coins_Change Website"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "2.1. Сервис предназначен для использования исключительно в личных целях. Регистрируясь на сайте, Пользователь дает свое согласие на передачу Coins_change достоверных данных о себе в соответствии с процедурой регистрации на Сайте. Пользователь также соглашается с тем, что не будет использовать какой-либо иной аккаунт, кроме своего, а также не будет пытаться получить несанкционированный доступ к аккаунтам других пользователей либо к инфраструктуре Сервиса."
            : "2.1. The Service is intended for personal use only. By registering on the website, the User consents to provide Coins_change with accurate information about themselves in accordance with the registration procedure on the Site. The User also agrees not to use any account other than their own and not to attempt to gain unauthorized access to other users' accounts or the Service's infrastructure."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "2.2. Сервис вправе проводить дополнительные проверки информации Пользователя и запрашивать у Пользователя любую необходимую документацию по любой причине, связанной с использованием им услуг Сервиса и/или в качестве подтверждающего доказательства для любой информации, которую Пользователь предоставляет Сервису."
            : "2.2. The Service has the right to conduct additional checks of User information and request any necessary documentation from the User for any reason related to their use of the Service and/or as supporting evidence for any information provided by the User to the Service."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "2.3. Администрация Сервиса может в любое время и по своему собственному усмотрению отказать Пользователю в возможности открыть аккаунт, заблокировать его или приостановить любую транзакцию до окончания рассмотрения информации, предоставленной Пользователем."
            : "2.3. The Service administration may, at any time and at its own discretion, deny the User the ability to open an account, block it, or suspend any transaction until the information provided by the User is reviewed."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "3. Порядок оказания услуг Сервисом"
            : "3. Procedure for Providing Services by the Service"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "3.1. Заказ услуг Сервиса осуществляется Пользователем путем направления Заявки через сайт Сервиса. Воспользовавшись услугами Сервиса, Пользователь подтверждает, что законно владеет, пользуется и распоряжается криптовалютой, электронными деньгами или фиатной валютой, участвующими в соответствующем Платеже."
            : "3.1. The Service is ordered by the User by submitting an Application through the Service's website. By using the Service, the User confirms that they legally own, use, and dispose of the cryptocurrency, electronic money, or fiat currency involved in the respective Payment."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.2. Путем оформления Заявки Пользователь поручает, а Сервис от своего имени и за счет Пользователя, совершает действия по обмену криптовалюты, электронных денег или фиатной валюты с другим Пользователем."
            : "3.2. By submitting an Application, the User authorizes the Service, on their behalf and at their expense, to exchange cryptocurrency, electronic money, or fiat currency with another User."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.3. В течение отведенного регламентом времени (в зависимости от направления обмена, указывается при создании Заявки) с момента получения криптовалюты, электронных денег или фиатной валюты от Пользователя, в размере, указанном в соответствующей Заявке, Сервис обязан перечислить (передать) полученные криптовалюту, электронные деньги или фиатную валюту соответственно на реквизиты и в размере, указанные Пользователем в Заявке."
            : "3.3. Within the time specified by the regulations (depending on the exchange direction, specified when creating the Application) from the moment of receiving cryptocurrency, electronic money, or fiat currency from the User, in the amount specified in the respective Application, the Service must transfer (deliver) the received cryptocurrency, electronic money, or fiat currency to the details and in the amount specified by the User in the Application."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.4. В случае, когда в процессе обработки Заявки курс изменяется, Сервисом производится перерасчет заявки по курсу на момент поступления криптовалюты на счет либо производится возврат Средств с удержанием 2% от суммы без учета комиссии Платежной системы в эквиваленте USDT на момент фиксации курса по Заявке."
            : "3.4. If during the processing of the Application the exchange rate changes, the Service recalculates the Application based on the rate at the time the cryptocurrency is received, or refunds the Funds with a 2% deduction from the amount, excluding the Payment System fee, in USDT equivalent at the time of fixing the rate for the Application."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.5. Если в период подтверждения перевода Платежной системой возникла задержка подтверждения транзакции, Сервисом производится перерасчет Заявки по курсу на момент поступления криптовалюты на счет либо производится возврат средств с удержанием 2% от суммы без учета комиссии платежной системы в эквиваленте USDT на момент фиксации курса по Заявке."
            : "3.5. If there is a delay in transaction confirmation by the Payment System during the transfer confirmation period, the Service recalculates the Application based on the rate at the time the cryptocurrency is received, or refunds the funds with a 2% deduction from the amount, excluding the Payment System fee, in USDT equivalent at the time of fixing the rate for the Application."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.6. Сумма возврата для целей, указанных в пунктах 3.4 – 3.5 Настоящих правил, будет рассчитываться только в эквиваленте USDT."
            : "3.6. The refund amount for the purposes specified in clauses 3.4 - 3.5 of these Rules will be calculated only in USDT equivalent."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.7. Обязанность Сервиса по перечислению (передаче) криптовалюты, электронных денег или фиатной валюты Пользователю считается исполненной в момент списания криптовалюты, электронных денег, или фиатной валюты в соответствующей Платежной системе со счета Сервиса, что регистрируется в истории операций соответствующей Платежной системы."
            : "3.7. The Service's obligation to transfer (deliver) cryptocurrency, electronic money, or fiat currency to the User is considered fulfilled at the moment of debiting the cryptocurrency, electronic money, or fiat currency from the Service's account in the corresponding Payment System, which is recorded in the transaction history of the respective Payment System."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.8. Если Пользователь оплатил заявку, но в силу обстоятельств желает отказаться от обмена, то возврат Средств происходит за вычетом 5% (пяти процентов) от суммы оплаты, а также за вычетом комиссии соответствующей Платежной системы."
            : "3.8. If the User has paid for the Application but, due to circumstances, wishes to cancel the exchange, the Funds are refunded with a deduction of 5% (five percent) of the payment amount, as well as the fee of the respective Payment System."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.9. Если денежные средства от Пользователей не поступят на счёт сервиса в течение 60 минут после оформления заявки, данная заявка будет автоматически отменена, и это будет означать, что пользователь отказался от проведения обмена."
            : "3.9. If funds from Users do not arrive in the Service's account within 60 minutes after the Application is submitted, the Application will be automatically canceled, indicating that the User has withdrawn from the exchange."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.10. Если денежные средства от Пользователя поступят после того, как заявка будет отменена, то Сервис не гарантирует возврат денежных средств."
            : "3.10. If funds from the User arrive after the Application has been canceled, the Service does not guarantee a refund."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.11. Если Сервис получит от пользователя сумму средств, отличающуюся от указанной в заявке, Сервис делает перерасчет, который соответствует фактическому поступлению суммы, либо такие средства будут возвращены пользователю, с учетом вычтенной суммы на комиссионные расходы во время перевода."
            : "3.11. If the Service receives an amount of funds from the User different from the one specified in the Application, the Service recalculates the amount to match the actual receipt, or such funds are returned to the User, minus the deducted amount for commission expenses during the transfer."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.12. Если пользователь решил не проводить сделку, либо указал реквизиты, которые уже заблокированы или недействительны, у сервиса имеется полное право прекратить данную сделку после того, как на e-mail сервиса будет направлено письменное обращение от пользователя. В этом случае сервис осуществляет возврат средств пользователю исключительно по тем реквизитам, которые были указаны при создании заявки. При этом из суммы возврата будет высчитано 2% неустойки и комиссионные сборы платёжной системы."
            : "3.12. If the User decides not to proceed with the transaction or specifies details that are already blocked or invalid, the Service has the full right to terminate the transaction after receiving a written request from the User to the Service's email. In this case, the Service refunds the funds to the User exclusively to the details specified when creating the Application. At the same time, 2% penalty and payment system commission fees will be deducted from the refund amount."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.13. Если при попытке перевода Сервисом Средств на банковскую карту (счет) Пользователя данная карта (счет) блокируются по причине того, что банковская карта (счет) Пользователя либо сам Пользователь находятся в любого рода «черном списке» или «стоп-листе» соответствующей Платежной системы либо фискального органа государства, резидентом которого является Пользователь, Сервис оставляет за собой право в одностороннем порядке отказаться от предоставления услуг по обмену и произвести возврат Средств Пользователю с удержанием комиссии в размере 20% (двадцати процентов) от текущей суммы обмена."
            : "3.13. If the User's bank card (account) is blocked when the Service attempts to transfer the Funds to it due to the User's bank card (account) or the User being in any kind of 'blacklist' or 'stop list' of the respective Payment System or fiscal authority of the state where the User is a resident, the Service reserves the right to unilaterally refuse to provide exchange services and refund the Funds to the User with a deduction of 20% (twenty percent) of the current exchange amount."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.14. Возврат Средств в случае, предусмотренном п. 3.13 настоящих Правил, возможен при предоставлении Пользователем документов согласно требованию Сервиса."
            : "3.14. The refund of Funds in the case provided for in clause 3.13 of these Rules is possible upon the User providing documents as requested by the Service."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.15. В случае обнаружения подозрительной активности в процессе оформления Заявки Пользователем, Сервис, во избежание ущерба, вправе приостанавливать выполнение таких операций до выяснения причин такой активности."
            : "3.15. If suspicious activity is detected during the process of submitting an Application by the User, the Service has the right to suspend such operations until the reasons for such activity are clarified in order to avoid damage."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.16. Сервис вправе отказать в выполнении обмена, если передача криптовалюты, электронных денег или фиатной валюты на счет Сервиса была произведена без оформления Заявки при помощи пользовательских интерфейсов на Сайте Сервиса. Криптовалюта, электронные деньги или фиатная валюта, перечисленные на счет Сервиса Пользователем без оформления Заявки при помощи пользовательских интерфейсов на Сайте Сервиса, могут быть возвращены Пользователю по запросу с учетом вычета комиссии платежной системы в соответствии с ограничениями, установленными настоящими Правилами."
            : "3.16. The Service has the right to refuse to complete an exchange if cryptocurrency, electronic money, or fiat currency was transferred to the Service's account without submitting an Application through the user interfaces on the Service's Site. Cryptocurrency, electronic money, or fiat currency transferred to the Service's account by the User without submitting an Application through the user interfaces on the Service's Site may be returned to the User upon request, subject to a deduction of the payment system commission in accordance with the limitations set forth in these Rules."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.17. Сервис имеет право отказать в предоставлении услуг Пользователю в случае непредоставления Пользователем полных и достаточных данных, необходимых для его идентификации, и заблокировать Средства, полученные от Пользователя до момента сообщения им таких данных."
            : "3.17. The Service has the right to refuse to provide services to the User if the User does not provide complete and sufficient data necessary for their identification and to block the Funds received from the User until such data is provided."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.18. Сервис оказывает услуги только по обмену криптовалюты на электронные деньги или фиатную валюту, либо наоборот. Сервис не производит валютные операции в отношении национальных денег и не подпадает под национальное и международное законодательство о валютном регулировании и валютном контроле."
            : "3.18. The Service only provides services for exchanging cryptocurrency for electronic money or fiat currency, or vice versa. The Service does not carry out currency operations involving national currencies and is not subject to national and international laws on currency regulation and currency control."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? '3.19. Сервис не принимает для обмена криптовалюты из даркнета и любые другие "грязные" криптовалюты. Если вы отправили такие активы, то возврат производится строго после верификации и с удерживанием 10% актива. После предоставления документов на верификацию заявка на разблокировку будет рассмотрена в течении 72 часов. Для проверки вашего кошелька воспользуйтесь AML сервисом(@StarCheckBot).'
            : '3.19. The Service does not accept cryptocurrencies from the darknet and any other "dirty" cryptocurrencies for exchange. If you sent such assets, a refund will be made strictly after verification and with a 10% deduction of the asset. After providing the documents for verification, the application for unblocking will be considered within 72 hours. To check your wallet, use the AML service (@StarCheckBot).'}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.20. Сервис прилагает разумные усилия для обеспечения доступа к услугам и сайту в соответствии с настоящими Правилами. Тем не менее, Сервис может приостановить использование сайта для технического обслуживания и приложит достаточные усилия, чтобы предварительно уведомить Пользователя об этом. Таким образом, пользователь соглашается с тем, что принимает на себя риски, связанные с тем фактом, что не всегда может пользоваться услугами Сервиса или выполнять срочные транзакции с использованием учетной записи Пользователя."
            : "3.20. The Service makes reasonable efforts to provide access to the services and the site in accordance with these Rules. However, the Service may suspend the use of the site for maintenance and will make sufficient efforts to notify the User in advance. Thus, the user agrees that they accept the risks associated with the fact that they may not always be able to use the Service's services or perform urgent transactions using the User's account."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.21. Сервис имеет право аннулировать обмен при возникновении подозрений о получении Пользователем Средств в результате любой противоправной деятельности в соответствии с законодательством государства размещения Сервиса или государства, резидентом которого является Пользователь."
            : "3.21. The Service has the right to cancel the exchange if there are suspicions that the User has received the Funds as a result of any illegal activity in accordance with the laws of the state where the Service is located or the state of which the User is a resident."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "3.22. При работе с Заявками Пользователей, администрация Сервиса вправе:"
            : "3.22. When processing User Applications, the Service administration has the right to:"}
        </p>
        <ul className="rules__list">
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.1. Прекратить общение с Пользователем, нарушающим этикет делового общения, задающим вопросы, не связанные с предоставлением Сервисом услуг или не предоставляющим Сервису необходимой для оказания услуг информации."
              : "3.22.1. Terminate communication with the User who violates business etiquette, asks questions unrelated to the provision of the Service's services, or does not provide the Service with the information necessary for the provision of services."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.2. При необходимости заблокировать проведение операции и Средства Пользователя до предоставления им полных и достаточных для идентификации его личности данных."
              : "3.22.2. If necessary, block the operation and the User's Funds until the User provides complete and sufficient data for their identification."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.3. Привлекать для исполнения своих обязательств сторонних исполнителей."
              : "3.22.3. Engage third-party contractors to fulfill its obligations."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.4. Распоряжаться по собственному усмотрению любыми Средствами, поступившими на счет Сервиса без создания Заявки."
              : "3.22.4. At its own discretion, manage any Funds that have arrived in the Service's account without an Application being created."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.5. Отправлять Пользователю на указанный им в Аккаунте telegram информацию о состоянии процесса обмена, а также иную информацию, касающуюся деятельности Сервиса, в том числе рекламного характера. Отписаться от рекламных рассылок Пользователь может, нажав на соответствующую кнопку в полученном письме."
              : "3.22.5. Send information to the User about the status of the exchange process, as well as other information related to the Service's activities, including promotional information, to the Telegram specified by the User in the Account. The User can unsubscribe from promotional mailings by clicking the corresponding button in the received message."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.6. Осуществлять выполнение заявки в срок до 72 часов, если: — Банковский перевод попал в обработку или на проверку платежа службой безопасности Банка; — Сумма транзакции отличается от суммы, указанной в заявке; — Была допущена ошибка в реквизитах при создании заявки; — Был востребован возврат криптовалюты;"
              : "3.22.6. Execute the Application within 72 hours if: — The bank transfer is under processing or payment verification by the Bank's security service; — The transaction amount differs from the amount specified in the Application; — An error was made in the details when creating the Application; — A refund of cryptocurrency was requested."}
          </li>
          <li className="rules__list-item">
            {language === "ru"
              ? "3.22.7. В случае указания неправильных реквизитов для вывода средств на карты/кошельки клиента и т.п. Клиенту необходимо связаться с тех. поддержкой и передать корректные реквизиты для исполнения заявки. Связаться с оператором службы поддержки вы можете в онлайн чате в телеграм или по почте Info@atababa.ru Если клиент не выходит на связь в течении рабочей недели, то обменник оставляет за собой право присвоить себе активы клиента."
              : "3.22.7. In case incorrect details are provided for withdrawing funds to the client's cards/wallets, etc., the Client must contact technical support and provide the correct details to execute the Application. You can contact the support operator in the online chat in Telegram or via email at Info@atababa.ru. If the client does not get in touch within a working week, the exchange office reserves the right to keep the client's assets."}
          </li>
        </ul>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru" ? "4. Стоимость услуг" : "4. Cost of Services"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "4.1. Тарифы на оказание услуг определяются Сервисом и публикуются на сайте Сервиса. Администрация Сервиса вправе менять тарифы без дополнительного уведомления Пользователей."
            : "4.1. The service fees are determined by the Service and published on the Service's website. The Service administration has the right to change the fees without additional notice to Users."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "5. Налогообложение операций Пользователя"
            : "5. User Transaction Taxation"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "5.1. Сервис не является налоговым агентом для Пользователя и не осуществляет исчисление налоговых платежей Пользователя, а также не обязан уведомлять Пользователя относительно его налоговых издержек. Пользователь обязуется самостоятельно выплачивать все налоги в соответствии с налоговым законодательством юрисдикции, где Пользователь является налоговым резидентом."
            : "5.1. The Service is not a tax agent for the User and does not calculate the User's tax payments, nor is it obligated to notify the User about their tax liabilities. The User agrees to pay all taxes independently in accordance with the tax laws of the jurisdiction where the User is a tax resident."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "5.2. Никакое взаимодействие Пользователя с Сервисом не может пониматься как установление между Пользователем и Сервисом агентских отношений, отношений товарищества, отношений по совместной деятельности, отношений личного найма, либо любых иных правоотношений, прямо не предусмотренных Правилами Сервиса."
            : "5.2. No interaction between the User and the Service can be understood as establishing an agency relationship, partnership, joint activity, employment relationship, or any other legal relationship not explicitly provided for in the Service Rules."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru" ? "6. KYC & AML" : "6. KYC & AML"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "6.1. В целях минимизации рисков легализации (отмывания) денежных средств и финансирования терроризма, Сервис оставляет за собой право отказаться от оказания услуг по обмену на любой стадии в случае предположения, что обмен любым образом связан с целями легализации (отмывания) денежных средств, финансированием терроризма или иной противоправной деятельности согласно законодательству государства размещения Сервиса, государства, резидентом которого является Пользователь, либо согласно международному законодательству."
            : "6.1. To minimize the risks of money laundering and terrorism financing, the Service reserves the right to refuse to provide exchange services at any stage if it is suspected that the exchange is in any way related to money laundering, terrorism financing, or any other illegal activity under the laws of the state where the Service is located, the state where the User is a resident, or under international law."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "6.2. В случае обнаружения подозрительного трафика со стороны Пользователя, Сервис оставляет за собой право передать всю информацию по требованию правоохранительных органов о личности, заявке на обмен и валюте, поступившей от Пользователя."
            : "6.2. If suspicious activity is detected from the User, the Service reserves the right to provide all information about the User, the exchange Application, and the funds received from the User to law enforcement authorities upon request."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "6.3. Способы обработки и защиты персональных данных Пользователей регулируются Положением об обработке и защите персональных данных, опубликованным на сайте Сервиса."
            : "6.3. Methods for processing and protecting Users' personal data are governed by the Personal Data Processing and Protection Policy, published on the Service's website."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "6.4. В случае обнаружения фальсификации (компрометации) коммуникационных потоков или оказания любого негативного влияния на нормальную работу программного кода Сервиса, имеющей прямое или косвенное отношение к Заявке Пользователя, исполнение Заявки Сервисом приостанавливается, а по уже полученным средствам производится перерасчет параметров Заявки в соответствии с действующими условиями или, в случае несогласия Пользователя с перерасчетом, возврат Средств на реквизиты Пользователя."
            : "6.4. In case of detection of falsification (compromise) of communication flows or any negative impact on the normal operation of the Service's software code, directly or indirectly related to the User's Application, the Service's execution of the Application is suspended, and a recalculation of the Application parameters is made based on the current conditions, or, if the User disagrees with the recalculation, a refund of the Funds to the User's details."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "6.5. Любые споры, связанные с условиями настоящих Правил, стороны оферты обязуются урегулировать путем проведения переговоров. В случае недостижения соглашения, все споры подлежат разрешению в соответствии с законодательством государства нахождения Ответчика."
            : "6.5. Any disputes related to the terms of these Rules, the parties to the offer undertake to resolve through negotiations. In case an agreement is not reached, all disputes shall be resolved in accordance with the laws of the state where the Respondent is located."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "6.6. Информация по обменным операциям сохраняется в базе данных Сервиса и является приоритетным источником, на который ориентируются стороны оферты, установленной настоящими Правилами, в спорных ситуациях."
            : "6.6. Information on exchange operations is stored in the Service's database and is the primary source referred to by the parties to the offer established by these Rules in case of disputes."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru" ? "7. Ответственность" : "7. Liability"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "7.1. Сервис не несет ответственности перед Пользователем за финансовые потери, вызванные противоправными действиями третьих лиц."
            : "7.1. The Service is not liable to the User for financial losses caused by illegal actions of third parties."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.2. Сервис не несет ответственности за любые отложенные или нереализованные Заявки, вызванные ошибкой Платежной системы или банка, указанных Пользователем в оформленной Заявке. Пользователь соглашается с тем, что в таком случае все претензии будут направлены в соответствующую Платежную систему или банк. Сервис по просьбе Пользователя оказывает содействие в предоставлении документов, подтверждающих использованием услуг Сервиса по обмену, при подаче Пользователем жалобы или требования администрации соответствующей Платежной системы или банку."
            : "7.2. The Service is not responsible for any delayed or unrealized Applications caused by errors of the Payment System or bank specified by the User in the completed Application. The User agrees that in such cases all claims will be directed to the respective Payment System or bank. The Service, at the User's request, assists in providing documents confirming the use of the Service's exchange services when the User submits a complaint or claim to the administration of the respective Payment System or bank."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.3. Сервис не проверяет правомочность и законность владения Пользователем криптовалютой, электронными деньгами или фиатной валютой, участвующими в конкретной Операции. Сервис подразумевает добросовестность и легальность владения, пользования и распоряжения Пользователем банковских карт (счетов) и Средств на них, указываемых Пользователем при Платеже. Сервис не несет ответственности за владение, пользование и распоряжение Пользователем банковскими картами (счетами) и Средствами, ему не принадлежащими. Все риски и ответственность за владение, пользование и распоряжение банковскими картами (счетами) и Средствами на них, лежат на Пользователе."
            : "7.3. The Service does not verify the legality and legitimacy of the User's ownership of the cryptocurrency, electronic money, or fiat currency involved in a particular Operation. The Service assumes the good faith and legality of the User's ownership, use, and disposal of bank cards (accounts) and Funds on them, indicated by the User during Payment. The Service is not responsible for the User's ownership, use, and disposal of bank cards (accounts) and Funds not belonging to them. All risks and responsibilities for owning, using, and disposing of bank cards (accounts) and Funds on them lie with the User."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.4. Пользователь обязан своевременно уведомлять администрацию Сервиса об изменениях в своем адресе электронной почты и номере телефона путем корректировки указанных данных в своем Аккаунте. В противном случае, Сервис не гарантирует получение Пользователем уведомлений о безопасности и не несет ответственности за негативные последствия для Пользователя в результате компрометации по независящим от Сервиса причинам его учетных данных для входа в Аккаунт."
            : "7.4. The User is obliged to promptly notify the Service administration of changes to their email address and phone number by updating the specified data in their Account. Otherwise, the Service does not guarantee that the User will receive security notifications and is not responsible for negative consequences for the User resulting from the compromise of their login credentials for the Account due to reasons beyond the Service's control."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.5. Пользователь обязан немедленно уведомить администрацию Сервиса о любом несанкционированном использовании учетной записи Пользователя или пароля, компрометации учетных данных, предполагаемом взломе Аккаунта или любом другом нарушении безопасности по электронной почте Info@atababa.ru."
            : "7.5. The User must immediately notify the Service administration of any unauthorized use of the User's account or password, compromise of login credentials, suspected hacking of the Account, or any other security breach via email at Info@atababa.ru."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.6. Пользователь обязан не использовать средства для сокрытия своего действительного местоположения. Пользователь обязан сообщать администрации Сервиса по ее запросу свое точное и истинное местоположение. Если Сервис определит, что активность Пользователя является подозрительной или связана с любого рода противоправной деятельностью, Сервис может приостановить действие Аккаунта, заблокировать невыполненные либо отклонить последующие транзакции."
            : "7.6. The User must not use any means to conceal their actual location. The User must provide their exact and true location to the Service administration upon request. If the Service determines that the User's activity is suspicious or related to any illegal activity, the Service may suspend the Account, block pending, or reject subsequent transactions."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.7. Пользователь несет ответственность за достоверность и полноту информации и данных, которые он предоставил при регистрации на сайте Сервиса. В случае, если Пользователь ввел недостоверные либо некорректные личные данные или предоставил неверные данные для исполнения Заявки, Сервис не несёт ответственности за любые убытки Пользователя, возникшие в результате таких действий, независимо от их преднамеренности."
            : "7.7. The User is responsible for the accuracy and completeness of the information and data they provided during registration on the Service's website. If the User has provided false or incorrect personal data or provided incorrect information for the execution of an Application, the Service is not liable for any losses incurred by the User as a result of such actions, regardless of their intentionality."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.8. Сервис не несет ответственности в случаях, когда Пользователь обращается к подложному сайту либо телеграмм-аккаунту, имитирующим настоящий адрес сайта Сервиса и его телеграмм-аккаунт («зеркалу»). Актуальные адрес в сети Интернет сайта Сервиса и его телеграмм-аккаунт указаны на сайте Сервиса https://ccbtc.ru"
            : "7.8. The Service is not responsible in cases where the User contacts a fake website or Telegram account imitating the actual address of the Service's website and its Telegram account ('mirror'). The current internet address of the Service's website and its Telegram account are specified on the Service's website https://ccbtc.ru."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.9. Использование Сервиса в целях осуществления любого рода противоправных действий запрещено."
            : "7.9. The use of the Service for any illegal activities is prohibited."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.10. Все услуги Сервиса предоставляются без каких-либо явных или подразумеваемых гарантий, в частности, без подразумеваемых гарантий товарной пригодности и пригодности для определенной цели. Сервис не гарантирует, что все услуги Сервиса, а также сайт будут доступны в 100% случаев для удовлетворения потребностей Пользователя."
            : "7.10. All services of the Service are provided without any explicit or implied warranties, in particular, without implied warranties of merchantability and fitness for a particular purpose. The Service does not guarantee that all services of the Service, as well as the website, will be available 100% of the time to meet the User's needs."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.11. В случае принятия настоящих Правил, Пользователь подтверждает, что:"
            : "7.11. By accepting these Rules, the User confirms that:"}
          <ul className="rules__list">
            <li className="rules__list-item">
              {language === "ru"
                ? "— Им предоставлена полная и правдивая информация о себе, а также подлинные идентификационные данные."
                : "— They have provided complete and truthful information about themselves, as well as genuine identification data."}
            </li>
            <li className="rules__list-item">
              {language === "ru"
                ? "— Он не является участником операций или сделок по отмыванию денег, в соответствии с правилами KYC & AML."
                : "— They are not involved in money laundering operations or transactions, in accordance with KYC & AML rules."}
            </li>
            <li className="rules__list-item">
              {language === "ru"
                ? "— Его доход не связан с осуществлением любой противоправной деятельности в соответствии с законодательством государства размещения Сервиса или государства пребывания Пользователя, в том числе в соответствии с правилами KYC & AML."
                : "— Their income is not related to any illegal activities in accordance with the laws of the state where the Service is located or the state where the User resides, including in accordance with KYC & AML rules."}
            </li>
            <li className="rules__list-item">
              {language === "ru"
                ? "— Он не состоит в любого рода «черных списках», «стоп-листах» или перечнях лиц, причастных к легализации (отмыванию) доходов и финансированию терроризма на территории страны его пребывания."
                : "— They are not listed in any kind of 'blacklists', 'stop lists', or lists of persons involved in money laundering and terrorism financing in the country of their residence."}
            </li>
            <li className="rules__list-item">
              {language === "ru"
                ? "— Он не привлекается правоохранительными либо фискальными органами государства его пребывания к юридической ответственности за легализацию (отмывание) доходов и финансирование терроризма, а равно за совершение мошенничества или любых других противоправных действий, связанных с хищением чужого имущества."
                : "— They are not being prosecuted by law enforcement or fiscal authorities of their country of residence for money laundering, terrorism financing, fraud, or any other illegal activities related to the misappropriation of property."}
            </li>
            <li className="rules__list-item">
              {language === "ru"
                ? "— Торговля, а также любые действия, связанные с оборотом криптовалюты, не являются противоправными в соответствии с законодательством государства пребывания Пользователя."
                : "— Trading and any actions related to cryptocurrency circulation are not illegal under the laws of the User's country of residence."}
            </li>
          </ul>
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.12. Пользователь обязуется не нарушать работу Сервиса путем вмешательства в его программную или аппаратную части, а также путем искажения параметров (команд), передаваемых Сервису."
            : "7.12. The User undertakes not to disrupt the operation of the Service by interfering with its software or hardware, as well as by altering the parameters (commands) transmitted to the Service."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.13. Если в результате действий Пользователя, вне зависимости от наличия у него умысла или по неосторожности, Сервису был нанесен ущерб, Пользователь обязуется компенсировать такой ущерб в полном размере."
            : "7.13. If, as a result of the User's actions, regardless of whether there was intent or negligence, the Service suffers damage, the User undertakes to fully compensate for such damage."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.14. В случае, если Пользователю по Заявке поступила оплата больше установленной в Заявке, Пользователь обязуется произвести возврат средств на предоставленные Сервисом реквизиты. Комиссия за перевод в таком случае оплачивается обменным пунктом."
            : "7.14. If the User receives a payment under the Application that is greater than the amount specified in the Application, the User undertakes to return the funds to the details provided by the Service. The transfer fee, in this case, is paid by the exchange office."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.15. Пользователь признает и соглашается с тем, что Сервис не выступает в качестве финансового консультанта, не предоставляет консультационные услуги по инвестициям, а любая информация, передаваемая Сервисом Пользователю, не может рассматриваться как совет или руководство к действию."
            : "7.15. The User acknowledges and agrees that the Service does not act as a financial advisor, does not provide investment advisory services, and any information provided by the Service to the User cannot be considered advice or guidance for action."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "7.16. Пользователь осознает и принимает на себя все риски, связанные с оборотом криптовалюты."
            : "7.16. The User acknowledges and assumes all risks associated with cryptocurrency circulation."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru" ? "8. Форс-мажор" : "8. Force Majeure"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "8.1. Пользователь или Сервис не несут ответственности друг перед другом за невыполнение обязательств, связанных с оказанием Сервисом услуг по обмену, вызванное обстоятельствами, возникшими помимо воли и желания сторон, которые нельзя было предвидеть или избежать, включая объявленную или фактическую войну, гражданские волнения, эпидемии, землетрясения, наводнения, пожары и другие стихийные бедствия, действия органов власти и прочие непреодолимые обстоятельства и не могут заявлять ни о каких убытках или ущербе, возникших из-за таких обстоятельств."
            : "8.1. The User or the Service are not liable to each other for the failure to fulfill obligations related to the provision of exchange services by the Service, caused by circumstances beyond the control and will of the parties, which could not have been foreseen or avoided, including declared or actual war, civil unrest, epidemics, earthquakes, floods, fires, and other natural disasters, actions of authorities, and other force majeure circumstances, and cannot claim any losses or damages arising from such circumstances."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "8.2. Сторона, которая не исполняет свое обязательство вследствие действия непреодолимой силы, должна известить другую Сторону о препятствии и его влиянии на исполнение обязательств без промедления, но не позднее 3 (трех) календарных дней с момента наступления указанных обстоятельств."
            : "8.2. The party that fails to fulfill its obligation due to force majeure must notify the other Party of the obstacle and its impact on the fulfillment of obligations without delay, but no later than 3 (three) calendar days from the occurrence of the specified circumstances."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "8.3. Сторона, не известившая другую Сторону о невозможности исполнения своих обязательств по настоящему договору, теряет право ссылаться на такую невозможность."
            : "8.3. The party that has not notified the other Party of the impossibility of fulfilling its obligations under this agreement loses the right to refer to such impossibility."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "9. Заключительные положения"
            : "9. Final Provisions"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "9.1. Информация о Пользователе и о его операциях не хранится на сервере сайта Сервиса. По запросу Пользователя доступ к аккаунту может быть ограничен либо удален."
            : "9.1. Information about the User and their transactions is not stored on the Service's website server. At the User's request, access to the account can be restricted or deleted."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "9.2. Срок ответа Сервиса на запросы Пользователя составляет до пяти рабочих дней с момента получения соответствующего запроса Пользователя."
            : "9.2. The Service's response time to User requests is up to five business days from the date of receipt of the respective User request."}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "9.3. Условия настоящих Правил согласовываются с Пользователем в электронной форме при регистрации. Согласие с Правилами, опубликованными в электронной форме, является действительным акцептом полного содержания настоящих Правил."
            : "9.3. The terms of these Rules are agreed with the User in electronic form upon registration. Acceptance of the Rules published in electronic form constitutes a valid acceptance of the full content of these Rules."}
        </p>
      </section>

      <section className="rules__section">
        <h6 className="rules__subtitle">
          {language === "ru"
            ? "10. Контактные данные"
            : "10. Contact Information"}
        </h6>
        <p className="rules__text">
          {language === "ru"
            ? "10.1. Вы можете пообщаться с сотрудниками в рабочее время в телеграм-чате @coins_change"
            : "10.1. You can communicate with staff during business hours in the Telegram chat @coins_change"}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "10.2. Вы также можете отправить письмо на адрес электронной почты: Info@atababa.ru"
            : "10.2. You can also send an email to: Info@atababa.ru"}
        </p>
        <p className="rules__text">
          {language === "ru"
            ? "10.3. Вы можете написать нам в Телеграм чат службы поддержки. Просим Вас учесть, что мы осуществляем обмены только в телеграм чате @coins_change. Обмены, реквизиты и другие персональные данные обмениваются строго по каналам связи, указанным в пунктах 10.1 и 10.2"
            : "10.3. You can write to us in the Telegram support chat. Please note that we only perform exchanges in the Telegram chat @coins_change. Exchanges, details, and other personal information are strictly exchanged through the communication channels specified in clauses 10.1 and 10.2."}
        </p>
      </section>
    </div>
  );
};

export default Rules;
