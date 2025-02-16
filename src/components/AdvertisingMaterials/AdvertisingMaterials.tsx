import React from "react";
import "./AdvertisingMaterials.scss";

interface AdvertisingMaterialsProps {
  referralCode: string;
}

const AdvertisingMaterials: React.FC<AdvertisingMaterialsProps> = ({ referralCode }) => {
  const baseUrl = "https://ccbtc.ru";
  // Формируем ссылку с реферальным кодом
  const partnerLink = `${baseUrl}/?ref=${referralCode}`;
  // HTML-код для вставки на сайтах и блогах
  const partnerLinkHtml = `<a target="_blank" href="${partnerLink}">Обмен валют</a>`;
  // Скрытая ссылка – ссылка без видимого кода, но при клике добавляет параметр
  const hiddenPartnerLinkHtml = `<a target="_blank" href="${baseUrl}" onclick="this.href='${partnerLink}'">Обмен валют</a>`;
  // BBCode для форумов
  const partnerLinkBBCode = `[url="${partnerLink}"]Обмен валют[/url]`;

  return (
    <div className="advertising-materials">
      <h3 className="advertising-materials__title">Рекламные материалы</h3>

      <p className="advertising-materials__text">
        Рекламный текст с ссылкой, который вы разместите в любом месте на Вашем усмотрении (на Вашем сайте, в блогах, форумах, социальных сетях и сервисах закладок) будет вести пользователей на сайт, а Вы будете получать вознаграждение за переходы.
      </p>

      <p className="advertising-materials__text">
        Ниже представлены варианты рекламных материалов с Вашей партнёрской ссылкой. Просто скопируйте нужный код и разместите его на своем ресурсе.
      </p>

      <div className="advertising-materials__block">
        <div className="advertising-materials__label">Партнёрская ссылка:</div>
        <input
          className="advertising-materials__input"
          type="text"
          readOnly
          value={partnerLink}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Партнёрская ссылка в HTML-коде (для сайтов и блогов):
        </div>
        <textarea
          className="advertising-materials__textarea"
          readOnly
          value={partnerLinkHtml}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Скрытая партнёрская ссылка в HTML (для сайтов и блогов):
        </div>
        <textarea
          className="advertising-materials__textarea"
          readOnly
          value={hiddenPartnerLinkHtml}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Партнёрская ссылка в BBCode (для форумов):
        </div>
        <textarea
          className="advertising-materials__textarea"
          readOnly
          value={partnerLinkBBCode}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
};

export default AdvertisingMaterials;
