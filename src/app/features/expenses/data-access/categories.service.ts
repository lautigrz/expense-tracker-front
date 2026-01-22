import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environments';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {

    private baseUrl = environment.apiUrl;
    private httpClient = inject(HttpClient);
    private token = localStorage.getItem('token');

    constructor() { }

    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${this.baseUrl}/category`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

}
