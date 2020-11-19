import { Component, OnInit } from "@angular/core";
import { AppUser } from "../../../shared/models/app-user";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrls: ["./myprofile.component.css"],
})
export class MyprofileComponent implements OnInit {
  // appUser: AppUser;
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    // this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
}
