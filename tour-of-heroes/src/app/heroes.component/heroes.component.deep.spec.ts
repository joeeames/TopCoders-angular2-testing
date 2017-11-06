import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero.component/hero.component';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service/hero.service';
import { Router } from '@angular/router';

describe('HeroDetailComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  const HEROES = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  beforeEach(fakeAsync(() => {

    const mockHeroService = {
      getHeroes: () => Promise.resolve(HEROES),
      delete: () => Promise.resolve()
    };

    const mockRouter = {};

    TestBed.configureTestingModule({
      declarations: [
        HeroComponent,
        HeroesComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);

    // Trigger ngOnInit()
    fixture.detectChanges();
    // Resolve the promise from heroesService.getHeroes()
    tick();
    // Render the hero components
    fixture.detectChanges();
  }));

  it('should render each hero as a HeroComponent', () => {
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponents.length).toEqual(HEROES.length);
    expect(heroComponents[0].componentInstance.hero).toBe(HEROES[0]);
  });

  it('should delete the hero when the HeroComponent outputs the "delete" event', () => {
    spyOn(fixture.componentInstance, 'delete');
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should select the hero when the hero is clicked', () => {
    const heroContainers = fixture.debugElement.queryAll(By.css('li'));
    heroContainers[0].triggerEventHandler('click', null);
    expect(fixture.componentInstance.selectedHero).toBe(HEROES[0]);
  });

  it('should add a new hero to this list when one is added', fakeAsync(() => {
    var name = "Mr. Ice";

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    
    inputElement.value = name;      
    addButton.triggerEventHandler('click', null)
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getHeroesText(fixture)).toContain(name);
  }));

  function getHeroesText(fixture) {
    return fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
  }
});
