<script setup>
import heroData from '~/../data/sections/hero.json'
import aboutData from '~/../data/sections/about.json'
import mainEventsData from '~/../data/sections/main-events.json'
import howItWorksData from '~/../data/sections/how-it-works.json'
import activitiesData from '~/../data/sections/activities.json'
import mapData from '~/../data/sections/map.json'
import faqData from '~/../data/sections/faq.json'

useHead({
  title: 'Киберзарница 2026'
})
</script>

<template>
  <main>
    <HeroSection
      :title="heroData.title"
      :subtitle="heroData.subtitle"
      :location="heroData.location"
      :button="heroData.button"
      :background-image="heroData.backgroundImage"
      :nav-items="heroData.navItems"
    />
    <AboutSection
      :title="aboutData.title"
      :paragraphs="aboutData.paragraphs"
      :benefits="aboutData.benefits"
    />
    <MainEventsSection
      :title="mainEventsData.title"
      :events="mainEventsData.events"
    />
    <HowItWorksSection
      :title="howItWorksData.title"
      :steps="howItWorksData.steps"
      :button="howItWorksData.button"
    />
    <ActivitiesSection
      :title="activitiesData.title"
      :subtitle="activitiesData.subtitle"
      :digital="activitiesData.digital"
      :physical="activitiesData.physical"
      :description="activitiesData.description"
      :rewards="activitiesData.rewards"
    />
    <MapSection
      :title="mapData.title"
      :actions="mapData.actions"
      :zones="mapData.zones"
      :stations="mapData.stations"
    />
    <Faq
      :title="faqData.title"
      :items="faqData.items"
      :images="faqData.images"
    />
  </main>
</template>
