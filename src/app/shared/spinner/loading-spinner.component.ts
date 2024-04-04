import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="loader" #loader></div>`,
  styles: [`.loader {
    border: .6rem solid var(--color-primary__dark);
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: 0 auto;
    /* display: block; */
    animation: rotation 1s linear infinite;
  }`]
})

export class LoadingSpinnerComponent implements AfterViewInit {

  @ViewChild('loader') loader: ElementRef;

  // Default Size will be 5rem
  @Input() size: number = 5;

  ngAfterViewInit(): void {
    this.loader.nativeElement.style.width = this.size + 'rem';
    this.loader.nativeElement.style.height = this.size + 'rem';
    this.loader.nativeElement.style.borderWidth = (this.size / 10 + 0.1).toString() + 'rem';
  }

}
