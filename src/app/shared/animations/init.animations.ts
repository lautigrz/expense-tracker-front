import {
    trigger,
    transition,
    style,
    animate,
    query,
    stagger
} from '@angular/animations';

export const dashboardPageAnimation = trigger('revealTopToBottom', [
    transition(':enter', [


        animate('1ms', style({ opacity: 1 })),

        query('nav, section', [
            style({
                opacity: 0,
                transform: 'translateY(-16px)'
            }),
            stagger(180, [
                animate(
                    '500ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                    style({
                        opacity: 1,
                        transform: 'translateY(0)'
                    })
                )
            ])
        ], { optional: true })

    ])
]);
