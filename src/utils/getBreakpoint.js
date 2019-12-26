import { bpSm, bpMd, bpLg, bpXl } from '@styles/variables.module.scss'

const getBreakpoint = () => {
  const mqXs = window.matchMedia(`(max-width: ${parseFloat(bpSm.replace('px', '')) - 1}px)`)
  if (mqXs.matches) {
    return 'xs'
  }

  const mqSm = window.matchMedia(`(min-width: ${bpSm}) and (max-width: ${parseFloat(bpMd.replace('px', '')) - 1}px)`)
  if (mqSm.matches) {
    return 'sm'
  }

  const mqMd = window.matchMedia(`(min-width: ${bpMd}) and (max-width: ${parseFloat(bpLg.replace('px', '')) - 1}px)`)
  if (mqMd.matches) {
    return 'md'
  }

  const mqLg = window.matchMedia(`(min-width: ${bpLg}) and (max-width: ${parseFloat(bpXl.replace('px', '')) - 1}px)`)
  if (mqLg.matches) {
    return 'lg'
  }

  const mqXl = window.matchMedia(`(min-width: ${bpLg})`)
  if (mqXl.matches) {
    return 'xl'
  }
}

export default getBreakpoint
