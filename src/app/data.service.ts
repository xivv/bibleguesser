import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();

    if (await this.get('highscore_endless') == null) {
      await this.set('highscore_endless', 0);
    }

    if (await this.get('highscore_timeAttack') == null) {
      await this.set('highscore_timeAttack', 0);
    }
  }

  get(key: string) {
    return this.storage.get(key);
  }

  set(key: string, value: any) {
    return this.storage.set(key, value);
  }
}
