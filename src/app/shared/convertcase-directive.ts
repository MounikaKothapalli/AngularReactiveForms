import { Directive, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';



@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[uppercase]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    // When the user updates the input
    '(input)': 'onInput($event.target.value)',
    '(blur)': 'onTouched()',
  },
  providers: [ {provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ConvertCaseDirective),
    multi: true}]
})
export class ConvertCaseDirective extends DefaultValueAccessor {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    super(renderer, elRef, false);
}
 writeValue(value: any): void {
    const transformed = this.convertToUpper(value);

    super.writeValue(transformed);
  }

  onInput(value: any): void {
    const transformed = this.convertToUpper(value);

    super.writeValue(transformed);
    this.onChange(transformed);
  }

  private convertToUpper(value: any): any {
    const result = value && typeof value === 'string'
      ? value.toUpperCase()
      : value;

    return result;
  }
}
