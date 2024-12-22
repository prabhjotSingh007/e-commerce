// snackbar.service.ts
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
// import {Matsnack}

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string, type: "success" | "error") {
    console.log("working");
    const panelClass =
      type === "success" ? ["success-snackbar"] : ["error-snackbar"];

    this.snackBar.open(message, type.charAt(0).toUpperCase() + type.slice(1), {
      duration: 3000,
      panelClass: panelClass,
    });
  }
}
