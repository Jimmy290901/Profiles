import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable } from "rxjs";
import { DataService } from "../services/data.service";

@Injectable({
    providedIn: 'root'
})
export class UsernameExistsService {

    constructor(private dataService: DataService) {}

    validate(exception: string): AsyncValidatorFn {
        return (username: AbstractControl): Observable<ValidationErrors | null> => {
            return this.dataService.checkUsername(username.value, exception);
        }
    }
}