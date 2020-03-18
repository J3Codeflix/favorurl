export class GlobalConfig {
    public static readonly AUTH_URL = 'https://favorurl.com/';
    // public static readonly AUTH_URL = 'http://localhost:8000/';
    public static ADD_AUTH_URL = (url: string) => (GlobalConfig.AUTH_URL +  url);
  }