import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
socialMediaIcons=[{
    icon:'fa-brands fa-facebook-f',
    link:'https://www.google.com/'
  },
  {
    icon:'fa-brands fa-x-twitter',
    link:'https://www.google.com/'
  },
  {
    icon:'fa-brands fa-youtube',
    link:'https://www.google.com/'
  },
  {
    icon:'fa-brands fa-instagram',
    link:'https://www.google.com/'
  }
]
}
