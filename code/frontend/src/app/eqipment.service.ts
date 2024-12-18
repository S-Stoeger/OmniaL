import { Injectable } from '@angular/core';
import {Eqipment} from './eqipment';

@Injectable({
  providedIn: 'root'
})
export class EqipmentService {
  equipment: Eqipment[] = [
    {
      title: "GH4",
      name: "Panasonic Lumix DCM-GH4",
      type: "Videokamera",
      img: "./assets/images/gh4.jpg"
    },
    {
      title: "GH6",
      name: "Panasonic Lumix DCM-GH6",
      type: "Videokamera",
      img: "./assets/images/gh6.png"
    },
    {
      title: "Blackmagic",
      name: "Blackmagic Cinema Pocket",
      type: "Videokamera",
      img: "./assets/images/blackmagic.png"
    },
    {
      title: "Ronin M",
      name: "Dji Ronin M",
      type: "Zubehör",
      img: "./assets/images/roninM.png"
    },
    {
      title: "Ronin S",
      name: "Dji Ronin S",
      type: "Zubehör",
      img: "./assets/images/roninS.png"
    },
    {
      title: "Kamera",
      name: "Kamera",
      type: "Videokamera",
      img: "./assets/images/camera.png"
    },
    {
      title: "Ninja Monitor",
      name: "Atomos Ninja Inferno",
      type: "Zubehör",
      img: "./assets/images/ninjaMonitor.jpg"
    },
    {
      title: "Objektiv",
      name: "Sigma 18-35mm",
      type: "Zubehör",
      img: "./assets/images/objektiv.png"
    }
  ];

  constructor() { }

  getEquipment(): Eqipment[] {
    return this.equipment;
  }
}
