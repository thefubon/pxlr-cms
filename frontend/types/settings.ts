// Типы настроек (совпадают с backend)
export interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
}

export interface PostSettings {
  postsPerPage: number;
}

export interface Settings {
  general: GeneralSettings;
  posts: PostSettings;
} 