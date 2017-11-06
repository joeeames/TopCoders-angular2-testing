import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { HeroService } from '../hero.service/hero.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HeroesComponent } from "app/heroes.component/heroes.component";
import { HeroComponent } from "app/hero.component/hero.component";

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let element;
  let heroes = [
    {id: 3, name: 'Magneta', strength: 4},
    {id: 4, name: 'Dynama', strength: 2}
  ];

  let mockHeroService, mockRouter

  beforeEach(() => {

    mockHeroService = {
      getHeroes: () => Promise.resolve(heroes),
      create: (name) => Promise.resolve({id:5, name: name, strength: 3})
    };
    mockRouter = {
      
    };

    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        // useValue may create a clone of the objects passed
        { provide: HeroService, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [
        // NO_ERRORS_SCHEMA will hide that angular doesn't know about ngModel
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  

  describe('save()', () => {
    let saveButton;
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    
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
  });

});

function createEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

function getHeroesText(fixture) {
  return fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
}
