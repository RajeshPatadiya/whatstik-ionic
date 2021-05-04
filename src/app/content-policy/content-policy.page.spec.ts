import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContentPolicyPage } from './content-policy.page';

describe('ContentPolicyPage', () => {
  let component: ContentPolicyPage;
  let fixture: ComponentFixture<ContentPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
