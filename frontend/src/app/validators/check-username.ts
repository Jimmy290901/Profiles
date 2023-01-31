import { FormControl, ValidationErrors } from "@angular/forms";

export function CheckUsernameExists(username: FormControl): ValidationErrors | null {
    const usernameList = ['abc','123'];
    if (usernameList.includes(username.value)) {
        return {'username_exists': true};
    }
    return null;
  }