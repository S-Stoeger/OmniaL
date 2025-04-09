<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/S-Stoeger/OmniaL">
    <img src="https://raw.githubusercontent.com/S-Stoeger/OmniaL/main/code/frontend/assets/images/Logo-OmniaL-rund.png" alt="Logo" width="100" height="100">

  </a>

  <h3 align="center">OmniaL</h3>

  <p align="center">
    Das Programm für Raumreservierung und Equpmentverleih
    <br />
    <a href="https://github.com/S-Stoeger/OmniaL/tree/main/dokument"><strong>Dokumentation erkunden »</strong></a>
    <br />
    <br />
    <!-- <a href="">View Demo</a>
    ·
    <a href="">Report Bug</a>
    ·
    <a href="">Request Feature</a> -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Inhaltsverzeichnis</summary>
  <ol>
    <li>
      <a href="#über-das-projekt">Über das Projekt</a>
      <ul>
        <li><a href="#technologien">Technologien</a></li>
      </ul>
    </li>
    <li>
      <a href="#erste-schritte">Erste Schritte</a>
      <ul>
        <li><a href="#voraussetzungen">Voraussetzungen</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#nutzung">Nutzung</a></li>
      </ul>
    </li>
    <li><a href="#mitglieder">Mitglieder</a></li>
  </ol>
</details>


## Über das Projekt
<!-- Screenshot von UI bzw Startseite -->
<!-- [![Product Name Verwaltung deScreen Shot][product-screenshot]](https://example.com)-->
Die Equipmentverwaltung der Schule erfolgt größtenteils per Papier oder über eine Exel datei.
Dies führt oft zu Verwechslungen und Chaos bei dem Verleih.
In Sachen Raumreservierung ist es Schülern bis dato nicht möglich, Räume zu reservieren.
Und hier kommt OmniaL ins Spiel:

## Vorteile
* **Benutzerfreundliche Oberfläche:** bequem und schnell Equipment reservieren
* **Vereinte Verwaltung von Räumen und Equipment:** keine separaten Tools nötig
* **Anzeige der Verfügbarkeit in nahezu Echtzeit:** einfache Planung und kurzfristige Änderungen möglich


### Technologien
* [![TypeScript][TypeScript.js]][TypeScript-url]
* [![Java][Java]][Java-url]
* [![Quarkus][Quarkus]][Quarkus-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Keycloak][Keycloak]][Keycloak-url]


<a href="https://github.com/S-Stoeger/OmniaL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=S-Stoeger/OmniaL&max=4" />
</a>


## Lokal laufen lassen
* Docker Container mit PostgreSQL Datenbank starten (docker-compose.yaml in backend)
* application.properties wenn nötig anpassen
* Backend starten
* Links fürs Posten der Reservierung im Frontend auf localhost ändern
* Frontend starten
* Mit Schülerlogin bei keycloak einloggen (Keycloak wird von Professor Aberger gemanaged)
* Fertig

## Ausbaumöglichkeiten in der Zukunft
* Räume reservieren verbessern (mehrere Räume reservieren, Raum ohne Equipment reservieren, etc)
* Jedes Equipment, das man in der Schule reservieren kann, in die DB einspielen (Name, Foto, etc)
* Open Search einbauen
* Ausführlich Testn und BUGS FIXEN
* Filtersysteme einbauen wie "Am Beliebtesten", "Kürzlich zurückgegeben", etc.
* QR-Code eines Equipment einscannen und direkt Reservieren

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!--
## Licence
Siehe `LICENSE.txt` für mehr Informationen.
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- Links und Bilder URL's -->
[contributors-shield]: https://img.shields.io/github/contributors/S-Stoeger/OmniaL.svg?style=for-the-badge
[contributors-url]: https://github.com/S-Stoeger/OmniaL/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/S-Stoeger/OmniaL.svg?style=for-the-badge
[forks-url]: https://github.com/S-Stoeger/OmniaL/network/members
[issues-shield]: https://img.shields.io/github/issues/S-Stoeger/OmniaL.svg?style=for-the-badge
[issues-url]: https://github.com/S-Stoeger/OmniaL/
[license-shield]: https://img.shields.io/github/license/S-Stoeger/OmniaL.svg?style=for-the-badge
[license-url]: https://github.com/S-Stoeger/OmniaL/blob/master/LICENSE.txt

[TypeScript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Java]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[Java-url]: https://www.java.com/
[Quarkus]: https://img.shields.io/badge/Quarkus-4695EB?style=for-the-badge&logo=quarkus&logoColor=white
[Quarkus-url]: https://quarkus.io/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Keycloak]: https://img.shields.io/badge/Keycloak-000000?style=for-the-badge&logo=keycloak&logoColor=white
[Keycloak-url]: https://www.keycloak.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
