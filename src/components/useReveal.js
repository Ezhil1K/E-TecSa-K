import { useEffect, useRef } from 'react'

// Hook: attach to a container ref to animate children with class="reveal"
export default function useReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')]
            const delay = siblings.indexOf(entry.target) * 80
            setTimeout(() => entry.target.classList.add('visible'), delay)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
