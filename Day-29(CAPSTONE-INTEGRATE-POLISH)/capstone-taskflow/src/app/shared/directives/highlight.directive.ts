import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      'translateY(-4px)'
    );

    this.renderer.setStyle(
      this.element.nativeElement,
      'box-shadow',
      '0 14px 32px rgba(0, 0, 0, 0.12)'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      'translateY(0)'
    );

    this.renderer.removeStyle(
      this.element.nativeElement,
      'box-shadow'
    );
  }
}