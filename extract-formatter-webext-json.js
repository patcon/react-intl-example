// This formatter processes ICU format into WebExtension JSON during FormatJS CLI's extract command.
// See: https://formatjs.io/docs/getting-started/message-extraction#translation-management-system-tms-integration

// The output format matches WebExtension JSON format, which the Weblate TMS supports descriptions for.
// See: https://docs.weblate.org/en/latest/formats.html#webextension-json
exports.format = function (msgs) {
  const results = {}
  for (const [id, msg] of Object.entries(msgs)) {
    results[id] = {
      message: msg.defaultMessage,
      description: msg.description,
    }
  }
  return results
}

// Sets the order fo the sub-keys to match Weblate.
// See: https://formatjs.io/docs/tooling/cli/#custom-formatter
// See: https://stackoverflow.com/a/72200940
exports.compareMessages = (a, b) => {
  const sortOrder = [
    'message',
    'description',
  ];
  if (!sortOrder.includes(a)) return 1
  if (!sortOrder.includes(b)) return -1
  return sortOrder.indexOf(a.key) - sortOrder.indexOf(b.key);
}
