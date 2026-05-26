import gsap from 'gsap';
import { PageType } from '../types';

/**
 * Handles navigation with a GSAP transition from any page to a project detail page.
 */
export function navigateToProjectDetail(targetRoute: PageType, setCurrentPage: (page: PageType) => void) {
  gsap.to(document.body, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      setCurrentPage(targetRoute);
      window.scrollTo(0, 0);
      
      // Animate the next page in
      setTimeout(() => {
        gsap.fromTo(document.body, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }, 50);
    }
  });
}

/**
 * Handles navigation from a project detail page back to the projects grid page with GSAP.
 */
export function navigateBackToProjects(setCurrentPage: (page: PageType) => void) {
  gsap.to(document.body, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      setCurrentPage('projects');
      window.scrollTo(0, 0);

      // Animate the grid page in
      setTimeout(() => {
        gsap.fromTo(document.body,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }, 50);
    }
  });
}

/**
 * Simple hook / function to run on component mounting to ensure body is visible and animated.
 */
export function initPageTransition() {
  gsap.fromTo(document.body,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );
}
