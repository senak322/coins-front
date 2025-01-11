import React from "react";
import "./AdvertisingMaterials.scss";

export default function AdvertisingMaterials() {
  // Все текстовые данные и ссылки можно хранить в константах,
  // либо передавать из пропсов, либо загружать из API
  const partnerLink = "https://cryptchange.io/?rid=1337";
  const partnerLinkHtml = `<a target="_blank" href="https://cryptchange.io/?rid=1337">Обмен валют</a>`;
  const hiddenPartnerLinkHtml = `<a target="_blank" href="https://cryptchange.io/" onclick="this.href='https://cryptchange.io/?rid=1337'">Обмен валют</a>`;
  const partnerLinkBBCode = `[url="https://cryptchange.io/?rid=1337"]Обмен валют[/url]`;

  return (
    <div className="advertising-materials">
      <h3 className="advertising-materials__title">Рекламные материалы</h3>

      <p className="advertising-materials__text">
        Рекламный текст с&nbsp;ссылкой, который вы&nbsp;разместите в&nbsp;любом
        месте на&nbsp;Ваше усмотрение (на&nbsp;Вашем сайте, в&nbsp;блогах, 
        форумах, в&nbsp;различных сервисах вопросов и&nbsp;ответов, 
        социальных сетях и&nbsp;в сервисах закладок) будет вести 
        пользователей на&nbsp;сайт, а&nbsp;Вы будете получать 
        гарантированное вознаграждение за&nbsp;переходы пользователей.
      </p>

      <p className="advertising-materials__text">
        Ниже представлены основные варианты рекламных материалов 
        с&nbsp;Вашей партнёрской ссылкой. Вы можете использовать 
        любые тексты для ссылок или&nbsp;воспользоваться нашими 
        вариантами. Для этого Вам нужно просто скопировать выбранный 
        код к&nbsp;себе на&nbsp;сайт и начать получать доход.
      </p>

      {/* Поле для партнёрской ссылки */}
      <div className="advertising-materials__block">
        <div className="advertising-materials__label">Партнерская ссылка:</div>
        <input
          className="advertising-materials__input"
          type="text"
          readOnly
          value={partnerLink}
          onFocus={(e) => e.target.select()}
        />
      </div>

      {/* Партнёрская ссылка в HTML-коде */}
      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Партнерская ссылка в HTML-коде (для размещения на сайтах и блогах):
        </div>
        <textarea
          className="advertising-materials__textarea"
          readOnly
          value={partnerLinkHtml}
          onFocus={(e) => e.target.select()}
        />
      </div>

      {/* Скрытая партнёрская ссылка */}
      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Скрытая партнёрская ссылка в HTML-коде (для размещения на сайтах и блогах):
        </div>
        <textarea
          className="advertising-materials__textarea"
          readOnly
          value={hiddenPartnerLinkHtml}
          onFocus={(e) => e.target.select()}
        />
      </div>

      {/* Партнерская ссылка в BBCode */}
      <div className="advertising-materials__block">
        <div className="advertising-materials__label">
          Партнерская ссылка в BBCode (для размещения на форумах):
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
}
