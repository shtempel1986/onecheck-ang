import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'input[only-latin]'
})
export class OnlyLatin {

  @HostListener('keydown', ['$event'])
  onInput(e ): void {
    console.log(e);
    console.log(e.key, e.key.match(/[а-яА-ЯЁё\s+]/g));
    if(e.key.match(/[а-яА-ЯЁё\s+]/g)){
      e.preventDefault();
    }
  }

}