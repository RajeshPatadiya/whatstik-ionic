import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'htmlContent', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content:string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}