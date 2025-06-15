import gameTexts from "./gameTexts";

class TextManager {
  constructor(language = "en", texts = gameTexts) {
    this.language = language;
    this.texts = texts;
  }

  get(key, variables = {}) {
    const keys = key.split(".");
    let result = this.texts[this.language];

    for (const k of keys) {
      if (result && k in result) {
        result = result[k];
      } else {
        return "[Text Missing]";
      }
    }

    if (typeof result === "string") {
      return this.replaceVariables(result, variables);
    }

    return result;
  }

  replaceVariables(text, variables) {
    return text.replace(/{(\w+)}/g, (_, key) =>
      key in variables ? variables[key] : `{${key}}`
    );
  }

  setLanguage(lang) {
    if (this.texts[lang]) {
      this.language = lang;
    }
  }
}

export default TextManager;
