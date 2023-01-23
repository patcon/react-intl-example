import React, { useState, useEffect } from "react";
import {
  useIntl,
  IntlProvider,
} from "react-intl";

let initLocale = "en";
if (navigator.language === "es-MX") {
  initLocale = "es-MX";
} else if (navigator.language === "ar") {
  initLocale = "ar";
}

function loadMessages(locale) {
  switch (locale) {
    case "ar":
      return import("./lang/ar.compiled.json");
    case "en":
      return import("./lang/en.json");
    case "es-MX":
      return import("./lang/es-MX.compiled.json");
    default:
      return import("./lang/en.json");
  }
}

function getDirection(locale) {
  switch (locale) {
    case "ar":
      return "rtl";
    case "en":
      return "ltr";
    case "es-MX":
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
          <option value="es-MX">es-MX</option>
          <option value="ar">ar</option>
        </select>
      </div>

      <div dir={direction} style={{ padding: 20 }} data-testid="examples">
        <h3>Manual static ID examples</h3>
        {intl.formatMessage({ defaultMessage: "A simple message.", id: 'examples.manual-id.no-description' })}
        <br />
        {intl.formatMessage({ defaultMessage: "Another simple message.", description: "A sample manual ID string with a description", id: 'examples.manual-id.with-description' })}

        <h3>Auto-generated ID examples</h3>
        {intl.formatMessage({ defaultMessage: "A simple message, but different.", id: 'Oqbn2M' })}
        <br />
        {intl.formatMessage({ defaultMessage: "Yet another simple difference message.", id: 'H7xJaD', description: "A sample autogen ID string with a description" })}
      </div>

      <div style={{ textAlign: "center", marginTop: 60, marginBottom: 20 }}>
        For more details, please see the full <a href="https://localizely.com/blog/react-intl-tutorial/"> post</a> on
        Localizely.
      </div>
    </div>
  );
}
