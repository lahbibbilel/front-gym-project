import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import ScrollReveal from 'scrollreveal';
import {ProductsService} from "./products.service";
import {Observable} from "rxjs";
import {User} from "../user/user";
import {Router} from "@angular/router";
import {TrainerService} from "./trainer.service";




@Component({
  selector: 'app-homebase',
  templateUrl: './homebase.component.html',
  styleUrls: ['./homebase.component.css']
})
export class HomebaseComponent implements OnInit {


  constructor(private service: ProductsService,
              private router :Router,
              private trainer : TrainerService) {
  }

  product!: any
  trainers: any[] = []; // Assuming trainers is an array
  ngOnInit(): void {
    this.service.getProducts().subscribe(
      (data: any[]) => {
        console.log("test",data)
        this.product = data;
        console.log('Abonnement fetched successfully:', this.product);
      },
      (error: any) => {
        console.error('Error fetching Abonnement:', error);
      }
    );

    this.trainer.getTrainers().subscribe(
      (date : any[])=>{
        this.trainers=date;
        console.log("trainers success", this.trainers)
      },
      (error)=>{
        console.log("any trainers founded")
      }
    )

    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i"); // Add null check using `?.`

    if (menuBtn && navLinks && menuBtnIcon) {
      menuBtn.addEventListener("click", (e) => {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      });

      navLinks.addEventListener("click", (e) => {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      });
      const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
      };

      // header container
      ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
      });

      ScrollReveal().reveal(
        ".header__content h4, .header__content .section__header",
        {
          ...scrollRevealOption,
          delay: 500,
        }
      );

      ScrollReveal().reveal(".header__content p", {
        ...scrollRevealOption,
        delay: 1000,
      });

      ScrollReveal().reveal(".header__btn", {
        ...scrollRevealOption,
        delay: 1500,
      });

      // about container
      ScrollReveal().reveal(".about__image img", {
        ...scrollRevealOption,
        origin: "left",
      });

      ScrollReveal().reveal(".about__content .section__header", {
        ...scrollRevealOption,
        delay: 500,
      });

      ScrollReveal().reveal(".about__content .section__description", {
        ...scrollRevealOption,
        delay: 1000,
      });

      ScrollReveal().reveal(".about__card", {
        ...scrollRevealOption,
        delay: 1500,
        interval: 500,
      });

      // price container
      ScrollReveal().reveal(".price__card", {
        ...scrollRevealOption,
        interval: 500,
      });

      const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 20,

      });

    }
  }

// Suppose que vous avez une méthode pour naviguer vers une section spécifique
  navigateToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }



}
