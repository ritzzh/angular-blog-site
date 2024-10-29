import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIllumBorder]',
  standalone: true
})
export class IllumBorderDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.illuminate();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resetBorder();
  }

  private illuminate() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid coral'); 
  }

  private resetBorder() {
    this.renderer.setStyle(this.el.nativeElement, 'border', ''); 
  }
}
