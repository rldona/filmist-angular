import { Injectable } from '@angular/core';

@Injectable()
export class ScreenService {

  landscape: any;

  isPortrait: boolean;
  isLandscape: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;

  constructor() {

    let portrait     = matchMedia('(orientation: portrait)');
    this.landscape    = matchMedia('(orientation: landscape)');

    this.isPortrait  = portrait.matches;
    this.isLandscape = this.landscape.matches;

    // if (this.isPortrait)  { console.log(':: Is protrait ::');  }
    // if (this.isLandscape) { console.log(':: Is landscape ::'); }

    // Listener
    // portrait.addListener(function(p){
    //   this.isPortrait = p.matches;
    //   if (this.isPortrait) { console.log(':: Is portrait ::'); }
    // });

    // this.landscape.addListener(function(l){
    //   this.isLandscape = l.matches;
    //   if (this.isLandscape) { console.log(':: Is landscape ::'); }
    // });

    let desktop    = matchMedia('(min-width: 1025px)');
    let tablet     = matchMedia('(min-width: 768px) and (max-width: 1024px)');
    let mobile     = matchMedia('(min-width: 320px) and (max-width: 767px)');

    this.isDesktop = desktop.matches;
    this.isTablet  = tablet.matches;
    this.isMobile  = mobile.matches;

    if (this.isDesktop) { console.log(':: Is desktop ::'); }
    if (this.isTablet)  { console.log(':: Is tablet ::');  }
    if (this.isMobile)  { console.log(':: Is mobile ::');  }

    desktop.addEventListener('change', d => {
      this.isDesktop = d.matches;
      // if (this.isDesktop) { console.log(':: Is desktop ::'); }
    });

    desktop.addEventListener('change', t => {
      this.isTablet = t.matches;
      // if (this.isTablet)  { console.log(':: Is tablet ::');  }
    });

    desktop.addEventListener('change', m => {
      this.isMobile = m.matches;
      // if (this.isMobile)  { console.log(':: Is mobile ::');  }
    });
  }
}
