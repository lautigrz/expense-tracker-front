import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/data-access/auth.service';
import { catchError, of, tap, Observable, map } from 'rxjs';

export interface UserState {
    isAuthenticated: boolean;
    token: string | null;
    username: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private router = inject(Router);
    private authService = inject(AuthService);

    private userState = signal<UserState>({
        isAuthenticated: false,
        token: null,
        username: null
    });

    isAuthenticated = computed(() => this.userState().isAuthenticated);
    currentUser = computed(() => this.userState().username);
    token = computed(() => this.userState().token);

    constructor() { }


    checkAuthStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token) {
            this.userState.set({
                isAuthenticated: false,
                token: null,
                username: null
            });
            return of(false);
        }

        return this.authService.verifyToken().pipe(
            tap(response => {
                if (response.valid) {
                    this.userState.set({
                        isAuthenticated: true,
                        token,
                        username
                    });
                } else {
                    this.logout();
                }
            }),
            map(response => response.valid),
            catchError(() => {
                this.logout();
                return of(false);
            })
        );
    }

    login(token: string, username?: string): void {
        localStorage.setItem('token', token);

        if (username) {
            localStorage.setItem('username', username);
        }

        this.userState.set({
            isAuthenticated: true,
            token,
            username: username || null
        });
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        this.userState.set({
            isAuthenticated: false,
            token: null,
            username: null
        });

        this.router.navigate(['']);
    }
    refreshAuthStatus(): void {
        this.checkAuthStatus();
    }
}
