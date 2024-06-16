<template>
  <div class="about">
    <NavbarComponent></NavbarComponent>
    <div class="about-us-container">
      <h1 class="text-3xl font-bold mb-4 mt-24">À Propos de Nous</h1>
      <div class="about-us-content">
        <p>
          Bienvenue chez Furu Diya, votre destination en ligne pour découvrir et acheter des produits traditionnels authentiques d'Afrique de l'Ouest. Nous sommes passionnés par la préservation et la promotion de l'héritage culturel de la région à travers nos produits uniques.
        </p>
        <p>
          Chez Furu Diya, nous nous engageons à fournir des produits de la plus haute qualité, fabriqués avec des techniques artisanales traditionnelles et des matériaux locaux durables. Chaque produit que vous trouvez ici raconte une histoire, portant en lui l'histoire riche et la diversité culturelle de l'Afrique de l'Ouest.
        </p>
        <p>
          Notre équipe est composée d'experts passionnés par la culture et l'artisanat de la région, et nous travaillons sans relâche pour vous offrir une expérience de magasinage en ligne exceptionnelle. Naviguez à travers notre sélection soigneusement organisée de produits, des textiles et vêtements traditionnels aux œuvres d'art uniques et aux instruments de musique traditionnels.
        </p>
        <p>
          Rejoignez-nous dans notre voyage pour célébrer et soutenir les communautés artisanales d'Afrique de l'Ouest et découvrez la richesse de cette région fascinante à travers nos produits authentiques.
        </p>
      </div>
    </div>
</div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
export default {
  name: 'AboutPage',
  components: {
    NavbarComponent
  }
};
</script>

<style scoped>
.about-us-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-us-content {
  line-height: 1.6;
}
</style>

