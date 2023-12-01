import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PribadiPage } from './pribadi.page';

describe('PribadiPage', () => {
  let component: PribadiPage;
  let fixture: ComponentFixture<PribadiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PribadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
