import React, { useState, useEffect } from "react";
import {
  useIntl,
  IntlProvider,
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  FormattedRelativeTime,
  FormattedNumber,
  FormattedList,
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
        <h3>Declarative examples</h3>
        <FormattedMessage defaultMessage="A simple message." id="ID4J8v" />
        <br />
        <FormattedMessage defaultMessage="Hi, {name}! 👋" id="AavDn+" values={{ name: "John" }} />
        <br />
        <FormattedMessage defaultMessage="{count, plural, one {# item} other {# items}}" id="B8MRsI" values={{ count: 6 }} />
        <br />
        <FormattedMessage defaultMessage="{gender, select, male {Mr} female {Mrs} other {User}}" id="BYSCHz" values={{ gender: "female" }} />
        <br />
        <FormattedMessage defaultMessage="Hi, <b>John</b>!" id="XJTeb4" values={{ b: (value) => <b>{value}</b> }} />
        <br />
        <FormattedMessage defaultMessage="Formatted number: {num, number, ::K}" id="o/77IL" values={{ num: 7500 }} />
        <br />
        <FormattedMessage defaultMessage="Formatted currency: {amount, number, ::currency/USD}" id="DEMgCP" values={{ amount: 7.5 }} />
        <br />
        <FormattedNumber value={7500} />
        <br />
        <FormattedNumber value={7.5} style="currency" currency="USD" /> {/* eslint-disable-line */}
        <br />
        <FormattedDate value={Date.now()} year="numeric" month="long" day="2-digit" />
        <br />
        <FormattedTime value={Date.now()} />
        <br />
        <FormattedRelativeTime value={0} numeric="auto" updateIntervalInSeconds={1} />
        <br />
        <FormattedList type="conjunction" value={["foo", "bar", "baz"]} />

        <h3>Imperative examples</h3>
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
        <br />
        {intl.formatNumber(7500)}
        <br />
        {intl.formatNumber(7.5, { style: "currency", currency: "USD" })}
        <br />
        {intl.formatDate(Date.now(), { year: "numeric", month: "long", day: "2-digit" })}
        <br />
        {intl.formatTime(Date.now())}
        <br />
        {intl.formatRelativeTime(-5, "second", { style: "narrow" })}
        <br />
        {intl.formatList(["foo", "bar", "baz"], { type: "conjunction" })}
      </div>

      <div style={{ textAlign: "center", marginTop: 60, marginBottom: 20 }}>
        For more details, please see the full <a href="https://localizely.com/blog/react-intl-tutorial/"> post</a> on
        Localizely.
      </div>
    </div>
  );
}
