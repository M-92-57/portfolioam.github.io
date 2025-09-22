// === ANIMATION REVEAL AU SCROLL === // Commentaire pour la fonction d'animation au scroll
function revealOnScroll() { // Définition de la fonction revealOnScroll
  const reveals = document.querySelectorAll(".reveal"); // Sélection de tous les éléments avec la classe "reveal"

  for (let i = 0; i < reveals.length; i++) { // Boucle pour parcourir tous les éléments reveal
    let windowHeight = window.innerHeight; // Hauteur de la fenêtre du navigateur
    let revealTop = reveals[i].getBoundingClientRect().top; // Position du haut de l'élément par rapport au viewport
    let revealPoint = 150; // décalage avant l'apparition // Point de déclenchement de l'animation (150px avant d'être visible)

    if (revealTop < windowHeight - revealPoint) { // Si l'élément est proche d'être visible
      reveals[i].classList.add("active"); // Ajouter la classe "active" pour déclencher l'animation
    } else { // Sinon
      reveals[i].classList.remove("active"); // Retirer la classe "active"
    }
  } 
} 

// === NAVBAR SCROLL EFFECT === // Commentaire pour l'effet de scroll de la navbar
function navbarScrollEffect() { // Définition de la fonction navbarScrollEffect
  const navbar = document.querySelector('.navbar'); // Sélection de l'élément navbar
  
  if (window.scrollY > 50) { // Si l'utilisateur a scrollé plus de 50px
    navbar.classList.add('navbar-scrolled'); // Ajouter la classe pour l'effet de scroll
  } else { // Sinon
    navbar.classList.remove('navbar-scrolled'); // Retirer la classe
  }
}

// === SMOOTH SCROLLING POUR LES LIENS DE NAVIGATION === // Commentaire pour le défilement fluide
function initSmoothScrolling() { // Définition de la fonction initSmoothScrolling
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Sélection de tous les liens de navigation
  
  navLinks.forEach(link => { // Parcours de chaque lien de navigation
    link.addEventListener('click', function(e) { // Ajout d'un écouteur d'événement sur le clic
      const href = this.getAttribute('href'); // Récupération de l'attribut href du lien
      
      // Si c'est un lien vers une autre page, laisser le comportement par défaut // Commentaire explicatif
      if (href.includes('.html') || href === 'index.html' || href === '/') { // Vérification si c'est un lien vers une autre page
        return; // Laisser le navigateur gérer la navigation // Sortie de la fonction pour laisser le comportement par défaut
      } 
      
      // Si c'est un lien d'ancrage sur la même page // Commentaire explicatif
      if (href.startsWith('#')) { // Vérification si c'est un lien d'ancrage
        e.preventDefault(); // Empêcher le comportement par défaut du lien
        const target = document.querySelector(href); // Sélection de l'élément cible
        
        if (target) { // Si l'élément cible existe
          const offsetTop = target.offsetTop - 80; // Ajustement pour la navbar fixe // Calcul de la position avec décalage pour la navbar
          
          window.scrollTo({ // Défilement vers la position calculée
            top: offsetTop, // Position verticale
            behavior: 'smooth' // Comportement de défilement fluide
          }); 
          
          // Fermer le menu mobile si ouvert // Commentaire explicatif
          const navbarCollapse = document.querySelector('.navbar-collapse'); // Sélection du menu collapsible
          if (navbarCollapse.classList.contains('show')) { // Vérification si le menu est ouvert
            const bsCollapse = new bootstrap.Collapse(navbarCollapse); // Création d'une instance Bootstrap Collapse
            bsCollapse.hide(); // Fermeture du menu
          }
        } 
      } 
    }); 
  }); 
}

// === ANIMATION DES PROGRESS BARS === // Commentaire pour l'animation des barres de progression
function animateProgressBars() { // Définition de la fonction animateProgressBars
  const progressBars = document.querySelectorAll('.progress-bar'); // Sélection de toutes les barres de progression
  
  const observer = new IntersectionObserver((entries) => { // Création d'un observateur d'intersection
    entries.forEach(entry => { // Parcours de chaque entrée observée
      if (entry.isIntersecting) { // Si l'élément est visible dans le viewport
        const progressBar = entry.target; // Récupération de l'élément barre de progression
        const width = progressBar.style.width; // Sauvegarde de la largeur finale
        
        // Réinitialiser la largeur // Commentaire explicatif
        progressBar.style.width = '0%'; // Remise à zéro de la largeur
        
        // Animer vers la largeur finale // Commentaire explicatif
        setTimeout(() => { // Délai avant l'animation
          progressBar.style.width = width; // Application de la largeur finale
        }, 200); // Délai de 200ms
        
        observer.unobserve(progressBar); // Arrêt de l'observation de cette barre
      }
    });
  }, { threshold: 0.5 }); // Seuil de 50% de visibilité pour déclencher l'animation
  
  progressBars.forEach(bar => { // Parcours de chaque barre de progression
    observer.observe(bar); // Début de l'observation de la barre
  }); 
} 

