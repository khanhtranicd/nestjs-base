export interface BaseServiceOptions {
  repository: any;
  deleteMode: string;
}

export interface SessionConfigs {
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  store?: any;
  cookie?: any;
  rolling?: boolean;
  path?: string;
}
