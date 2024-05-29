import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private HeroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute // para leer el url
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.HeroesService.getHeroById(id)) // permite tomar los params
      )
      .subscribe((hero) => {
        // aca podemos acceder a todos los paramentros como un observable
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      });
  }
}
