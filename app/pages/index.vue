<script setup>
import heroData from '~/../data/sections/hero.json'
import aboutData from '~/../data/sections/about.json'
import mainEventsData from '~/../data/sections/main-events.json'
import howItWorksData from '~/../data/sections/how-it-works.json'
import activitiesData from '~/../data/sections/activities.json'
import mapData from '~/../data/sections/map.json'
import orgData from '~/../data/sections/org.json'
import faqData from '~/../data/sections/faq.json'

useHead({
  title: 'Киберзарница 2026'
})
</script>

<template>
  <main>
    <HeroSection v-bind="heroData" />
    <AboutSection v-bind="aboutData" />
    <MainEventsSection v-bind="mainEventsData" />
    <HowItWorksSection v-bind="howItWorksData" />
    <ActivitiesSection v-bind="activitiesData" />
    <MapSection v-bind="mapData" />
    <OrgSection v-bind="orgData" />
    <Faq v-bind="faqData" />
  </main>
</template>
