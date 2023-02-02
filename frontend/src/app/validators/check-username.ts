import { Injectable } from "@angular/core";
import { FormControl, ValidationErrors, Validator } from "@angular/forms";
import { DataService } from "../services/data.service";

@Injectable({
    providedIn: 'root'
})
export class CheckUsernameExists implements Validator {
    constructor(private dataService: DataService) {}
    validate(username: FormControl): ValidationErrors | null {
        if (this.dataService.checkUsername(username.value)) {
            return {'username_exists': true};
        }
        return null;
    }
}