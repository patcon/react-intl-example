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
        {intl.formatMessage({ defaultMessage: "A message with manual ID, without description.", id: 'message.no_description' })}
        <br />
        {intl.formatMessage({ defaultMessage: "A message with manual ID, with description.", description: "A sample manual ID string with a description", id: 'message.description' })}
        <br />
        {intl.formatMessage({ defaultMessage: "A simple message.", id: 'message.simple' })}
        <br />
        {intl.formatMessage({ defaultMessage: "Hi, {name}! 👋", id: 'message.argument' }, { name: "John" })}
        <br />
        {intl.formatMessage({ defaultMessage: "{count, plural, one {# item} other {# items}}", id: 'message.plural' }, { count: 5 })}
        <br />
        {intl.formatMessage({ defaultMessage: "{gender, select, male {Mr} female {Mrs} other {User}}", id: 'message.select' }, { gender: "female" })}
        <br />
        {intl.formatMessage({ defaultMessage: "Hi, <b>John</b>!", id: 'message.text-format' }, { b: (value) => <b>{value}</b> })}
        <br />
        {intl.formatMessage({ defaultMessage: "Formatted number: {num, number, ::K}", id: 'message.number-format' }, { num: 7500 })}
        <br />
        {intl.formatMessage({ defaultMessage: "Formatted currency: {amount, number, ::currency/USD}", id: 'message.currency-format' }, { amount: 7.5 })}

        <h3>Auto-generated ID examples</h3>
        {intl.formatMessage({ defaultMessage: "A message with autogen ID, without description.", id: 'Oqbn2M' })}
        <br />
        {intl.formatMessage({ defaultMessage: "A message with autogen ID, with description.", id: 'H7xJaD', description: "A sample autogen ID string with a description" })}
        <br />
        {intl.formatMessage({ defaultMessage: "A simple message.", id: 'ID4J8v' })}
        <br />
        {intl.formatMessage({ defaultMessage: "Hi, {name}! 👋", id: 'AavDn+' }, { name: "John" })}
        <br />
        {intl.formatMessage({ defaultMessage: "{count, plural, one {# item} other {# items}}", id: 'B8MRsI' }, { count: 5 })}
        <br />
        {intl.formatMessage({ defaultMessage: "{gender, select, male {Mr} female {Mrs} other {User}}", id: 'BYSCHz' }, { gender: "female" })}
        <br />
        {intl.formatMessage({ defaultMessage: "Hi, <b>John</b>!", id: 'XJTeb4' }, { b: (value) => <b>{value}</b> })}
        <br />
        {intl.formatMessage({ defaultMessage: "Formatted number: {num, number, ::K}", id: 'o/77IL' }, { num: 7500 })}
        <br />
        {intl.formatMessage({ defaultMessage: "Formatted currency: {amount, number, ::currency/USD}", id: 'DEMgCP' }, { amount: 7.5 })}
      </div>

      <div style={{ textAlign: "center", marginTop: 60, marginBottom: 20 }}>
        For more details, please see the full <a href="https://localizely.com/blog/react-intl-tutorial/"> post</a> on
        Localizely.
      </div>
    </div>
  );
}
