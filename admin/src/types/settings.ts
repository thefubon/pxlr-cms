export interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
}

export interface PostSettings {
  postsPerPage: number;
  categories: string[];
}

export interface Settings {
  general: GeneralSettings;
  posts: PostSettings;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  settings: Settings;
} 