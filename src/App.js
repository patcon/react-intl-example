import React, { useState, useEffect } from "react";
import {
  useIntl,
  IntlProvider,
} from "react-intl";

let initLocale = "en";
if (navigator.language === "qu") {
  initLocale = "qu";
} else if (navigator.language === "fr-CA") {
  initLocale = "fr-CA";
}

function loadMessages(locale) {
  switch (locale) {
    case "fr-CA":
      return import("./lang/fr_CA.compiled.json");
    case "en":
      return import("./lang/en.json");
    case "qu":
      return import("./lang/qu.compiled.json");
    default:
      return import("./lang/en.json");
  }
}

function getDirection(locale) {
  switch (locale) {
    case "fr-CA":
      return "ltr";
    case "en":
      return "ltr";
    case "qu":
      return "ltr";
    default:
      return "ltr";
  }
}

function LocalizationWrapper() {
  const [locale, setLocale] = useState(initLocale);
  const [messages, setMessages] = useState(null);

  useEffect(() => loadMessages(locale).then(setMessages), [locale]);

  return messages ? (
    <IntlProvider locale={locale} messages={messages}>
      <App locale={locale} direction={getDirection(locale)} onLocaleChange={(locale) => setLocale(locale)} />
    </IntlProvider>
  ) : null;
}
export default LocalizationWrapper;

function App({ locale, direction, onLocaleChange }) {
  const intl = useIntl();

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <select value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
          <option value="en">en</option>
          <option value="fr-CA">fr-CA</option>
          <option value="qu">qu</option>
        </select>
      </div>

      <div dir={direction} style={{ padding: 20 }} data-testid="examples">
        <h3>Manual static ID examples</h3>
        {intl.formatMessage({ defaultMessage: "A simple message.", id: 'examples/manual-id/no-description' })}
        <br />
        {intl.formatMessage({ defaultMessage: "Another simple message.", description: "A sample manual ID string with a description", id: 'examples/manual-id/with-description' })}
      </div>
    </div>
  );
}
