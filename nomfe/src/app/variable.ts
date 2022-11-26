import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePath');
export const COLLECTION_FORMATS = {
  csv: ',',
  tsv: '   ',
  ssv: ' ',
  pipes: '|',
};
export const GHN_TOKEN = '1986b6a9-18b9-11ed-b136-06951b6b7f89';
export const API_ROOT_URL = 'http://146.190.109.119/market';
