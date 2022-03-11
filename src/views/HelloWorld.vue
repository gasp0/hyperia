<template>
  <div class="row">
    <div class="col-sm-8">
      <h1 class="ms-0 m-3">Vitajte na Hyperia Hospital</h1>
      <p class="ps-0 p-3">
        Štátny nemocničný systém momentálne nedisponuje žiadnym centrálnym
        informačným systémom na registráciu očkovania, čo spôsobuje neefektivitu
        pri správe vakcín. Štát sa preto rozhodol pre investíciu do centrálneho
        informačného systému, ktorý by v konečnej konfigurácii pokrýval všetky
        aspekty očkovacích činností. Z ekonomického hľadiska je požiadavkou na
        implementáciu systému, aby systém bol jednoduchý, mohol byť vyvíjaný
        postupne a zároveň priebežne škálovateľný na základe aktuálnych
        požiadaviek.
      </p>

      <div class="alert alert-warning">
        <h3>Nejaký stručný popis</h3>
        <ol class="list-group list-group-flush">
          <li class="list-group-item bg-transparent">
            CSS som skoro celé potiahol z bootstrapu, ciže je to skôr na
            funkčnosť ako dizajn, ale ak by prišla nejaká figma alebo iný
            dizajn, určite by som sa s tým popasoval :)
          </li>
          <li class="list-group-item bg-transparent">
            Powered by Composition API, pripomína mi React :)
          </li>
          <li class="list-group-item bg-transparent">
            Pár komponentov aj s dátami, props, emits, provide, inject
          </li>
          <li class="list-group-item bg-transparent">
            Snažil som sa s dátami pracovať tak, aby sa napríklad automaticky
            načítalo nové vakcinačné centrum nie len do zoznamu centrier, ale aj
            do formulárov či filtrov
          </li>
          <li class="list-group-item bg-transparent">
            Vakcinačné čislo som využil ako indetifikátor (čiže nájde najväčšie
            v zozname a ptm +1, preto sa nedá priamo meniť či pridávať - to len
            ak by ste ho hladali :) )
          </li>
          <li class="list-group-item bg-transparent">
            Neviem aký spôsob server side renderingu používate, skusim to cez
            NUXT alebo by som si nechal poradiť
          </li>
        </ol>
      </div>
    </div>

    <div class="col-sm-4 mt-5 p-5">
      <img
        class="img-fluid"
        src="https://www.hyperia.sk/images/svgs/home-anim.svg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {},
})
</script>