// === GESTION DU FORMULAIRE DE CONTACT === // Commentaire pour la gestion du formulaire
function initContactForm() { // Définition de la fonction initContactForm
  const contactForm = document.getElementById('contactForm'); // Sélection du formulaire de contact par son ID
  
  if (contactForm) { // Vérification si le formulaire existe
    contactForm.addEventListener('submit', function(e) { // Ajout d'un écouteur sur la soumission du formulaire
      e.preventDefault(); // Empêcher la soumission par défaut du formulaire
      
      // Récupérer les données du formulaire // Commentaire explicatif
      const formData = new FormData(this); // Création d'un objet FormData avec les données du formulaire
      const data = Object.fromEntries(formData); // Conversion en objet JavaScript
      
      // Validation simple // Commentaire explicatif
      if (!data.prenom || !data.nom || !data.sujet || !data.message) { // Vérification des champs obligatoires
        showAlert('Veuillez remplir tous les champs obligatoires.', 'danger'); // Affichage d'une alerte d'erreur
        return; // Sortie de la fonction
      } 
      
      // Validation email si présent // Commentaire explicatif
      if (data.email && !isValidEmail(data.email)) { // Vérification de la validité de l'email si fourni
        showAlert('Veuillez entrer une adresse email valide.', 'danger'); // Affichage d'une alerte d'erreur
        return; // Sortie de la fonction
      } 
      
      // Simulation d'envoi (remplacer par votre logique d'envoi) // Commentaire explicatif
      showAlert('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success'); // Affichage d'une alerte de succès
      this.reset(); // Réinitialisation du formulaire
    }); 
  } 
} 
// === VALIDATION EMAIL === // Commentaire pour la validation d'email
function isValidEmail(email) { // Définition de la fonction isValidEmail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider le format d'email
  return emailRegex.test(email); // Test de l'email avec la regex et retour du résultat
} 

