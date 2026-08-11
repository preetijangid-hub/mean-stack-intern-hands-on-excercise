import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      '#fff3a3'
    );

    this.renderer.setStyle(
      this.element.nativeElement,
      'transition',
      '0.3s'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(
      this.element.nativeElement,
      'backgroundColor'
    );
  }
}