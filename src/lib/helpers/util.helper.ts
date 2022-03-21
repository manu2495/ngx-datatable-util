export class UtilHelper {
  /**
   * get url with {n} params and set this params into url
   * @param endpoint
   * @param args
   */
  static routerLinkFormat(endpoint, ...args) {
    let i = 0;

    for (let arg of args) {
      let strToReplace = "{" + i++ + "}";
      endpoint = endpoint.replace(strToReplace, (arg.toString() || ''));
    }

    return endpoint;
  }

  /**
   * util en peanut/model/form.model.ts
   * @param key
   * @param defaults
   */
  static setDefaultValue(key, defaults) {
    if (key == undefined) return defaults;
    return key;
  }

  /**
   * detect device
   */
  static isMobile() {
    let ua = navigator.userAgent;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
      return true;

    else if (/Chrome/i.test(ua))
      return false;

    else
      return false;
  }

  static sumArray(array: any[], attribute: string) {
    return array.reduce(function(a, b) {
      return a + b[attribute];
    }, 0);
  }
}
