/**
 * Analytics and Conversion Tracking Service for ZuyZelia
 * Compatible with Meta Pixel (fbq), Google Tag Manager (dataLayer) and Google Analytics (gtag).
 * Follows LGPD/GDPR principles: never transmits private health answers or sensitive clinical data.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const analytics = {
  /**
   * Track standard PageView
   */
  pageView: (pagePath = window.location.pathname) => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: pagePath });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: 'page_view', page_path: pagePath });
      }
    } catch (e) {
      // Fail silently to never break UX
    }
  },

  /**
   * Track when visitor initiates the quiz
   */
  quizStart: () => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'QuizStart', {
          quiz_name: 'Barriga Chapada em 7 Dias'
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'quiz_start',
          quiz_name: 'Barriga Chapada em 7 Dias'
        });
      }
    } catch (e) {
      // Fail silently
    }
  },

  /**
   * Track progress on each question
   */
  quizStep: (stepNumber: number, stepId: string) => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'QuizStep', {
          step_number: stepNumber,
          step_id: stepId
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'quiz_step',
          step_number: stepNumber,
          step_id: stepId
        });
      }
    } catch (e) {
      // Fail silently
    }
  },

  /**
   * Track when a lead submits their name and email
   */
  leadCaptured: () => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Quiz Barriga Chapada em 7 Dias',
          content_category: 'Health & Wellness'
        });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          currency: 'BRL',
          value: 0
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'lead_captured',
          content_name: 'Quiz Barriga Chapada em 7 Dias'
        });
      }
    } catch (e) {
      // Fail silently
    }
  },

  /**
   * Track when prospect clicks on the Hotmart checkout CTA
   */
  initiateCheckout: (value = 29.90, currency = 'BRL') => {
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          value,
          currency,
          content_name: 'Protocolo Barriga Chapada em 7 Dias',
          num_items: 1
        });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'begin_checkout', {
          value,
          currency,
          items: [{ item_name: 'Protocolo Barriga Chapada em 7 Dias', price: value }]
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: 'initiate_checkout',
          value,
          currency,
          product_name: 'Protocolo Barriga Chapada em 7 Dias'
        });
      }
    } catch (e) {
      // Fail silently
    }
  }
};