// === AFFICHAGE DES ALERTES === // Commentaire pour l'affichage des alertes
function showAlert(message, type) { // Définition de la fonction showAlert avec message et type
  // Supprimer les alertes existantes // Commentaire explicatif
  const existingAlerts = document.querySelectorAll('.alert'); // Sélection de toutes les alertes existantes
  existingAlerts.forEach(alert => alert.remove()); // Suppression de chaque alerte existante
  
  // Créer la nouvelle alerte // Commentaire explicatif
  const alertDiv = document.createElement('div'); // Création d'un nouvel élément div
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`; // Attribution des classes CSS
  alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;'; // Application des styles inline
  alertDiv.innerHTML = ` // Contenu HTML de l'alerte
    ${message} // Message à afficher
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> // Bouton de fermeture
  `; 
  
  document.body.appendChild(alertDiv); // Ajout de l'alerte au body du document
  
  // Supprimer automatiquement après 5 secondes // Commentaire explicatif
  setTimeout(() => { // Délai de 5 secondes
    if (alertDiv.parentNode) { // Vérification si l'alerte est toujours dans le DOM
      alertDiv.remove(); // Suppression de l'alerte
    } 
  }, 5000); // Délai de 5000ms (5 secondes)
} 

// === ANIMATION DES CARTES AU HOVER === // Commentaire pour l'animation des cartes
function initCardAnimations() { // Définition de la fonction initCardAnimations
  const cards = document.querySelectorAll('.card'); // Sélection de toutes les cartes
  
  cards.forEach(card => { // Parcours de chaque carte
    card.addEventListener('mouseenter', function() { // Ajout d'un écouteur sur l'entrée de la souris
      this.style.transform = 'translateY(-10px)'; // Translation vers le haut de 10px
    });
    
    card.addEventListener('mouseleave', function() { // Ajout d'un écouteur sur la sortie de la souris
      this.style.transform = 'translateY(0)'; // Retour à la position initiale
    }); 
  }); 
} 
// === ANIMATION DE TYPING POUR LE TITRE (seulement sur la page d'accueil) === // Commentaire pour l'effet de frappe
function typeWriter(element, text, speed = 100) { // Définition de la fonction typeWriter avec paramètres par défaut
  let i = 0; // Initialisation de l'index à 0
  element.innerHTML = ''; // Vidage du contenu de l'élément
  
  function type() { // Définition de la fonction interne type
    if (i < text.length) { // Si l'index est inférieur à la longueur du texte
      element.innerHTML += text.charAt(i); // Ajout du caractère à l'index i
      i++; // Incrémentation de l'index
      setTimeout(type, speed); // Appel récursif avec délai
    } 
  }
  
  type(); // Appel initial de la fonction type
} 

// === INITIALISATION === // Commentaire pour la section d'initialisation
document.addEventListener('DOMContentLoaded', function() { // Écouteur d'événement pour le chargement du DOM
  // Initialiser toutes les fonctionnalités // Commentaire explicatif
  initSmoothScrolling(); // Initialisation du défilement fluide
  initContactForm(); // Initialisation du formulaire de contact
  animateProgressBars(); // Initialisation des animations des barres de progression
  initCardAnimations(); // Initialisation des animations des cartes
  
  // Ajouter les classes reveal aux sections (sauf hero) // Commentaire explicatif
  const sections = document.querySelectorAll('section'); // Sélection de toutes les sections
  sections.forEach(section => { // Parcours de chaque section
    if (!section.classList.contains('hero') && !section.classList.contains('hero-small')) { // Vérification si ce n'est pas une section hero
      section.classList.add('reveal'); // Ajout de la classe reveal pour l'animation
    } 
  });
  
  // Ajouter l'effet de scroll à la navbar // Commentaire explicatif
  window.addEventListener('scroll', navbarScrollEffect); // Ajout de l'écouteur de scroll pour la navbar
  
  // Ajouter l'animation reveal au scroll // Commentaire explicatif
  window.addEventListener('scroll', revealOnScroll); // Ajout de l'écouteur de scroll pour les animations reveal
  
  // Appeler une fois au chargement pour les éléments déjà visibles // Commentaire explicatif
  revealOnScroll(); // Appel initial de la fonction revealOnScroll
  navbarScrollEffect(); // Appel initial de la fonction navbarScrollEffect
  
  // Initialisation du typing effect (seulement sur la page d'accueil) // Commentaire explicatif
  const heroTitle = document.querySelector('.hero h1'); // Sélection du titre hero
  if (heroTitle) { // Vérification si le titre existe
    const originalText = heroTitle.innerHTML; // Sauvegarde du texte original
    setTimeout(() => { // Délai avant l'effet de frappe
      typeWriter(heroTitle, originalText, 50); // Application de l'effet de frappe
    }, 1000); // Délai de 1000ms (1 seconde)
  } 

});

// === GESTION DU SCROLL POUR LA NAVBAR === // Commentaire pour la gestion du scroll de la navbar
window.addEventListener('scroll', function() { // Écouteur d'événement de scroll sur la fenêtre
  const navbar = document.querySelector('.navbar'); // Sélection de la navbar
  
  if (window.scrollY > 100) { // Si l'utilisateur a scrollé plus de 100px
    navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)'; // Application d'un fond semi-transparent
    navbar.style.backdropFilter = 'blur(10px)'; // Application d'un effet de flou
  } else { // Sinon
    navbar.style.backgroundColor = ''; // Suppression du fond
    navbar.style.backdropFilter = ''; // Suppression de l'effet de flou
  } 
}); 

// === ACTIVE NAV LINK === // Commentaire pour la gestion du lien actif
function setActiveNavLink() { // Définition de la fonction setActiveNavLink
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Récupération du nom de la page actuelle
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Sélection de tous les liens de navigation
  
  navLinks.forEach(link => { // Parcours de chaque lien
    link.classList.remove('active'); // Suppression de la classe active
    const href = link.getAttribute('href'); // Récupération de l'attribut href
    
    if (href === currentPage || (currentPage === '' && href === 'index.html')) { // Vérification si c'est le lien actuel
      link.classList.add('active'); // Ajout de la classe active
    }
  }); 
} 

// Appeler la fonction au chargement de la page // Commentaire explicatif
document.addEventListener('DOMContentLoaded', setActiveNavLink); // Appel de la fonction au chargement du DOM