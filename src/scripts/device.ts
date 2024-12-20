export const OS_TYPE = {
  IOS: 'IOS',
  ANDROID: 'AND',
  LINUX: 'LIX',
  WINDOW: 'WIN',
  ETC: 'ETC'
};

/**
 * userAgent 로 OS 검사
 * @param userAgent
 * @retur IOS: 'IOS', 안드로이드: 'AND', 리눅스: 'LIX', 윈도우: 'WIN', 기타: 'ETC'
 */
export const detectOs = (userAgent: string): string => {
  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return OS_TYPE.IOS;
  } else if (/Android/i.test(userAgent)) {
    return OS_TYPE.ANDROID;
  } else if (/Linux/i.test(userAgent)) {
    return OS_TYPE.LINUX;
  } else if (/Windows/i.test(userAgent)) {
    return OS_TYPE.LINUX;
  }
  return OS_TYPE.ETC;
};

/**
 * userAgent 로 OS Version 검사
 * @param userAgent, os
 * @return IOS 혹은 안드로이드 버전, 그 외 return null
 */
export const detectOsVersion = (userAgent: string, os: string): number | null => {
  if (os === OS_TYPE.IOS) {
    const match = userAgent.match(/iPhone os (\d+)_(\d+)/i);
    if (match && match.length > 1) {
      return parseFloat(`${match[1]}.${match[2]}`);
    }
  } else if (os === OS_TYPE.ANDROID) {
    const match = userAgent.match(/Android (\d+)/i);
    if (match && match.length > 1) {
      return parseInt(match[1]);
    }
  }
  return null;
}
