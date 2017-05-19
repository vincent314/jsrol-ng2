import {trigger, state, style, transition, animate} from '@angular/core';
export function routerTransition() {
  return trigger('routerTransition', [
    state('void', style({
      background: 'rgba(0, 0, 0, 0.7)',
      visibility: 'hidden',
      opacity: '0',
      'z-index': '2000'
    })),
    state('*', style({
      visibility: 'visible',
      opacity: '1',
      'z-index': '2000'
    })),
    transition(':leave', animate('500ms')),
    transition(':enter', animate('500ms'))
])
}
