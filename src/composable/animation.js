import gsap from 'gsap'

export function useAnimation() {
  // Buat singleton untuk timeline
  const tl = gsap.timeline()

  function beforeEnter(el) {
    gsap.set(el, {
      y: 100,
      opacity: 0.8
    })
  }

  function enter(el, done) {
    tl.clear() // Clear timeline sebelum animasi baru
    tl.to(el, {
      duration: 0.3,
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      onComplete: done
    })
  }

  function beforeLeave(el) {
    gsap.set(el, {
      y: 0,
      opacity: 1
    })
  }

  function leave(el, done) {
    tl.clear()
    tl.to(el, {
      duration: 0.3,
      y: 100,
      opacity: 0,
      ease: 'power2.in',
      onComplete: done
    })
  }

  return {
    beforeEnter,
    enter,
    beforeLeave,
    leave
  }
}
