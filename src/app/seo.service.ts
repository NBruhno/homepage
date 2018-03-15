import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {
    constructor(private meta: Meta) {}

    generateTags(config) {
        config = {
            title: 'Bruhno',
            description:
                'This is Nicolai Bruhn Lauritsen or more commonly known as Bruhno\'s personal website which functions as a portfolio.',
            image: 'https://bruhno.com/assets/images/B Light.svg',
            slug: '',
            ...config
        };

        this.meta.updateTag({
            name: 'twitter:card',
            content:
                'This is Nicolai Bruhn Lauritsen or more commonly known as Bruhno\'s personal website which functions as a portfolio.'
        });
        this.meta.updateTag({ name: 'twitter:site', content: '@NBruhno' });
        this.meta.updateTag({ name: 'twitter:title', content: config.title });
        this.meta.updateTag({ name: 'twitter:description', content: config.description });
        this.meta.updateTag({ name: 'twitter:image', content: config.image });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'Bruhno' });
        this.meta.updateTag({ property: 'og:title', content: config.title });
        this.meta.updateTag({ property: 'og:description', content: config.description });
        this.meta.updateTag({ property: 'og:image', content: config.image });
        this.meta.updateTag({ property: 'og:url', content: `https://bruhno.com/${config.slug}` });
    }
}
