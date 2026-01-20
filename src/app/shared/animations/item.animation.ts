import { animate, style, transition, trigger } from "@angular/animations";

export const itemCascadeAnimation = trigger('itemCascade', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px)' }),
        animate(
            '350ms cubic-bezier(0.25, 0.8, 0.25, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
        )
    ])
]);
