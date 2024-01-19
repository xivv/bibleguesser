import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { BibleService } from '../model/bible.service';
import { Bible, Book, Cap, Vers } from '../model/Book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  public bible: Bible;
  public versSearched: Book;

  public bookSelected: Book;
  public capSelected: Cap;
  public versSelected: Vers;
  public showResult = false;
  public versesTraveled;

  public counter = 180;
  public timerActive = false;
  public timerStarted = false;
  public lastAcc = 0;

  // null to enable 3 minute mode
  public mode = null;
  public points = 0;
  public lifes = 3;
  public highscore: number;

  constructor(
    private bibleService: BibleService,
    private dataService: DataService
  ) {
    this.bible = bibleService.getBible();
    this.versSearched = this.bibleService.getRandomVers();
  }

  selectBook(book: Book) {
    this.bookSelected = book;
  }

  selectCap(cap: Cap) {
    this.capSelected = cap;
  }

  selectVers(vers: Vers) {
    this.versSelected = vers;
    if (this.mode === 1) {
      this.timerActive = false;
    }
    this.showResult = true;
    this.versesTraveled = this.getVersesTraveled();
  }

  getCaps() {
    return this.bible.books.find(
      (element) => element.name === this.bookSelected.name
    ).cap;
  }

  getVerses() {
    return this.capSelected.verses;
  }

  getVersesTraveled() {
    const positionOfSearched = this.getPositionOfVersSearched();
    const positionOfSelected = this.getPositionOfVersSelected();
    const traveled = Math.abs(positionOfSearched - positionOfSelected);

    const longedPossiblePath =
      positionOfSearched > this.bible.totalVerses / 2
        ? positionOfSearched
        : this.bible.totalVerses - positionOfSearched;
    const acc = Math.floor(100 - (traveled / longedPossiblePath) * 100);
    this.lastAcc = acc;

    let extraMessage = '';
    if (acc === 100) {
      this.showSilverFlash();
      this.lifes++;
      this.points += 5;
      extraMessage = `Wow! Du grabst wirklich tief nach dem Silber! <br> Du erhälst fünf Punkte und ein Leben`;
    } else if (acc === 99) {
      this.showGreenFlash();
      extraMessage = `Wow sehr nah dran! Du erhälst drei Punkte (99%)`;
      this.points += 3;
    } else if (acc > 90) {
      this.showGreenFlash();
      extraMessage = `Du erhälst zwei Punkte (90%)`;
      this.points += 2;
    } else if (acc > 80) {
      this.showGreenFlash();
      extraMessage = `Du erhälst einen Punkt (80%)`;
      this.points++;
    } else {
      this.showRedFlash();
      this.lifes--;
      extraMessage = `Leider zu weit entfernt! <br> Erreiche mindestens 80%. Du verlierst ein Leben`;
      if (this.lifes <= 0 && this.mode === 0) {
        if (this.highscore < this.points) {
          this.highscore = this.points;
          const highscoremMode =
            this.mode === 0 ? 'highscore_endless' : 'highscore_timeAttack';
          this.dataService.set(highscoremMode, this.points);
        }
        this.points = 0;
        this.lifes = 3;
        extraMessage = `Guter Versuch! Du hast leider alle Leben verloren`;
      }
    }

    return (
      `Du bist ${traveled} Verse entfernt. <br> Das entspricht einer Genauigkeit von ${acc}%!` +
      '<br>' +
      `<span class="extramessage">` +
      extraMessage +
      `</span>`
    );
  }

  getResultClass(){
      if(this.lastAcc < 80){
        return 'redresult';
      } if(this.lastAcc === 100){
        return 'silverresult';
      }else{
        return 'greenresult';
      }
  }

  getPositionOfVersSearched(): number {
    let position = 0;

    for (let index = 0; index < this.bible.books.length; index++) {
      const book = this.bible.books[index];

      for (let a = 0; a < book.cap.length; a++) {
        const cap = book.cap[a];

        if (
          book.name === this.versSearched.name &&
          cap.numb === this.versSearched.cap[0].numb
        ) {
          position += this.versSearched.cap[0].verses[1].numb;
          return position;
        } else {
          position += cap.verses.length;
        }
      }
    }
    return -1;
  }

  getPositionOfVersSelected(): number {
    let position = 0;
    for (let index = 0; index < this.bible.books.length; index++) {
      const book = this.bible.books[index];

      for (let a = 0; a < book.cap.length; a++) {
        const cap = book.cap[a];
        if (
          book.name === this.bookSelected.name &&
          cap.numb === this.capSelected.numb
        ) {
          position += this.versSelected.numb;
          return position;
        } else {
          position += cap.verses.length;
        }
      }
    }
    return -1;
  }

  reload() {
    this.bookSelected = null;
    this.capSelected = null;
    this.versSelected = null;
    this.showResult = false;
    this.versSearched = this.bibleService.getRandomVers();
    this.timerActive = true;
  }

  back() {
    if (this.capSelected) {
      this.capSelected = null;
    }
    if (this.bookSelected) {
      this.bookSelected = null;
    }
  }

  async selectMode(mode: number) {
    this.mode = mode;

    const highscoremMode =
      this.mode === 0 ? 'highscore_endless' : 'highscore_timeAttack';
    this.highscore = await this.dataService.get(highscoremMode);
    if (this.highscore === null) {
      this.highscore = 0;
    }
    this.lifes = 3;
  }

  toggleTimer(){
    this.timerActive = !this.timerActive;
    console.log(this.timerActive);
    if(this.timerActive){
      this.counter = 180;
      this.timerStarted = true;
      this.timer();
    }
  }

  timer() {
    const intervalId = setInterval(() => {
      if (this.timerActive) {
        this.counter = this.counter - 1;
      }
      if (this.counter <= 0) {
        clearInterval(intervalId);
        this.timerActive = false;
        this.timerStarted = false;
      }
    }, 1000);
  }

  reset(){
    window.location.reload();
  }


  showFlash(color){
    const flashElement = document.createElement('div');
    flashElement.classList.add(color+'flash');
    document.body.appendChild(flashElement);

    // Entfernen Sie das Element nach der Animation
    flashElement.addEventListener('animationend', () => {
      flashElement.remove();
    });
  }

  showRedFlash(){
    this.showFlash('red');
  }

  showSilverFlash(){
    this.showFlash('silver');
  }

   showGreenFlash() {
    this.showFlash('green');
  }
}
