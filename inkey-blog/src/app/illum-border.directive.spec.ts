import { ElementRef, Renderer2 } from '@angular/core';
import { IllumBorderDirective } from './illum-border.directive';

describe('IllumBorderDirective', () => {
  let directive : IllumBorderDirective
  let mockref : ElementRef
  let mockrenderer:Renderer2

  beforeEach(()=>{
    mockref = new ElementRef(document.createElement('div'));
    mockrenderer = jasmine.createSpyObj('Renderer2',['SetStyle'])
    directive = new IllumBorderDirective(mockref,mockrenderer)
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
