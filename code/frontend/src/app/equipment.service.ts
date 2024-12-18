import { Injectable } from '@angular/core';
import {Equipment} from './equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipment: Equipment[] = [
    {
      id: 1,
      title: "GH4",
      name: "Panasonic Lumix DCM-GH4",
      type: "Videokamera",
      img: "./assets/images/gh4.jpg"
    },
    {
      id: 2,
      title: "GH6",
      name: "Panasonic Lumix DCM-GH6",
      type: "Videokamera",
      img: "./assets/images/gh6.png"
    },
    {
      id: 3,
      title: "Blackmagic",
      name: "Blackmagic Cinema Pocket",
      type: "Videokamera",
      img: "./assets/images/blackmagic.png"
    },
    {
      id: 4,
      title: "Ronin M",
      name: "Dji Ronin M",
      type: "Zubehör",
      img: "./assets/images/roninM.png"
    },
    {
      id: 5,
      title: "Ronin S",
      name: "Dji Ronin S",
      type: "Zubehör",
      img: "./assets/images/roninS.png"
    },
    {
      id: 6,
      title: "Kamera",
      name: "Kamera",
      type: "Videokamera",
      img: "./assets/images/camera.png"
    },
    {
      id: 7,
      title: "Ninja Monitor",
      name: "Atomos Ninja Inferno",
      type: "Zubehör",
      img: "./assets/images/ninjaMonitor.jpg"
    },
    {
      id: 8,
      title: "Objektiv",
      name: "Sigma 18-35mm",
      type: "Zubehör",
      img: "./assets/images/objektiv.png"
    }
  ];

  constructor() { }

  getEquipment(): Equipment[] {
    return this.equipment;
  }

  getEquipmentById(id: number): Equipment | undefined {
    return this.equipment.at(id);
  }
}
