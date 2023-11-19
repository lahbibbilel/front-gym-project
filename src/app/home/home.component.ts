import {
  AfterViewInit, Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, OnInit, OnDestroy
} from '@angular/core';
//import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
images: { src: string }[] = [
  { src: 'assets/gym1.jpg' },  // Chemin relatif à partir du dossier "assets"
  { src: 'assets/gym2.jpg' },
  { src: 'assets/gym1.jpg' },
  // Ajoutez autant d'objets d'image que nécessaire
];
private currentIndex = 0;
private scrollInterval: any;

ngAfterViewInit() {
  // Démarrer le défilement automatique à intervalles réguliers
  this.scrollInterval = setInterval(() => this.scrollImages(), 2000); // Défilement toutes les 2 secondes
}




private scrollImages() {
  // Récupérer la largeur du conteneur
  const containerWidth = this.imageContainer.nativeElement.offsetWidth;

  // Calculer la position de défilement pour l'image actuelle
  const scrollLeft = this.currentIndex * containerWidth;

  // Définir la position de défilement pour le conteneur
  this.imageContainer.nativeElement.scrollLeft = scrollLeft;

  // Incrémenter l'indice de l'image actuelle
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
}
}
