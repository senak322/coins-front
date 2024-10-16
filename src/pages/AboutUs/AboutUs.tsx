import React from "react";
import "./AboutUs.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AboutUs = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const translations = {
    ru: {
      about: "О нас",
      text: `Платформа COINS_CHANGE — это надежный крипто-обменник, созданный для
        удобного и безопасного обмена криптовалют. Мы предлагаем быстрые
        транзакции, выгодные курсы и низкие комиссии, чтобы каждый пользователь
        мог легко обменивать криптовалюты в любое время. Наша команда экспертов
        гарантирует высокий уровень безопасности и защиту данных, что позволяет
        нам поддерживать безупречную репутацию. Мы работаем с ведущими
        криптовалютами и предлагаем круглосуточную поддержку для решения любых
        вопросов. Благодаря простому интерфейсу, даже новички смогут комфортно
        использовать наш сервис. Мы стремимся сделать процесс обмена максимально
        прозрачным и доступным для всех.`,
    },
    en: {
      about: "About us",
      text: `COINS_CHANGE platform is a reliable crypto exchange service designed for convenient and secure cryptocurrency exchanges. We offer fast transactions, favorable rates, and low fees, allowing every user to easily exchange cryptocurrencies at any time. Our team of experts ensures a high level of security and data protection, allowing us to maintain an impeccable reputation. We work with leading cryptocurrencies and offer 24/7 support to resolve any issues. Thanks to the simple interface, even beginners can comfortably use our service. We strive to make the exchange process as transparent and accessible as possible for everyone.`,
    },
  };
  return (
    <div className="about">
      <h2 className="about__title">{translations[currentLanguage].about}</h2>
      <p className="about__text">{translations[currentLanguage].text}</p>
    </div>
  );
};

export default AboutUs;
